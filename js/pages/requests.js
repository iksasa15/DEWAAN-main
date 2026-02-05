// pages/requests.js - صفحة تقديم الطلبات مع المساعد الذكي

// بيانات المساعد الذكي
const SmartAssistantData = {
    isActive: false,
    currentQuestion: 0,
    answers: {},
    questions: [
        {
            id: 'problem_type',
            question: 'ما هي طبيعة المشكلة التي تواجهها؟',
            icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
            options: [
                { value: 'decision', label: 'صدر قرار إداري ضدي', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
                { value: 'employment', label: 'مشكلة وظيفية (ترقية، راتب، فصل)', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
                { value: 'contract', label: 'خلاف على عقد مع جهة حكومية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>` },
                { value: 'compensation', label: 'أطالب بتعويض من جهة حكومية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="18" x2="12" y2="20"/><line x1="12" y1="4" x2="12" y2="6"/></svg>` },
                { value: 'service', label: 'حُرمت من خدمة أو رخصة', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
                { value: 'disciplinary', label: 'صدر بحقي جزاء تأديبي', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` }
            ]
        },
        {
            id: 'entity_type',
            question: 'ما هي الجهة التي لديك مشكلة معها؟',
            icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M3 7l9-4 9 4M5 21V11m14 10V11M9 21V11m6 21V11"/></svg>`,
            options: [
                { value: 'ministry', label: 'وزارة', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="18" y1="6" x2="6" y2="6"/><line x1="18" y1="10" x2="6" y2="10"/><line x1="18" y1="14" x2="6" y2="14"/></svg>` },
                { value: 'municipality', label: 'أمانة أو بلدية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect x="3" y="2" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="2"/></svg>` },
                { value: 'university', label: 'جامعة أو مؤسسة تعليمية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>` },
                { value: 'hospital', label: 'مستشفى أو جهة صحية حكومية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M19 14c1.49 0 2.87.47 4 1.26V8c0-1.1-.9-2-2-2h-5c0-1.66-1.34-3-3-3S10 4.34 10 6H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h8.26c-.79-1.13-1.26-2.51-1.26-4 0-3.87 3.13-7 7-7z"/><path d="M19 16h-2v2h-2v2h2v2h2v-2h2v-2h-2z"/></svg>` },
                { value: 'security', label: 'جهة أمنية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
                { value: 'other_gov', label: 'جهة حكومية أخرى', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M3 7l9-4 9 4M5 21V11m14 10V11M9 21V11m6 21V11"/></svg>` }
            ]
        },
        {
            id: 'time_passed',
            question: 'متى حدثت المشكلة أو صدر القرار؟',
            icon: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
            options: [
                { value: 'recent', label: 'خلال آخر 60 يوماً', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>` },
                { value: 'months', label: 'من 60 يوم إلى 6 أشهر', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
                { value: 'long', label: 'أكثر من 6 أشهر', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>` }
            ]
        },
        {
            id: 'grievance_filed',
            question: 'هل تقدمت بتظلم للجهة الإدارية؟',
            icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
            options: [
                { value: 'yes_responded', label: 'نعم، وتم الرد علي', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M16 19h6"/><path d="m19 16 3 3-3 3"/></svg>` },
                { value: 'yes_no_response', label: 'نعم، ولم يتم الرد خلال 60 يوماً', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
                { value: 'no', label: 'لا، لم أتقدم بتظلم', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>` }
            ]
        },
        {
            id: 'request_type',
            question: 'ماذا تريد من المحكمة؟',
            icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>`,
            options: [
                { value: 'cancel', label: 'إلغاء القرار الصادر ضدي', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>` },
                { value: 'compensation', label: 'تعويض مالي عن الضرر', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>` },
                { value: 'both', label: 'إلغاء القرار والتعويض معاً', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/><circle cx="12" cy="18" r="3"/></svg>` },
                { value: 'enforce', label: 'إلزام الجهة بتنفيذ شيء معين', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>` }
            ]
        }
    ],
    caseTypeMapping: {
        // تحديد نوع الدعوى بناءً على الإجابات
        'decision': { primary: 1, name: 'إلغاء قرار إداري', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
        'employment': { primary: 2, name: 'دعوى وظيفية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
        'contract': { primary: 3, name: 'عقود إدارية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>` },
        'compensation': { primary: 4, name: 'تعويضات', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="18" x2="12" y2="20"/><line x1="12" y1="4" x2="12" y2="6"/></svg>` },
        'service': { primary: 1, name: 'إلغاء قرار إداري', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
        'disciplinary': { primary: 5, name: 'دعوى تأديبية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>` }
    }
};

function renderRequestsPage() {
    return `
        <div class="hero-banner" style="padding: 24px 48px;">
            <div class="hero-content">
                <h2 class="hero-title">تقديم دعوى جديدة</h2>
                <p class="hero-subtitle">أكمل الخطوات التالية لتقديم دعواك الإدارية</p>
            </div>
        </div>
        
        <!-- اختيار طريقة تقديم الطلب -->
        <div id="submission-method-selection" class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                اختر طريقة تقديم الطلب
            </h3>
            <div class="submission-methods">
                <div class="method-card" role="button" tabindex="0" onclick="selectSubmissionMethod('smart')" onkeydown="if(event.key === 'Enter' || event.key === ' ') selectSubmissionMethod('smart')">
                    <div class="method-icon" aria-hidden="true">
                        <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                    </div>
                    <h4 class="method-title">المساعد الذكي</h4>
                    <p class="method-description">أجب على بعض الأسئلة البسيطة وسنساعدك في تحديد نوع الدعوى المناسبة وملء البيانات</p>
                    <div class="method-badge recommended">موصى به</div>
                </div>
                <div class="method-card" role="button" tabindex="0" onclick="selectSubmissionMethod('manual')" onkeydown="if(event.key === 'Enter' || event.key === ' ') selectSubmissionMethod('manual')">
                    <div class="method-icon" aria-hidden="true">
                        <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </div>
                    <h4 class="method-title">التقديم اليدوي</h4>
                    <p class="method-description">قم بملء جميع البيانات والخطوات يدوياً إذا كنت تعرف نوع الدعوى المطلوبة</p>
                    <div class="method-badge">للمتقدمين</div>
                </div>
            </div>
        </div>
        
        <!-- واجهة المساعد الذكي -->
        <div id="smart-assistant-container" style="display: none;">
            ${renderSmartAssistant()}
        </div>
        
        <!-- خطوات المعالج - 5 خطوات -->
        <div class="stepper" id="stepper" style="display: none;">
            <div class="step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">بيانات الأطراف</div>
            </div>
            <div class="step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">تصنيف الدعوى</div>
            </div>
            <div class="step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">المستندات</div>
            </div>
            <div class="step" data-step="4">
                <div class="step-number">4</div>
                <div class="step-label">التحقق</div>
            </div>
            <div class="step" data-step="5">
                <div class="step-number">5</div>
                <div class="step-label">الإرسال</div>
            </div>
        </div>
        
        <!-- محتوى الخطوات -->
        <div id="step-content" style="display: none;">
            ${renderStep1()}
        </div>
        
        <!-- أزرار التنقل -->
        <div class="form-section" style="display: none; justify-content: space-between;" id="navigation-buttons">
            <button class="btn btn-secondary" id="prev-btn" onclick="prevStep()" style="visibility: hidden;">
                <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                السابق
            </button>
            <button class="btn btn-primary" id="next-btn" onclick="nextStep()">
                التالي
                <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
        </div>
    `;
}

function renderSmartAssistant() {
    return `
        <div class="smart-assistant-wrapper">
            <!-- رأس المساعد الذكي -->
            <div class="assistant-header">
                <div class="assistant-avatar">
                    <div class="avatar-icon">
                        <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                    </div>
                    <div class="avatar-pulse"></div>
                </div>
                <div class="assistant-info">
                    <h3>المساعد الذكي</h3>
                    <p>سأساعدك في تحديد نوع الدعوى المناسبة لحالتك</p>
                </div>
                <button class="btn btn-outline btn-sm" onclick="exitSmartAssistant()">
                    <svg class="icon-svg" style="margin-left: 4px;" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    إلغاء
                </button>
            </div>
            
            <!-- شريط التقدم -->
            <div class="assistant-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="assistant-progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text" id="assistant-progress-text">السؤال 1 من ${SmartAssistantData.questions.length}</div>
            </div>
            
            <!-- محتوى السؤال -->
            <div id="assistant-question-container">
                ${renderAssistantQuestion(0)}
            </div>
            
            <!-- أزرار التنقل -->
            <div class="assistant-navigation">
                <button class="btn btn-secondary" id="assistant-prev-btn" onclick="prevAssistantQuestion()" style="visibility: hidden;">
                    <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    السابق
                </button>
                <button class="btn btn-primary" id="assistant-next-btn" onclick="nextAssistantQuestion()" disabled>
                    التالي
                    <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </div>
        </div>
    `;
}

function renderAssistantQuestion(questionIndex) {
    const question = SmartAssistantData.questions[questionIndex];
    const selectedAnswer = SmartAssistantData.answers[question.id];

    return `
        <div class="assistant-question-card">
            <div class="question-header">
                <span class="question-icon">${question.icon}</span>
                <h3 class="question-text">${question.question}</h3>
            </div>
            <div class="options-grid" role="radiogroup" aria-label="${question.question}">
                ${question.options.map(option => `
                    <div class="option-card ${selectedAnswer === option.value ? 'selected' : ''}" 
                         role="radio"
                         aria-checked="${selectedAnswer === option.value}"
                         tabindex="0"
                         onclick="selectAssistantOption('${question.id}', '${option.value}')"
                         onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectAssistantOption('${question.id}', '${option.value}'); }">
                        <div class="option-icon" aria-hidden="true">${option.icon}</div>
                        <div class="option-label">${option.label}</div>
                        <div class="option-check" aria-hidden="true">✓</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderAssistantResult() {
    const result = analyzeAnswers();

    return `
        <div class="assistant-result-card">
            <div class="result-header">
                <div class="result-icon">
                    <svg class="icon-svg icon-svg-lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <h3>تحليل حالتك</h3>
            </div>
            
            <div class="result-recommendation">
                <div class="recommendation-badge">
                    <div style="width: 20px; height: 20px; display: flex; align-items: center;">${result.caseType.icon}</div>
                    نوع الدعوى المقترح
                </div>
                <h2 class="recommendation-title">${result.caseType.name}</h2>
                <p class="recommendation-description">${result.description}</p>
            </div>
            
            ${result.warnings.length > 0 ? `
                <div class="result-warnings">
                    <h4>⚠️ تنبيهات مهمة</h4>
                    <ul>
                        ${result.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${result.tips.length > 0 ? `
                <div class="result-tips">
                    <h4>💡 نصائح</h4>
                    <ul>
                        ${result.tips.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="result-summary">
                <h4>📋 ملخص إجاباتك</h4>
                <div class="summary-grid">
                    ${Object.entries(SmartAssistantData.answers).map(([key, value]) => {
        const question = SmartAssistantData.questions.find(q => q.id === key);
        const option = question.options.find(o => o.value === value);
        return `
                            <div class="summary-item">
                                <span class="summary-icon">${question.icon}</span>
                                <div class="summary-content">
                                    <div class="summary-label">${question.question}</div>
                                    <div class="summary-value">${option.label}</div>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn btn-primary btn-lg" onclick="proceedWithRecommendation(${result.caseType.primary})">
                    <span>✅</span>
                    متابعة تقديم الدعوى
                </button>
                <button class="btn btn-outline" onclick="restartAssistant()">
                    <span>🔄</span>
                    إعادة الأسئلة
                </button>
            </div>
        </div>
    `;
}

function analyzeAnswers() {
    const answers = SmartAssistantData.answers;
    const mapping = SmartAssistantData.caseTypeMapping;

    // تحديد نوع الدعوى الأساسي
    let caseType = mapping[answers.problem_type] || mapping['decision'];
    let warnings = [];
    let tips = [];
    let description = '';

    // تحليل الإجابات وتقديم النصائح
    switch (answers.problem_type) {
        case 'decision':
            description = 'دعوى لإلغاء قرار إداري صادر من جهة حكومية تراه مخالفاً للنظام أو مضراً بمصالحك.';
            break;
        case 'employment':
            description = 'دعوى متعلقة بحقوقك الوظيفية كموظف حكومي، سواء كانت ترقية أو راتب أو إنهاء خدمة.';
            break;
        case 'contract':
            description = 'دعوى تتعلق بعقد أبرمته مع جهة حكومية ونشأ خلاف حول تنفيذه أو تفسيره.';
            break;
        case 'compensation':
            description = 'دعوى للمطالبة بتعويض مالي عن ضرر لحق بك نتيجة تصرف أو قرار من جهة حكومية.';
            break;
        case 'service':
            description = 'دعوى لإلغاء قرار رفض منحك خدمة أو رخصة كان يحق لك الحصول عليها.';
            break;
        case 'disciplinary':
            description = 'دعوى للطعن في جزاء تأديبي صادر بحقك من جهة عملك الحكومية.';
            caseType = { primary: 5, name: 'دعوى تأديبية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>` };
            break;
    }

    // تحذيرات بناءً على الوقت
    if (answers.time_passed === 'long') {
        warnings.push('مضى أكثر من 6 أشهر على القرار، قد يكون هناك مشكلة في قبول الدعوى من حيث المدة. ننصح باستشارة محامي.');
    } else if (answers.time_passed === 'months') {
        warnings.push('تأكد من تقديم الدعوى في أقرب وقت لتجنب مشاكل المدة النظامية.');
    }

    // تحذيرات بناءً على التظلم
    if (answers.grievance_filed === 'no') {
        warnings.push('في بعض الحالات يُشترط التظلم للجهة الإدارية قبل رفع الدعوى. ننصح بالتحقق من ذلك.');
        tips.push('يمكنك تقديم تظلم للجهة الإدارية أولاً وانتظار الرد قبل رفع الدعوى.');
    }

    // نصائح عامة
    tips.push('احتفظ بنسخ من جميع المستندات والمراسلات.');
    tips.push('تأكد من صحة بيانات الجهة المدعى عليها.');

    if (answers.request_type === 'compensation' || answers.request_type === 'both') {
        tips.push('قم بتوثيق جميع الأضرار المادية والمعنوية التي لحقت بك.');
    }

    return {
        caseType,
        description,
        warnings,
        tips
    };
}

// وظائف التحكم في المساعد الذكي
function selectSubmissionMethod(method) {
    const selectionDiv = document.getElementById('submission-method-selection');
    const assistantDiv = document.getElementById('smart-assistant-container');
    const stepperDiv = document.getElementById('stepper');
    const stepContentDiv = document.getElementById('step-content');
    const navButtonsDiv = document.getElementById('navigation-buttons');

    if (method === 'smart') {
        SmartAssistantData.isActive = true;
        SmartAssistantData.currentQuestion = 0;
        SmartAssistantData.answers = {};

        selectionDiv.style.display = 'none';
        assistantDiv.style.display = 'block';
        stepperDiv.style.display = 'none';
        stepContentDiv.style.display = 'none';
        navButtonsDiv.style.display = 'none';
    } else {
        SmartAssistantData.isActive = false;
        selectionDiv.style.display = 'none';
        assistantDiv.style.display = 'none';
        stepperDiv.style.display = 'flex';
        stepContentDiv.style.display = 'block';
        navButtonsDiv.style.display = 'flex';
    }
}

function exitSmartAssistant() {
    const selectionDiv = document.getElementById('submission-method-selection');
    const assistantDiv = document.getElementById('smart-assistant-container');

    SmartAssistantData.isActive = false;
    SmartAssistantData.currentQuestion = 0;
    SmartAssistantData.answers = {};

    selectionDiv.style.display = 'block';
    assistantDiv.style.display = 'none';
}

function selectAssistantOption(questionId, value) {
    SmartAssistantData.answers[questionId] = value;

    // تحديث واجهة الخيارات
    const container = document.getElementById('assistant-question-container');
    container.innerHTML = renderAssistantQuestion(SmartAssistantData.currentQuestion);

    // تفعيل زر التالي
    const nextBtn = document.getElementById('assistant-next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextAssistantQuestion() {
    const currentQ = SmartAssistantData.questions[SmartAssistantData.currentQuestion];

    // التحقق من اختيار إجابة
    if (!SmartAssistantData.answers[currentQ.id]) {
        showNotification('الرجاء اختيار إجابة للمتابعة', 'error');
        return;
    }

    SmartAssistantData.currentQuestion++;

    if (SmartAssistantData.currentQuestion >= SmartAssistantData.questions.length) {
        // عرض النتيجة
        showAssistantResult();
    } else {
        updateAssistantUI();
    }
}

function prevAssistantQuestion() {
    if (SmartAssistantData.currentQuestion > 0) {
        SmartAssistantData.currentQuestion--;
        updateAssistantUI();
    }
}

function updateAssistantUI() {
    const container = document.getElementById('assistant-question-container');
    const progressFill = document.getElementById('assistant-progress-fill');
    const progressText = document.getElementById('assistant-progress-text');
    const prevBtn = document.getElementById('assistant-prev-btn');
    const nextBtn = document.getElementById('assistant-next-btn');

    const currentIndex = SmartAssistantData.currentQuestion;
    const totalQuestions = SmartAssistantData.questions.length;
    const currentQ = SmartAssistantData.questions[currentIndex];

    // تحديث المحتوى
    container.innerHTML = renderAssistantQuestion(currentIndex);

    // تحديث شريط التقدم
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `السؤال ${currentIndex + 1} من ${totalQuestions}`;

    // تحديث الأزرار
    prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    nextBtn.disabled = !SmartAssistantData.answers[currentQ.id];
    nextBtn.innerHTML = currentIndex === totalQuestions - 1
        ? `<svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> عرض النتيجة`
        : 'التالي <svg class="icon-svg" style="margin-right: 8px; transform: rotate(180deg);" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
}

function showAssistantResult() {
    const container = document.getElementById('assistant-question-container');
    const progressFill = document.getElementById('assistant-progress-fill');
    const progressText = document.getElementById('assistant-progress-text');
    const navDiv = document.querySelector('.assistant-navigation');

    // تحديث شريط التقدم
    progressFill.style.width = '100%';
    progressText.innerHTML = 'اكتمل التحليل <svg class="icon-svg" style="margin-right: 4px; width: 14px; height: 14px;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';

    // إخفاء أزرار التنقل
    navDiv.style.display = 'none';

    // عرض النتيجة
    container.innerHTML = renderAssistantResult();
}

function restartAssistant() {
    SmartAssistantData.currentQuestion = 0;
    SmartAssistantData.answers = {};

    const navDiv = document.querySelector('.assistant-navigation');
    navDiv.style.display = 'flex';

    updateAssistantUI();
}

function proceedWithRecommendation(caseTypeId) {
    // حفظ نوع الدعوى المختار
    if (typeof AppData !== 'undefined') {
        AppData.selectedCaseType = caseTypeId;
    }

    // الانتقال للنموذج العادي
    const assistantDiv = document.getElementById('smart-assistant-container');
    const stepperDiv = document.getElementById('stepper');
    const stepContentDiv = document.getElementById('step-content');
    const navButtonsDiv = document.getElementById('navigation-buttons');

    assistantDiv.style.display = 'none';
    stepperDiv.style.display = 'flex';
    stepContentDiv.style.display = 'block';
    navButtonsDiv.style.display = 'flex';

    // تحديث خطوة تصنيف الدعوى لتكون محددة مسبقاً
    showNotification('تم تحديد نوع الدعوى بناءً على إجاباتك. يمكنك تعديله إذا رغبت.', 'success');
}

function renderStep1() {
    const data = (typeof AppData !== 'undefined' && AppData.formData) ? AppData.formData : {};

    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                بيانات المدعي
            </h3>
            <div class="party-card">
                <div class="party-header">
                    <div class="party-title">
                        <svg class="icon-svg" style="margin-left: 8px; width: 18px; height: 18px;" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        المدعي
                    </div>
                    <span class="party-badge">شخص طبيعي</span>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">رقم الهوية / الإقامة</label>
                        <div class="input-wrapper">
                            <input type="text" class="form-control" name="party_id" placeholder="أدخل رقم الهوية" value="${data.party_id || ''}">
                            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'party_id')" aria-label="تفعيل الكتابة الصوتية">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">الاسم الكامل</label>
                        <input type="text" class="form-control" name="party_name" value="${data.party_name || 'العنود الفيفي'}" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">رقم الجوال</label>
                        <div class="input-wrapper">
                            <input type="tel" class="form-control" name="party_phone" placeholder="05xxxxxxxx" value="${data.party_phone || ''}">
                            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'party_phone')" aria-label="تفعيل الكتابة الصوتية">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">البريد الإلكتروني</label>
                        <div class="input-wrapper">
                            <input type="email" class="form-control" name="party_email" placeholder="example@email.com" value="${data.party_email || ''}">
                            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'party_email')" aria-label="تفعيل الكتابة الصوتية">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label required">العنوان</label>
                    <div class="input-wrapper">
                        <input type="text" class="form-control" name="party_address" placeholder="المدينة، الحي، الشارع" value="${data.party_address || ''}">
                        <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'party_address')" aria-label="تفعيل الكتابة الصوتية">
                            <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
                </div>
                بيانات الوكيل (اختياري)
            </h3>
            <div class="checkbox-group" style="margin-bottom: 20px;">
                <input type="checkbox" class="checkbox" id="has-agent" name="has_agent" onchange="toggleAgentForm()" ${data.has_agent ? 'checked' : ''}>
                <label for="has-agent">لدي وكيل / محامي</label>
            </div>
            <div id="agent-form" style="display: ${data.has_agent ? 'block' : 'none'};">
                <div class="party-card">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label required">رقم رخصة المحاماة</label>
                            <div class="input-wrapper">
                                <input type="text" class="form-control" name="agent_license" placeholder="أدخل رقم الرخصة" value="${data.agent_license || ''}">
                                <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'agent_license')" aria-label="تفعيل الكتابة الصوتية">
                                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label required">اسم المحامي</label>
                            <div class="input-wrapper">
                                <input type="text" class="form-control" name="agent_name" placeholder="الاسم الكامل" value="${data.agent_name || ''}">
                                <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'agent_name')" aria-label="تفعيل الكتابة الصوتية">
                                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label required">رقم الجوال</label>
                            <div class="input-wrapper">
                                <input type="tel" class="form-control" name="agent_phone" placeholder="05xxxxxxxx" value="${data.agent_phone || ''}">
                                <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'agent_phone')" aria-label="تفعيل الكتابة الصوتية">
                                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">رقم الوكالة</label>
                            <div class="input-wrapper">
                                <input type="text" class="form-control" name="agent_doc" placeholder="رقم صك الوكالة" value="${data.agent_doc || ''}">
                                <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'agent_doc')" aria-label="تفعيل الكتابة الصوتية">
                                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M3 7l9-4 9 4M5 21V11m14 10V11M9 21V11m6 21V11"/></svg>
                </div>
                بيانات المدعى عليه (الجهة الإدارية)
            </h3>
            <div class="party-card">
                <div class="party-header">
                    <div class="party-title">
                        <svg class="icon-svg" style="margin-left: 8px; width: 18px; height: 18px;" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M3 7l9-4 9 4M5 21V11m14 10V11M9 21V11m6 21V11"/></svg>
                        الجهة الإدارية
                    </div>
                    <span class="party-badge" style="background: var(--danger-100); color: var(--danger-500);">جهة حكومية</span>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">اسم الجهة</label>
                        <select class="form-control form-select" name="defendant_entity">
                            <option value="">اختر الجهة الإدارية</option>
                            <option value="1" ${data.defendant_entity === '1' ? 'selected' : ''}>وزارة الموارد البشرية والتنمية الاجتماعية</option>
                            <option value="2" ${data.defendant_entity === '2' ? 'selected' : ''}>وزارة المالية</option>
                            <option value="3" ${data.defendant_entity === '3' ? 'selected' : ''}>وزارة التعليم</option>
                            <option value="4" ${data.defendant_entity === '4' ? 'selected' : ''}>وزارة الصحة</option>
                            <option value="5" ${data.defendant_entity === '5' ? 'selected' : ''}>أمانة منطقة الرياض</option>
                            <option value="6" ${data.defendant_entity === '6' ? 'selected' : ''}>أمانة منطقة مكة المكرمة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الإدارة / الفرع</label>
                        <div class="input-wrapper">
                            <input type="text" class="form-control" name="defendant_dept" placeholder="اسم الإدارة أو الفرع" value="${data.defendant_dept || ''}">
                            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'defendant_dept')" aria-label="تفعيل الكتابة الصوتية">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="addDefendant()">
                <svg class="icon-svg" style="margin-left: 6px;" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                إضافة مدعى عليه آخر
            </button>
        </div>
    `;
}

function renderStep2() {
    const selectedType = typeof AppData !== 'undefined' && AppData.selectedCaseType ? AppData.selectedCaseType : null;
    const data = (typeof AppData !== 'undefined' && AppData.formData) ? AppData.formData : {};

    // Use saved case type if available and no smart assistant selection
    const currentCaseType = data.case_type ? parseInt(data.case_type) : selectedType;

    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                تصنيف الدعوى
            </h3>
            
            ${selectedType ? `
                <div class="alert alert-success" style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px; border-radius: 12px;">
                    <svg class="icon-svg" style="color: var(--success-500);" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    <div>تم تحديد نوع الدعوى بناءً على إجاباتك في المساعد الذكي. يمكنك تغييره إذا رغبت.</div>
                </div>
            ` : ''}
            
            <div class="form-group">
                <label class="form-label required">نوع الدعوى</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 12px;">
                    ${AppData.caseTypes.map(type => `
                        <label class="party-card ${currentCaseType === type.id ? 'selected-type' : ''}" style="cursor: pointer; margin: 0; padding: 16px;">
                            <input type="radio" name="case_type" value="${type.id}" style="display: none;" ${currentCaseType === type.id ? 'checked' : ''}>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 24px; height: 24px; display: flex; align-items: center;">${type.icon}</div>
                                <span style="font-weight: 600;">${type.name}</span>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                تفاصيل الدعوى
            </h3>
            <div class="form-group">
                <label class="form-label required">موضوع الدعوى</label>
                <div class="input-wrapper">
                    <input type="text" class="form-control" name="case_subject" placeholder="اكتب عنواناً مختصراً للدعوى" value="${data.case_subject || ''}">
                    <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'case_subject')" aria-label="تفعيل الكتابة الصوتية">
                        <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label required">وقائع الدعوى</label>
                <div class="input-wrapper">
                    <textarea class="form-control" name="case_details" rows="5" placeholder="اشرح تفاصيل الدعوى ووقائعها بشكل مفصل...">${data.case_details || ''}</textarea>
                    <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'case_details')" aria-label="تفعيل الكتابة الصوتية" style="top: 20px; transform: none;">
                        <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </button>
                </div>
                <div class="form-hint">اذكر التسلسل الزمني للأحداث والوقائع المتعلقة بالدعوى</div>
            </div>
            <div class="form-group">
                <label class="form-label required">الطلبات</label>
                <div class="input-wrapper">
                    <textarea class="form-control" name="case_requests" rows="3" placeholder="حدد طلباتك من المحكمة بشكل واضح...">${data.case_requests || ''}</textarea>
                    <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'case_requests')" aria-label="تفعيل الكتابة الصوتية" style="top: 20px; transform: none;">
                        <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">رقم القرار المطعون فيه</label>
                    <div class="input-wrapper">
                        <input type="text" class="form-control" name="decision_number" placeholder="إن وجد" value="${data.decision_number || ''}">
                        <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'decision_number')" aria-label="تفعيل الكتابة الصوتية">
                            <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">تاريخ القرار</label>
                    <input type="date" class="form-control" name="decision_date" value="${data.decision_date || ''}">
                </div>
            </div>
        </div>
    `;
}

function renderStep3() {
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </div>
                المستندات والمرفقات
            </h3>
            
            <div class="alert alert-info" style="display: flex; align-items: center; gap: 12px; border-radius: 12px;">
                <svg class="icon-svg" style="color: var(--info-500);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <div>
                    <strong>المستندات المطلوبة:</strong>
                    صورة الهوية، صورة القرار المطعون فيه، أي مستندات داعمة للدعوى
                </div>
            </div>
            
            <div class="file-upload-area" id="file-upload-area">
                <div class="file-upload-icon">
                    <svg class="icon-svg icon-svg-lg" style="opacity: 0.5;" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div class="file-upload-text">اسحب الملفات وأفلتها هنا أو انقر للاختيار</div>
                <div class="file-upload-hint">PDF, JPG, PNG - الحد الأقصى 10 ميجابايت لكل ملف</div>
                <input type="file" id="file-input" multiple accept=".pdf,.jpg,.jpeg,.png" style="display: none;">
            </div>
            
            <div class="file-list" id="file-list">
                ${typeof renderFileList === 'function' ? renderFileList() : ''}
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2H2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2H12z"/><path d="M2 7h16"/><path d="M12 2v12"/></svg>
                </div>
                وصف المستندات
            </h3>
            <div id="file-descriptions">
                ${typeof AppData !== 'undefined' && AppData.uploadedFiles ? AppData.uploadedFiles.map((file, index) => `
                    <div class="form-group">
                        <label class="form-label">${file.name}</label>
                        <div class="input-wrapper">
                            <input type="text" class="form-control" name="file_desc_${index}" placeholder="وصف المستند">
                            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, 'file_desc_${index}')" aria-label="تفعيل الكتابة الصوتية">
                                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            </button>
                        </div>
                    </div>
                `).join('') : ''}
            </div>
        </div>
    `;
}

// ✅ الخطوة الجديدة - التحقق من البيانات
function renderStep4() {
    const data = (typeof AppData !== 'undefined' && AppData.formData) ? AppData.formData : {};

    // التأكد من استدعاء التحقق لتحديث الحالة
    validateRequestData();
    const isComplete = AppData.verificationStatus.status === 'verified';

    // تجميع الحقول الناقصة للعرض
    let requiredFields = [...REQUEST_REQUIRED_FIELDS];
    if (!requiredFields.find(f => f.name === 'case_type')) {
        requiredFields.push({ name: 'case_type', label: 'نوع الدعوى', type: 'select', options: AppData.caseTypes.map(t => ({ value: t.id, label: t.name })) });
    }

    const missingFields = requiredFields.filter(field => !data[field.name] || data[field.name].trim() === '');

    // تحديث حالة الزر التالي فوراً
    setTimeout(updateNavigationButtons, 0);

    // إذا كانت البيانات مكتملة
    if (isComplete) {
        return `
            <div class="form-section" style="text-align: center; padding: 48px;">
                <div style="margin-bottom: 24px;">
                    <svg class="icon-svg icon-svg-xl" style="color: var(--success-500); width: 64px; height: 64px;" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 style="margin-bottom: 12px; color: var(--success-700);">بياناتك مكتملة!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">تم التحقق من اكتمال جميع البيانات المطلوبة.</p>
                <div class="alert alert-success" style="display: inline-flex; align-items: center; gap: 8px;">
                     يمكنك الانتقال للخطوة التالية لتقديم الدعوى
                </div>
            </div>
         `;
    }

    // إذا كانت هناك حقول ناقصة
    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon" style="background: var(--warning-100); color: var(--warning-600);">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                استكمال البيانات الناقصة
            </h3>
            
            <div class="alert alert-warning" style="margin-bottom: 24px; border-radius: 12px;">
                 يرجى تعبئة الحقول التالية لاستكمال طلبك.
            </div>
            
            <div class="party-card" style="border-color: var(--warning-200);">
                ${missingFields.map(field => `
                    <div class="form-group">
                        <label class="form-label required">${field.label}</label>
                        ${renderFieldInput(field)}
                    </div>
                `).join('')}
            </div>
            
            <div class="form-hint" style="margin-top: 16px; text-align: center;">
                اضغط "التالي" أو انتقل للخطوة التالية لحفظ البيانات والتحقق مرة أخرى
            </div>
        </div>
    `;
}

function renderFieldInput(field) {
    if (field.type === 'textarea') {
        return `
            <div class="input-wrapper">
                <textarea class="form-control" name="${field.name}" rows="3" placeholder="أدخل ${field.label}..."></textarea>
                <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, '${field.name}')" aria-label="تفعيل الكتابة الصوتية" style="top: 20px; transform: none;">
                    <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
            </div>`;
    }
    if (field.type === 'select') {
        return `
            <select class="form-control form-select" name="${field.name}">
                <option value="">اختر ${field.label}</option>
                ${field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
        `;
    }
    return `
        <div class="input-wrapper">
            <input type="${field.type}" class="form-control" name="${field.name}" placeholder="أدخل ${field.label}">
            <button type="button" class="mic-btn" onclick="voiceInputController.toggleRecording(this, '${field.name}')" aria-label="تفعيل الكتابة الصوتية">
                <svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
        </div>`;
}



// الخطوة الأخيرة - التأكيد والإرسال
function renderStep5() {
    // التحقق من حالة التحقق قبل السماح بالإرسال
    const isVerified = typeof AppData !== 'undefined' && AppData.verificationStatus.status === 'verified';

    return `
        <div class="form-section">
            <h3 class="section-title">
                <div class="section-icon">
                    <svg class="icon-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                مراجعة البيانات والتأكيد
            </h3>
            
            ${!isVerified ? `
                <div class="alert alert-danger" style="display: flex; align-items: center; gap: 12px; border-radius: 12px;">
                    <svg class="icon-svg" style="color: var(--danger-500);" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <div>
                        <strong>تنبيه:</strong> يجب إتمام خطوة التحقق قبل تقديم الدعوى. 
                        <a href="#" onclick="goToStep(4); return false;" style="color: inherit; text-decoration: underline;">العودة لخطوة التحقق</a>
                    </div>
                </div>
            ` : `
                <div class="alert alert-success" style="display: flex; align-items: center; gap: 12px; border-radius: 12px;">
                    <svg class="icon-svg" style="color: var(--success-500);" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    <div>تم التحقق من بياناتك بنجاح! يمكنك الآن إتمام تقديم الدعوى.</div>
                </div>
            `}
            
            <div class="alert alert-warning" style="display: flex; align-items: center; gap: 12px; border-radius: 12px;">
                <svg class="icon-svg" style="color: var(--warning-500);" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <div>يرجى مراجعة جميع البيانات قبل إرسال الطلب. لن تتمكن من تعديل البيانات بعد الإرسال.</div>
            </div>
            
            <div class="party-card">
                <h4 style="margin-bottom: 16px; color: var(--primary-700);">📋 ملخص الدعوى</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">المدعي</div>
                        <div style="font-weight: 600;">العنود الفيفي</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">المدعى عليه</div>
                        <div style="font-weight: 600;">وزارة الموارد البشرية</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">نوع الدعوى</div>
                        <div style="font-weight: 600;">إلغاء قرار إداري</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">عدد المرفقات</div>
                        <div style="font-weight: 600;">${typeof AppData !== 'undefined' && AppData.uploadedFiles ? AppData.uploadedFiles.length : 0} ملفات</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 13px;">حالة التحقق</div>
                        <div style="font-weight: 600; color: ${isVerified ? 'var(--success-500)' : 'var(--danger-500)'};">
                            ${isVerified ? '✅ تم التحقق' : '❌ لم يتم التحقق'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="checkbox-group" style="margin-top: 20px;">
                <input type="checkbox" class="checkbox" id="terms-agree" required ${!isVerified ? 'disabled' : ''}>
                <label for="terms-agree">أقر بصحة جميع البيانات المدخلة وأتحمل المسؤولية الكاملة عن ذلك</label>
            </div>
            
            <div class="checkbox-group">
                <input type="checkbox" class="checkbox" id="notify-agree" ${!isVerified ? 'disabled' : ''}>
                <label for="notify-agree">أوافق على استلام الإشعارات عبر البريد الإلكتروني والرسائل النصية</label>
            </div>
        </div>
        
        <div class="form-section" style="text-align: center;">
            <button class="btn btn-success btn-lg" onclick="submitCase()" ${!isVerified ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                <svg class="icon-svg" style="margin-left: 8px;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                تقديم الدعوى
            </button>
            ${!isVerified ? '<p style="color: var(--text-muted); margin-top: 12px;">يجب إتمام التحقق أولاً</p>' : ''}
        </div>
    `;
}



function goToStep(stepNumber) {
    if (typeof AppData !== 'undefined') {
        AppData.currentStep = stepNumber;
    }
    if (typeof updateStepContent === 'function') {
        updateStepContent();
    }
    if (typeof updateStepperUI === 'function') {
        updateStepperUI();
    }
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');

    // في خطوة التحقق، لا يمكن المتابعة إلا بعد التحقق
    if (typeof AppData !== 'undefined' && AppData.currentStep === 4 && nextBtn) {
        const isVerified = AppData.verificationStatus.status === 'verified';
        nextBtn.disabled = !isVerified;
        nextBtn.style.opacity = isVerified ? '1' : '0.5';
        nextBtn.style.cursor = isVerified ? 'pointer' : 'not-allowed';
    }
}

function toggleAgentForm() {
    const agentForm = document.getElementById('agent-form');
    const checkbox = document.getElementById('has-agent');
    if (agentForm && checkbox) {
        agentForm.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function addDefendant() {
    showNotification('سيتم إضافة نموذج مدعى عليه إضافي', 'info');
}

function submitCase() {
    // التحقق من حالة التحقق
    if (typeof AppData !== 'undefined' && AppData.verificationStatus.status !== 'verified') {
        showNotification('يجب إتمام خطوة التحقق قبل تقديم الدعوى', 'error');
        return;
    }

    const termsCheckbox = document.getElementById('terms-agree');
    if (!termsCheckbox || !termsCheckbox.checked) {
        showNotification('يجب الموافقة على الإقرار قبل تقديم الدعوى', 'error');
        return;
    }

    showNotification('جاري تقديم الدعوى...', 'info');

    setTimeout(() => {
        if (typeof showSuccessModal === 'function') {
            showSuccessModal();
        }
    }, 1500);
}

// دالة showNotification (في حال عدم وجودها)
function showNotification(message, type) {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}

// حفظ بيانات الخطوة الحالية
function saveStepData() {
    if (typeof AppData === 'undefined') return;
    if (!AppData.formData) AppData.formData = {};

    const container = document.getElementById('step-content');
    if (!container) return;

    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (!input.name) return;

        if (input.type === 'checkbox') {
            AppData.formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) AppData.formData[input.name] = input.value;
        } else {
            AppData.formData[input.name] = input.value;
        }
    });

    // التحقق من صحة البيانات وتحديث الحالة
    if (typeof validateRequestData === 'function') {
        validateRequestData();
    }
}

// تعريف الحقول المطلوبة وقواعد التحقق
const REQUEST_REQUIRED_FIELDS = [
    { name: 'party_id', label: 'رقم الهوية / الإقامة', type: 'text' },
    { name: 'party_phone', label: 'رقم الجوال', type: 'tel' },
    { name: 'party_email', label: 'البريد الإلكتروني', type: 'email' },
    { name: 'party_address', label: 'العنوان', type: 'text' },
    {
        name: 'defendant_entity', label: 'الجهة الإدارية', type: 'select', options: [
            { value: '1', label: 'وزارة الموارد البشرية والتنمية الاجتماعية' },
            { value: '2', label: 'وزارة المالية' },
            { value: '3', label: 'وزارة التعليم' },
            { value: '4', label: 'وزارة الصحة' },
            { value: '5', label: 'أمانة منطقة الرياض' },
            { value: '6', label: 'أمانة منطقة مكة المكرمة' }
        ]
    },
    // case_type يتم التعامل معه بشكل خاص لأنه قد يأتي من AppData.caseTypes
    { name: 'case_subject', label: 'موضوع الدعوى', type: 'text' },
    { name: 'case_details', label: 'وقائع الدعوى', type: 'textarea' },
    { name: 'case_requests', label: 'الطلبات', type: 'textarea' }
];

function validateRequestData() {
    if (typeof AppData === 'undefined') return false;

    const data = AppData.formData || {};

    // إضافة case_type للقائمة ديناميكياً
    const allFields = [...REQUEST_REQUIRED_FIELDS];
    if (typeof AppData.caseTypes !== 'undefined' && !allFields.find(f => f.name === 'case_type')) {
        allFields.push({ name: 'case_type', label: 'نوع الدعوى', type: 'select', options: AppData.caseTypes.map(t => ({ value: t.id, label: t.name })) });
    }

    const missingFields = allFields.filter(field => !data[field.name] || data[field.name].trim() === '');
    const isComplete = missingFields.length === 0;

    AppData.verificationStatus.status = isComplete ? 'verified' : 'pending';
    return isComplete;
}