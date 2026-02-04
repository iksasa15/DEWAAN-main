// pages/home.js - الصفحة الرئيسية

function renderHomePage() {
    return `
        <!-- تذكير بالدعوى الجديدة -->
        <div class="alert alert-warning" style="margin-bottom: 24px; padding: 14px 20px; border-right-width: 6px; display: flex; align-items: center; justify-content: space-between; font-size: 14px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <svg class="icon-svg" style="color: var(--warning-500); width: 20px; height: 20px;" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span style="font-weight: 700; color: var(--gray-900);">المدعي: العنود الفيفي - المدعي عليه: وزارة الموارد البشرية</span>
                <span style="color: var(--gray-300);">|</span>
                <span><strong>الموضوع:</strong> إلغاء قرار إداري</span>
                <span style="color: var(--gray-300);">|</span>
                <span><strong>المحكمة:</strong> الإدارية بالرياض</span>
            </div>
            <button class="btn btn-sm btn-primary" style="padding: 6px 16px; font-size: 13px; height: auto;" onclick="navigateTo('cases')">التفاصيل</button>
        </div>

        <div class="hero-banner">
            <div class="hero-content">
                <h2 class="hero-title">مرحباً بك في مُعين</h2>
                <p class="hero-subtitle">خدمات قضائية ذكية مخصصة لكبار السن وذوي الهمم</p>
                <button class="btn btn-secondary" onclick="navigateTo('requests')">
                    <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    ابدأ بتقديم دعوى جديدة
                </button>
            </div>
        </div>
        
        
        <div class="services-grid">
            <div class="service-card" onclick="navigateTo('requests')">
                <div class="service-icon">
                    <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <h3 class="service-title">تقديم الطلبات</h3>
                <p class="service-desc">قدّم دعواك الإدارية إلكترونياً بخطوات بسيطة وواضحة</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم دعوى جديدة</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>إرفاق المستندات</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تعديل بيانات التبليغ</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    ابدأ الآن
                    <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </div>
            
            <div class="service-card" onclick="navigateTo('cases')">
                <div class="service-icon">
                    <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h3 class="service-title">القضايا</h3>
                <p class="service-desc">تابع سير قضاياك واطلع على مواعيد الجلسات</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>متابعة حالة القضية</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>حضور الجلسات إلكترونياً</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم المذكرات</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    عرض القضايا
                    <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </div>
            
            <div class="service-card" onclick="navigateTo('verdicts')">
                <div class="service-icon">
                    <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><path d="M14.5 2L3.5 13L11 20.5L22 9.5L14.5 2Z"/><path d="M8 18L3 23"/><path d="M15 11l-5 5"/></svg>
                </div>
                <h3 class="service-title">الأحكام</h3>
                <p class="service-desc">اطلع على الأحكام الصادرة وقدّم طلبات التنفيذ والاعتراض</p>
                <div class="service-features">
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>استعراض صك الحكم</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>طلب التنفيذ</span>
                    </div>
                    <div class="service-feature">
                        <span class="service-feature-icon">✓</span>
                        <span>تقديم الاعتراض</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block">
                    عرض الأحكام
                    <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </div>
        </div>
        
        <!-- إحصائيات سريعة -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="display: flex; align-items: center; gap: 8px;">
                    <svg class="icon-svg" style="color: var(--primary-600);" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    ملخص قضاياك
                </h3>
            </div>
            <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="text-align: center; padding: 20px; background: var(--info-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--info-500);">2</div>
                        <div style="color: var(--gray-600);">قضايا جارية</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--warning-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--warning-500);">1</div>
                        <div style="color: var(--gray-600);">في انتظار الجلسة</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--success-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--success-500);">1</div>
                        <div style="color: var(--gray-600);">أحكام صادرة</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: var(--primary-100); border-radius: 12px;">
                        <div style="font-size: 32px; font-weight: 700; color: var(--primary-600);">3</div>
                        <div style="color: var(--gray-600);">إجمالي القضايا</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}