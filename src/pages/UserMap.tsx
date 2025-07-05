
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, MapPin, Clock, Navigation, User, Star, Settings } from "lucide-react";
import { toast } from "sonner";
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface BusLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  eta: string;
  passengers: number;
  capacity: number;
}

const UserMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>({ lat: 16.4322, lng: 103.3656 });
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const [busLocations] = useState<BusLocation[]>([
    { 
      id: 1, 
      name: 'สาย A - อาคารเรียนรวม', 
      lat: 16.4322, 
      lng: 103.3656, 
      status: 'กำลังวิ่ง', 
      eta: '5 นาที',
      passengers: 15,
      capacity: 40
    },
    { 
      id: 2, 
      name: 'สาย B - หอพัก', 
      lat: 16.4302, 
      lng: 103.3676, 
      status: 'รอผู้โดยสาร', 
      eta: '12 นาที',
      passengers: 8,
      capacity: 40
    },
    { 
      id: 3, 
      name: 'สาย C - คณะวิทยาศาสตร์', 
      lat: 16.4342, 
      lng: 103.3636, 
      status: 'กำลังวิ่ง', 
      eta: '8 นาที',
      passengers: 22,
      capacity: 40
    }
  ]);
  
  const [requestedBus, setRequestedBus] = useState<number | null>(null);

  useEffect(() => {
    console.log('UserMap component mounted');
    
    // Try to get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got user location:', position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('ไม่สามารถเข้าถึงตำแหน่งได้ กำลังใช้ตำแหน่งมหาวิทยาลัย');
          setIsLoading(false);
        },
        {
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log('Geolocation not supported');
      setLocationError('เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && mapRef.current && !mapInstanceRef.current) {
      console.log('Initializing map with location:', userLocation);
      
      try {
        // Initialize the map
        const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 15);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom icons using HTML
        const createIcon = (content: string, color: string) => {
          return L.divIcon({
            html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); font-size: 16px;">${content}</div>`,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          });
        };

        // Add user marker
        const userMarker = L.marker([userLocation.lat, userLocation.lng], {
          icon: createIcon('👤', '#2563EB')
        }).addTo(map);
        
        userMarker.bindPopup(`
          <div style="text-align: center;">
            <strong>ตำแหน่งของคุณ</strong><br>
            <small>มหาวิทยาลัยราชภัฏมหาสารคาม</small>
          </div>
        `);

        // Add bus markers
        busLocations.forEach((bus) => {
          const busMarker = L.marker([bus.lat, bus.lng], {
            icon: createIcon('🚌', '#FF6500')
          }).addTo(map);
          
          busMarker.bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 8px;">${bus.name}</h3>
              <div style="margin-top: 8px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>สถานะ:</span>
                  <span style="background-color: ${bus.status === 'กำลังวิ่ง' ? '#dcfce7' : '#fef3c7'}; color: ${bus.status === 'กำลังวิ่ง' ? '#166534' : '#92400e'}; padding: 2px 8px; border-radius: 4px; font-size: 10px;">
                    ${bus.status}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>ETA:</span>
                  <span style="font-weight: 500;">${bus.eta}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>ผู้โดยสาร:</span>
                  <span style="color: ${bus.passengers / bus.capacity < 0.5 ? '#059669' : bus.passengers / bus.capacity < 0.8 ? '#d97706' : '#dc2626'};">
                    ${bus.passengers}/${bus.capacity}
                  </span>
                </div>
              </div>
            </div>
          `);
        });

        mapInstanceRef.current = map;
        console.log('Map initialized successfully');

      } catch (error) {
        console.error('Error initializing map:', error);
        setLocationError('เกิดข้อผิดพลาดในการโหลดแผนที่');
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoading, userLocation, busLocations]);

  const handleRequestBus = (busId: number) => {
    setRequestedBus(busId);
    const bus = busLocations.find(b => b.id === busId);
    toast.success(`แจ้งขึ้นรถ${bus?.name}สำเร็จ! คนขับจะได้รับการแจ้งเตือน`);
    
    setTimeout(() => {
      toast.info(`รถ${bus?.name} กำลังมาหาคุณ - ETA: ${bus?.eta}`);
    }, 3000);
  };

  const calculateDistance = (bus: BusLocation) => {
    if (!userLocation) return 'กำลังคำนวณ...';
    
    const R = 6371;
    const dLat = (bus.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (bus.lng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(bus.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return `${(distance * 1000).toFixed(0)} ม.`;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">กำลังโหลดแผนที่...</p>
          {locationError && (
            <p className="text-yellow-600 text-sm">{locationError}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold">RMU Bus</h1>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
            มหาวิทยาลัยราชภัฏมหาสารคาม
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>เมนู</SheetTitle>
                <SheetDescription>จัดการบัญชีและการตั้งค่า</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  ข้อมูลส่วนตัว
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  ประวัติการใช้งาน
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  การตั้งค่า
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  การแจ้งเตือน
                </Button>
                <hr />
                <Button variant="outline" className="w-full justify-start text-red-600" onClick={() => window.location.href = '/'}>
                  ออกจากระบบ
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />

        {/* Quick Bus Info Card */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg border max-h-40 overflow-y-auto">
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-2 flex items-center">
                <Navigation className="mr-2 h-4 w-4 text-blue-600" />
                รถบัสที่ใกล้คุณ
              </h3>
              <div className="space-y-2">
                {busLocations.slice(0, 2).map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                    <div className="flex-1">
                      <div className="font-medium">{bus.name}</div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{bus.eta}</span>
                        <span>•</span>
                        <span>{calculateDistance(bus)}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={requestedBus === bus.id ? "secondary" : "default"}
                      onClick={() => handleRequestBus(bus.id)}
                      disabled={requestedBus === bus.id}
                      className="ml-2 text-xs px-2 py-1 h-7"
                    >
                      {requestedBus === bus.id ? "รอ..." : "ขึ้น"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {locationError && (
          <div className="absolute top-4 left-4 right-4 z-[1000]">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p className="text-sm">{locationError}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMap;
