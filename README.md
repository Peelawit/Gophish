# Test Auth - Gophish Integration

โปรเจคทดสอบความปลอดภัยของ user ที่ออกแบบมาเพื่อทำงานร่วมกับ Gophish phishing framework

## 🎯 วัตถุประสงค์

โปรเจคนี้ถูกสร้างขึ้นเพื่อ:
- ทดสอบความรู้เรื่องความปลอดภัยของ user
- จำลองการโจมตีแบบ credential harvesting
- ส่งค่า `rid` (Recipient ID) กลับไปยัง Gophish
- เรียนรู้เกี่ยวกับ phishing awareness และ security testing

## 🚀 การติดตั้ง

### 1. Clone โปรเจค
```bash
git clone <repository-url>
cd test-auth
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Environment Variables
```bash
cp env.example .env.local
```

แก้ไขไฟล์ `.env.local` ตามการตั้งค่าของคุณ:
```env
NEXT_PUBLIC_GOPHISH_ENABLED=true
GOPHISH_DOMAIN=https://your-gophish-domain.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. รัน Development Server
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## 🧪 การทดสอบ

### ทดสอบ API Endpoints
```bash
npm test
```

### ทดสอบด้วย URL Parameters
```
http://localhost:3000/auth?rid=test123
```

### ทดสอบใน Browser
1. เปิด Developer Tools (F12)
2. ไปที่ Network tab
3. กรอกข้อมูล login
4. ดู API calls ที่ส่งไปยัง `/api/gophish`

## 📋 การทำงาน

### 1. การรับ RID จาก URL
- ระบบจะตรวจสอบ parameter `rid` ใน URL
- ตรวจสอบความถูกต้องของ format
- บันทึก RID สำหรับส่งกลับไปยัง Gophish

### 2. การ Capture Credentials
- เมื่อ user กรอกข้อมูล login
- ระบบจะส่งข้อมูลไปยัง API endpoint
- ข้อมูลจะถูก validate และ log
- ส่ง response กลับไปยัง Gophish

### 3. การ Redirect
- หลังจากส่งข้อมูลสำเร็จ
- ระบบจะ redirect ไปยังหน้า success
- หน้า success จะปิดโดยอัตโนมัติหลังจาก 5 วินาที

## 🔧 การตั้งค่า Gophish

ดูรายละเอียดการตั้งค่าใน [GOPHISH_SETUP.md](./GOPHISH_SETUP.md)

### สรุปการตั้งค่า:
1. สร้าง Landing Page ใน Gophish
2. ตั้งค่า URL: `https://your-domain.com/auth?rid={{.RId}}`
3. เปิดใช้งาน Credential Capture
4. ตั้งค่า URL: `https://your-domain.com/api/gophish`
5. สร้าง Campaign และส่ง email

## 📁 โครงสร้างไฟล์

```
src/
├── app/
│   ├── api/gophish/route.js    # API endpoint สำหรับ Gophish
│   ├── auth/page.js            # หน้า login
│   ├── success/page.js         # หน้า success
│   └── layout.js               # Layout หลัก
├── components/auth/            # Components สำหรับ authentication
├── config/gophish.js          # Configuration สำหรับ Gophish
└── utils/gophish.js           # Utility functions
```

## 🔒 ความปลอดภัย

### หมายเหตุสำคัญ:
- ⚠️ โปรเจคนี้ใช้สำหรับการทดสอบความปลอดภัยเท่านั้น
- ⚠️ อย่าใช้กับข้อมูลจริงหรือ production environment
- ⚠️ ตรวจสอบให้แน่ใจว่าได้รับอนุญาตก่อนทำการทดสอบ
- ⚠️ ลบข้อมูลที่ capture หลังจากทดสอบเสร็จ

### การป้องกัน:
- ✅ ใช้ HTTPS เท่านั้น
- ✅ จำกัดการเข้าถึง API endpoints
- ✅ Logging และ monitoring
- ✅ Rate limiting
- ✅ Input validation

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย:

1. **CORS Error**
   - ตรวจสอบ domain settings ใน Gophish
   - ตรวจสอบ CORS configuration

2. **404 Error**
   - ตรวจสอบ URL path และ routing
   - ตรวจสอบ Next.js configuration

3. **Network Error**
   - ตรวจสอบ firewall และ network settings
   - ตรวจสอบ server logs

### Debug:
- เปิด Developer Tools ใน browser
- ตรวจสอบ Network tab
- ดู Console logs
- ตรวจสอบ Server logs

## 📝 License

โปรเจคนี้ใช้สำหรับการศึกษาและทดสอบความปลอดภัยเท่านั้น

## 🤝 Contributing

หากพบปัญหา或有ข้อเสนอแนะ กรุณาสร้าง issue หรือ pull request

---

**⚠️ คำเตือน: โปรเจคนี้ใช้สำหรับการทดสอบความปลอดภัยเท่านั้น อย่าใช้กับข้อมูลจริง**
