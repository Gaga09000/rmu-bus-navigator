
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, MapPin, Clock, Navigation, User, Star, Settings } from "lucide-react";
import { toast } from "sonner";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

const UserMap = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [busLocations] = useState([
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
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    console.log('UserMap component mounted');
    
    // Get user location - RMU coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got user location:', position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setMapReady(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to RMU location
          setUserLocation({ lat: 16.4322, lng: 103.3656 });
          setMapReady(true);
        }
      );
    } else {
      console.log('Geolocation not supported, using default location');
      // Default to RMU location
      setUserLocation({ lat: 16.4322, lng: 103.3656 });
      setMapReady(true);
    }
  }, []);

  const handleRequestBus = (busId: number) => {
    setRequestedBus(busId);
    const bus = busLocations.find(b => b.id === busId);
    toast.success(`แจ้งขึ้นรถ${bus?.name}สำเร็จ! คนขับจะได้รับการแจ้งเตือน`);
    
    // Simulate bus response after 3 seconds
    setTimeout(() => {
      toast.info(`รถ${bus?.name} กำลังมาหาคุณ - ETA: ${bus?.eta}`);
    }, 3000);
  };

  const calculateDistance = (bus: any) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'กำลังวิ่ง': return 'bg-green-100 text-green-800';
      case 'รอผู้โดยสาร': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (passengers: number, capacity: number) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage < 50) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  console.log('Rendering UserMap, mapReady:', mapReady, 'userLocation:', userLocation);

  if (!mapReady || !userLocation) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดแผนที่...</p>
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

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>ตำแหน่งของคุณ</strong>
                <br />
                <small>มหาวิทยาลัยราชภัฏมหาสารคาม</small>
              </div>
            </Popup>
          </Marker>

          {/* Bus markers */}
          {busLocations.map((bus) => (
            <Marker 
              key={bus.id} 
              position={[bus.lat, bus.lng]} 
              icon={busIcon}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-sm">{bus.name}</h3>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>สถานะ:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ETA:</span>
                      <span className="font-medium">{bus.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ผู้โดยสาร:</span>
                      <span className={getOccupancyColor(bus.passengers, bus.capacity)}>
                        {bus.passengers}/{bus.capacity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ระยะห่าง:</span>
                      <span>{calculateDistance(bus)}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => handleRequestBus(bus.id)}
                    disabled={requestedBus === bus.id}
                  >
                    {requestedBus === bus.id ? "กำลังรอรถ..." : "ขึ้นรถ"}
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Quick Bus Info Card - Floating at bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
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
      </div>
    </div>
  );
};

export default UserMap;
