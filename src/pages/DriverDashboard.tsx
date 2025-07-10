
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bell, User, Home, Calendar, MessageCircle, Play, Pause, Square, Navigation, AlertTriangle, Route } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [busStatus, setBusStatus] = useState<'กำลังวิ่ง' | 'รอผู้โดยสาร' | 'ถึงปลายทาง' | 'ปิดงาน'>('ปิดงาน');
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('สาย A');
  const [passengerCount, setPassengerCount] = useState(0);
  const [todayTrips, setTodayTrips] = useState(8);
  const [workingHours, setWorkingHours] = useState('0:00');
  
  const [notifications] = useState([
    { id: 1, message: 'ผู้โดยสารรอขึ้นรถที่หน้าอาคาร 1', location: 'อาคาร 1', time: '2 นาทีที่แล้ว' },
    { id: 2, message: 'ผู้โดยสารรอขึ้นรถที่ลานจอดรถ B', location: 'ลานจอดรถ B', time: '5 นาทีที่แล้ว' }
  ]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    } else {
      navigate('/');
    }
  };

  const handleStartWork = () => {
    setIsOnDuty(true);
    setBusStatus('รอผู้โดยสาร');
    setWorkingHours('0:15');
    toast.success('เริ่มปฏิบัติงานแล้ว');
  };

  const handleEndWork = () => {
    setIsOnDuty(false);
    setBusStatus('ปิดงาน');
    setPassengerCount(0);
    setWorkingHours('6:30');
    toast.success('ปิดงานแล้ว');
  };

  const updateStatus = (newStatus: typeof busStatus) => {
    if (!isOnDuty) {
      toast.error('กรุณาเริ่มปฏิบัติงานก่อน');
      return;
    }
    setBusStatus(newStatus);
    
    // Simulate passenger count changes
    if (newStatus === 'กำลังวิ่ง') {
      setPassengerCount(prev => Math.min(prev + Math.floor(Math.random() * 5), 40));
    } else if (newStatus === 'ถึงปลายทาง') {
      setPassengerCount(0);
      setTodayTrips(prev => prev + 1);
    }
    
    toast.success(`อัปเดตสถานะเป็น: ${newStatus}`);
  };

  const handleEmergency = () => {
    toast.error("แจ้งเหตุฉุกเฉินแล้ว! กำลังติดต่อผู้ดูแลระบบ...", {
      duration: 5000,
    });
  };

  const handleViewRoute = () => {
    toast.info(`แสดงเส้นทาง${currentRoute}: อาคารเรียนรวม → หอพัก → คณะต่างๆ`);
  };

  const handleViewHistory = () => {
    toast.info("ประวัติการทำงานวันนี้: 8 รอบ, เวลาทำงาน 6:30 ชม.");
  };

  const handleContactSupport = () => {
    toast.info("ติดต่อศูนย์ควบคุม: 043-754321 หรือแจ้งผ่านแอป");
  };

  const handleProfile = () => {
    toast.info("ข้อมูลคนขับรถ: สมชาย ใจดี | รหัส: DR001 | ใบอนุญาต: A123456");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'กำลังวิ่ง': return 'bg-green-500';
      case 'รอผู้โดยสาร': return 'bg-yellow-500';
      case 'ถึงปลายทาง': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Route className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">แผงงานคนขับรถ</h1>
              <p className="text-xs text-green-100">ระบบจัดการรถบัสสำหรับคนขับ</p>
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
              คนขับรถ
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

      <div className="p-4 space-y-4">
        {/* Control Panel */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              การควบคุมรถบัส
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewRoute}
                className="text-xs"
              >
                <Route className="mr-1 h-3 w-3" />
                ดูเส้นทาง
              </Button>
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              สถานะปัจจุบัน: <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(busStatus)}`}>
                {busStatus}
              </span>
              {isOnDuty && (
                <span className="ml-2 text-xs">
                  เส้นทาง: <strong>{currentRoute}</strong>
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isOnDuty ? (
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-medium"
                  onClick={handleStartWork}
                >
                  <Play className="mr-2 h-5 w-5" />
                  เริ่มปฏิบัติงาน
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={busStatus === 'รอผู้โดยสาร' ? 'default' : 'outline'}
                      onClick={() => updateStatus('รอผู้โดยสาร')}
                      className="text-sm"
                    >
                      <Pause className="mr-1 h-4 w-4" />
                      รอผู้โดยสาร
                    </Button>
                    <Button 
                      variant={busStatus === 'กำลังวิ่ง' ? 'default' : 'outline'}
                      onClick={() => updateStatus('กำลังวิ่ง')}
                      className="text-sm"
                    >
                      <Navigation className="mr-1 h-4 w-4" />
                      กำลังวิ่ง
                    </Button>
                  </div>
                  <Button 
                    variant={busStatus === 'ถึงปลายทาง' ? 'default' : 'outline'}
                    onClick={() => updateStatus('ถึงปลายทาง')}
                    className="w-full text-sm"
                  >
                    <MapPin className="mr-1 h-4 w-4" />
                    ถึงปลายทาง
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={handleEndWork}
                    className="w-full"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    ปิดงาน
                  </Button>
                </div>
              )}
              
              <Button 
                variant="outline"
                onClick={handleEmergency}
                className="w-full border-red-500 text-red-500 hover:bg-red-50"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                แจ้งเหตุฉุกเฉิน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {isOnDuty ? '1' : '0'}
              </div>
              <div className="text-sm text-gray-600">รถบัสในการดูแล</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{passengerCount}</div>
              <div className="text-sm text-gray-600">ผู้โดยสารปัจจุบัน</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{todayTrips}</div>
              <div className="text-sm text-gray-600">รอบที่ทำวันนี้</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {isOnDuty ? workingHours : '0:00'}
              </div>
              <div className="text-sm text-gray-600">ชั่วโมงทำงาน</div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">การแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{notification.location}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>ไม่มีการแจ้งเตือนใหม่</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-1">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">ภาพรวม</span>
          </div>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={handleViewHistory}
          >
            <Calendar className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ประวัติ</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={handleContactSupport}
          >
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ติดต่อ</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={handleProfile}
          >
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">โปรไฟล์</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
