# การ Deploy บน Vercel

## วิธีที่ 1: ใช้ Vercel CLI

### 1. ติดตั้ง Vercel CLI
```bash
npm install -g vercel
```

### 2. Login และ Deploy
```bash
vercel login
vercel
```

### 3. ตั้งค่า Environment Variables
```bash
vercel env add NEXT_PUBLIC_GOPHISH_ENABLED
vercel env add GOPHISH_DOMAIN
vercel env add NEXT_PUBLIC_BASE_URL
```

## วิธีที่ 2: ใช้ GitHub + Vercel Dashboard

### 1. Push โปรเจคไปยัง GitHub
```bash
git add .
git commit -m "Add Gophish integration"
git push origin main
```

### 2. เชื่อมต่อกับ Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "New Project"
3. เลือก GitHub repository
4. ตั้งค่า Environment Variables

### 3. ตั้งค่า Environment Variables ใน Vercel Dashboard

ไปที่ Project Settings → Environment Variables และเพิ่ม:

```env
NEXT_PUBLIC_GOPHISH_ENABLED=true
GOPHISH_DOMAIN=https://your-gophish-domain.com
NEXT_PUBLIC_BASE_URL=https://your-vercel-app.vercel.app
CORS_ALLOWED_ORIGINS=https://your-gophish-domain.com
```

## การตั้งค่าใน Gophish

หลังจากได้ Vercel URL แล้ว ให้อัปเดตการตั้งค่าใน Gophish:

### Landing Page URL:
```
https://your-vercel-app.vercel.app/auth?rid={{.RId}}
```

### Credential Capture URL:
```
https://your-vercel-app.vercel.app/api/gophish
```

## การทดสอบ

### 1. ทดสอบ URL
```
https://your-vercel-app.vercel.app/auth?rid=test123
```

### 2. ตรวจสอบ Logs
- ไปที่ Vercel Dashboard → Functions
- ดู logs ของ `/api/gophish` function

### 3. ทดสอบ API
```bash
curl -X POST https://your-vercel-app.vercel.app/api/gophish \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass","rid":"test123"}'
```

## การแก้ไขปัญหา

### 1. CORS Error
- ตรวจสอบ CORS_ALLOWED_ORIGINS ใน Environment Variables
- ตรวจสอบ vercel.json configuration

### 2. 403 Error
- ตรวจสอบ NEXT_PUBLIC_GOPHISH_ENABLED=true
- ตรวจสอบ Environment Variables

### 3. Build Error
- ตรวจสอบ package.json dependencies
- ตรวจสอบ Next.js configuration

## การอัปเดต

### 1. อัปเดตโค้ด
```bash
git add .
git commit -m "Update code"
git push origin main
```

### 2. Redeploy
```bash
vercel --prod
```

## ความปลอดภัย

### หมายเหตุสำคัญ:
- ⚠️ ใช้ HTTPS เท่านั้นใน production
- ⚠️ ตั้งค่า CORS_ALLOWED_ORIGINS ให้ถูกต้อง
- ⚠️ ตรวจสอบ Environment Variables
- ⚠️ ใช้ Vercel Analytics สำหรับ monitoring

### การป้องกัน:
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment-based settings
- ✅ Logging และ monitoring 