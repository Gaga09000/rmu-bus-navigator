
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            ไม่พบหน้าที่ต้องการ
          </h2>
          <p className="text-muted-foreground mb-6">
            หน้าที่คุณกำลังมองหาไม่มีอยู่ หรืออาจถูกย้ายไปแล้ว
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            เส้นทาง: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            กลับหน้าเดิม
          </Button>
          <Button onClick={handleGoHome} className="flex items-center gap-2">
            <Home size={16} />
            กลับหน้าหลัก
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            หากปัญหายังคงอยู่ โปรดติดต่อ{" "}
            <a 
              href="mailto:support@rmu.ac.th" 
              className="text-primary hover:underline"
            >
              support@rmu.ac.th
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
