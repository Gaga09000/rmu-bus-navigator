
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/map`
          }
        });

        if (error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "สมัครสมาชิกสำเร็จ",
            description: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี"
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
            variant: "destructive"
          });
        } else {
          navigate('/map');
        }
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 p-4 bg-blue-600 rounded-full w-fit shadow-lg">
              <div className="flex items-center justify-center space-x-1">
                <Bus className="h-6 w-6 text-white" />
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              ระบบติดตามรถบัส RMU
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm leading-relaxed">
              มหาวิทยาลัยราชภัฏมหาสารคาม
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@rmu.ac.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? "กำลังดำเนินการ..." : (isSignUp ? "สมัครสมาชิก" : "เข้าสู่ระบบ")}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`${!isSignUp ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
                >
                  เข้าสู่ระบบ
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`${isSignUp ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
                >
                  สมัครสมาชิก
                </button>
              </div>
              
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span>🚌 ติดตามรถแบบเรียลไทม์</span>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span>📍 ดู ETA และระยะทาง</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>มหาวิทยาลัยราชภัฏมหาสารคาม</p>
          <p>Rajabhat Maha Sarakham University</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
