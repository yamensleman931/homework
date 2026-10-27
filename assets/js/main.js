document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const alertBox = document.getElementById('alertBox');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '' || email === '' || message === '') {
                showAlert('يرجى ملء جميع الحقول المطلوبة قبل الإرسال.', 'danger');
            } else if (!emailRegex.test(email)) {
                showAlert('يرجى إدخال بريد إلكتروني بصيغة صحيحة (مثال: name@example.com).', 'warning');
            } else {
                showAlert('تم إرسال رسالتك بنجاح! شكراً للتواصل مع فريق الدليل.', 'success');
                contactForm.reset();
            }
        });
    }

    function showAlert(msg, type) {
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');

    if (searchInput || categorySelect) {
        function filterEvents() {
            const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
            const categoryValue = categorySelect ? categorySelect.value : 'all';
            const items = document.querySelectorAll('.event-item');

            items.forEach(item => {
                const title = item.getAttribute('data-title').toLowerCase();
                const cat = item.getAttribute('data-category');

                const matchesSearch = title.includes(searchValue);
                const matchesCat = (categoryValue === 'all' || cat === categoryValue);

                if (matchesSearch && matchesCat) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        if (searchInput) searchInput.addEventListener('keyup', filterEvents);
        if (categorySelect) categorySelect.addEventListener('change', filterEvents);
    }
});