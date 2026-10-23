<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# QUY TẮC DỰ ÁN — Website Nhà Cừu Photography (Phiếu Dev 43)

> Áp dụng cho **mọi** người và AI agent làm việc trong repo này. Mọi task (thêm trang, sửa giao diện, thêm chức năng, sửa nội dung) đều phải tuân theo các quy tắc dưới đây.
> Không sửa nội dung nằm giữa hai dòng `BEGIN/END:nextjs-agent-rules` ở trên. Khối đó do `next dev` tự quản lý. Quy tắc dự án chỉ viết từ đây trở xuống.

## R1. Nguồn sự thật

1. **[docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) là nguồn sự thật duy nhất** về phạm vi, nội dung, chức năng. **Đọc file này trước khi bắt đầu bất kỳ task nào.**
2. Khi có mâu thuẫn, ưu tiên theo thứ tự sau:
   1. Yêu cầu mới nhất của người dùng hoặc sale, phải đã được ghi vào Nhật ký thay đổi (mục 14).
   2. `docs/REQUIREMENTS.md`.
   3. File quy tắc này.
   4. Code hiện có.
3. Task yêu cầu thứ **không có trong REQUIREMENTS.md**, hoặc nằm trong mục "Ngoài phạm vi", thì **cập nhật REQUIREMENTS.md trước rồi mới code**. Phải thêm mã chức năng `F-xx` mới, ghi một dòng vào Nhật ký thay đổi, cập nhật sitemap (mục 7) và mô hình dữ liệu (mục 9) nếu bị ảnh hưởng.
4. Khi sale trả lời một câu hỏi ở mục 13, phải làm đủ ba việc. Sửa nội dung liên quan. Đổi nhãn `[CHỜ XÁC NHẬN]` hoặc `[GIẢ ĐỊNH]` thành `[GỐC]`. Gạch câu hỏi khỏi danh sách và ghi vào Nhật ký thay đổi.

## R2. Trung thực về nội dung (quan trọng nhất)

1. **Không bịa thông tin doanh nghiệp.** Không bịa giá, giờ mở cửa, số năm kinh nghiệm, số khách hàng, đánh giá sao, giải thưởng, tên nhiếp ảnh gia hay lời chứng thực khách hàng.
2. Dữ liệu thật **chỉ** gồm các mục có nhãn `[GỐC]` hoặc `[SUY RA]` trong REQUIREMENTS.md. Chép **đúng chính tả**:
   - Tên thương hiệu: **Nhà Cừu Photography**.
   - SĐT/Zalo: **098 582 09 92**.
   - Hai chi nhánh: **CN Thủ Đức** và **CN Gò Vấp**, giữ nguyên chú thích "phường Linh Tây cũ", "khu phố 56", "cạnh LOTTE Mart".
3. Mọi nội dung giả định phải nằm trong `data/*.ts` với cờ `placeholder: true`, hoặc có comment `// PLACEHOLDER: <lý do>`. Đồng thời phải được liệt kê ở mục 10.3 của REQUIREMENTS.md.
4. Gói giá chưa có giá thật thì `price: null` và hiển thị **"Liên hệ báo giá"**. Không hiện con số giả như thể là giá thật.
5. Không dùng lại bất kỳ chữ, ảnh hay logo nào của template cũ ("Booking Homestay", "Ngủ Âm Ở Đà Lạt", logo nhà gỗ cây thông).

## R3. Cấu hình tập trung (không hard-code)

1. Tên, SĐT, Zalo, Facebook, Messenger, chi nhánh, link Maps chỉ khai báo **một lần** trong `lib/site-config.ts`. Component phải import từ đó. **Cấm** viết thẳng `0985820992` hay URL Facebook/Zalo vào JSX.
2. Danh mục, concept, gói giá: `data/categories.ts`, `data/concepts.ts`, `data/packages.ts`. Kiểu dữ liệu đúng theo mục 9 của REQUIREMENTS.md, đặt trong `types/`.
3. Màu, bo góc, bóng đổ là token CSS trong `app/globals.css` (`@theme`). Theme của antd (`ConfigProvider`) lấy cùng giá trị đó. Không viết mã màu hex rời rạc trong component.

## R4. Công nghệ và cách dùng

Stack: **Next.js 16.4 (App Router) · React 19.3 · TypeScript strict · antd 6 · Tailwind CSS 4**. `cacheComponents` và `partialPrefetching` đang bật.

1. **Đọc tài liệu Next.js đi kèm** trong `node_modules/next/dist/docs/` trước khi dùng một API Next. Không viết theo trí nhớ về Next 13/14/15.
2. **Mặc định là Server Component.** Chỉ đặt `'use client'` ở component lá thật sự cần tương tác (form, lightbox, bộ lọc, khay chọn concept, nút nổi). Không đặt `'use client'` cho cả trang.
3. **Cache Components:** khi cần cache thì dùng `'use cache'`, `cacheLife`, `cacheTag`. Không dùng các route segment config cũ đã bị thay thế. Trang cũ được giữ trạng thái bằng `<Activity>`. Vì vậy modal, lightbox, dropdown phải tự đóng khi rời trang. Xem `02-guides/preserving-ui-state.md`.
4. **Form:** gửi bằng Server Action trong `app/**/actions.ts` hoặc `lib/**/actions.ts`. **Luôn kiểm tra dữ liệu lại ở server.** Action của admin luôn tự kiểm tra quyền đăng nhập.
5. **Lưu trữ:** chỉ truy cập dữ liệu đặt lịch qua repository trong `lib/bookings/`. UI không được biết dữ liệu đang lưu ở đâu.
6. **antd + Tailwind:**
   - Tailwind dùng cho layout, khoảng cách, chữ. antd dùng cho control phức tạp như DatePicker, Select, Form, Table, Modal và toàn bộ trang admin.
   - Giữ thứ tự `@layer theme, base, antd, components, utilities;` ở đầu `globals.css`. Giữ `AntdRegistry` trong root layout.
   - antd dùng locale `vi_VN`, dayjs dùng locale `vi`.
7. **Ảnh:** luôn dùng `next/image`, có `alt` tiếng Việt mô tả nội dung và `sizes` phù hợp. Ảnh đặt trong `public/images/{logo,hero,concepts/<slug>,gallery}/`, tên file không dấu, chữ thường, nối bằng gạch ngang.
8. **Font:** dùng `next/font/google` với `subsets` có `"vietnamese"`. Không đặt `font-family` đè lên trong CSS.
9. **Phụ thuộc mới:** chỉ thêm package khi thật cần, và ghi lý do trong mô tả thay đổi. Không thêm thư viện UI thứ ba ngoài antd và Tailwind.
10. Đường dẫn import dùng alias `@/`.

## R5. Cấu trúc thư mục

```
app/
  layout.tsx                 # root layout: font, AntdRegistry, Header, Footer, nút nổi Zalo/Messenger
  page.tsx                   # F01 Trang chủ
  gioi-thieu/page.tsx        # F02
  concept/page.tsx           # F03 (+F07)
  concept/[slug]/page.tsx    # F04 (+F07)
  bang-gia/page.tsx          # F05
  bo-suu-tap/page.tsx        # F06
  dat-lich/page.tsx          # F08
  lien-he/page.tsx           # F09
  quan-tri/dat-lich/page.tsx # F11 (noindex, bắt buộc đăng nhập)
  sitemap.ts, robots.ts
components/
  layout/                    # Header, Footer, Logo, FloatingContact (F10)
  ui/                        # dùng chung: Section + SectionHeading (khoảng cách chuẩn 6.6), ButtonLink,
                             # Icons (icon nét mảnh), WoolLine (hoạ tiết logo), RevealObserver (data-reveal)
  home/                      # 8 khối trang chủ F01, mỗi khối một file *Section.tsx
  concept/                   # SelectConceptButton, SelectedConceptsTray (F07)
  gallery/                   # GalleryMasonry + lightbox (F01 khối 6, F06)
  providers/                 # AntdProvider (theme + locale vi_VN)
  <feature>/                 # booking/, pricing/, admin/ khi làm các trang sau
data/                        # nội dung tĩnh: categories, concepts, packages, home (chữ + chọn ảnh trang chủ)
lib/
  site-config.ts             # thông tin doanh nghiệp (R3)
  concept-selection.ts       # kho concept đã chọn (localStorage) — F07
  bookings/                  # repository + actions đặt lịch
  format.ts                  # định dạng ngày, tiền, SĐT, link đặt lịch
types/                       # kiểu dữ liệu theo mục 9 REQUIREMENTS
public/images/
  logo/                      # logo đã xóa SĐT cũ + đầu cừu. KHÔNG dùng main-logo.jpg gốc
  concepts/<slug>/NN.jpg     # ảnh đã chuẩn hóa — nguồn ảnh duy nhất cho code
  library/                   # ảnh gốc từ Drive — không tham chiếu trong code
docs/REQUIREMENTS.md
```

- Section mới trên mọi trang phải dùng `Section` + `SectionHeading` để giữ đúng khoảng cách và nhịp nền xen kẽ (REQUIREMENTS 6.6).
- Ảnh mới: chuẩn hóa vào `public/images/concepts/<slug>/`, khai báo trong `data/concepts.ts` kèm `alt` tiếng Việt. Ảnh hero, danh mục, bộ sưu tập chỉ tham chiếu lại ảnh đã khai báo.
- Phần tử có `data-reveal` không được gắn utility `transform` (translate/scale). Nếu cần, bọc thêm một lớp bên trong.
- Hiệu ứng xuất hiện khi cuộn: **luôn** dùng helper `{...reveal('up', delayMs)}` từ `components/ui/Section.tsx`, không viết `data-reveal` tay. Helper gắn sẵn `suppressHydrationWarning`, vì `RevealObserver` đặt thuộc tính `data-revealed` có thể trước khi React hydrate xong phần tử. **Không** dùng `classList` hay sửa `className` của phần tử React từ code DOM thủ công: gây lỗi lệch hydration.

- Route là tiếng Việt **không dấu**, chữ thường, nối bằng gạch ngang, đúng bảng ở mục 7 REQUIREMENTS. Không tự đổi tên route.
- File component đặt tên `PascalCase.tsx`. File tiện ích đặt tên `kebab-case.ts`.

## R6. Giao diện và trải nghiệm

1. Phong cách **"Hiện đại tươi sáng / trắng kem"**. Nền kem, chữ nâu đen ấm, nhiều khoảng trắng, ảnh là trọng tâm. **Không có dark mode.**
2. **Mobile-first.** Phải kiểm tra ở 360, 768 và 1280 px. Không có thanh cuộn ngang.
3. Mọi trang công khai phải có lối dẫn tới **Đặt lịch** và **Zalo/Messenger**. Nút nổi F10 không được che nút submit hoặc nội dung chính.
4. Hiệu ứng chỉ dùng hệ `data-reveal` và các keyframe có sẵn trong `globals.css`. Phải tôn trọng `prefers-reduced-motion`.
5. Toàn bộ chữ trên UI, thông báo lỗi, `alt`, `aria-label` là **tiếng Việt có dấu**, giọng thân thiện, xưng "Nhà Cừu" – "bạn".
6. Định dạng hiển thị: ngày `dd/MM/yyyy`, tiền `1.500.000đ`, SĐT `098 582 09 92`. Dùng các hàm trong `lib/format.ts`.

## R7. SEO và bảo mật

1. Mỗi trang có `metadata` hoặc `generateMetadata` riêng, gồm title, description tiếng Việt và Open Graph. Root layout có `lang="vi"`.
2. `/quan-tri/*` có `robots: { index: false }` và không đưa vào `sitemap.ts`.
3. Mật khẩu và khóa bí mật để trong `.env.local`, không commit. Biến mới phải ghi vào `.env.example` (không chứa giá trị thật).

## R8. Quy trình khi thêm hoặc sửa tính năng

1. Đọc `docs/REQUIREMENTS.md`, tìm mã `F-xx` liên quan.
2. Không có mã thì thêm vào REQUIREMENTS.md trước (R1.3).
3. Code theo R2–R7.
4. Kiểm tra theo Definition of Done (R9).
5. Cập nhật REQUIREMENTS.md nếu có thay đổi về nội dung, placeholder, câu hỏi mở hoặc phạm vi.
6. Commit message có mã chức năng, ví dụ `feat(F08): thêm kiểm tra SĐT ở server`.

## R9. Definition of Done (tiêu chí hoàn thành)

Một task chỉ được coi là xong khi đạt đủ các mục sau:

- [ ] `npm run lint` không lỗi.
- [ ] `npm run build` thành công.
- [ ] Đúng phạm vi và tiêu chí của mã `F-xx` trong REQUIREMENTS.md.
- [ ] Không hard-code thông tin doanh nghiệp (R3). Không có nội dung bịa (R2).
- [ ] Hiển thị đúng ở 360, 768, 1280 px. Không có thanh cuộn ngang.
- [ ] Ảnh có `alt` tiếng Việt. Control tương tác dùng được bằng bàn phím.
- [ ] Không còn chữ hoặc ảnh của template cũ trong phần vừa sửa.
- [ ] REQUIREMENTS.md đã được cập nhật nếu phạm vi, placeholder hoặc câu hỏi mở thay đổi.
