// pages/cases.js - صفحة القضايا

function renderCasesPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">القضايا</h2>
                <p class="hero-subtitle">تابع سير قضاياك واطلع على مواعيد الجلسات</p>
            </div>
        </div>
        
        <!-- فلاتر -->
        <div class="card" style="margin-bottom: 24px;">
            <div class="card-body">
                <div class="form-row">
                    <div class="form-group" style="margin-bottom: 0; position: relative; flex: 1;">
                        <input type="text" class="form-control" placeholder="البحث برقم القضية..." style="padding-right: 40px;">
                        <svg class="icon-svg" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-400); width: 18px; height: 18px;" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <select class="form-control form-select">
                            <option value="">جميع الحالات</option>
                            <option value="active">جارية</option>
                            <option value="pending">في الانتظار</option>
                            <option value="completed">منتهية</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <select class="form-control form-select">
                            <option value="">جميع المحاكم</option>
                            <option value="riyadh">الرياض</option>
                            <option value="jeddah">جدة</option>
                            <option value="dammam">الدمام</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- قائمة القضايا -->
        <div class="cases-list">
            ${AppData.cases.map(caseItem => renderCaseCard(caseItem)).join('')}
        </div>
    `;
}

function renderCaseCard(caseItem) {
    const statusClass = caseItem.status === 'active' ? 'active' :
        caseItem.status === 'pending' ? 'pending' : 'completed';

    return `
        <div class="case-card">
            <div class="case-header">
                <div class="case-number">
                    <svg class="icon-svg" style="margin-left: 8px; width: 16px; height: 16px;" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    ${caseItem.id}
                </div>
                <span class="case-status ${statusClass}">${caseItem.statusText}</span>
            </div>
            <div class="case-details">
                <div class="case-detail">
                    <span class="case-detail-label">نوع الدعوى</span>
                    <span class="case-detail-value">${caseItem.type}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المحكمة</span>
                    <span class="case-detail-value">${caseItem.court}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المدعي</span>
                    <span class="case-detail-value">${caseItem.plaintiff}</span>
                </div>
                <div class="case-detail">
                    <span class="case-detail-label">المدعى عليه</span>
                    <span class="case-detail-value">${caseItem.defendant}</span>
                </div>
                ${caseItem.nextSession ? `
                    <div class="case-detail">
                        <span class="case-detail-label">الجلسة القادمة</span>
                        <span class="case-detail-value">${caseItem.nextSession} - ${caseItem.sessionTime}</span>
                    </div>
                ` : ''}
            </div>
            <div class="case-actions">
                <button class="btn btn-primary btn-sm" onclick="viewCaseDetails('${caseItem.id}')">
                    <svg class="icon-svg" style="margin-left: 6px;" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    عرض التفاصيل
                </button>
                ${caseItem.nextSession ? `
                    <button class="btn btn-success btn-sm">
                        <svg class="icon-svg" style="margin-left: 6px;" viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                        رابط الجلسة
                    </button>
                ` : ''}
                <button class="btn btn-outline btn-sm">
                    <svg class="icon-svg" style="margin-left: 6px;" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    تقديم مذكرة
                </button>
            </div>
        </div>
    `;
}

function viewCaseDetails(caseId) {
    showNotification(`عرض تفاصيل القضية ${caseId}`, 'info');
}

function initCaseFilters() {
    // تهيئة فلاتر القضايا
}