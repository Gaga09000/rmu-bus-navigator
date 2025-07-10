
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, MapPin, Clock, Navigation, User, Star, Settings, Home, Bus, MessageCircle, Phone, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>({ lat: 16.4322, lng: 103.3656 });
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showBusRequest, setShowBusRequest] = useState(false);
  
  const [busLocations] = useState<BusLocation[]>([
    { 
      id: 1, 
      name: 'สาย A - อาคารเรียนรวม', 
      lat: 16.4325, 
      lng: 103.3660, 
      status: 'กำลังวิ่ง', 
      eta: '5 นาที',
      passengers: 15,
      capacity: 40
    },
    { 
      id: 2, 
      name: 'สาย B - หอพัก', 
      lat: 16.4310, 
      lng: 103.3670, 
      status: 'รอผู้โดยสาร', 
      eta: '12 นาที',
      passengers: 8,
      capacity: 40
    },
    { 
      id: 3, 
      name: 'สาย C - คณะวิทยาศาสตร์', 
      lat: 16.4340, 
      lng: 103.3640, 
      status: 'กำลังวิ่ง', 
      eta: '8 นาที',
      passengers: 22,
      capacity: 40
    }
  ]);
  
  const [requestedBus, setRequestedBus] = useState<number | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    } else {
      navigate('/');
    }
  };

  const handleRequestBus = (busId: number) => {
    setRequestedBus(busId);
    const bus = busLocations.find(b => b.id === busId);
    toast.success(`แจ้งขึ้นรถ${bus?.name}สำเร็จ! คนขับจะได้รับการแจ้งเตือน`);
    
    setTimeout(() => {
      toast.info(`รถ${bus?.name} กำลังมาหาคุณ - ETA: ${bus?.eta}`);
    }, 3000);
  };

  const handleCenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 16);
      toast.success("กลับไปที่ตำแหน่งของคุณ");
    }
  };

  const handleShowSchedule = () => {
    setShowBusRequest(true);
  };

  const handleEmergency = () => {
    toast.error("กำลังติดต่อหน่วยงานที่เกี่ยวข้อง...", {
      duration: 5000,
    });
  };

  useEffect(() => {
    console.log('UserMap component mounted');
    
    // Set location to RMU campus coordinates
    setUserLocation({
      lat: 16.4322,
      lng: 103.3656
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && mapRef.current && !mapInstanceRef.current) {
      console.log('Initializing map with RMU location:', userLocation);
      
      try {
        // Initialize the map with RMU coordinates
        const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 16);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom user icon
        const userIcon = L.divIcon({
          html: `<div style="background-color: #2563EB; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-size: 12px;">👤</div>`,
          className: 'custom-user-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        // Create custom bus icon
        const busIcon = L.divIcon({
          html: `<div style="background-color: #FF6500; color: white; border-radius: 8px; width: 30px; height: 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-size: 12px;">🚌</div>`,
          className: 'custom-bus-marker',
          iconSize: [30, 20],
          iconAnchor: [15, 10],
        });

        // Add user marker at RMU
        const userMarker = L.marker([userLocation.lat, userLocation.lng], {
          icon: userIcon
        }).addTo(map);
        
        userMarker.bindPopup(`
          <div style="text-align: center; padding: 5px;">
            <strong>ตำแหน่งของคุณ</strong><br>
            <small>มหาวิทยาลัยราชภัฏมหาสารคาม</small>
          </div>
        `);

        // Add bus markers with click to request functionality
        busLocations.forEach((bus) => {
          const busMarker = L.marker([bus.lat, bus.lng], {
            icon: busIcon
          }).addTo(map);
          
          const statusColor = bus.status === 'กำลังวิ่ง' ? '#22c55e' : '#eab308';
          const passengerColor = bus.passengers / bus.capacity < 0.5 ? '#22c55e' : 
                                bus.passengers / bus.capacity < 0.8 ? '#f59e0b' : '#ef4444';
          
          busMarker.bindPopup(`
            <div style="min-width: 200px; padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">${bus.name}</h3>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>สถานะ:</span>
                  <span style="background-color: ${statusColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
                    ${bus.status}
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>เวลาถึง:</span>
                  <span style="font-weight: 600; color: #1f2937;">${bus.eta}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>ผู้โดยสาร:</span>
                  <span style="color: ${passengerColor}; font-weight: 600;">
                    ${bus.passengers}/${bus.capacity}
                  </span>
                </div>
                <button onclick="window.requestBus(${bus.id})" style="background-color: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; width: 100%; margin-top: 8px;">
                  แจ้งขึ้นรถ
                </button>
              </div>
            </div>
          `);
        });

        // Add global function for bus request
        (window as any).requestBus = handleRequestBus;

        mapInstanceRef.current = map;
        console.log('Map initialized successfully with RMU location');

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
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">แผนที่รถบัส RMU</h1>
              <p className="text-xs text-blue-100">ระบบติดตามรถบัสมหาวิทยาลัย</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative bg-white/20 p-2 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs">
              ผู้ใช้งาน
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 px-3 py-1.5" 
              onClick={handleLogout}
            >
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container with proper z-index management */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />

        {/* Floating Action Buttons - Fixed positioning to avoid overlap */}
        <div className="absolute right-4 top-4 flex flex-col space-y-2 z-[1000]">
          <Button 
            size="icon" 
            className="bg-green-500 hover:bg-green-600 text-white rounded-full h-12 w-12 shadow-lg"
            onClick={handleCenterMap}
            title="กลับไปที่ตำแหน่งของคุณ"
          >
            <MapPin className="h-6 w-6" />
          </Button>
          <Button 
            size="icon" 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12 w-12 shadow-lg"
            onClick={handleShowSchedule}
            title="ดูตารางรถ"
          >
            <Bus className="h-6 w-6" />
          </Button>
          <Button 
            size="icon" 
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full h-12 w-12 shadow-lg"
            onClick={() => toast.info("แสดงเวลาทำงาน: 06:00 - 18:00")}
            title="เวลาทำงาน"
          >
            <Clock className="h-6 w-6" />
          </Button>
          <div className="relative">
            <Button 
              size="icon" 
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12 w-12 shadow-lg"
              onClick={() => toast.info("การแจ้งเตือน: รถสาย A กำลังมาถึง")}
              title="การแจ้งเตือน"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              2
            </span>
          </div>
          <Button 
            size="icon" 
            className="bg-red-500 hover:bg-red-600 text-white rounded-full h-12 w-12 shadow-lg"
            onClick={handleEmergency}
            title="ฉุกเฉิน"
          >
            <AlertCircle className="h-6 w-6" />
          </Button>
        </div>

        {/* Error message with proper z-index */}
        {locationError && (
          <div className="absolute top-4 left-4 right-20 z-[1000]">
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p className="text-sm">{locationError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bus Request Sheet */}
      <Sheet open={showBusRequest} onOpenChange={setShowBusRequest}>
        <SheetContent side="bottom" className="h-[80vh] z-[2000]">
          <SheetHeader>
            <SheetTitle>แจ้งขึ้นรถบัส</SheetTitle>
            <SheetDescription>
              เลือกรถบัสที่ต้องการขึ้น
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {busLocations.map((bus) => (
              <div key={bus.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{bus.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    bus.status === 'กำลังวิ่ง' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bus.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>เวลาถึง: <strong>{bus.eta}</strong></span>
                  <span>ผู้โดยสาร: <strong>{bus.passengers}/{bus.capacity}</strong></span>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    handleRequestBus(bus.id);
                    setShowBusRequest(false);
                  }}
                  disabled={requestedBus === bus.id}
                >
                  {requestedBus === bus.id ? 'แจ้งแล้ว' : 'แจ้งขึ้นรถ'}
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation - Fixed with proper z-index */}
      <div className="bg-white border-t border-gray-200 p-4 relative z-50">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-1">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">แผนที่</span>
          </div>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={handleShowSchedule}
          >
            <Bus className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ดูตารางรถ</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => toast.info("ติดต่อเจ้าหน้าที่: 043-754321")}
          >
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ติดต่อ</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => toast.info("ข้อมูลผู้ใช้งาน")}
          >
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">บัญชีผู้ใช้</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMap;
