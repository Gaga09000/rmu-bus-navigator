
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bell, User, Home, Calendar, MessageCircle, Play } from "lucide-react";
import { toast } from "sonner";

const DriverDashboard = () => {
  const [busStatus, setBusStatus] = useState<'กำลังวิ่ง' | 'รอผู้โดยสาร' | 'ถึงปลายทาง'>('รอผู้โดยสาร');
  const [notifications] = useState([
    { id: 1, message: 'ผู้โดยสารรอขึ้นรถที่หน้าอาคาร 1', location: 'อาคาร 1', time: '2 นาทีที่แล้ว' },
    { id: 2, message: 'ผู้โดยสารรอขึ้นรถที่ลานจอดรถ B', location: 'ลานจอดรถ B', time: '5 นาทีที่แล้ว' }
  ]);

  const updateStatus = (newStatus: typeof busStatus) => {
    setBusStatus(newStatus);
    toast.success(`อัปเดตสถานะเป็น: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold">แผนงานคุณคนขับรถ</h1>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
              คนขับรถ - driver
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

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">สถานะการปฏิบัติงาน</CardTitle>
            <CardDescription className="text-sm text-gray-600">พื้นที่</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">ปิดดำเนินงาน</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">05:00 PM</div>
                  <div className="text-xs text-gray-500">ตั้งเวลาเพื่อการปิดรถบริการอย่างปลอดภัย</div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-medium"
                onClick={() => toast.success('เริ่มปฏิบัติงาน')}
              >
                <Play className="mr-2 h-5 w-5" />
                เริ่มปฏิบัติงาน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Status Info */}
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

        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">สถานะรถยนต์ปัจจุบัน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>ไม่มีข้อมูลการปฏิบัติงาน</p>
            </div>
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
          <div className="flex flex-col items-center space-y-1">
            <Calendar className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">จัดการรถ</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <MessageCircle className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-400">ติดต่อ</span>
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

export default DriverDashboard;
