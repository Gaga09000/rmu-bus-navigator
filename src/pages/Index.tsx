
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, MapPin, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            RMU Bus Navigator
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            ระบบติดตามรถบัสมหาวิทยาลัยราชภัฏมหาสารคาม
          </p>
          <Button 
            onClick={() => navigate("/login")}
            size="lg"
            className="text-lg px-8 py-3"
          >
            เข้าสู่ระบบ
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Bus className="mx-auto mb-4 h-12 w-12 text-primary" />
              <CardTitle>ผู้ใช้งาน</CardTitle>
              <CardDescription>
                ติดตามตำแหน่งรถบัสแบบเรียลไทม์
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/map")}
                variant="outline"
                className="w-full"
              >
                ดูแผนที่รถบัส
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
              <CardTitle>คนขับรถ</CardTitle>
              <CardDescription>
                จัดการเส้นทางและอัปเดตสถานะ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/driver")}
                variant="outline"
                className="w-full"
              >
                แดชบอร์ดคนขับ
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
              <CardTitle>ผู้ดูแลระบบ</CardTitle>
              <CardDescription>
                จัดการระบบและดูสถิติการใช้งาน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate("/admin")}
                variant="outline"
                className="w-full"
              >
                แดชบอร์ดแอดมิน
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">คุณสมบัติหลัก</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4">
              <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
              <h3 className="font-medium">ติดตามแบบเรียลไทม์</h3>
            </div>
            <div className="p-4">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-primary" />
              <h3 className="font-medium">แผนที่แบบ Interactive</h3>
            </div>
            <div className="p-4">
              <Bus className="mx-auto mb-2 h-8 w-8 text-primary" />
              <h3 className="font-medium">จัดการหลายเส้นทาง</h3>
            </div>
            <div className="p-4">
              <Shield className="mx-auto mb-2 h-8 w-8 text-primary" />
              <h3 className="font-medium">ระบบปลอดภัย</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
