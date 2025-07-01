
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const Login = () => {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth when Supabase is connected
    console.log('Google login clicked');
    // For now, redirect to map page for demo
    window.location.href = '/map';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">RMU Bus Navigator</CardTitle>
          <CardDescription className="text-gray-600">
            ระบบติดตามรถบัสมหาวิทยาลัยราชภัฏมหาสารคาม
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg"
          >
            เข้าสู่ระบบด้วย Google
          </Button>
          <p className="text-xs text-gray-500 text-center">
            โดยการเข้าสู่ระบบ คุณยอมรับเงื่อนไขการใช้งาน
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
