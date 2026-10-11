# Bảng hình học

App dựng hình và viết tay bằng S Pen cho giáo viên Toán. Chèn PDF/ảnh đề bài và viết trực tiếp lên trang.

## Tải về cài trên Galaxy (APK)

Vào mục **Releases** ở cột bên phải trang này → bản mới nhất → bấm file `bang-hinh-hoc-1.x.apk` để tải.
Mở file vừa tải trên Galaxy → cho phép cài từ nguồn này → **Cài đặt**.
Bản mới cài đè lên bản cũ được, bài giảng trong app vẫn giữ.

Trong bản APK, "Lưu bài thành file" và "Xuất ảnh" mở bảng chia sẻ của Android: chọn Drive, My Files,
Quick Share (sang máy Mac) hoặc Gmail để lưu file.

## Phát hành bản mới

Thay file `bang-hinh-hoc.html` trong kho này (Add file → Upload files → kéo file mới vào → Commit changes).
GitHub tự build APK mới trong khoảng 5–10 phút (xem tiến độ ở tab **Actions**), rồi đăng lên Releases.
Muốn build lại mà không đổi gì: Actions → Build APK → Run workflow.

## Dùng bản web (tùy chọn)

Settings → Pages → Branch: `main`, thư mục `/ (root)` → Save. Sau 1–2 phút có địa chỉ
`https://<tên-tài-khoản>.github.io/<tên-kho>/`, mở bằng Chrome trên Galaxy → ⋮ → Cài đặt ứng dụng.
Bài giảng của bản web và bản APK lưu riêng; chuyển qua lại bằng "Lưu bài thành file" / "Mở bài đã lưu (file)".

## Trong kho có gì

| Đường dẫn | Nội dung |
| --- | --- |
| `bang-hinh-hoc.html` | App (một file duy nhất). Chỉ cần thay file này khi có bản mới. |
| `index.html`, `manifest.webmanifest`, `sw.js`, `icon-*.png` | Phần cài bản web (PWA). |
| `android-app/` | Cấu hình đóng gói APK bằng Capacitor 6: `prepare.js` (chép app, đặt phiên bản), `apk-bridge.js` (lưu file qua bảng chia sẻ, chỉ có trong APK), `res-icon/` (biểu tượng app). |
| `.github/workflows/build-apk.yml` | Quy trình GitHub tự build APK và đăng lên Releases. |

Khóa ký APK nằm trong secret `ANDROID_DEBUG_KEYSTORE` (Settings → Secrets and variables → Actions), không nằm trong kho.
Mọi bản APK phải ký cùng một khóa thì mới cài đè lên nhau được; đừng xóa hay đổi secret này.
