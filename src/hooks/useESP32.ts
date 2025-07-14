
import { useState, useEffect } from 'react';
import { esp32Service } from '@/services/esp32Service';

interface ESP32Data {
  busId: number;
  lat: number;
  lng: number;
  status: string;
  passengers: number;
  speed: number;
  batteryLevel: number;
}

export const useESP32 = () => {
  const [esp32Data, setESP32Data] = useState<ESP32Data | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to ESP32
    esp32Service.connect();
    setIsConnected(true);

    // Subscribe to data updates
    const unsubscribe = esp32Service.subscribe((data) => {
      setESP32Data(data);
    });

    return () => {
      unsubscribe();
      esp32Service.disconnect();
      setIsConnected(false);
    };
  }, []);

  const sendCommand = (command: string) => {
    esp32Service.sendCommand(command);
  };

  return {
    esp32Data,
    isConnected,
    sendCommand,
  };
};
