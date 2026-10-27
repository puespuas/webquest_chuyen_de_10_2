
// Khởi tạo các hàm hỗ trợ LocalStorage (có try/catch để không lỗi khi trình duyệt chặn lưu trữ)
function saveData(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* bỏ qua */ }
}
function loadData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

// Các chặng được tính vào thanh tiến độ
const PROGRESS_STEPS = ['task', 'process-b1', 'process-b2', 'process-b3', 'process-b4', 'process-b5', 'report'];

// Hiện một section theo id
function showSection(targetId) {
    const targetSec = document.getElementById(targetId);
    if (!targetSec || !targetSec.classList.contains('section')) return false;

    // Đổi class active ở menu
    document.querySelectorAll('.sidebar ul li a').forEach(el => el.classList.remove('active'));
    const menuLink = document.querySelector(`.sidebar ul li a[data-target="${targetId}"]`);
    if (menuLink) {
        menuLink.classList.add('active');
        const label = menuLink.querySelector('.nav-label');
        const current = document.getElementById('menu-current');
        if (label && current) current.textContent = label.textContent;
    }

    // Hiện/ẩn sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    targetSec.classList.remove('hidden');
    targetSec.classList.remove('is-entering');
    void targetSec.offsetWidth; // khởi động lại hiệu ứng
    targetSec.classList.add('is-entering');

    // Ghi lên thanh địa chỉ để có thể gửi link thẳng tới từng bài (vd: index.html#process-b2)
    try { history.replaceState(null, '', '#' + targetId); } catch (e) { /* bỏ qua khi mở file trực tiếp */ }
    return true;
}

// Cuộn lên đầu phần nội dung khi chuyển trang
function scrollToContent() {
    const layout = document.querySelector('.layout');
    if (layout && window.scrollY > layout.offsetTop) {
        window.scrollTo({ top: layout.offsetTop, behavior: 'smooth' });
    }
}

// Xử lý điều hướng SPA
document.querySelectorAll('.sidebar ul li a, .nav-btn').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        if (!showSection(targetId)) return;

        // Đóng menu trên điện thoại
        document.querySelector('.sidebar')?.classList.remove('open');
        document.getElementById('menu-toggle')?.setAttribute('aria-expanded', 'false');

        // Mở sẵn tiêu chí tương ứng (từ nút "Xem đầy đủ tiêu chí Bài X")
        const openIds = (this.getAttribute('data-open') || '').split(',').filter(Boolean);
        if (openIds.length) {
            document.querySelectorAll('details.acc').forEach(d => d.classList.remove('highlight'));
            openIds.forEach(id => {
                const d = document.getElementById(id.trim());
                if (d) { d.open = true; d.classList.add('highlight'); }
            });
            const first = document.getElementById(openIds[0].trim());
            if (first) setTimeout(() => first.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        } else {
            scrollToContent();
        }
    });
});

// Nút mở/đóng mục lục trên điện thoại
document.getElementById('menu-toggle')?.addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const isOpen = sidebar.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Xử lý nút Đánh dấu hoàn thành
window.toggleComplete = function(sectionId) {
    let completedStatus = loadData('webquest_completed') || {};

    // Đảo ngược trạng thái
    completedStatus[sectionId] = !completedStatus[sectionId];
    saveData('webquest_completed', completedStatus);

    // Cập nhật giao diện
    updateCompletionUI(sectionId, completedStatus[sectionId]);
    updateProgress(completedStatus);
}

function updateCompletionUI(sectionId, isComplete) {
    const btn = document.getElementById(`btn-complete-${sectionId}`);
    const icon = document.getElementById(`status-${sectionId}`);
    const menuLink = document.querySelector(`.sidebar ul li a[data-target="${sectionId}"]`);
    const roadmapItem = document.querySelector(`.roadmap-item[data-target="${sectionId}"]`);

    if (btn) {
        // Giữ lại nhãn gốc của từng nút (vd: "Đánh dấu đã hoàn thành Bài 1")
        if (!btn.dataset.label) btn.dataset.label = btn.innerText;
        if (isComplete) {
            btn.classList.add('completed');
            btn.innerText = "Đã hoàn thành";
        } else {
            btn.classList.remove('completed');
            btn.innerText = btn.dataset.label;
        }
    }

    if (icon) {
        icon.innerText = isComplete ? "✓" : "";
    }
    if (menuLink) menuLink.classList.toggle('done', !!isComplete);
    if (roadmapItem) roadmapItem.classList.toggle('done', !!isComplete);
}

// Cập nhật thanh tiến độ ở sidebar
function updateProgress(completedStatus) {
    const done = PROGRESS_STEPS.filter(id => completedStatus[id]).length;
    const count = document.getElementById('progress-count');
    const fill = document.getElementById('progress-fill');
    const bar = document.getElementById('progress-bar');
    if (count) count.textContent = `${done}/${PROGRESS_STEPS.length}`;
    if (fill) fill.style.width = `${(done / PROGRESS_STEPS.length) * 100}%`;
    if (bar) bar.setAttribute('aria-valuenow', done);
}

// Tải dữ liệu khi mở trang
function loadAllForms() {
    // Lưu nhãn gốc của các nút trước khi đổi trạng thái
    document.querySelectorAll('.btn-complete').forEach(btn => { btn.dataset.label = btn.innerText; });

    // Tải trạng thái hoàn thành
    const completedStatus = loadData('webquest_completed') || {};
    Object.keys(completedStatus).forEach(secId => {
        updateCompletionUI(secId, completedStatus[secId]);
    });
    updateProgress(completedStatus);
}

// Khởi chạy khi load
document.addEventListener('DOMContentLoaded', () => {
    loadAllForms();

    // Mở đúng trang nếu đường link có #ten-muc
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    if (!hash || !showSection(hash)) showSection('home');
    window.addEventListener('hashchange', () => {
        const id = decodeURIComponent(location.hash.replace('#', ''));
        if (id) showSection(id);
    });

    // Nút xóa dữ liệu
    document.getElementById('btn-clear-data').addEventListener('click', () => {
        if(confirm("Bạn có chắc muốn xóa trạng thái hoàn thành đã lưu trên trình duyệt này không?")) {
            try { localStorage.removeItem('webquest_completed'); } catch (e) { /* bỏ qua */ }
            alert("Đã xóa. Trang sẽ tải lại.");
            location.reload();
        }
    });
});
