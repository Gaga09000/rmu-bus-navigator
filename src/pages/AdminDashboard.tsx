
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Bell, User } from "lucide-react";

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
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">แดshboard ผู้ดูแลระบบ</h1>
            <p className="text-purple-100">ระบบจัดการรถบัส RMU</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="buses">จัดการรถบัส</TabsTrigger>
            <TabsTrigger value="users">ผู้ใช้งาน</TabsTrigger>
            <TabsTrigger value="reports">รายงาน</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">3</CardTitle>
                  <CardDescription>รถบัสทั้งหมด</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">2</CardTitle>
                  <CardDescription>รถที่กำลังให้บริการ</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">23</CardTitle>
                  <CardDescription>ผู้โดยสารรวม</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">156</CardTitle>
                  <CardDescription>ผู้ใช้ลงทะเบียน</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Real-time Status */}
            <Card>
              <CardHeader>
                <CardTitle>สถานะแบบเรียลไทม์</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {buses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{bus.name}</p>
                          <p className="text-sm text-gray-600">คนขับ: {bus.driver}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={bus.status === 'กำลังวิ่ง' ? 'default' : bus.status === 'รอผู้โดยสาร' ? 'secondary' : 'destructive'}>
                          {bus.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">ผู้โดยสาร: {bus.passengers} คน</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">จัดการรถบัส</h3>
              <Button>เพิ่มรถบัสใหม่</Button>
            </div>
            <div className="grid gap-4">
              {buses.map((bus) => (
                <Card key={bus.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{bus.name}</CardTitle>
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

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">ผู้ใช้งานระบบ</h3>
              <Button>เพิ่มผู้ใช้</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {users.map((user, index) => (
                    <div key={user.id} className={`p-4 ${index !== users.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.lastSeen}</p>
                          </div>
                        </div>
                        <Badge variant={user.type === 'Driver' ? 'default' : 'secondary'}>
                          {user.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <h3 className="text-lg font-semibold">รายงานและสถิติ</h3>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>รายงานการใช้งานรายวัน</CardTitle>
                  <CardDescription>สถิติการใช้งานในวันนี้</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">กราฟจะแสดงที่นี่</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>เส้นทางที่ได้รับความนิยม</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>สาย A (หอพัก - อาคารเรียน)</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>สาย B (ลานจอดรถ - ห้องสมุด)</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>สาย C (ประตูหลัก - โรงอาหาร)</span>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
