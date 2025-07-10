
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Bell, User, Home, Calendar, Settings, BarChart } from "lucide-react";

const AdminDashboard = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500">
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
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">รถบัสที่ได้รับ</div>
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
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">จุดหมาย-ลง</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">คนขับ</div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Status */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">สถานะระบบปัจจุบัน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BarChart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>ไม่มีข้อมูลระบบในขณะนี้</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">จัดการรถบัส</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">เพิ่มรถบัสใหม่</Button>
            </div>
            <div className="grid gap-4">
              {buses.map((bus) => (
                <Card key={bus.id} className="bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{bus.name}</CardTitle>
                      <Badge variant="outline">{bus.status}</Badge>
                    </div>
                    <CardDescription>คนขับ: {bus.driver}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">แก้ไข</Button>
                      <Button variant="outline" size="sm">ดูเส้นทาง</Button>
                      <Button variant="destructive" size="sm">ลบ</Button>
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
                    <span>การแจ้งเตือน</span>
                    <Button variant="outline" size="sm">จัดการ</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ผู้ใช้งาน</span>
                    <Button variant="outline" size="sm">จัดการ</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>รายงาน</span>
                    <Button variant="outline" size="sm">ดูรายงาน</Button>
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
          <div className="flex flex-col items-center space-y-1">
            <Calendar className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">จัดการรถ</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Settings className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ตั้งค่า</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">โปรไฟล์</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
