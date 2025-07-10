
# วิธีสร้างไฟล์ APK สำหรับ RMU Bus Navigator

## 🚀 **ขั้นตอนการสร้าง APK แบบละเอียด**

### **💻 เตรียมเครื่องมือ (ต้องทำก่อน)**
1. **ติดตั้ง Android Studio**
   - ดาวน์โหลดจาก: https://developer.android.com/studio
   - เลือกเวอร์ชันล่าสุด (แนะนำ: Koala หรือใหม่กว่า)
   - ติดตั้งตามขั้นตอนปกติ

2. **ติดตั้ง Node.js**
   - ดาวน์โหลดจาก: https://nodejs.org
   - เลือกเวอร์ชัน LTS (Long Term Support)
   - ติดตั้งและตรวจสอบด้วยคำสั่ง: `node --version`

3. **ติดตั้ง Git**
   - ดาวน์โหลดจาก: https://git-scm.com
   - ติดตั้งและตรวจสอบด้วยคำสั่ง: `git --version`

4. **ติดตั้ง Java Development Kit (JDK)**
   - ดาวน์โหลด JDK 17 จาก: https://adoptium.net
   - ตั้งค่า JAVA_HOME environment variable

---

## 📱 **ขั้นตอนที่ 1: Export และ Clone โปรเจ็กต์**

### **1.1 Export จาก Lovable**
1. **กดปุ่ม "Export to Github"** ใน Lovable (มุมขวาบน)
2. **เชื่อมต่อ GitHub account** (ถ้ายังไม่ได้เชื่อมต่อ)
3. **ตั้งชื่อ Repository** เช่น "rmu-bus-navigator"
4. **กด Export** และรอให้เสร็จ

### **1.2 Clone โปรเจ็กต์**
เปิด Command Prompt หรือ Terminal แล้วพิมพ์:
```bash
git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
cd [YOUR_REPO_NAME]
```
**ตัวอย่าง:**
```bash
git clone https://github.com/john123/rmu-bus-navigator.git
cd rmu-bus-navigator
```

---

## 🔧 **ขั้นตอนที่ 2: ติดตั้ง Dependencies**

### **2.1 ติดตั้ง NPM Packages**
```bash
npm install
```
**รอให้เสร็จ** (อาจใช้เวลา 5-10 นาที)

### **2.2 ติดตั้ง Capacitor CLI (ถ้ายังไม่มี)**
```bash
npm install -g @capacitor/cli
```

### **2.3 เพิ่ม Android Platform**
```bash
npx cap add android
```

---

## 🏗️ **ขั้นตอนที่ 3: Build และ Sync โปรเจ็กต์**

### **3.1 Build โปรเจ็กต์**
```bash
npm run build
```

### **3.2 Sync กับ Capacitor**
```bash
npx cap sync android
```

### **3.3 Copy Assets**
```bash
npx cap copy android
```

---

## 🛠️ **ขั้นตอนที่ 4: เปิด Android Studio และ Build APK**

### **4.1 เปิด Android Studio**
```bash
npx cap open android
```
**Android Studio จะเปิดขึ้นมา**

### **4.2 รอให้ Gradle Sync เสร็จ**
- **รอให้ Progress Bar** ที่ด้านล่างจอเสร็จ
- **อาจใช้เวลา 10-20 นาที** ในครั้งแรก
- **ห้ามปิด Android Studio** ระหว่างนี้

### **4.3 Configure Signing (สำคัญ!)**
1. **เปิดไฟล์**: `android/app/build.gradle`
2. **เพิ่มโค้ดนี้** ในส่วน `android { ... }`:
```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
}
```

### **4.4 สร้าง APK**
1. **ไปที่เมนู**: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. **รอให้ Build เสร็จ** (5-15 นาที)
3. **เมื่อเสร็จแล้ว** จะมี notification ที่ด้านล่าง
4. **กด "locate"** เพื่อเปิด folder ที่มีไฟล์ APK

### **4.5 หาไฟล์ APK**
ไฟล์ APK จะอยู่ที่:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📲 **ขั้นตอนที่ 5: ติดตั้ง APK บนมือถือ**

### **5.1 เตรียมไฟล์ APK**
1. **Copy ไฟล์ APK** ไปยังมือถือ Android
   - ใช้ USB Cable
   - หรือส่งผ่าน Google Drive / Line / Email
   - หรือใช้ ADB: `adb install app-debug.apk`

### **5.2 เปิดใช้งาน "Unknown Sources"**

#### **สำหรับ Android 8.0 ขึ้นไป:**
1. **Settings** → **Apps & notifications** → **Special app access**
2. **Install unknown apps**
3. **เลือกแอปที่จะใช้ติดตั้ง** (เช่น File Manager)
4. **เปิด "Allow from this source"**

#### **สำหรับ Android 7.1 ลงมา:**
1. **Settings** → **Security**
2. **เปิด "Unknown sources"**
3. **กด OK** เมื่อมีคำเตือน

### **5.3 ติดตั้งแอป**
1. **เปิด File Manager** บนมือถือ
2. **หาไฟล์ APK** ที่ copy มา
3. **กดไฟล์ APK**
4. **กด "Install"**
5. **รอให้ติดตั้งเสร็จ**
6. **กด "Open"** เพื่อเปิดแอป

---

## ⚙️ **การตั้งค่าแอปหลังติดตั้ง**

### **🌍 อนุญาตให้เข้าถึงตำแหน่ง (จำเป็น!)**
1. **เปิดแอป RMU Bus Navigator**
2. **กด "Allow"** เมื่อแอปขอสิทธิ์เข้าถึงตำแหน่ง
3. **เลือก "While using app"**

### **🔔 อนุญาตการแจ้งเตือน**
1. **กด "Allow"** เมื่อแอปขอสิทธิ์แจ้งเตือน
2. **ตั้งค่าเพิ่มเติมใน Settings** ถ้าต้องการ

---

## 🔧 **การแก้ไขปัญหาที่พบบ่อย**

### **❌ Gradle Sync Failed**
**สาเหตุ:** Dependencies ไม่ตรงกัน
**วิธีแก้:**
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### **❌ SDK Not Found**
**สาเหตุ:** ไม่ได้ติดตั้ง Android SDK
**วิธีแก้:**
1. **เปิด Android Studio**
2. **Tools** → **SDK Manager**
3. **ติดตั้ง Android SDK** ล่าสุด
4. **ติดตั้ง Build Tools** เวอร์ชันล่าสุด

### **❌ Build Failed - Missing Dependencies**
**วิธีแก้:**
```bash
npm run build
npx cap copy android
npx cap sync android
```

### **❌ APK ไม่สามารถติดตั้งได้**
**สาเหตุและวิธีแก้:**
- **ไม่ได้เปิด Unknown Sources** → เปิดใหม่
- **มีแอปเวอร์ชันเก่า** → ลบแอปเก่าก่อน
- **พื้นที่ไม่พอ** → ลบไฟล์ที่ไม่ใช้
- **ไฟล์ APK เสียหาย** → Build ใหม่

### **❌ แอปไม่เปิด / Crash**
**วิธีแก้:**
1. **ลบแอป** และ**ติดตั้งใหม่**
2. **ตรวจสอบสิทธิ์** Location และ Notification
3. **Build แบบ Release** แทน Debug

---

## 🚀 **การสร้าง Release APK (สำหรับ Production)**

### **6.1 สร้าง Keystore (ครั้งแรกเท่านั้น)**
```bash
keytool -genkey -v -keystore rmu-bus-release-key.keystore -alias rmu-bus -keyalg RSA -keysize 2048 -validity 10000
```

### **6.2 Configure Release Signing**
เพิ่มใน `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file('../../rmu-bus-release-key.keystore')
        storePassword 'YOUR_STORE_PASSWORD'
        keyAlias 'rmu-bus'
        keyPassword 'YOUR_KEY_PASSWORD'
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### **6.3 Build Release APK**
```bash
cd android
./gradlew assembleRelease
cd ..
```

ไฟล์จะอยู่ที่: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔄 **การอัปเดตแอป**

### **เมื่อมีการแก้ไขโค้ด:**
```bash
git pull origin main
npm install
npm run build
npx cap sync android
```

จากนั้น **Build APK ใหม่** ตามขั้นตอนข้างต้น

### **การอัปเดตผ่าน Play Store (ในอนาคต):**
1. **สร้าง Release APK**
2. **อัปโหลดไปยัง Google Play Console**
3. **ผู้ใช้จะได้รับการอัปเดตอัตโนมัติ**

---

## 📊 **ขนาดไฟล์และข้อกำหนดระบบ**

### **ขนาดไฟล์ APK:**
- **Debug Version**: 15-25 MB
- **Release Version**: 8-15 MB

### **ข้อกำหนดระบบสำหรับการพัฒนา:**
- **RAM**: 8GB ขึ้นไป
- **Storage**: 10GB ว่าง
- **OS**: Windows 10/11, macOS 10.14+, Ubuntu 18.04+

### **ข้อกำหนดสำหรับมือถือผู้ใช้:**
- **Android**: 7.0 (API Level 24) ขึ้นไป
- **RAM**: 2GB ขึ้นไป
- **Storage**: 50MB ว่าง
- **GPS และ Internet**: จำเป็น

---

## 🎯 **เทคนิคและข้อแนะนำ**

### **🚀 เพิ่มความเร็วในการ Build:**
1. **เพิ่ม RAM สำหรับ Gradle**:
   สร้างไฟล์ `android/gradle.properties`:
   ```
   org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
   org.gradle.parallel=true
   org.gradle.daemon=true
   ```

2. **ใช้ Build Cache**:
   ```bash
   ./gradlew build --build-cache
   ```

### **🔍 การ Debug แอป:**
```bash
# ดู Log แบบ Real-time
adb logcat | grep RMU

# Install และเปิดแอปทันที
adb install app-debug.apk && adb shell am start -n app.lovable.4cef032f8ca7447db9c20deffb5abbec/.MainActivity
```

### **📱 ทดสอบบนหลาย Device:**
```bash
# ดูรายการ Device ที่เชื่อมต่อ
adb devices

# ติดตั้งบน Device เฉพาะ
adb -s [DEVICE_ID] install app-debug.apk
```

---

## 🆘 **การขอความช่วยเหลือ**

### **📞 ช่องทางติดต่อ:**
- **Email**: support@rmu.ac.th
- **โทร**: 043-754321 ต่อ 1234
- **Line**: @rmubus
- **GitHub Issues**: สำหรับปัญหาทางเทคนิค

### **📚 แหล่งความรู้เพิ่มเติม:**
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Developer**: https://developer.android.com
- **Lovable Documentation**: https://docs.lovable.dev

---

## ✅ **Checklist สำหรับการ Build APK**

### **เตรียมความพร้อม:**
- [ ] ติดตั้ง Android Studio แล้ว
- [ ] ติดตั้ง Node.js แล้ว
- [ ] ติดตั้ง Git แล้ว
- [ ] Export โปรเจ็กต์จาก Lovable แล้ว

### **Build Process:**
- [ ] Clone โปรเจ็กต์เรียบร้อย
- [ ] `npm install` เสร็จแล้ว
- [ ] `npx cap add android` เสร็จแล้ว
- [ ] `npm run build` เสร็จแล้ว
- [ ] `npx cap sync android` เสร็จแล้ว
- [ ] Gradle sync เสร็จแล้ว
- [ ] Build APK เสร็จแล้ว

### **ติดตั้งและทดสอบ:**
- [ ] Copy APK ไปยังมือถือแล้ว
- [ ] เปิด Unknown Sources แล้ว
- [ ] ติดตั้งแอปเรียบร้อย
- [ ] อนุญาตสิทธิ์ Location แล้ว
- [ ] อนุญาตสิทธิ์ Notification แล้ว
- [ ] ทดสอบการใช้งานเรียบร้อย

---

**หมายเหตุสำคัญ:**
- การ Build APK ครั้งแรกจะใช้เวลานาน เนื่องจากต้อง Download Dependencies มากมาย
- แนะนำให้ใช้ **WiFi** และมี**พื้นที่ว่างเพียงพอ**
- APK ที่สร้างเป็น **Debug Version** เหมาะสำหรับทดสอบเท่านั้น
- สำหรับ Production ให้ใช้ **Release APK** แทน

---

*คู่มือนี้อัปเดตล่าสุด: มกราคม 2025*
*เวอร์ชัน: 2.0 - มีรายละเอียดครบถ้วน*
