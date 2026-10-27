# WEBQUEST - CHINH PHỤC CẨM NANG HỌC TẬP HIỆU QUẢ (V6)

Bản cập nhật mới nhất (V6) giữ nguyên bố cục và các mục của V5, chỉ cải tiến giao diện và chỉnh nội dung cho khớp với Kế hoạch dạy học Chuyên đề 10.2.

## 1. Cải tiến giao diện
- Font chữ **Be Vietnam Pro** (hiển thị dấu tiếng Việt rõ hơn). Khi không có mạng sẽ tự dùng font của máy.
- Header có họa tiết ô vở nhẹ; màu xanh cũ được làm dịu và đồng bộ hơn.
- Sidebar chia nhóm (Bắt đầu, 5 chặng thực hành, Kết thúc & tham khảo). 5 bài được nối thành **lộ trình**, bài đã hoàn thành đổi thành dấu ✓ xanh.
- **Thanh tiến độ** của nhóm (x/7 chặng) ở đầu sidebar, menu bám theo khi cuộn trang.
- Trang chủ có thêm **Lộ trình dự án** (5 bài và buổi báo cáo, kèm tiết và minh chứng), bấm vào để mở bài.
- Mỗi bài có dòng thẻ **Tiết, Yêu cầu cần đạt (YC), Minh chứng cần nộp**.
- Quy định AI chia rõ ✕ Không được dùng / ✓ Được dùng có điều kiện.
- Thêm hộp **"Bài này được đánh giá thế nào?"** ở từng bài, có nút mở thẳng tiêu chí chi tiết.
- Giao diện điện thoại: mục lục thu gọn thành nút "☰ Mục lục".
- Có thể gửi link thẳng tới từng bài, ví dụ `index.html#process-b2`, `index.html#evaluation`.

## 2. Chỉnh nội dung theo Kế hoạch dạy học
- Nhóm **4–5** thành viên (V5 ghi 4–6).
- Minh chứng đúng theo Bảng 1: Bài 2 thêm MC07; Bài 4 là MC05 (PPTX đa phương tiện và bảng nguồn cập nhật), MC06 (PPTX tương tác và ghi chép kiểm thử), MC07; Bài 5 là MC07 (nhật ký, bản nháp, tệp tích hợp) và MC08 (PPTX final, checklist, bảng lỗi – sửa lỗi – kiểm thử lại).
- Quy định AI đúng theo Bảng 2, bổ sung phần "không cho phép" ở Bài 4, Bài 5 và Báo cáo.
- Các bước của Bài 2, 3, 4 được chia theo từng tiết.
- Báo cáo: thêm bốc thăm vấn đáp, phiếu tự đánh giá, phiếu đánh giá đồng đẳng, nộp PPTX final và PDF.

## 3. Mục "Tiêu chí Đánh giá" được thiết kế lại
1. **Tổng quan đánh giá theo từng bài**: YCCĐ, minh chứng, phương pháp và công cụ đánh giá quá trình/sản phẩm (kèm mô tả YC1.1–YC3.3).
2. **Bảng kiểm quan sát quá trình** (Có/Chưa) cho Bài 1–4 và buổi Báo cáo. Bài 5 không có bảng kiểm vì kế hoạch chỉ đánh giá qua sản phẩm.
3. **Rubric sản phẩm** cho MC01–MC08, mỗi tiêu chí lấy đúng nội dung đánh giá trong Bảng 1, có 2 mức Đạt / Chưa đạt.
4. **Báo cáo kết quả**: vấn đáp, sản phẩm cuối, tự đánh giá, đánh giá đồng đẳng, cách tổng hợp điểm nhóm và điểm hợp tác cá nhân.

## Hướng dẫn cho giáo viên
Mở file `index.html` và thay các đường link sau:

| Vị trí | Thẻ cần sửa | Thay bằng |
|---|---|---|
| `id="task"` | `<a href="https://docs.google.com/spreadsheets/" class="btn-drive">` | Link Google Sheets đăng ký nhóm (để quyền chỉnh sửa) |
| `id="process-b1"` … `id="process-b5"` | `<a href="https://drive.google.com/" class="btn-drive">` | Link thư mục Drive nộp minh chứng của từng bài |
| Học liệu từng bài, mục Tài nguyên | Các thẻ `<a href="#">` | Link tài liệu, mẫu biểu tương ứng |
| `id="report"` | 3 nút: Phiếu tự đánh giá, Phiếu đánh giá đồng đẳng, Link nộp PPTX Final và PDF | Link Google Form / Drive tương ứng |
| `id="report"` | `<iframe src="https://padlet.com/embed/...">` | Link nhúng Padlet của lớp |

Trạng thái "Đã hoàn thành" chỉ lưu trên trình duyệt của máy đang dùng (LocalStorage). Nút "Xóa dữ liệu (Làm lại)" sẽ xóa trạng thái này.
