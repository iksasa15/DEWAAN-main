// components/modals.js - النوافذ المنبثقة

function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header" style="background: var(--success-500); color: white; display: flex; align-items: center; gap: 12px; padding: 20px 24px;">
                <svg class="icon-svg" style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <h3 class="modal-title" style="margin: 0; color: white;">تم تقديم الدعوى بنجاح</h3>
            </div>
            <div class="modal-body" style="text-align: center; padding: 40px 24px;">
                <div style="margin-bottom: 24px; display: flex; justify-content: center;">
                    <svg class="icon-svg icon-svg-xl" style="color: var(--success-500);" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                </div>
                <h3 style="margin-bottom: 12px; font-size: 24px;">تهانينا!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    تم تقديم دعواك بنجاح وسيتم مراجعتها من قبل المحكمة المختصة
                </p>
                <div class="party-card" style="text-align: right;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span style="color: var(--text-muted);">رقم الطلب:</span>
                        <strong style="color: var(--primary-700);">REQ-2025-001987</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted);">تاريخ التقديم:</span>
                        <strong>${new Date().toLocaleDateString('ar-SA')}</strong>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); navigateTo('cases');">
                    متابعة القضايا
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove(); navigateTo('home');">
                    العودة للرئيسية
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openObjectionModal(verdictId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header" style="display: flex; align-items: center; gap: 12px; padding: 20px 24px;">
                <svg class="icon-svg" style="color: var(--primary-700);" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <h3 class="modal-title" style="margin: 0;">تقديم اعتراض</h3>
                <button class="modal-close" style="margin-right: auto;" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label required">جهة الاعتراض</label>
                    <select class="form-control form-select">
                        <option value="">اختر جهة الاعتراض</option>
                        <option value="appeal">محكمة الاستئناف الإدارية</option>
                        <option value="supreme">المحكمة الإدارية العليا</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label required">أسباب الاعتراض</label>
                    ${AppData.objectionReasons.map(reason => `
                        <div class="checkbox-group" style="margin-bottom: 8px;">
                            <input type="checkbox" class="checkbox" id="reason-${reason.id}">
                            <label for="reason-${reason.id}">${reason.name}</label>
                        </div>
                    `).join('')}
                </div>
                <div class="form-group">
                    <label class="form-label required">تفاصيل الاعتراض</label>
                    <textarea class="form-control" rows="4" placeholder="اشرح أسباب اعتراضك بالتفصيل..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="submitObjection(); this.closest('.modal-overlay').remove();">
                    تقديم الاعتراض
                </button>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove();">
                    إلغاء
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}