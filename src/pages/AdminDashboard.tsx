
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Bell, User, Home, Calendar, Settings, BarChart, Plus, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [buses] = useState([
    { id: 1, name: 'สาย A', driver: 'สมชาย ใจดี', status: 'กำลังวิ่ง', passengers: 15 },
    { id: 2, name: 'สาย B', driver: 'สมหญิง รักดี', status: 'รอผู้โดยสาร', passengers: 8 },
    { id: 3, name: 'สาย C', driver: 'สมศรี มั่นคง', status: 'ถึงปลายทาง', passengers: 0 }
  ]);

  const [users] = useState([
    { id: 1, name: 'นักศึกษา A', type: 'User', lastSeen: '5 นาทีที่แล้ว' },
    { id: 2, name: 'คนขับ B', type: 'Driver', lastSeen: 'ออนไลน์' },
    { id: 3, name: 'นักศึกษา C', type: 'User', lastSeen: '1 ชั่วโมงที่แล้ว' }
  ]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    } else {
      navigate('/');
    }
  };

  const handleAddBus = () => {
    toast.success("เปิดหน้าต่างเพิ่มรถบัสใหม่");
  };

  const handleEditBus = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    toast.info(`แก้ไขข้อมูลรถ ${bus?.name}`);
  };

  const handleViewRoute = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    toast.info(`ดูเส้นทางรถ ${bus?.name}`);
  };

  const handleDeleteBus = (busId: number) => {
    const bus = buses.find(b => b.id === busId);
    toast.error(`ลบรถ ${bus?.name} (ต้องยืนยันการลบ)`);
  };

  const handleManageNotifications = () => {
    toast.info("เปิดหน้าจัดการการแจ้งเตือน");
  };

  const handleManageUsers = () => {
    toast.info("เปิดหน้าจัดการผู้ใช้งาน");
  };

  const handleViewReports = () => {
    toast.info("เปิดหน้ารายงานระบบ");
  };

  const handleRefreshData = () => {
    toast.success("รีเฟรชข้อมูลแล้ว");
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
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold">แผงควบคุมผู้ดูแลระบบ</h1>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
              ผู้ดูแลระบบ - admin
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-500"
              onClick={handleRefreshData}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500" onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart className="mr-2 h-4 w-4" />
              ภาพรวม
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              จัดการรถ
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Settings className="mr-2 h-4 w-4" />
              ตั้งค่า
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{buses.length}</div>
                  <div className="text-sm text-gray-600">รถบัสทั้งหมด</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">ผู้ใช้งาน</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {buses.filter(b => b.status === 'กำลังวิ่ง').length}
                  </div>
                  <div className="text-sm text-gray-600">รถที่กำลังวิ่ง</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">คนขับออนไลน์</div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Status */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">สถานะรถบัสปัจจุบัน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {buses.map((bus) => (
                    <div key={bus.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{bus.name}</div>
                        <div className="text-sm text-gray-600">คนขับ: {bus.driver}</div>
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
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddBus}>
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
                      <div className="text-sm text-gray-500">จัดการการแจ้งเตือนของระบบ</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleManageNotifications}>
                      <Settings className="mr-1 h-3 w-3" />
                      จัดการ
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">ผู้ใช้งาน</div>
                      <div className="text-sm text-gray-500">จัดการบัญชีผู้ใช้งานทั้งหมด</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleManageUsers}>
                      <Users className="mr-1 h-3 w-3" />
                      จัดการ
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">รายงาน</div>
                      <div className="text-sm text-gray-500">ดูรายงานการใช้งานระบบ</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleViewReports}>
                      <BarChart className="mr-1 h-3 w-3" />
                      ดูรายงาน
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
            <BarChart className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">ภาพรวม</span>
          </div>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => toast.info("ดูประวัติการทำงาน")}
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
            onClick={() => toast.info("ข้อมูลผู้ดูแลระบบ")}
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
