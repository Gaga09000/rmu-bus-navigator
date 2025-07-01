
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Map, MapPin, Search, User, Clock } from "lucide-react";
import { toast } from "sonner";

const UserMap = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [busLocations, setBusLocations] = useState([
    { id: 1, name: 'สาย A', lat: 16.4322, lng: 103.3656, status: 'กำลังวิ่ง', eta: '5 นาที' },
    { id: 2, name: 'สาย B', lat: 16.4302, lng: 103.3676, status: 'รอผู้โดยสาร', eta: '12 นาที' }
  ]);
  const [requestedBus, setRequestedBus] = useState<number | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to RMU location if geolocation fails
          setUserLocation({ lat: 16.4322, lng: 103.3656 });
        }
      );
    }
  }, []);

  const handleRequestBus = (busId: number) => {
    setRequestedBus(busId);
    toast.success("แจ้งขึ้นรถสำเร็จ! รถบัสจะได้รับการแจ้งเตือน");
  };

  const calculateDistance = (bus: any) => {
    if (!userLocation) return 'กำลังคำนวณ...';
    
    // Simple distance calculation (in km)
    const R = 6371;
    const dLat = (bus.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (bus.lng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(bus.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return `${(distance * 1000).toFixed(0)} เมตร`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">RMU Bus</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>เมนูผู้ใช้งาน</SheetTitle>
                <SheetDescription>จัดการบัญชีและการตั้งค่า</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  ข้อมูลส่วนตัว
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  การแจ้งเตือน
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/'}>
                  ออกจากระบบ
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Map Placeholder */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">แผนที่จะแสดงที่นี่</p>
                <p className="text-sm text-gray-500">จำเป็นต้องมี Mapbox API Key</p>
              </div>
              {/* Simulated map pins */}
              <div className="absolute top-4 left-4 bg-red-500 rounded-full p-2">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-8 right-8 bg-blue-500 rounded-full p-2">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bus List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Search className="mr-2 h-5 w-5" />
            รถบัสที่ใกล้คุณ
          </h2>
          
          {busLocations.map((bus) => (
            <Card key={bus.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{bus.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bus.status === 'กำลังวิ่ง' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1 h-4 w-4" />
                    ETA: {bus.eta}
                  </div>
                  <div className="text-sm text-gray-600">
                    ระยะห่าง: {calculateDistance(bus)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleRequestBus(bus.id)}
                    disabled={requestedBus === bus.id}
                    className="flex-1"
                    variant={requestedBus === bus.id ? "secondary" : "default"}
                  >
                    {requestedBus === bus.id ? "กำลังรอรถ..." : "ขึ้นรถ"}
                  </Button>
                  <Button variant="outline" size="sm">
                    ดูเส้นทาง
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMap;
