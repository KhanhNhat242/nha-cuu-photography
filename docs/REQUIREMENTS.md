# TÀI LIỆU YÊU CẦU — Website Nhà Cừu Photography

> **Nguồn gốc:** Phiếu Dev số 43 (file `nha-cuu-photography.pdf`, 2 trang) do sale ghi.
> **Vai trò của tài liệu:** đây là **nguồn sự thật duy nhất (single source of truth)** cho mọi việc thiết kế, code, nội dung của dự án. Mọi thay đổi phạm vi phải cập nhật vào đây trước (xem mục 14).
> **Phiên bản:** 1.0 — lập ngày 23/10/2026.

---

## 0. Quy ước nhãn trong tài liệu

Mỗi thông tin được gắn một nhãn để biết mức độ tin cậy. **Không được trình bày thông tin `[GIẢ ĐỊNH]` như sự thật trên website.**

| Nhãn | Ý nghĩa | Được dùng như thế nào |
|---|---|---|
| `[GỐC]` | Chép nguyên văn từ phiếu | Dùng trực tiếp, không tự ý sửa nội dung |
| `[SUY RA]` | Suy ra hợp lý từ dữ liệu gốc (ví dụ giải mã link Maps) | Dùng được, nhưng nên nhờ sale xác nhận |
| `[GIẢ ĐỊNH]` | Dev tự quyết vì phiếu bỏ trống | Chỉ dùng cho demo, phải nằm trong danh sách placeholder (mục 10.3) |
| `[CHỜ XÁC NHẬN]` | Cần sale/khách trả lời | Xem danh sách câu hỏi ở mục 13 |

---

## 1. Thông tin phiếu (quản lý dự án)

| Trường | Giá trị | Nhãn |
|---|---|---|
| Tên phiếu | PHIẾU DEV 43 - Nhà Cừu Photography | `[GỐC]` |
| STT | 43 | `[GỐC]` |
| Ngày giao hồ sơ | 24/10/2026 | `[GỐC]` |
| Sale phụ trách | Minh Toàn | `[GỐC]` |
| Mã DN (file sale) | DN0112 | `[GỐC]` |
| Dev phụ trách | *(trống — ô vàng, dev tự điền)* | — |
| Trạng thái demo | *(trống — ô vàng, dev tự chọn)* | — |
| Link demo | *(trống — ô vàng, dev dán link)* | — |
| Trạng thái gửi sale | *(trống — ô vàng, dev tự chọn)* | — |
| Ưu tiên (GĐ chọn) | *(trống)* | `[CHỜ XÁC NHẬN]` |
| Hạn giao demo | *(trống)* — phiếu ghi nhắc: **"SALE GHI HẠN"** | `[CHỜ XÁC NHẬN]` |
| Ngày gửi khách | *(trống)* | — |
| Phản hồi của khách | *(trống)* | — |

**Quy trình phiếu `[GỐC]`:** Dev điền các ô vàng. Khi chọn trạng thái **"Xong - chờ sale gửi"** thì phiếu tự đóng.

> ⚠️ Phiếu ghi "Dev điền **3** ô vàng" nhưng thực tế có **4** ô vàng (Dev phụ trách, Trạng thái demo, Link demo, Trạng thái gửi sale). Dev điền đủ cả 4 ô.

---

## 2. Thông tin doanh nghiệp

### 2.1. Dữ liệu gốc

| Trường | Giá trị | Nhãn |
|---|---|---|
| Tên doanh nghiệp | **Nhà Cừu Photography** | `[GỐC]` |
| Ngành | Studio | `[GỐC]` |
| Tỉnh / TP | Hồ Chí Minh | `[GỐC]` |
| Người liên hệ | *(trống)* | `[CHỜ XÁC NHẬN]` |
| SĐT / Zalo | 098 582 09 92 | `[GỐC]` |
| Facebook Page | https://www.facebook.com/NhaCuuPhotography/ | `[GỐC]` |
| Google Maps | Link dài trong phiếu, trỏ tới CN Thủ Đức (xem 2.3) | `[GỐC]` |
| Website hiện tại | *(trống — coi như chưa có website)* | `[SUY RA]` |
| Logo (Drive) | https://drive.google.com/drive/u/0/folders/1tXdG5x9ioPI5C211IJPoInHraDDZGM9I | `[GỐC]` |
| Ảnh / tư liệu (Drive) | https://drive.google.com/drive/u/0/folders/1tXdG5x9ioPI5C211IJPoInHraDDZGM9I | `[GỐC]` |

> Link Logo và link Ảnh **trùng nhau** (cùng một thư mục Drive). Logo và ảnh phải lấy từ thư mục này.

> ⚠️ **File logo gốc (`public/images/main-logo.jpg`) có in số điện thoại cũ `0973749387`** bên dưới chữ "nhà cừu". Số này **khác** số chính thức trong phiếu (098 582 09 92). Trên web **chỉ dùng bản logo đã xóa dòng số cũ**: `public/images/logo/nha-cuu-logo.png` (nền trong, chữ nâu đen) và `nha-cuu-logo-light.png` (chữ kem, dùng trên nền tối). Không bao giờ hiển thị file `main-logo.jpg` gốc.

### 2.2. Chi nhánh (2 cơ sở)

Phiếu ghi địa chỉ vào ô "Điểm mạnh / khác biệt (USP)". Nội dung nguyên văn `[GỐC]`:

| Chi nhánh | Địa chỉ nguyên văn | Ghi chú cho khách (nguyên văn) |
|---|---|---|
| **CN Thủ Đức** | 27 đường số 9, (Khách lưu ý "khu phố 56"), phường Linh Xuân (phường Linh Tây cũ) | Khách lưu ý "khu phố 56" |
| **CN Gò Vấp** | 89 đường số 3, Cityland Park Hills, (Khách lưu ý "phường Gò Vấp mới cạnh LOTTE Mart") | Khách lưu ý "phường Gò Vấp mới cạnh LOTTE Mart" |

Cách hiển thị trên web `[SUY RA]` (giữ đủ ý, viết gọn lại):

- **CN Thủ Đức:** 27 Đường số 9, Khu phố 56, Phường Linh Xuân (phường Linh Tây cũ), TP. Hồ Chí Minh.
- **CN Gò Vấp:** 89 Đường số 3, Cityland Park Hills, Phường Gò Vấp, TP. Hồ Chí Minh. Gần LOTTE Mart.

> Phải giữ chú thích "phường Linh Tây cũ" và "cạnh LOTTE Mart". Hai chú thích này giúp khách tìm đường sau đợt đổi tên phường.

### 2.3. Thông tin giải mã từ link Google Maps `[SUY RA]`

| Thông tin | Giá trị |
|---|---|
| Tên địa điểm trên Maps | Nhà Cừu Photography - Thủ Đức (Studio chụp ảnh Bầu, Gia đình, Bé, Beauty) |
| Tọa độ ghim (CN Thủ Đức) | 10.8592999, 106.7580476 |
| Link mở bản đồ gọn | https://www.google.com/maps?q=10.8592999,106.7580476 |
| Link nhúng iframe | https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s10.8592999,106.7580476!6i16 (dùng thẳng URL này: link dạng maps.google.com/maps?…&output=embed chuyển hướng qua một response có X-Frame-Options nên có thể bị chặn trong iframe) |

- Link Maps trong phiếu bị xuống dòng khi in ra PDF. Không chép lại link dài đó. Dùng các link gọn ở bảng trên.
- **CN Gò Vấp chưa có link Maps** `[CHỜ XÁC NHẬN]`. Tạm thời dùng link tìm kiếm theo địa chỉ `[GIẢ ĐỊNH]`:
  `https://www.google.com/maps/search/?api=1&query=89+Đường+số+3+Cityland+Park+Hills+Gò+Vấp`

### 2.4. Kênh liên hệ (chuẩn hóa) `[SUY RA]`

| Kênh | Giá trị dùng trong code |
|---|---|
| Hiển thị SĐT | `098 582 09 92` |
| Link gọi | `tel:+84985820992` |
| Zalo | `https://zalo.me/0985820992` |
| Facebook | `https://www.facebook.com/NhaCuuPhotography/` |
| Messenger | `https://m.me/NhaCuuPhotography` (suy từ username Fanpage, cần kiểm tra link chạy được) |

---

## 3. Các ô bắt buộc (*) còn trống và điểm bất thường trong phiếu

| # | Vấn đề | Ảnh hưởng | Cách xử lý tạm |
|---|---|---|---|
| G1 | **"Khách đồng ý xem demo? \*"** bắt buộc nhưng **trống** | Chưa chắc khách sẽ xem demo | Vẫn làm demo. Hỏi sale trước khi gửi |
| G2 | Ô **USP** chứa địa chỉ, **không có USP thật** | Thiếu thông điệp khác biệt | Dùng điểm mạnh suy ra được ở mục 4.3, đánh dấu `[GIẢ ĐỊNH]` |
| G3 | **Ngôn ngữ** trống | — | Mặc định **tiếng Việt** `[GIẢ ĐỊNH]` |
| G4 | **Nội dung sẵn có** trống: không có bảng giá, giờ mở cửa, giới thiệu | Không có giá thật cho trang Bảng giá | Dùng placeholder theo mục 10.3 |
| G5 | **Website tham khảo** trống | — | Tự định hướng theo mục 6 |
| G6 | **Lưu ý / điều cần tránh** trống | — | Áp dụng các quy tắc chung ở mục 6.4 |
| G7 | **Người liên hệ** trống | Không biết xưng hô với ai | Dùng tên thương hiệu |
| G8 | **Hạn giao demo** trống, có nhắc "SALE GHI HẠN" | Không biết deadline | Hỏi sale Minh Toàn |
| G9 | Ghi "3 ô vàng" nhưng có 4 ô vàng | — | Điền đủ 4 ô |
| G10 | Logo và ảnh **chung một link Drive** | Phải tự lọc file trong thư mục | Tải về, phân loại vào `public/images/` |
| G11 | CN Gò Vấp **không có link Maps** | — | Dùng link tìm kiếm (mục 2.3) |
| G12 | Logo gốc có **SĐT cũ 0973749387** | Khách gọi nhầm số | Đã tạo bản logo xóa dòng số cũ (mục 2.1) |

---

## 4. Mục tiêu, khách hàng và thông điệp

### 4.1. Mục tiêu website `[GỐC]`

**Giới thiệu công ty/dịch vụ.**

Mục tiêu phụ `[SUY RA]` từ danh sách chức năng: khách xem concept, chọn concept, xem giá theo gói, rồi **đặt lịch chụp** hoặc nhắn **Zalo/Messenger**. Mọi trang đều phải dẫn tới hành động đặt lịch hoặc liên hệ.

### 4.2. Khách hàng mục tiêu `[GỐC]`

- Nữ giới từ 18–35 tuổi.
- Sinh viên.
- Người yêu thích chụp ảnh nghệ thuật.
- Khách muốn lưu giữ kỷ niệm, chụp ảnh sinh nhật hoặc concept cá nhân.

> **Lưu ý thiết kế:** nhóm khách mục tiêu nghiêng về nữ trẻ và sinh viên. Dịch vụ chủ lực lại có Bầu, Bé, Gia đình. Giao diện phải hợp với cả hai: trẻ trung, nhẹ nhàng, ấm áp. Không quá "teen", cũng không quá trang trọng.

### 4.3. Điểm mạnh dùng tạm cho demo `[GIẢ ĐỊNH]`

Chỉ dùng các ý có căn cứ từ phiếu:

1. **Hai chi nhánh** tại TP.HCM: Thủ Đức và Gò Vấp.
2. **Chuyên** chụp Bầu, Beauty, Bé và Gia đình.
3. **Nhiều concept** cá nhân và nghệ thuật, có cả concept sinh nhật.
4. **Đặt lịch online** và tư vấn nhanh qua Zalo/Messenger.

Không được bịa thêm số liệu như số năm kinh nghiệm, số khách đã chụp, giải thưởng hay đánh giá sao.

---

## 5. Dịch vụ / danh mục concept

### 5.1. Nguyên văn `[GỐC]`

> Chụp ảnh concept cá nhân; Chụp ảnh nghệ thuật; chuyên chụp ảnh Bầu, Beauty, Bé, và Gia đình

### 5.2. Danh mục chuẩn hóa cho code

| Mã (`slug`) | Tên hiển thị | Nguồn | Ghi chú |
|---|---|---|---|
| `bau` | Chụp ảnh Bầu | `[GỐC]` "chuyên" | Dịch vụ chủ lực |
| `beauty` | Chụp ảnh Beauty | `[GỐC]` "chuyên" | Dịch vụ chủ lực |
| `be` | Chụp ảnh Bé | `[GỐC]` "chuyên" | Dịch vụ chủ lực |
| `gia-dinh` | Chụp ảnh Gia đình | `[GỐC]` "chuyên" | Dịch vụ chủ lực |
| `concept-ca-nhan` | Chụp ảnh concept cá nhân | `[GỐC]` | Gồm cả concept **sinh nhật** (theo mục 4.2) |
| `nghe-thuat` | Chụp ảnh nghệ thuật | `[GỐC]` | |

- Thứ tự ưu tiên hiển thị theo tên trên Google Maps: **Bầu, Gia đình, Bé, Beauty**, sau đó là Concept cá nhân và Nghệ thuật.
- Mỗi danh mục có nhiều **concept** cụ thể (ví dụ "Bầu – Nàng thơ trắng"). Tên và ảnh concept cụ thể lấy từ thư mục Drive. Nếu Drive chưa có thì dùng placeholder `[GIẢ ĐỊNH]`.

---

## 6. Định hướng thiết kế

### 6.1. Màu chủ đạo / phong cách `[GỐC]`

**Hiện đại tươi sáng / trắng kem.**

Định hướng chi tiết do người dùng chốt ngày 23/10/2026: **Warm Editorial & Soft Minimalist**. Tức là phong cách tạp chí hiện đại, tươi sáng, ấm áp, trên nền trắng kem chủ đạo.

### 6.2. Bảng màu

Mọi màu phải khai báo một lần dưới dạng biến CSS trong `app/globals.css` (`@theme`), không viết mã màu rời rạc trong component.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-cream` | `#FFFDF9` | Nền chính, nền section lẻ |
| `--color-cream-200` | `#F7F1E8` | Nền section chẵn (xen kẽ) |
| `--color-line` | `#EFE8DC` | Viền thẻ, khung ảnh, đường kẻ phân cách section |
| `--color-line-strong` | `#E3D5C3` | Viền cần nổi hơn (khung vòm trang trí) |
| `--color-ink` | `#3A3330` | Chữ chính, nút chính, footer, thanh khay concept |
| `--color-ink-muted` | `#7A6F68` | Chữ phụ |
| `--color-accent` | `#9C5B40` | Nhãn nhỏ (eyebrow), chữ nghiêng điểm nhấn. Đạt tương phản AA trên nền kem |
| `--color-accent-soft` | `#F1E2D6` | Nền nhãn, huy hiệu |

- `[GIẢ ĐỊNH]` Logo thật là nét vẽ đơn sắc xám đậm, không có màu nhấn. Vì vậy `--color-accent` là màu đất nung ấm dev chọn để hợp tông kem. Có thể đổi nếu khách muốn.

### 6.3. Chữ

- Font phải **hỗ trợ tiếng Việt**: khai báo `subsets` có `"vietnamese"` trong `next/font/google`.
- **Đã chốt:** tiêu đề dùng **Cormorant Garamond** (serif mềm, có chữ nghiêng cho điểm nhấn). Nội dung dùng **Be Vietnam Pro**. Cả hai đều có subset vietnamese.
- Token Tailwind: `font-display` cho tiêu đề, `font-sans` cho nội dung.

### 6.4. Nguyên tắc giao diện (áp dụng vì ô "điều cần tránh" để trống)

- **Ảnh là nhân vật chính.** Dùng ảnh lớn, nhiều khoảng trắng, chữ không đè lên phần quan trọng của ảnh.
- **Mobile-first:** khách chủ yếu vào từ điện thoại qua Facebook/Zalo.
- **Không bật dark mode tự động.** Thương hiệu là trắng kem.
- Hiệu ứng nhẹ nhàng. Dùng lại hệ `data-reveal` có sẵn trong `globals.css` và tôn trọng `prefers-reduced-motion`. Ảnh trong lightbox dùng lớp `.lightbox-fade`.
- Nút **Đặt lịch** và nút **Zalo/Messenger** luôn dễ thấy trên mọi trang.

### 6.5. Motif từ logo chú cừu

- Logo là nét vẽ liền mạch hình đám mây lông cừu nối vào chữ viết tay "nhà cừu".
- Khung ảnh bo góc mềm `rounded-2xl`. Ảnh Hero và ảnh nổi bật dùng **khung vòm** `rounded-t-full`. Viền mảnh màu `--color-line`.
- Hoạ tiết trang trí: đường lông cừu (SVG nét mảnh, độ mờ thấp) vẽ lại từ đám mây trong logo. Component: `components/ui/WoolLine.tsx`.
- **Họa tiết hai mép dọc màn hình** (v2.2): mỗi section (trừ Hero) có một cặp hình vẽ tay nét mảnh theo nội dung — Điểm mạnh: sao lấp lánh / trái tim; Concept: máy ảnh / đám mây lông cừu; Concept nổi bật: cành hoa / bóng bay; Bảng giá: cành hoa / hộp quà; Bộ sưu tập: ảnh polaroid / cuộn phim; Chi nhánh: ghim bản đồ / ngôi nhà; Kêu gọi đặt lịch: lịch / sao. Màu `--color-accent` mờ, bay nhẹ (`.deco-float`), chỉ hiện từ 1280px. Dùng qua prop `ornaments` của `Section` (`components/ui/SideOrnaments.tsx`).

### 6.6. Quy chuẩn khoảng cách và nhịp nền (bắt buộc cho mọi section)

| Hạng mục | Mobile | Desktop |
|---|---|---|
| Padding dọc section | 64–80px (`py-16` → `md:py-20`) | 96–112px (`lg:py-28`) |
| Tiêu đề section cách nội dung bên dưới | 32px (`mb-8`) | 48px (`md:mb-12`) |
| Khoảng cách giữa các thẻ ảnh | 24px (`gap-6`) | 32px (`lg:gap-8`) |
| Lề ngang | 16px (`px-4`) | 32px, nội dung tối đa 1240px |

- Nền section **xen kẽ** `--color-cream` / `--color-cream-200`, ngăn cách bằng đường kẻ mảnh `--color-line`.
- Dùng component `components/ui/Section.tsx` để không phải nhớ các con số trên.

---

## 7. Sơ đồ trang (sitemap) và đường dẫn

| # | Trang | Route | Chức năng phiếu |
|---|---|---|---|
| P1 | Trang chủ | `/` | Trang chủ |
| P2 | Giới thiệu | `/gioi-thieu` | Giới thiệu |
| P3 | Danh sách concept | `/concept` (lọc theo danh mục qua `?danh-muc=bau`) | Danh sách concept, Chọn concept |
| P4 | Chi tiết concept | `/concept/[slug]` | Chi tiết concept, Chọn concept |
| P5 | Bảng giá | `/bang-gia` | Bảng giá theo gói |
| P6 | Bộ sưu tập ảnh | `/bo-suu-tap` | Bộ sưu tập ảnh |
| P7 | Đặt lịch chụp | `/dat-lich` (nhận sẵn `?concept=<slug>&goi=<id>`) | Đặt lịch chụp, Chọn concept |
| P8 | Liên hệ | `/lien-he` | Liên hệ, bản đồ |
| P9 | Quản lý đặt lịch (admin) | `/quan-tri/dat-lich` | Quản lý yêu cầu đặt lịch |
| — | Nút nổi Zalo/Messenger | Có ở mọi trang (trong layout) | Zalo/Messenger |

Quy ước route: tiếng Việt **không dấu**, chữ thường, nối bằng gạch ngang.

Menu chính: Trang chủ · Giới thiệu · Concept · Bảng giá · Bộ sưu tập · Liên hệ · **[Đặt lịch]** (dạng nút nổi bật).

**Landing page một trang (người dùng chốt ngày 26/10/2026):** menu trên header, menu mobile, nút **Đặt lịch** trên header và menu ở footer **không chuyển trang**. Chúng cuộn tới section tương ứng trên trang chủ và làm nổi mục đang xem (scrollspy). Anchor khai báo một lần trong `lib/site-config.ts` (`sectionIds`):

| Mục menu | Anchor | Section trên trang chủ |
|---|---|---|
| Trang chủ | `#trang-chu` | Khối 1 — Hero |
| Giới thiệu | `#gioi-thieu` | Khối 2 — 6 danh mục dịch vụ |
| Concept | `#concept` | Khối 3 — Concept nổi bật |
| Bảng giá | `#bang-gia` | Khối 5 — Bảng giá |
| Bộ sưu tập | `#bo-suu-tap` | Khối 6 — Bộ sưu tập |
| Liên hệ | `#lien-he` | Khối 7 — Hai chi nhánh |
| Đặt lịch (nút) | `#dat-lich` | Khối 8 — Kêu gọi đặt lịch |

Link dạng `/#anchor`: trên trang chủ thì chỉ cuộn. Các route con ở bảng trên chưa được xây dựng.

---

## 8. Đặc tả chức năng

Danh sách chức năng `[GỐC]`, đủ 11 mục:

> Trang chủ; Giới thiệu; Danh sách concept; Chi tiết concept; Bảng giá theo gói; Bộ sưu tập ảnh; Chọn concept; Đặt lịch chụp; Liên hệ; Zalo/Messenger; Quản lý yêu cầu đặt lịch

Mỗi chức năng có mã **F-xx**. Khi code hoặc commit, ghi rõ mã chức năng.

### F01 — Trang chủ (`/`)

Thiết kế chi tiết do người dùng chốt ngày 23/10/2026. Nền section xen kẽ theo mục 6.6.

| Khối | Nền | Bố cục và ảnh | Định mức chữ | Nội dung |
|---|---|---|---|---|
| **Header** (cố định trên cùng, cập nhật v1.6) | Ở đầu trang chủ: **trong suốt**, hòa vào ảnh Hero phía sau (logo bản sáng, chữ kem, nút Đặt lịch nền kem). Cuộn xuống: chuyển dần sang **kem mờ** (`bg-cream/85` + blur) như cũ. Mở menu mobile thì luôn nền kem | Logo trái, 6 mục menu giữa, nút **Đặt lịch** phải. Mobile: logo, nút Đặt lịch, nút mở menu | 12–15 chữ | Trang chủ · Giới thiệu · Concept · Bảng giá · Bộ sưu tập · Liên hệ · Đặt lịch |
| **1. Hero** (cập nhật v1.5) | Ảnh toàn khung, phủ lớp tối dần sang trái để chữ đọc rõ | **Vừa đúng 1 màn hình**, nằm luồn dưới header trong suốt. **Carousel 5 ảnh** `public/images/hero/hero-01…05.jpg` (bố cục theo ảnh mẫu người dùng gửi). Ảnh đang chọn là **nền toàn bộ Hero**. Trái: dòng thương hiệu (h1), nhãn + tiêu đề lớn của ảnh đang chọn, mô tả, 2 nút. Dưới bên phải: **dải thẻ ảnh nhỏ** của các ảnh còn lại, nút trước/sau, thanh tiến trình, số thứ tự lớn "01". **Bấm thẻ** → ảnh trong thẻ **phóng to** từ vị trí thẻ ra phủ kín Hero và trở thành nền. **Không bấm** → sau một khoảng trễ (~6,5 giây) carousel tự phóng to thẻ kế tiếp. Rê chuột/focus vào khu điều khiển thì tạm dừng. `prefers-reduced-motion` → không phóng to, không tự chạy | 25–35 chữ | Dòng h1: "Lưu giữ khoảnh khắc dịu dàng cùng Nhà Cừu". Mô tả: "Không gian nhiếp ảnh ấm áp chuyên chụp Bầu, Bé, Gia đình cùng các concept cá nhân và nghệ thuật tại TP.HCM." Nhãn và tiêu đề từng ảnh: dev viết theo nội dung ảnh (`data/home.ts`, placeholder). Nút: **Đặt lịch chụp**, **Xem concept** |
| **2. 6 danh mục** | `cream-200` | **Carousel coverflow** (v1.7): thẻ giữa nổi bật, 2 thẻ mỗi bên thu nhỏ, mờ dần. Nút trước/sau hai bên, chấm phân trang, vuốt trên điện thoại, phím mũi tên khi focus vào carousel. Đúng thứ tự mục 5.2. Mỗi thẻ: ảnh, số thứ tự, tên, 1 dòng mô tả. Bấm thẻ bên → đưa ra giữa. Thẻ **không chuyển trang** (landing page một trang, v1.9). Không hiện sao đánh giá hay số liệu bịa | 10–15 chữ/thẻ | Ảnh: Bầu = vợ chồng pastel xanh. Gia đình = đại gia đình 3 thế hệ. Bé = bé đeo kính tròn trên ghế lông. Beauty = thiếu nữ áo dài hồng cài hoa. Concept cá nhân = mẹ và bé gái áo len đỏ mùa lễ hội. Nghệ thuật = ảnh bầu đen trắng |
| **3. Concept nổi bật** | `cream` | 4–8 thẻ. Mỗi thẻ: nhãn danh mục ở góc trên, tên concept, 1 câu tóm tắt, nút **Xem chi tiết** và **Chọn concept** (F07) | 15–20 chữ/thẻ | Ví dụ: Bầu – Thanh xuân ngọt ngào. Gia đình – Giáng sinh ấm áp. Bé – Thiên thần nhỏ tinh nghịch. Beauty – Nàng thơ áo dài |
| **4. Điểm mạnh** | `cream-200` | **Bento so le** (v1.8): hàng trên thẻ lớn – nhỏ, hàng dưới nhỏ – lớn. Mỗi thẻ là ảnh nền (chọn từ `public/images/concepts/`, khai báo trong `data/home.ts`), lớp tối dần từ dưới, icon nét mảnh, tiêu đề, mô tả. Rê chuột vào thẻ nhỏ thì hai thẻ trong hàng đổi bề rộng. Mobile: 1 cột | 50–65 chữ cả khối | Đúng 4 ý ở mục 4.3. Tuyệt đối không bịa số năm hay số khách |
| **5. Trích bảng giá + form đặt lịch** (v2.0) | `cream` | 3 gói: Cơ bản, Tiêu chuẩn (đóng khung nổi bật ở giữa), Cao cấp. Nút xem `/bang-gia`. **Form đặt lịch F08** ở cột phải ngoài cùng (từ 1280px; nhỏ hơn thì nằm dưới các thẻ). Cột 3 thẻ giá bám dưới header khi cuộn trong phạm vi khối (từ 1280px) | 20–30 chữ/thẻ | 3–4 gạch đầu dòng mỗi gói. Giá hiển thị "Liên hệ báo giá". Nút **Chọn gói này** điền sẵn gói vào form cùng khối và cuộn tới form (không chuyển trang) |
| **6. Bộ sưu tập chọn lọc** | `cream-200` | Masonry bất đối xứng 8 ảnh, có 2 ảnh ngang (đại gia đình, bé đeo kính) xen giữa ảnh dọc. Bấm ảnh mở lightbox. **Ô "Xem thêm"** (v2.1) cỡ 1 ảnh ngang ở đáy cột phải: bấm mở lightbox từ ảnh thêm đầu tiên; lightbox gồm 8 ảnh + **30 ảnh thêm** chọn ngẫu nhiên cố định (`homeGalleryMore` trong `data/home.ts`, lấy từ `public/images/concepts/`, không trùng 8 ảnh đang hiện) | 12–18 chữ | Tiêu đề: "Khoảnh khắc tại Nhà Cừu". Mô tả: "Mỗi bức ảnh là một câu chuyện kỷ niệm đáng nhớ." Nút: **Xem toàn bộ bộ sưu tập** (`/bo-suu-tap`) |
| **7. Hai chi nhánh** | `cream` | 2 cột cân nhau. CN Thủ Đức có bản đồ nhúng. CN Gò Vấp có nút mở link tìm kiếm bản đồ | 45–60 chữ cả khối | Địa chỉ theo mục 2.2, nút **Chỉ đường**, dòng Hotline/Zalo 098 582 09 92 |
| **8. Kêu gọi đặt lịch** | Banner `cream-200` viền `--color-line`, bo góc lớn, tách biệt trước footer | Căn giữa | 25–35 chữ | Tiêu đề: "Sẵn sàng lưu giữ kỷ niệm đẹp của riêng bạn?" Mô tả: "Chọn concept yêu thích và gửi yêu cầu để Nhà Cừu tư vấn chi tiết ngay hôm nay." Nút: **Đặt lịch chụp ngay**, **Nhắn Zalo**, **Gọi 098 582 09 92** |
| **Footer** | `ink` | Logo bản sáng, menu, 2 chi nhánh, kênh liên hệ | — | Chỉ dữ liệu `[GỐC]`/`[SUY RA]` |

**Tiêu chí nghiệm thu:**
- Từ trang chủ chỉ cần tối đa 1 lần bấm để tới form đặt lịch.
- Hiển thị đủ cả 2 chi nhánh và số điện thoại.
- Hero vừa 1 màn hình ở 1440×900, 1280×800, 390×844.
- Không section nào dính sát nhau: đúng khoảng cách ở mục 6.6.

### F02 — Giới thiệu (`/gioi-thieu`)
- Câu chuyện thương hiệu, phong cách chụp, đội ngũ, không gian studio của 2 chi nhánh.
- Phiếu không có nội dung giới thiệu. Văn bản là placeholder `[GIẢ ĐỊNH]` viết trung tính, không bịa số liệu.

### F03 — Danh sách concept (`/concept`)
- Lưới thẻ concept gồm ảnh đại diện, tên, danh mục và mô tả ngắn.
- Lọc theo danh mục. Bộ lọc lưu trên URL (`?danh-muc=`) để chia sẻ link được.
- Mỗi thẻ có nút **Xem chi tiết** và nút **Chọn concept** (xem F07).

### F04 — Chi tiết concept (`/concept/[slug]`)
- Bộ ảnh của concept, mô tả, gợi ý trang phục và đạo cụ, thời lượng, chi nhánh thực hiện được, gói giá áp dụng.
- Có nút **Chọn concept này và đặt lịch**, dẫn tới `/dat-lich?concept=<slug>`.
- Gợi ý thêm các concept cùng danh mục.
- Có metadata SEO riêng: title, description, ảnh Open Graph.
- Slug không tồn tại thì trả trang 404.

### F05 — Bảng giá theo gói (`/bang-gia`)
- Hiển thị các gói (ví dụ Cơ bản / Tiêu chuẩn / Cao cấp), có thể chia theo danh mục.
- Mỗi gói có: tên, giá, thời lượng, số ảnh chỉnh sửa, số trang phục, quyền lợi kèm theo, nút **Chọn gói này** dẫn tới `/dat-lich?goi=<id>`.
- **Chưa có giá thật** (G4). Mặc định hiển thị **"Liên hệ báo giá"**. Nếu sale đồng ý dùng giá minh họa, giá đó phải gắn cờ placeholder và có dòng ghi chú "Giá tham khảo".

### F06 — Bộ sưu tập ảnh (`/bo-suu-tap`)
- Lưới ảnh dạng masonry, lọc theo danh mục.
- Bấm ảnh mở lightbox, có nút trước/sau, đóng bằng phím Esc và vuốt được trên điện thoại. Lớp `.lightbox-fade` đã có sẵn.
- Ảnh dùng `next/image`, có `sizes` phù hợp và tải lười.
- Popup phải tự đóng khi rời trang. Lý do: với Cache Components, trang cũ được giữ trạng thái bằng `<Activity>`.

### F07 — Chọn concept `[SUY RA]`
Phiếu không mô tả chi tiết. Cách hiểu:
- Khách có thể **chọn một hoặc nhiều concept** muốn chụp, từ trang danh sách hoặc chi tiết.
- Concept đã chọn hiện trong một khay hoặc huy hiệu đếm số. Danh sách này lưu ở `localStorage` để không mất khi chuyển trang.
- **Khay nổi:** khi đã chọn ít nhất 1 concept, một thanh nền `--color-ink` chữ `--color-cream` trượt lên ở cạnh dưới màn hình: "Đã chọn 2 concept — Đặt lịch ngay →". Trên mobile thanh này chừa chỗ bên phải, **không được che** cụm nút Zalo/Messenger nổi (F10). Nút **Đặt lịch** trên header có huy hiệu đếm số concept đã chọn.
- Link sang đặt lịch: `/dat-lich?concept=<slug1>,<slug2>`.
- Bấm **Đặt lịch với concept đã chọn** thì sang `/dat-lich`, các concept đã chọn được điền sẵn vào form.
- Trên form đặt lịch, khách vẫn đổi được concept.

`[CHỜ XÁC NHẬN]`: khách chỉ được chọn 1 hay nhiều concept trong một lần đặt? Mặc định cho phép nhiều.

### F08 — Đặt lịch chụp (`/dat-lich`)
Các trường của form:

| Trường | Bắt buộc | Kiểu | Kiểm tra |
|---|---|---|---|
| Họ và tên | ✔ | text | 2–80 ký tự |
| Số điện thoại / Zalo | ✔ | tel | SĐT Việt Nam `^(0\|\+84)(3\|5\|7\|8\|9)\d{8}$`, kiểm tra sau khi bỏ khoảng trắng |
| Chi nhánh | ✔ | chọn | `thu-duc` hoặc `go-vap` |
| Concept | ✔ | chọn nhiều | phải thuộc danh sách concept |
| Gói chụp | | chọn | phải thuộc danh sách gói |
| Ngày chụp mong muốn | ✔ | ngày | từ ngày mai trở đi |
| Khung giờ | | chọn | Sáng / Chiều / Tối `[GIẢ ĐỊNH]`, vì chưa có giờ mở cửa |
| Số người chụp | | số | 1–20 |
| Ghi chú | | textarea | tối đa 1000 ký tự |
| Link Facebook (để studio liên hệ) | | url | |

- Gửi form bằng **Server Action** và **kiểm tra dữ liệu lại ở server**, không chỉ ở trình duyệt.
- Gửi thành công thì hiện thông báo kèm mã yêu cầu. Thông báo nói rõ studio sẽ liên hệ xác nhận qua SĐT/Zalo. Có thêm nút nhắn Zalo ngay.
- Có chống gửi trùng: khóa nút khi đang gửi. Có chống spam bằng honeypot field.
- Form này là **gửi yêu cầu**, studio còn phải xác nhận lại. Không hiển thị như lịch đã được chốt.
- **Đã làm (v2.0):** form nằm trong khối 5 trang chủ (landing page một trang), chưa có route `/dat-lich` riêng. Code: `components/booking/BookingForm.tsx`, `lib/bookings/` (actions, validate, repository, constants). Ô Concept chọn nhiều (antd `Select`), có thêm lựa chọn **"Nhờ Nhà Cừu tư vấn giúp"** cho khách chưa chọn được (`[GIẢ ĐỊNH]`). Concept trong khay F07 tự điền sẵn. Ngày chọn bằng antd `DatePicker`, hiển thị `dd/MM/yyyy`, chặn ngày trước ngày mai. Trên mobile, cụm nút nổi F10 tạm ẩn khi khách đang nhập form.
- **Lưu trữ demo:** file `.data/bookings.json` (đã gitignore); host không ghi được file thì chỉ giữ trong bộ nhớ (mất khi khởi động lại).

### F09 — Liên hệ (`/lien-he`)
- SĐT bấm gọi được, nút Zalo, Messenger, Facebook.
- Hai chi nhánh với địa chỉ (mục 2.2), chú thích tìm đường và nút **Chỉ đường**.
- Bản đồ nhúng của CN Thủ Đức (mục 2.3). Bản đồ CN Gò Vấp dùng link tìm kiếm.
- Một form liên hệ ngắn (tên, SĐT, nội dung) là tùy chọn. Nếu làm thì dùng chung cơ chế lưu với F08, loại `contact`.

### F10 — Zalo / Messenger
- Nút nổi ở góc dưới bên phải, có trên mọi trang (đặt trong root layout), gồm Zalo, Messenger và nút gọi trên mobile.
- Link lấy từ mục 2.4, khai báo **một chỗ duy nhất** là `lib/site-config.ts`.
- Nút không được che nút submit của form trên mobile.

### F11 — Quản lý yêu cầu đặt lịch (`/quan-tri/dat-lich`)
- **Bắt buộc có đăng nhập.** Bản demo dùng mật khẩu đơn giản lấy từ biến môi trường `ADMIN_PASSWORD` `[GIẢ ĐỊNH]`.
- Mọi Server Action của admin phải tự kiểm tra quyền. Không dựa vào việc trang đã được bảo vệ.
- Bảng danh sách yêu cầu: mã, ngày tạo, tên, SĐT, chi nhánh, concept, ngày mong muốn, trạng thái.
- Lọc theo trạng thái, chi nhánh, khoảng ngày. Tìm theo tên hoặc SĐT.
- Đổi trạng thái theo vòng đời: `moi` (Mới) → `da-lien-he` (Đã liên hệ) → `da-xac-nhan` (Đã xác nhận) → `hoan-thanh` (Hoàn thành). Có thể chuyển sang `da-huy` (Đã hủy) ở bất kỳ bước nào.
- Có ghi chú nội bộ cho từng yêu cầu.
- Có nút gọi và nút mở Zalo nhanh theo SĐT của khách.
- Trang `/quan-tri/*` không được index: đặt `robots: noindex` và không đưa vào sitemap.

**Lưu trữ dữ liệu `[GIẢ ĐỊNH]`:** phiếu không nói tới backend hay database. Code truy cập dữ liệu qua một lớp repository (`lib/bookings/`). Bản demo có thể lưu tạm (file JSON hoặc bộ nhớ). Khi chạy thật thì thay bằng database mà **không phải sửa UI**. Loại database `[CHỜ XÁC NHẬN]`.

---

## 9. Mô hình dữ liệu (TypeScript)

Bản chính thức nằm ở `types/index.ts`. Khi sửa kiểu dữ liệu, sửa cả hai nơi.

```ts
export type BranchId = 'thu-duc' | 'go-vap'

export type CategorySlug =
  | 'bau'
  | 'beauty'
  | 'be'
  | 'gia-dinh'
  | 'concept-ca-nhan'
  | 'nghe-thuat'

/** Một ảnh tĩnh trong /public/images, kèm kích thước thật để next/image không bị nhảy layout. */
export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  /** CSS object-position khi ảnh bị cắt khung (ví dụ ảnh ngang đặt vào khung dọc). */
  focus?: string
}

export interface Branch {
  id: BranchId
  name: string
  shortName: string
  address: string
  note: string
  mapUrl: string
  mapEmbedUrl?: string
  /** true = link bản đồ là link tìm kiếm theo địa chỉ, chưa có ghim chính thức */
  mapIsSearch?: boolean
  geo?: { lat: number; lng: number }
}

export interface Category {
  slug: CategorySlug
  name: string
  shortName: string
  description: string
  cover: Photo
  order: number
}

export interface Concept {
  slug: string
  name: string
  category: CategorySlug
  summary: string
  description: string
  cover: Photo
  gallery: Photo[]
  branches: BranchId[]
  packageIds: string[]
  featured?: boolean
  /** true = dữ liệu demo, chưa phải dữ liệu thật đã được khách xác nhận */
  placeholder?: boolean
}

export interface PricePackage {
  id: string
  name: string
  tagline: string
  category?: CategorySlug
  /** null = "Liên hệ báo giá" */
  price: number | null
  duration?: string
  editedPhotos?: number
  outfits?: number
  includes: string[]
  highlighted?: boolean
  placeholder?: boolean
}

export type BookingStatus = 'moi' | 'da-lien-he' | 'da-xac-nhan' | 'hoan-thanh' | 'da-huy'

export interface BookingRequest {
  id: string
  createdAt: string
  fullName: string
  phone: string
  branch: BranchId
  conceptSlugs: string[]
  packageId?: string
  preferredDate: string
  timeSlot?: 'sang' | 'chieu' | 'toi'
  people?: number
  note?: string
  facebook?: string
  status: BookingStatus
  internalNote?: string
}
```

---

## 10. Nội dung và tài nguyên

### 10.1. Nơi đặt dữ liệu
- Thông tin doanh nghiệp (tên, SĐT, link, chi nhánh): `lib/site-config.ts`.
- Danh mục, concept, gói giá: `data/*.ts`. Nội dung tách khỏi component.
- Ảnh: `public/images/{logo,hero,concepts/<slug>,gallery}/`.

### 10.2. Tài nguyên cần lấy từ Drive
- [x] Logo: `public/images/main-logo.jpg` (bản gốc, có SĐT cũ). Đã tạo bản nền trong không có SĐT ở `public/images/logo/`
- [x] Ảnh hero
- [x] Ảnh từng danh mục: Bầu, Beauty, Bé, Gia đình, Concept cá nhân, Nghệ thuật
- [ ] Ảnh không gian 2 chi nhánh (chưa có trong kho ảnh)
- [x] Favicon tạo từ đầu chú cừu trong logo: `app/icon.png`, `app/apple-icon.png`

### 10.2.1. Kho ảnh và cách tổ chức

- Ảnh gốc người dùng tải từ Drive nằm ở `public/images/library/` (69 file, tên file Facebook). **Không tham chiếu trực tiếp thư mục này trong code.**
- Ảnh dùng trên web được chuẩn hóa sang `public/images/concepts/<slug-concept>/NN.jpg` (tối đa 2048px). Mỗi thư mục là một bộ ảnh của một concept trong `data/concepts.ts`.
- Ảnh hero, ảnh đại diện danh mục, ảnh bộ sưu tập trang chủ **tham chiếu lại** ảnh trong `concepts/`, không nhân bản thêm.
- Ảnh `484418870_…jpg` là ảnh ghép nhiều ảnh nhỏ (collage), không dùng.

### 10.3. Danh sách placeholder (phải thay trước khi bàn giao bản chính thức)

| Nội dung | Trạng thái |
|---|---|
| Văn bản giới thiệu (F02) | Placeholder |
| USP / điểm mạnh (4.3) | Suy ra, chờ xác nhận |
| Giá các gói (F05) | Chưa có, hiển thị "Liên hệ báo giá" |
| Quyền lợi trong từng gói (F05, khối 5 trang chủ) | Placeholder (`placeholder: true` trong `data/packages.ts`), có chú thích "Nhà Cừu sẽ tư vấn chi tiết" |
| Tên và mô tả các concept cụ thể | Ảnh là ảnh thật từ Drive. **Tên và mô tả concept do dev đặt** theo nội dung ảnh (`placeholder: true` trong `data/concepts.ts`), cần khách xác nhận |
| Mô tả ngắn 6 danh mục | Văn bản dev viết, cần khách duyệt |
| Nhãn và tiêu đề 5 ảnh carousel Hero | Dev viết theo nội dung ảnh (`data/home.ts`), cần khách duyệt |
| Giờ mở cửa và khung giờ chụp | Chưa có |
| Link Maps CN Gò Vấp | Dùng link tìm kiếm |
| Link Messenger | Suy ra, cần kiểm tra |
| Cơ chế lưu đặt lịch và đăng nhập admin | Bản demo: file `.data/bookings.json` / bộ nhớ (`lib/bookings/repository.ts`) |

### 10.4. Tàn dư từ template cũ cần dọn

Dự án được copy từ template "Booking Homestay / Ngủ Âm Ở Đà Lạt". Các chỗ cần dọn:

- [x] `package.json`: đổi `name` từ `ngu-am-o-dalat` thành `nha-cuu-photography`
- [x] `app/layout.tsx`: `metadata` đang là "Booking Homestay" / "Generated by create next app". Đổi `lang="en"` thành `lang="vi"`. Font đang chỉ có subset `latin`, phải thêm `vietnamese`
- [x] `app/globals.css`: bỏ khối dark mode `prefers-color-scheme: dark`. Bỏ `font-family: Arial` đang đè lên font của `next/font`
- [x] `public/images/mainlogo-img1.jpg` là **logo homestay Đà Lạt** (nhà gỗ, cây thông), **không phải logo Nhà Cừu**. Phải xóa hoặc thay
- [x] `public/*.svg` mặc định của Next (next, vercel, file, globe, window). `app/favicon.ico` (thực chất là bản sao logo gốc có SĐT cũ) đã thay bằng `app/icon.png`
- [x] `README.md` mặc định
- [x] `app/page.tsx` đang là trang trống, có `'use client'` không cần thiết

---

## 11. Yêu cầu phi chức năng

| Nhóm | Yêu cầu |
|---|---|
| Responsive | Hiển thị đúng ở các độ rộng 360, 390, 768, 1024, 1280, 1440 px. Không có thanh cuộn ngang |
| Hiệu năng | Ảnh qua `next/image`, đúng `sizes`. Ảnh hero dùng `preload`. Mục tiêu Lighthouse mobile ≥ 85 cho Performance, ≥ 95 cho SEO và Accessibility |
| SEO | `metadata` riêng cho từng trang. Có Open Graph image, `sitemap.ts`, `robots.ts`. Có JSON-LD `LocalBusiness` hoặc `PhotographyBusiness` cho 2 chi nhánh |
| Ngôn ngữ | Toàn bộ UI là tiếng Việt có dấu. Có `lang="vi"`. antd dùng locale `vi_VN`, dayjs dùng locale `vi` |
| Khả năng truy cập | Mọi ảnh có `alt` tiếng Việt mô tả nội dung. Nút có nhãn. Tương phản chữ đạt mức AA. Điều hướng được bằng bàn phím. Tôn trọng `prefers-reduced-motion` |
| Bảo mật | Kiểm tra dữ liệu và quyền ở server. Bí mật để trong `.env*`, không commit. Trang admin không index |
| Định dạng | Ngày hiển thị `dd/MM/yyyy`. Tiền hiển thị `1.500.000đ`. SĐT hiển thị `098 582 09 92` |

---

## 12. Phạm vi

**Trong phạm vi demo:** toàn bộ 11 chức năng F01–F11 với dữ liệu mẫu và lưu trữ tạm.

**Ngoài phạm vi (chưa yêu cầu):** thanh toán hoặc đặt cọc online, tài khoản khách hàng, đa ngôn ngữ, gửi email/SMS/Zalo tự động khi có đặt lịch, CMS cho khách tự sửa nội dung, giỏ hàng. Chỉ làm khi phiếu được cập nhật.

---

## 13. Câu hỏi mở cho sale (Minh Toàn)

1. Khách đã đồng ý xem demo chưa? Ô bắt buộc này đang trống.
2. Hạn giao demo là ngày nào? Mức ưu tiên GĐ chọn là gì?
3. Studio có điểm mạnh / USP nào cụ thể không?
4. Bảng giá theo gói: tên gói, giá, quyền lợi. Có được hiển thị giá công khai không?
5. Giờ mở cửa và các khung giờ nhận chụp của từng chi nhánh?
6. Link Google Maps của CN Gò Vấp?
7. Danh sách concept cụ thể (tên, mô tả) theo từng danh mục?
8. Tên người liên hệ phía khách?
9. Khách có website tham khảo nào thích không? Có điều gì cần tránh không?
10. Khi có yêu cầu đặt lịch mới, studio muốn được báo qua kênh nào (Zalo, email…)?
11. Mỗi lần đặt lịch, khách được chọn 1 hay nhiều concept?

---

## 14. Nhật ký thay đổi yêu cầu

Mỗi lần phạm vi thay đổi (thêm hoặc bớt chức năng, khách phản hồi, sale trả lời câu hỏi) phải thêm một dòng ở đây **và** sửa các mục liên quan ở trên.

| Ngày | Phiên bản | Thay đổi | Nguồn |
|---|---|---|---|
| 23/10/2026 | 1.0 | Lập tài liệu từ Phiếu Dev 43 | Phiếu PDF |
| 23/10/2026 | 1.1 | Nâng Next.js 16.4.0 → 16.4.2 (bản vá bảo mật) | `next upgrade --agent=security` |
| 26/10/2026 | 2.2 | Thêm họa tiết vẽ tay ở hai mép dọc màn hình cho các section trừ Hero (mục 6.5) | Yêu cầu của người dùng |
| 26/10/2026 | 2.1 | Khối 6 (bộ sưu tập): thêm ô "Xem thêm" mở lightbox, thêm 30 ảnh xem thêm | Yêu cầu của người dùng |
| 26/10/2026 | 2.0 | Thêm form đặt lịch F08 vào cột phải khối Bảng giá trang chủ; nút "Chọn gói này" điền sẵn gói vào form. Thêm phụ thuộc trực tiếp `dayjs` (giá trị của antd DatePicker, locale `vi`) | Yêu cầu của người dùng, kèm code mẫu |
| 26/10/2026 | 1.9 | Thẻ carousel danh mục (khối 2) không còn dẫn sang `/concept?danh-muc=…`; bỏ dòng số concept / "Xem concept" ở chân thẻ | Yêu cầu của người dùng |
| 26/10/2026 | 1.8 | Khối 4 (điểm mạnh) đổi sang bento so le có ảnh nền | Yêu cầu của người dùng, kèm code mẫu |
| 26/10/2026 | 1.7 | Khối 2 (6 danh mục) đổi từ lưới sang carousel coverflow | Yêu cầu của người dùng, kèm code mẫu |
| 26/10/2026 | 1.6 | Header trong suốt hòa vào ảnh Hero khi ở đầu trang, cuộn xuống thì chuyển sang nền kem. Hero kéo lên nằm dưới header | Yêu cầu của người dùng |
| 26/10/2026 | 1.5 | Thêm ảnh thứ 5 (bé sơ sinh, `hero-05.jpg`) vào carousel Hero | Yêu cầu của người dùng |
| 26/10/2026 | 1.4 | Hero đổi sang carousel ảnh nền toàn khung 4 ảnh, dải thẻ nhỏ góc dưới phải, hiệu ứng phóng to thẻ thành nền khi bấm hoặc tự chạy (F01 khối 1) | Yêu cầu của người dùng, kèm ảnh mẫu bố cục |
| 26/10/2026 | 1.3 | Landing page một trang: menu header/footer và nút Đặt lịch trên header cuộn tới section bằng anchor thay vì chuyển trang (mục 7) | Yêu cầu của người dùng |
| 23/10/2026 | 1.2 | Chốt phong cách Warm Editorial & Soft Minimalist (6.1–6.6), font, màu nhấn. Đặc tả chi tiết 8 khối trang chủ F01 và khay concept F07. Phát hiện SĐT cũ trên logo (G12). Tổ chức kho ảnh (10.2.1) | Yêu cầu của người dùng |
