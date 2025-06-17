# การตั้งค่าโปรเจค Test Auth กับ Gophish

## ภาพรวม
โปรเจคนี้ถูกออกแบบมาเพื่อทดสอบความปลอดภัยของ user โดยใช้ Gophish phishing framework เพื่อจำลองการโจมตีแบบ credential harvesting

## การทำงาน
1. Gophish ส่ง email ที่มี link มาหา target
2. Link จะมี parameter `rid` (Recipient ID) ที่ Gophish ใช้ติดตาม target
3. เมื่อ user คลิก link และกรอกข้อมูล login ระบบจะส่งข้อมูลกลับไปยัง Gophish
4. ข้อมูลจะถูกบันทึกใน Gophish dashboard

## การตั้งค่า Gophish

### 1. สร้าง Landing Page ใน Gophish
- ไปที่ Gophish Admin Panel
- สร้าง Landing Page ใหม่
- ตั้งค่า URL เป็น: `https://your-domain.com/auth?rid={{.RId}}`
- ใช้ HTML template ที่ redirect ไปยังหน้า login ของเรา

### 2. ตั้งค่า Credential Capture
- ใน Landing Page settings
- เปิดใช้งาน "Capture Credentials"
- ตั้งค่า URL เป็น: `https://your-domain.com/api/gophish`
- Method: POST
- ข้อมูลที่จะส่ง:
  - `email`: email ที่ user กรอก
  - `password`: password ที่ user กรอก
  - `rid`: recipient ID จาก URL parameter

### 3. สร้าง Campaign
- สร้าง Campaign ใหม่
- เลือก Landing Page ที่สร้างไว้
- ตั้งค่า Email Template
- เพิ่ม target users

## การทดสอบ

### 1. ทดสอบใน Local Environment
```bash
npm run dev
```

### 2. ทดสอบ URL
```
http://localhost:3000/auth?rid=test123
```

### 3. ตรวจสอบ Logs
ดู console logs ใน browser และ server logs เพื่อตรวจสอบการทำงาน

## API Endpoints

### POST /api/gophish
รับข้อมูล credentials จาก Gophish

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "rid": "recipient_id_from_gophish"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Credentials captured successfully",
  "rid": "recipient_id_from_gophish"
}
```

## การ Deploy

### 1. Deploy ไปยัง Production
```bash
npm run build
npm start
```

### 2. ตั้งค่า Environment Variables
- `NEXT_PUBLIC_BASE_URL`: URL ของ production server
- `GOPHISH_WEBHOOK_URL`: URL ของ Gophish webhook (ถ้ามี)

### 3. ตั้งค่า Domain
- เปลี่ยน URL ใน Gophish settings ให้ชี้ไปยัง production domain
- ตรวจสอบ SSL certificate

## ความปลอดภัย

### หมายเหตุสำคัญ:
- โปรเจคนี้ใช้สำหรับการทดสอบความปลอดภัยเท่านั้น
- อย่าใช้กับข้อมูลจริงหรือ production environment
- ตรวจสอบให้แน่ใจว่าได้รับอนุญาตก่อนทำการทดสอบ
- ลบข้อมูลที่ capture หลังจากทดสอบเสร็จ

### การป้องกัน:
- ใช้ HTTPS เท่านั้น
- จำกัดการเข้าถึง API endpoints
- Logging และ monitoring
- Rate limiting

## การแก้ไขปัญหา

### ปัญหาที่พบบ่อย:
1. **CORS Error**: ตรวจสอบ domain settings ใน Gophish
2. **404 Error**: ตรวจสอบ URL path และ routing
3. **Network Error**: ตรวจสอบ firewall และ network settings

### Debug:
- เปิด Developer Tools ใน browser
- ตรวจสอบ Network tab
- ดู Console logs
- ตรวจสอบ Server logs 