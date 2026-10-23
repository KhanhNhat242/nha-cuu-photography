# Nhà Cừu Photography — Website (Phiếu Dev 43)

Website giới thiệu và đặt lịch chụp cho studio Nhà Cừu Photography (Thủ Đức · Gò Vấp, TP.HCM).

- **Yêu cầu dự án:** [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md). Đây là nguồn sự thật duy nhất.
- **Quy tắc làm việc:** [AGENTS.md](AGENTS.md), mục R1–R9. Đọc trước khi sửa code.

## Chạy dự án

```bash
npm install
cp .env.example .env.local   # điền NEXT_PUBLIC_SITE_URL khi deploy
npm run dev                  # http://localhost:3000
```

## Kiểm tra trước khi bàn giao (R9)

```bash
npm run lint
npm run build
```

## Công nghệ

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · antd 6.
