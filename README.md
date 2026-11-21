# Celestia Studio x Vivian — แบบสำรวจความคิดเห็น (Cloudflare Workers + D1)

เว็บไซต์แบบสำรวจความคิดเห็นและคำนวณค่าสถิติ (Mean & SD) สำหรับโครงการ **Vivian AI** ของ **Celestia Studio** รองรับการเก็บข้อมูลจริงบน **Cloudflare D1** ผ่าน **Cloudflare Workers + Static Assets**

## โครงสร้างโปรเจกต์
- `public/` — หน้าเว็บไซต์แบบสำรวจและแดชบอร์ดสถิติ (`index.html`, `styles.css`, `app.js`)
- `src/worker.js` — Cloudflare Worker API (`/api/health`, `/api/responses`, `/api/responses/demo`)
- `migrations/0001_init.sql` — สคีมาตาราง `survey_responses` สำหรับ Cloudflare D1
- `wrangler.jsonc` — การตั้งค่า Workers Static Assets และ D1 binding (`DB`)

## วิธี Deploy บน Cloudflare Account ของคุณ

1. **สร้างฐานข้อมูล D1 บน Cloudflare Dashboard**
   - ไปที่ **Storage & Databases → D1 SQL Database → Create**
   - ตั้งชื่อฐานข้อมูลเป็น `vivian-feedback-db` แล้วคัดลอก **Database ID** มาใส่ใน `wrangler.jsonc` ตรง `"database_id"`
2. **รัน Migration สร้างตาราง `survey_responses`**
   - ในหน้า D1 Console บน Dashboard เปิดไฟล์ `migrations/0001_init.sql` ไปรัน หรือรันผ่าน Wrangler จากเครื่องที่ล็อกอินบัญชีของคุณ:
     ```bash
     npx wrangler d1 migrations apply vivian-feedback-db --remote
     ```
3. **เชื่อมต่อ GitHub Repository กับ Cloudflare Workers**
   - ไปที่ **Workers & Pages → Create → Import a repository** เลือก `celestial-duck/vivianFeedback`
   - ตั้งค่า **Bindings** เพิ่ม D1 Database Binding ชื่อ `DB` เชื่อมกับ `vivian-feedback-db`
   - Deploy Command: `npx wrangler deploy` (หรือปล่อยค่าเริ่มต้นของ Workers)

> **หมายเหตุ:** หากเปิดหน้าเว็บโดยยังไม่ได้ผูก D1 (`DB`) ระบบจะสลับไปโหมด `Local Mode` (`localStorage`) ให้อัตโนมัติเพื่อให้ทดสอบหน้าฟอร์มได้ทันทีค่ะ
