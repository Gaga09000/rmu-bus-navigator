
# วิธีสร้างไฟล์ APK สำหรับ RMU Bus Navigator

## 🚀 **ขั้นตอนการสร้าง APK**

### **เตรียมเครื่องมือ**
1. ติดตั้ง **Android Studio** บนคอมพิวเตอร์
2. ติดตั้ง **Node.js** เวอร์ชันล่าสุด
3. ติดตั้ง **Git**

### **ขั้นตอนที่ 1: Export โปรเจ็กต์ไป GitHub**
1. กดปุ่ม **"Export to Github"** ใน Lovable
2. Clone โปรเจ็กต์มาที่เครื่องคุณ:
   ```bash
   git clone [YOUR_GITHUB_REPO_URL]
   cd [YOUR_PROJECT_NAME]
   ```

### **ขั้นตอนที่ 2: ติดตั้ง Dependencies**
```bash
npm install
```

### **ขั้นตอนที่ 3: เพิ่ม Android Platform**
```bash
npx cap add android
```

### **ขั้นตอนที่ 4: Build โปรเจ็กต์**
```bash
npm run build
npx cap sync
```

### **ขั้นตอนที่ 5: เปิด Android Studio**
```bash
npx cap open android
```

### **ขั้นตอนที่ 6: สร้าง APK ใน Android Studio**
1. **Android Studio จะเปิดขึ้นมา**
2. **รอให้ Gradle sync เสร็จ** (อาจใช้เวลา 5-10 นาที)
3. **เลือก Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. **รอให้ build เสร็จ**
5. **กด "locate" เมื่อเสร็จ** จะเปิด folder ที่มีไฟล์ APK

### **ขั้นตอนที่ 7: ติดตั้ง APK**
1. **Copy ไฟล์ APK** ไปยังมือถือ Android
2. **เปิดใช้งาน "Unknown Sources"** ในการตั้งค่า:
   - Settings > Security > Unknown Sources
   - หรือ Settings > Apps > Special Access > Install Unknown Apps
3. **กดไฟล์ APK เพื่อติดตั้ง**

---

## 📱 **ข้อกำหนดระบบ**

### **สำหรับการพัฒนา:**
- **Windows 10/11** หรือ **macOS** หรือ **Linux**
- **Android Studio** เวอร์ชันล่าสุด
- **Java Development Kit (JDK) 17+**
- **Android SDK** (ติดตั้งผ่าน Android Studio)

### **สำหรับการใช้งาน:**
- **Android 7.0** (API Level 24) ขึ้นไป
- **RAM 2GB** ขึ้นไป
- **พื้นที่ว่าง 50MB**
- **GPS** และ **Internet**

---

## 🔧 **การแก้ไขปัญหาที่พบบ่อย**

### **❌ Gradle Sync Failed**
**วิธีแก้:**
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

### **❌ SDK Not Found**
**วิธีแก้:**
1. เปิด Android Studio
2. Tools > SDK Manager
3. ติดตั้ง Android SDK ที่จำเป็น

### **❌ Build Failed**
**วิธีแก้:**
```bash
npm run build
npx cap copy
npx cap sync
```

### **❌ APK ไม่สามารถติดตั้งได้**
**วิธีแก้:**
- ตรวจสอบว่าเปิด "Unknown Sources" แล้ว
- ลบแอปเวอร์ชันเก่าก่อน (ถ้ามี)
- ตรวจสอบพื้นที่ว่างในมือถือ

---

## 🚀 **การอัปเดตแอป**

เมื่อมีการแก้ไขโค้ด:
```bash
git pull origin main
npm install
npm run build
npx cap sync
```

จากนั้นทำขั้นตอน Build APK ใหม่

---

## 📞 **ติดต่อสนับสนุน**

หากมีปัญหา:
- **Email**: support@rmu.ac.th
- **โทร**: 043-754321
- **เว็บไซต์**: https://www.rmu.ac.th

---

**หมายเหตุ**: 
- การสร้าง APK ครั้งแรกอาจใช้เวลานาน เนื่องจากต้อง download dependencies
- แนะนำให้ใช้ **WiFi** เพื่อความเร็วในการ download
- APK ที่สร้างขึ้นจะเป็น **Debug Version** เหมาะสำหรับทดสอบ

*อัปเดต: มกราคม 2025*
