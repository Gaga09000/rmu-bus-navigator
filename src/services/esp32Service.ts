
interface ESP32Data {
  busId: number;
  lat: number;
  lng: number;
  status: string;
  passengers: number;
  speed: number;
  batteryLevel: number;
}

class ESP32Service {
  private ws: WebSocket | null = null;
  private reconnectInterval: number = 5000;
  private listeners: ((data: ESP32Data) => void)[] = [];

  connect() {
    // For development, we'll use a local WebSocket server
    // In production, you might want to use your actual ESP32 IP
    const wsUrl = 'ws://192.168.1.100:81'; // Change this to your ESP32 IP
    
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('Connected to ESP32');
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data: ESP32Data = JSON.parse(event.data);
          console.log('Received ESP32 data:', data);
          this.notifyListeners(data);
        } catch (error) {
          console.error('Error parsing ESP32 data:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('ESP32 connection closed, attempting to reconnect...');
        setTimeout(() => this.connect(), this.reconnectInterval);
      };
      
      this.ws.onerror = (error) => {
        console.error('ESP32 WebSocket error:', error);
      };
      
    } catch (error) {
      console.error('Failed to connect to ESP32:', error);
      // Fallback to mock data for development
      this.startMockData();
    }
  }

  private startMockData() {
    // Mock data for development when ESP32 is not available
    setInterval(() => {
      const mockData: ESP32Data = {
        busId: 1,
        lat: 16.4325 + (Math.random() - 0.5) * 0.001,
        lng: 103.3660 + (Math.random() - 0.5) * 0.001,
        status: Math.random() > 0.7 ? 'รอผู้โดยสาร' : 'กำลังวิ่ง',
        passengers: Math.floor(Math.random() * 25) + 5,
        speed: Math.floor(Math.random() * 40) + 10,
        batteryLevel: Math.floor(Math.random() * 30) + 70,
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
      this.ws.send(JSON.stringify({ command }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const esp32Service = new ESP32Service();
