
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Bell, User, Home, Calendar, Settings, BarChart, Plus, Edit, Trash2, Eye, RefreshCw, Shield, Database, Activity } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([
    { id: 1, name: 'สาย A', driver: 'สมชาย ใจดี', status: 'กำลังวิ่ง', passengers: 15, route: 'อาคารเรียนรวม - หอพัก' },
    { id: 2, name: 'สาย B', driver: 'สมหญิง รักดี', status: 'รอผู้โดยสาร', passengers: 8, route: 'คณะวิทยาศาสตร์ - ลานจอดรถ' },
    { id: 3, name: 'สาย C', driver: 'สมศรี มั่นคง', status: 'ถึงปลายทาง', passengers: 0, route: 'โรงอาหาร - หอสมุด' }
  ]);

  const [users] = useState([
    { id: 1, name: 'นักศึกษา A', type: 'User', lastSeen: '5 นาทีที่แล้ว', email: 'student1@rmu.ac.th' },
    { id: 2, name: 'คนขับ B', type: 'Driver', lastSeen: 'ออนไลน์', email: 'driver1@rmu.ac.th' },
    { id: 3, name: 'นักศึกษา C', type: 'User', lastSeen: '1 ชั่วโมงที่แล้ว', email: 'student2@rmu.ac.th' }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalBuses: buses.length,
    activeBuses: buses.filter(b => b.status === 'กำลังวิ่ง').length,
    totalUsers: 156,
    onlineDrivers: 3,
    todayRides: 89,
    systemUptime: '99.9%'
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    } else {
      navigate('/');
    }
  };

  const handleAddBus = () => {
    const newBus = {
      id: buses.length + 1,
      name: `สาย ${String.fromCharCode(65 + buses.length)}`,
      driver: 'คนขับใหม่',
      status: 'ปิดงาน' as const,
      passengers: 0,
      route: 'เส้นทางใหม่'
    };
    setBuses([...buses, newBus]);
    setSystemStats(prev => ({ ...prev, totalBuses: prev.totalBuses + 1 }));
    toast.success(`เพิ่มรถบัส ${newBus.name} สำเร็จ`);
  };

  const handleEditBus = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    toast.info(`เปิดหน้าต่างแก้ไขข้อมูลรถ ${bus?.name} - คนขับ: ${bus?.driver}`);
  };

  const handleViewRoute = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    toast.info(`แสดงเส้นทาง ${bus?.name}: ${bus?.route}`);
  };

  const handleDeleteBus = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    setBuses(buses.filter(b => b.id !== busId));
    setSystemStats(prev => ({ ...prev, totalBuses: prev.totalBuses - 1 }));
    toast.success(`ลบรถ ${bus?.name} สำเร็จ`);
  };

  const handleManageNotifications = () => {
    toast.info("เปิดระบบจัดการการแจ้งเตือน: ตั้งค่าการแจ้งเตือนอัตโนมัติ, การแจ้งเตือนฉุกเฉิน");
  };

  const handleManageUsers = () => {
    toast.info(`จัดการผู้ใช้งาน: ผู้ใช้ทั้งหมด ${users.length} คน (${users.filter(u => u.type === 'User').length} นักศึกษา, ${users.filter(u => u.type === 'Driver').length} คนขับ)`);
  };

  const handleViewReports = () => {
    toast.info(`รายงานระบบ: การใช้งานรายวัน ${systemStats.todayRides} เที่ยว, อัตราการทำงาน ${systemStats.systemUptime}`);
  };

  const handleRefreshData = () => {
    // Simulate real-time data refresh
    setSystemStats(prev => ({
      ...prev,
      todayRides: prev.todayRides + Math.floor(Math.random() * 5),
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 3) - 1
    }));
    toast.success("รีเฟรชข้อมูลแล้ว - อัปเดตข้อมูลเรียลไทม์");
  };

  const handleSystemMaintenance = () => {
    toast.info("เข้าสู่โหมดบำรุงรักษาระบบ - จะแจ้งให้ผู้ใช้ทราบล่วงหน้า");
  };

  const handleBackupData = () => {
    toast.success("สำรองข้อมูลเรียบร้อย - ข้อมูล 1,247 รายการ");
  };

  const handleViewLogs = () => {
    toast.info("ดูบันทึกระบบ: 847 รายการในวันนี้ (245 Info, 12 Warning, 2 Error)");
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'กำลังวิ่ง': return 'default';
      case 'รอผู้โดยสาร': return 'secondary';
      case 'ถึงปลายทาง': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">แผงควบคุมผู้ดูแลระบบ</h1>
              <p className="text-xs text-purple-100">ระบบจัดการและควบคุมรถบัส RMU</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={handleRefreshData}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="relative bg-white/20 p-2 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs">
              ผู้ดูแลระบบ
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

      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart className="mr-2 h-4 w-4" />
              ภาพรวม
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              จัดการรถ
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Settings className="mr-2 h-4 w-4" />
              ตั้งค่า
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Enhanced Overview Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.totalBuses}</div>
                  <div className="text-sm text-gray-600">รถบัสทั้งหมด</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.totalUsers}</div>
                  <div className="text-sm text-gray-600">ผู้ใช้งาน</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.activeBuses}</div>
                  <div className="text-sm text-gray-600">รถที่กำลังวิ่ง</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.onlineDrivers}</div>
                  <div className="text-sm text-gray-600">คนขับออนไลน์</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.todayRides}</div>
                  <div className="text-sm text-gray-600">เที่ยววันนี้</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{systemStats.systemUptime}</div>
                  <div className="text-sm text-gray-600">อัตราการทำงาน</div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Status */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  สถานะรถบัสปัจจุบัน
                  <Button variant="outline" size="sm" onClick={handleRefreshData}>
                    <RefreshCw className="mr-1 h-3 w-3" />
                    รีเฟรช
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {buses.map((bus) => (
                    <div key={bus.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{bus.name}</div>
                        <div className="text-sm text-gray-600">คนขับ: {bus.driver}</div>
                        <div className="text-xs text-gray-500">{bus.route}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusBadgeVariant(bus.status)} className="mb-1">
                          {bus.status}
                        </Badge>
                        <div className="text-sm text-gray-600">ผู้โดยสาร: {bus.passengers}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">จัดการรถบัส</h3>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddBus}>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มรถบัสใหม่
              </Button>
            </div>
            <div className="grid gap-4">
              {buses.map((bus) => (
                <Card key={bus.id} className="bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{bus.name}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(bus.status)}>
                        {bus.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      คนขับ: {bus.driver} | ผู้โดยสาร: {bus.passengers} คน
                      <br />
                      เส้นทาง: {bus.route}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditBus(bus.id)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        แก้ไข
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewRoute(bus.id)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        ดูเส้นทาง
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteBus(bus.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        ลบ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h3 className="text-lg font-semibold">การตั้งค่าระบบ</h3>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">การแจ้งเตือน</div>
                      <div className="text-sm text-gray-500">จัดการการแจ้งเตือนของระบบและผู้ใช้</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleManageNotifications}>
                      <Settings className="mr-1 h-3 w-3" />
                      จัดการ
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">ผู้ใช้งาน</div>
                      <div className="text-sm text-gray-500">จัดการบัญชีผู้ใช้งานและสิทธิ์</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleManageUsers}>
                      <Users className="mr-1 h-3 w-3" />
                      จัดการ
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">รายงาน</div>
                      <div className="text-sm text-gray-500">ดูรายงานการใช้งานและสถิติระบบ</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleViewReports}>
                      <BarChart className="mr-1 h-3 w-3" />
                      ดูรายงาน
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">บำรุงรักษาระบบ</div>
                      <div className="text-sm text-gray-500">จัดการการบำรุงรักษาและอัปเดต</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSystemMaintenance}>
                      <Activity className="mr-1 h-3 w-3" />
                      จัดการ
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">สำรองข้อมูล</div>
                      <div className="text-sm text-gray-500">สำรองและกู้คืนข้อมูลระบบ</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleBackupData}>
                      <Database className="mr-1 h-3 w-3" />
                      สำรอง
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">บันทึกระบบ</div>
                      <div className="text-sm text-gray-500">ดูบันทึกการทำงานและข้อผิดพลาด</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleViewLogs}>
                      <Eye className="mr-1 h-3 w-3" />
                      ดูบันทึก
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-1">
            <BarChart className="h-6 w-6 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">ภาพรวม</span>
          </div>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => toast.info("เปิดส่วนจัดการรถบัส")}
          >
            <Calendar className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">จัดการรถ</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={handleManageNotifications}
          >
            <Settings className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ตั้งค่า</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => toast.info("ข้อมูลผู้ดูแลระบบ: Admin001 | สิทธิ์: Full Access")}
          >
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">โปรไฟล์</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
