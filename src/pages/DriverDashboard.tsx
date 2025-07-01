
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bell, User } from "lucide-react";
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
          <div>
            <h1 className="text-xl font-bold">แดชบอร์ดคนขับ</h1>
            <p className="text-blue-100">รถบัสสาย A - เที่ยว 001</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Control */}
        <Card>
          <CardHeader>
            <CardTitle>สถานะรถบัส</CardTitle>
            <CardDescription>อัปเดตสถานะปัจจุบันของรถบัส</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">สถานะปัจจุบัน:</span>
              <Badge variant={busStatus === 'กำลังวิ่ง' ? 'default' : busStatus === 'รอผู้โดยสาร' ? 'secondary' : 'destructive'}>
                {busStatus}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button 
                onClick={() => updateStatus('กำลังวิ่ง')}
                variant={busStatus === 'กำลังวิ่ง' ? 'default' : 'outline'}
                size="sm"
              >
                กำลังวิ่ง
              </Button>
              <Button 
                onClick={() => updateStatus('รอผู้โดยสาร')}
                variant={busStatus === 'รอผู้โดยสาร' ? 'default' : 'outline'}
                size="sm"
              >
                รอผู้โดยสาร
              </Button>
              <Button 
                onClick={() => updateStatus('ถึงปลายทาง')}
                variant={busStatus === 'ถึงปลายทาง' ? 'default' : 'outline'}
                size="sm"
              >
                ถึงปลายทาง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              ข้อมูลเส้นทาง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">เส้นทาง:</span>
                <span className="text-sm">หอพัก - อาคารเรียน - ประตูหลัก</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">เวลาเริ่มต้น:</span>
                <span className="text-sm">08:00 น.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">เวลาสิ้นสุด:</span>
                <span className="text-sm">17:00 น.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              การแจ้งเตือน
            </CardTitle>
            <CardDescription>คำขอขึ้นรถจากผู้โดยสาร</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800">{notification.message}</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {notification.location}
                      </p>
                    </div>
                    <div className="text-xs text-yellow-600 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {notification.time}
                    </div>
                  </div>
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    ยืนยันรับผู้โดยสาร
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
