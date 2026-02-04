// data.js - البيانات

const AppData = {
    currentSection: 'home',
    currentStep: 1,
    totalSteps: 5, // تم تغييرها من 4 إلى 5

    // حالة التحقق
    verificationStatus: {
        status: 'pending', // pending, in_progress, verified, rejected
        employeeName: '',
        employeeId: '',
        verificationCode: '',
        notes: ''
    },

    // بيانات النموذج
    formData: {},

    caseTypes: [
        { id: 1, name: 'دعاوى الاستحقاق', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>` },
        { id: 2, name: 'إلغاء القرار الإداري', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>` },
        { id: 3, name: 'التعويض', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 1v22m5-18H7h10ZM7 17h10H7Z"/></svg>` },
        { id: 4, name: 'العقود الإدارية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/></svg>` },
        { id: 5, name: 'الدعاوى التأديبية', icon: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 7V3M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>` }
    ],

    cases: [
        {
            id: 'QC-2025-001542',
            type: 'إلغاء قرار إداري',
            court: 'المحكمة الإدارية بالرياض',
            status: 'active',
            statusText: 'جارية',
            filingDate: '2025-01-10',
            nextSession: '2025-01-25',
            sessionTime: '09:30 صباحاً',
            plaintiff: 'العنود الفيفي',
            defendant: 'وزارة الموارد البشرية'
        },
        {
            id: 'QC-2025-001328',
            type: 'تعويض',
            court: 'المحكمة الإدارية بجدة',
            status: 'pending',
            statusText: 'في انتظار الجلسة',
            filingDate: '2025-01-05',
            nextSession: '2025-02-01',
            sessionTime: '11:00 صباحاً',
            plaintiff: 'شركة النور للمقاولات',
            defendant: 'أمانة منطقة مكة المكرمة'
        },
        {
            id: 'QC-2024-008721',
            type: 'عقد إداري',
            court: 'المحكمة الإدارية بالدمام',
            status: 'completed',
            statusText: 'صدر الحكم',
            filingDate: '2024-11-15',
            verdictDate: '2025-01-12',
            plaintiff: 'مؤسسة الفجر التجارية',
            defendant: 'وزارة المالية'
        }
    ],

    verdicts: [
        {
            id: 'VRD-2025-0542',
            caseId: 'QC-2024-008721',
            type: 'حكم ابتدائي',
            date: '2025-01-12',
            court: 'المحكمة الإدارية بالدمام',
            result: 'قبول الدعوى',
            summary: 'حكمت المحكمة بإلزام المدعى عليها بدفع مبلغ وقدره (500,000) خمسمائة ألف ريال للمدعية، مع إلزامها بدفع أتعاب المحاماة.',
            canAppeal: true,
            appealDeadline: '2025-02-12'
        }
    ],

    objectionReasons: [
        { id: 1, name: 'مخالفة أحكام الشريعة الإسلامية' },
        { id: 2, name: 'مخالفة النظام' },
        { id: 3, name: 'الخطأ في تطبيق النظام' },
        { id: 4, name: 'عدم الاختصاص' },
        { id: 5, name: 'تنازع الاختصاص' },
        { id: 6, name: 'القصور في التسبيب' },
        { id: 7, name: 'الإخلال بحق الدفاع' }
    ],

    uploadedFiles: []
};