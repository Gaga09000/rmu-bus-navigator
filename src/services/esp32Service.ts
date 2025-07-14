
interface ESP32Data {
  busId: number;
  lat: number;
  lng: number;
  status: string;
  passengers: number;
  speed: number;
  batteryLevel: number;
  gpsValid?: boolean;
  timestamp?: number;
}

class ESP32Service {
  private ws: WebSocket | null = null;
  private reconnectInterval: number = 5000;
  private listeners: ((data: ESP32Data) => void)[] = [];
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect() {
    // เปลี่ยน IP address นี้เป็น IP ของ ESP32 ของคุณ
    const wsUrl = 'ws://192.168.1.100:81'; // แก้ไข IP address ตรงนี้
    
    try {
      console.log('กำลังเชื่อมต่อ ESP32 ที่:', wsUrl);
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('เชื่อมต่อ ESP32 สำเร็จ!');
        this.reconnectAttempts = 0;
        
        // ส่งคำสั่งขอข้อมูล
        this.sendCommand('get_data');
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data: ESP32Data = JSON.parse(event.data);
          console.log('รับข้อมูลจาก ESP32:', data);
          this.notifyListeners(data);
        } catch (error) {
          console.error('Error parsing ESP32 data:', error);
        }
      };
      
      this.ws.onclose = (event) => {
        console.log('การเชื่อมต่อ ESP32 ปิด:', event.reason);
        
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`พยายามเชื่อมต่อใหม่ครั้งที่ ${this.reconnectAttempts}...`);
          setTimeout(() => this.connect(), this.reconnectInterval);
        } else {
          console.log('ไม่สามารถเชื่อมต่อ ESP32 ได้ เปลี่ยนเป็นโหมดจำลอง');
          this.startMockData();
        }
      };
      
      this.ws.onerror = (error) => {
        console.error('ESP32 WebSocket error:', error);
      };
      
    } catch (error) {
      console.error('ไม่สามารถเชื่อมต่อ ESP32:', error);
      this.startMockData();
    }
  }

  private startMockData() {
    console.log('เริ่มโหมดจำลองข้อมูล ESP32');
    
    // ข้อมูลจำลองสำหรับการพัฒนาเมื่อ ESP32 ไม่พร้อมใช้งาน
    setInterval(() => {
      const mockData: ESP32Data = {
        busId: 1,
        lat: 16.4325 + (Math.random() - 0.5) * 0.001,
        lng: 103.3660 + (Math.random() - 0.5) * 0.001,
        status: Math.random() > 0.7 ? 'รอผู้โดยสาร' : 'กำลังวิ่ง',
        passengers: Math.floor(Math.random() * 25) + 5,
        speed: Math.floor(Math.random() * 40) + 10,
        batteryLevel: Math.floor(Math.random() * 30) + 70,
        gpsValid: true,
        timestamp: Date.now(),
      };
      this.notifyListeners(mockData);
    }, 3000);
  }

  subscribe(callback: (data: ESP32Data) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(data: ESP32Data) {
    this.listeners.forEach(listener => listener(data));
  }

  sendCommand(command: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const commandData = { command };
      this.ws.send(JSON.stringify(commandData));
      console.log('ส่งคำสั่งไป ESP32:', command);
    } else {
      console.log('ESP32 ไม่ได้เชื่อมต่อ ไม่สามารถส่งคำสั่งได้:', command);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // เพิ่มเมธอดสำหรับส่งคำสั่งพิเศษ
  emergencyAlert() {
    this.sendCommand('emergency');
  }

  resetBusData() {
    this.sendCommand('reset');
  }
}

export const esp32Service = new ESP32Service();
