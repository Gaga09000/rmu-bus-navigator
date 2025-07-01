
# วิธีการติดตั้งแอป RMU Bus Navigator บนมือถือ

## การติดตั้งบน iOS (iPhone/iPad)

### วิธีที่ 1: ผ่าน Safari (PWA - แนะนำ)
1. เปิด Safari บน iPhone/iPad
2. ไปที่ URL: `https://4cef032f-8ca7-447d-b9c2-0deffb5abbec.lovableproject.com`
3. คลิกปุ่ม "Share" (ไอคอนสี่เหลี่ยมที่มีลูกศรชี้ขึ้น) ที่ด้านล่างของหน้าจอ
4. เลื่อนลงและเลือก "Add to Home Screen"
5. ตั้งชื่อแอป (เช่น "RMU Bus") และคลิก "Add"
6. แอปจะปรากฏบน Home Screen และสามารถใช้งานได้เหมือนแอปปกติ

### วิธีที่ 2: ผ่าน Capacitor (ต้องมี Mac + Xcode)
1. Clone project จาก GitHub
2. ติดตั้ง dependencies: `npm install`
3. Build project: `npm run build`
4. เพิ่ม iOS platform: `npx cap add ios`
5. Sync กับ native platform: `npx cap sync`
6. เปิดใน Xcode: `npx cap open ios`
7. เชื่อมต่อ iPhone และ Run จาก Xcode

## การติดตั้งบน Android

### วิธีที่ 1: ผ่าน Chrome (PWA - แนะนำ)
1. เปิด Chrome บน Android
2. ไปที่ URL: `https://4cef032f-8ca7-447d-b9c2-0deffb5abbec.lovableproject.com`
3. คลิกเมนู (3 จุด) ที่มุมขวาบน
4. เลือก "Add to Home screen" หรือ "Install app"
5. ตั้งชื่อแอป (เช่น "RMU Bus") และคลิก "Add"
6. แอปจะปรากฏบน Home Screen

### วิธีที่ 2: ผ่าน Capacitor (ต้องมี Android Studio)
1. Clone project จาก GitHub
2. ติดตั้ง dependencies: `npm install`
3. Build project: `npm run build`
4. เพิ่ม Android platform: `npx cap add android`
5. Sync กับ native platform: `npx cap sync`
6. เปิดใน Android Studio: `npx cap open android`
7. เชื่อมต่อ Android device และ Run จาก Android Studio

## ข้อกำหนดระบบ

### iOS
- iOS 12.0 หรือใหม่กว่า
- Safari สำหรับ PWA
- iPhone/iPad ที่รองรับ

### Android  
- Android 7.0 (API level 24) หรือใหม่กว่า
- Chrome browser สำหรับ PWA
- อุปกรณ์ที่รองรับ GPS

## คุณสมบัติที่ต้องการอนุญาต

1. **Location/GPS**: สำหรับติดตามตำแหน่งผู้ใช้และรถบัส
2. **Notifications**: สำหรับแจ้งเตือนเมื่อรถมาถึงใกล้
3. **Camera** (ตัวเลือก): สำหรับสแกน QR Code ถ้ามี

## การแก้ไขปัญหาเบื้องต้น

### แอปไม่สามารถเข้าถึงตำแหน่งได้
1. ไป Settings > Privacy & Security > Location Services
2. เปิดใช้งาน Location Services สำหรับ Browser หรือแอป
3. เลือก "While Using App" หรือ "Always"

### แอปไม่แสดงการแจ้งเตือน
1. ไป Settings > Notifications
2. หาแอป RMU Bus หรือ Browser ที่ใช้
3. เปิดใช้งาน Notifications

### แอปโหลดช้าหรือไม่แสดงผล
1. ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
2. ลองรีเฟรชหน้าเว็บ
3. เคลียร์ cache ของ browser

## การอัปเดตแอป

### PWA (วิธีแนะนำ)
- แอปจะอัปเดตอัตโนมัติเมื่อมีการเปลี่ยนแปลง
- สามารถปิด/เปิดแอปใหม่เพื่อให้อัปเดตมีผล

### Capacitor
- ต้อง build และ deploy version ใหม่ผ่าน App Store/Play Store

## ติดต่อสนับสนุน

หากมีปัญหาในการติดตั้งหรือใช้งาน กรุณาติดต่อ:
- Email: support@rmu.ac.th
- โทร: 043-754321
- Line: @rmubus

---

**หมายเหตุ**: PWA (Progressive Web App) เป็นวิธีที่แนะนำเนื่องจากติดตั้งง่าย อัปเดตอัตโนมัติ และไม่ต้องผ่าน App Store
