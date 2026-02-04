// pages/verdicts.js - صفحة الأحكام

function renderVerdictsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">الأحكام</h2>
                <p class="hero-subtitle">استعرض الأحكام الصادرة وقدّم طلبات التنفيذ أو الاعتراض</p>
            </div>
        </div>
        
        <!-- قائمة الأحكام -->
        ${AppData.verdicts.map(verdict => renderVerdictCard(verdict)).join('')}
        
        ${AppData.verdicts.length === 0 ? `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <svg class="icon-svg icon-svg-xl" style="opacity: 0.2;" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>
                </div>
                <h3 class="empty-state-title">لا توجد أحكام</h3>
                <p class="empty-state-text">لم تصدر أي أحكام في قضاياك حتى الآن</p>
            </div>
        ` : ''}
    `;
}

function renderVerdictCard(verdict) {
    return `
        <div class="verdict-card">
            <div class="verdict-header">
                <h3 class="verdict-title">
                    <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>
                    ${verdict.type}
                </h3>
                <div class="verdict-meta">
                    <span>
                        <svg class="icon-svg" style="margin-left: 4px; width: 14px; height: 14px;" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        رقم الحكم: ${verdict.id}
                    </span>
                    <span>
                        <svg class="icon-svg" style="margin-left: 4px; width: 14px; height: 14px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        تاريخ الصدور: ${verdict.date}
                    </span>
                    <span>
                        <svg class="icon-svg" style="margin-left: 4px; width: 14px; height: 14px;" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M3 7l9-4 9 4M5 21V11m14 10V11M9 21V11m6 21V11"/></svg>
                        ${verdict.court}
                    </span>
                </div>
            </div>
            <div class="verdict-body">
                <div class="verdict-content">
                    <strong>منطوق الحكم:</strong><br>
                    ${verdict.summary}
                </div>
                
                ${verdict.canAppeal ? `
                    <div class="alert alert-warning" style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; border-radius: 12px;">
                        <svg class="icon-svg" style="margin-top: 4px; color: var(--warning-500);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <div>
                            <strong>مهلة الاعتراض:</strong> ينتهي موعد الاعتراض في ${verdict.appealDeadline}
                        </div>
                    </div>
                ` : ''}
                
                <div class="verdict-actions">
                    <button class="btn btn-primary" onclick="viewVerdictDocument('${verdict.id}')">
                        <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        عرض صك الحكم
                    </button>
                    <button class="btn btn-success" onclick="requestExecution('${verdict.id}')">
                        <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        طلب التنفيذ
                    </button>
                    ${verdict.canAppeal ? `
                        <button class="btn btn-outline" onclick="openObjectionModal('${verdict.id}')">
                            <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            تقديم اعتراض
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function viewVerdictDocument(verdictId) {
    // إعادة التوجيه إلى صفحة عرض الحكم
    window.location.href = `verdict-view.html?id=${verdictId}`;
}

function requestExecution(verdictId) {
    showNotification('جاري فتح نموذج طلب التنفيذ...', 'info');
}

function submitObjection() {
    showNotification('تم تقديم الاعتراض بنجاح', 'success');
}