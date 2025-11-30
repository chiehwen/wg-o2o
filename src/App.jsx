import React, { useState, useEffect } from 'react';



// --- Theme & Data ---

const THEME = {

  primary: 'bg-red-600',

  primaryText: 'text-red-600',

  secondary: 'bg-gray-900',

  secondaryText: 'text-gray-900',

  accent: 'bg-gray-100',

  slideBg: 'bg-white',

};

// 3個月方案數據 (Base Case)

const REVENUE_DATA_3M = [

    { name: '內部會員轉購', 現金收入: 1350, 後續價值LTV: 1080, amt: 2430 },

    { name: '外部市場開發', 現金收入: 450, 後續價值LTV: 360, amt: 810 },

];

// 6個月方案數據 (High Value Case)

const REVENUE_DATA_6M = [

    { name: '內部會員轉購', 現金收入: 2700, 後續價值LTV: 1080, amt: 3780 },

    { name: '外部市場開發', 現金收入: 900, 後續價值LTV: 360, amt: 1260 },

];

// --- Icons (Custom SVG Component) ---

const Icon = ({ name, size = 24, className = "" }) => {

    const icons = {

        ChevronLeft: <path d="M15 18l-6-6 6-6" />,

        ChevronRight: <path d="M9 18l6-6-6-6" />,

        Gift: <g><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></g>,

        Users: <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></g>,

        TrendingUp: <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />,

        DollarSign: <g><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></g>,

        Clock: <g><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></g>,

        FileText: <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></g>,

        Globe: <g><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></g>,

        ShoppingCart: <g><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></g>,

        CheckCircle: <g><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></g>,

        BarChart3: <g><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></g>,

        Target: <g><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></g>,

        ShieldCheck: <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></g>,

        Calendar: <g><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></g>,

        ClipboardList: <g><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></g>,

        CreditCard: <g><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></g>,

        UserPlus: <g><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></g>,

        AlertCircle: <g><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></g>,

        Info: <g><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></g>,

        Dumbbell: <g><path d="M6.5 6.5l11 11" /><path d="M21 21l-1-1" /><path d="M3 3l1 1" /><path d="M18 22l4-4" /><path d="M2 6l4-4" /><path d="M3 10l7-7" /><path d="M14 21l7-7" /></g>,

        Crown: <g><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></g>,

        Star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,

        Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,

        Send: <g><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></g>,

        MessageSquare: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,

        Calculator: <g><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></g>,

        Lightbulb: <g><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 16.5 8 4.5 4.5 0 0 0 12 3.5 4.5 4.5 0 0 0 7.5 8a4.65 4.65 0 0 0 2.45 3.9c.56.63 1 .98 1.14 1.7" /></g>,

        Tag: <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />,

        Printer: <g><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></g>,

        Monitor: <g><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></g>

    };

    return (

        <svg 

            xmlns="http://www.w3.org/2000/svg" 

            width={size} 

            height={size} 

            viewBox="0 0 24 24" 

            fill="none" 

            stroke="currentColor" 

            strokeWidth="2" 

            strokeLinecap="round" 

            strokeLinejoin="round"

            className={className}

        >

            {icons[name] || <circle cx="12" cy="12" r="10" />}

        </svg>

    );

};

// --- Custom Simple Bar Chart ---

const CustomBarChart = ({ data, maxValueOverride }) => {

    const maxValue = maxValueOverride || Math.max(...data.map(d => d.amt));

    

    return (

        <div className="w-full h-full flex items-end justify-center space-x-12 px-8 pb-4 pt-10">

            {data.map((item, index) => (

                <div key={index} className="flex flex-col items-center group w-1/3">

                    <div className="relative w-full flex flex-col justify-end h-32 sm:h-40">

                        {/* Permanent Total Label */}

                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 shadow-md">

                            總計: {item.amt} 萬

                        </div>

                        

                        {/* Stacked Bars */}

                        {/* LTV Bar (Top) */}

                        <div 

                            className="w-full bg-gray-700 rounded-t-lg transition-all duration-500 relative flex items-center justify-center border-b border-gray-600"

                            style={{ height: `${(item.後續價值LTV / maxValue) * 100}%` }}

                        >

                            <span className="text-white text-xs font-bold">{item.後續價值LTV} 萬</span>

                        </div>

                        {/* Cash Bar (Bottom) */}

                        <div 

                            className="w-full bg-red-600 rounded-b-sm transition-all duration-500 relative flex items-center justify-center"

                            style={{ height: `${(item.現金收入 / maxValue) * 100}%` }}

                        >

                            <span className="text-white text-xs font-bold">{item.現金收入} 萬</span>

                        </div>

                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-700 text-center">{item.name}</p>

                </div>

            ))}

            

            {/* Legend */}

            <div className="absolute top-0 right-0 flex flex-col space-y-2 text-xs bg-white p-2 rounded shadow-sm border border-gray-100">

                <div className="flex items-center">

                    <div className="w-3 h-3 bg-gray-700 mr-2 rounded-sm"></div>

                    <span>後續轉化 (LTV)</span>

                </div>

                <div className="flex items-center">

                    <div className="w-3 h-3 bg-red-600 mr-2 rounded-sm"></div>

                    <span>預收現金 (Cash)</span>

                </div>

            </div>

        </div>

    );

};

// --- Components ---

const TotalRevenueDisplay = ({ qty, cash, ltv, total }) => (

    <div className="flex justify-center space-x-4 mt-2 pb-4 px-4 w-full">

        <div className="text-center p-2 bg-red-50 rounded-lg border border-red-100 flex-1">

            <p className="text-gray-500 text-xs">預估總銷量</p>

            <p className="text-xl font-bold text-gray-800">{qty} <span className="text-xs font-normal">張</span></p>

        </div>

        <div className="text-center p-2 bg-red-50 rounded-lg border border-red-100 flex-1">

            <p className="text-gray-500 text-xs">預收現金流</p>

            <p className="text-xl font-bold text-red-600">${cash} <span className="text-xs font-normal">萬</span></p>

        </div>

        <div className="text-center p-2 bg-gray-50 rounded-lg border border-gray-200 flex-1">

            <p className="text-gray-500 text-xs">後續轉化效益</p>

            <p className="text-xl font-bold text-gray-700">${ltv} <span className="text-xs font-normal">萬</span></p>

        </div>

        <div className="text-center p-2 bg-gray-100 rounded-lg border border-gray-200 flex-1">

            <p className="text-gray-500 text-xs">總體營收效益</p>

            <p className="text-xl font-bold text-gray-800">${total} <span className="text-xs font-normal">萬</span></p>

        </div>

    </div>

);

const PitchBadge = ({ text }) => (

    <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded inline-flex items-center mt-1 border border-yellow-200">

        <Icon name="Lightbulb" size={12} className="mr-1 text-yellow-600"/>

        <span className="font-bold">{text}</span>

    </div>

);

const App = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const [isPrintMode, setIsPrintMode] = useState(false);

    const totalSlides = 13; // Updated slide count

    const nextSlide = () => {

        if (currentSlide < totalSlides - 1) setCurrentSlide(curr => curr + 1);

    };

    const prevSlide = () => {

        if (currentSlide > 0) setCurrentSlide(curr => curr - 1);

    };

    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.key === 'ArrowRight') nextSlide();

            if (e.key === 'ArrowLeft') prevSlide();

        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [currentSlide]);

    const renderSlideContent = (index) => {

        switch (index) {

            case 0:

                return (

                    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">

                        <div className="bg-red-600 p-4 rounded-full mb-4">

                            <Icon name="Gift" size={64} className="text-white" />

                        </div>

                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">

                            WorldGym 新成長動能<br />

                            <span className="text-red-600">「會籍禮物卡」導入提案</span>

                        </h1>

                        <div className="h-1 w-32 bg-gray-300 rounded"></div>

                        <p className="text-2xl text-gray-600">

                            解鎖銀髮市場與外部贈禮商機<br />打造 O2O 獲客新模式

                        </p>

                        <p className="text-sm text-gray-400 mt-12">報告人：木柵店 | 2025 年</p>

                    </div>

                );

            case 1:

                return (

                    <div className="h-full flex flex-col px-12 py-8 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-8 text-gray-800">執行摘要 Executive Summary</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">

                                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center"><Icon name="Target" className="mr-2"/> 核心機會</h3>

                                <ul className="space-y-4 text-lg text-gray-700">

                                    <li className="flex items-start"><Icon name="CheckCircle" size={20} className="mr-2 mt-1 text-green-500 shrink-0"/> 解決長輩「抗拒推銷」與「價格敏感」痛點。</li>

                                    <li className="flex items-start"><Icon name="CheckCircle" size={20} className="mr-2 mt-1 text-green-500 shrink-0"/> 滿足龐大的「健康贈禮」市場需求。</li>

                                </ul>

                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">

                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><Icon name="TrendingUp" className="mr-2 text-red-600"/> 預期效益</h3>

                                <ul className="space-y-4 text-lg text-gray-700">

                                    <li className="flex items-start"><Icon name="CheckCircle" size={20} className="mr-2 mt-1 text-green-500 shrink-0"/> 首年預估營收效益 &gt; 3,000 萬。</li>

                                    <li className="flex items-start"><Icon name="CheckCircle" size={20} className="mr-2 mt-1 text-green-500 shrink-0"/> 建立「低獲客成本」的新銷售漏斗。</li>

                                </ul>

                            </div>

                        </div>

                        <div className="mt-6 bg-red-600 text-white p-4 rounded-lg text-center text-xl flex flex-col items-center justify-center">

                            <span className="font-bold">策略目標：將隱性需求轉化為顯性營收</span>

                            <span className="text-sm opacity-90 mt-1">「把想運動但不敢來的長輩，變成我們的忠實會員」</span>

                        </div>

                    </div>

                );

            case 2:

                return (

                    <div className="h-full flex flex-col px-12 py-8 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-8 text-gray-800">現況挑戰與痛點 Pain Points</h2>

                        <p className="text-xl text-gray-600 mb-8">為何長輩難以入會？存在三大隱形阻力：</p>

                        

                        <div className="grid grid-cols-3 gap-6">

                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center hover:-translate-y-1 transition-transform">

                                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">

                                    <Icon name="Clock" size={32} className="text-red-600" />

                                </div>

                                <h3 className="text-xl font-bold mb-2">時間協調困難</h3>

                                <p className="text-gray-600">子女需陪同辦理，雙方時間難喬，導致決策無限延宕。</p>

                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-800 text-center hover:-translate-y-1 transition-transform">

                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">

                                    <Icon name="DollarSign" size={32} className="text-gray-800" />

                                </div>

                                <h3 className="text-xl font-bold mb-2">價格心理門檻</h3>

                                <p className="text-gray-600">長輩現場看到費用易感到心疼，即使子女代付也常遭拒絕。</p>

                                <PitchBadge text="核心痛點：不好意思當面讓子女花錢" />

                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 text-center hover:-translate-y-1 transition-transform">

                                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">

                                    <Icon name="FileText" size={32} className="text-red-600" />

                                </div>

                                <h3 className="text-xl font-bold mb-2">流程繁瑣壓力</h3>

                                <p className="text-gray-600">定型化契約複雜、簽署流程長，造成高齡者心理負擔。</p>

                            </div>

                        </div>

                        <div className="text-center mt-6 text-gray-500 italic">

                            戰略洞察：解決「心理負擔」比解決「金錢問題」更重要。

                        </div>

                    </div>

                );

            case 3:

                return (

                    <div className="h-full flex flex-col px-12 py-8 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-8 text-gray-800">解決方案：機制與形式</h2>

                        

                        <div className="flex-col md:flex-row gap-8 h-full flex">

                            <div className="flex-1 space-y-6">

                                <h3 className="text-2xl font-bold text-red-600 mb-4">核心產品機制</h3>

                                <div className="space-y-4">

                                    <div className="flex items-center p-4 bg-white shadow rounded-lg">

                                        <div className="bg-gray-800 text-white p-2 rounded mr-4">預付制</div>

                                        <div>

                                            <span className="text-lg block">購買者一次付清，受贈者無付款壓力。</span>

                                            <PitchBadge text="先結帳，再享受：分離決策與體驗" />

                                        </div>

                                    </div>

                                    <div className="flex items-center p-4 bg-white shadow rounded-lg">

                                        <div className="bg-gray-800 text-white p-2 rounded mr-4">彈性啟用</div>

                                        <span className="text-lg">享一年優惠效期（期滿視為現金抵用，需補差額）。</span>

                                    </div>

                                    <div className="flex items-center p-4 bg-white shadow rounded-lg">

                                        <div className="bg-gray-800 text-white p-2 rounded mr-4">鎖定業績</div>

                                        <span className="text-lg">非購買者不得退現，大幅降低合約糾紛。</span>

                                    </div>

                                </div>

                            </div>

                            <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-center">

                                <h3 className="text-2xl font-bold text-gray-800 mb-6">禮物卡形式 (Form Factors)</h3>

                                <div className="grid grid-cols-1 gap-6">

                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-600">

                                        <div className="flex items-center mb-2">

                                            <Icon name="Gift" className="text-red-600 mr-2" />

                                            <span className="font-bold text-lg">實體精美禮卡 (Physical)</span>

                                        </div>

                                        <p className="text-gray-600 text-sm">高質感包裝，適合親自交付的儀式感。內含啟用指南與專屬序號。</p>

                                    </div>

                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-800">

                                        <div className="flex items-center mb-2">

                                            <Icon name="Send" className="text-gray-800 mr-2" />

                                            <span className="font-bold text-lg">電子虛擬禮卡 (Digital)</span>

                                        </div>

                                        <p className="text-gray-600 text-sm">Email / LINE 即時發送，適合遠距贈禮或最後一刻的驚喜。</p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                );

            case 4:

                return (

                    <div className="h-full flex flex-col px-12 py-4 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-4 text-gray-800">產品陣容 Product Lineup</h2>

                        <p className="text-gray-600 mb-4 -mt-2">針對不同預算與需求的送禮選擇</p>

                        

                        <div className="grid grid-cols-2 gap-4 flex-1">

                            {/* Card 1: Entry */}

                            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition relative">

                                <div className="bg-gray-100 p-3 flex justify-between items-center">

                                    <span className="font-bold text-gray-700 flex items-center"><Icon name="Star" size={18} className="mr-1 text-yellow-500"/> 單月體驗卡 (Lite)</span>

                                    <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">低門檻</span>

                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-center">

                                    <div className="text-center mb-3">

                                        <p className="text-3xl font-extrabold text-gray-800">1 <span className="text-base font-normal text-gray-500">個月會籍</span></p>

                                    </div>

                                    <ul className="text-sm text-gray-600 space-y-1">

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-green-500 mr-2"/> 全台單點通行</li>

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-green-500 mr-2"/> 贈送 1 堂教練體驗 (InBody)</li>

                                    </ul>

                                </div>

                                <div className="absolute bottom-3 right-3 flex flex-col items-end">

                                    <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full mb-0.5">售價</span>

                                    <span className="text-lg font-extrabold text-gray-700">$1,000</span>

                                </div>

                            </div>

                            {/* Card 2: Standard */}

                            <div className="bg-white rounded-xl shadow-md border border-red-100 overflow-hidden flex flex-col hover:shadow-lg transition relative">

                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg z-10">熱銷推薦</div>

                                <div className="bg-red-50 p-3 pr-20 flex justify-between items-center">

                                    <span className="font-bold text-red-800 flex items-center"><Icon name="Zap" size={18} className="mr-1 text-red-600"/> 定期養成卡 (Standard)</span>

                                    <span className="text-xs bg-red-100 px-2 py-1 rounded text-red-600">習慣建立</span>

                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-center">

                                    <div className="text-center mb-3">

                                        <p className="text-3xl font-extrabold text-red-600">3 / 6 <span className="text-base font-normal text-gray-500">個月會籍</span></p>

                                    </div>

                                    <ul className="text-sm text-gray-600 space-y-1">

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-red-500 mr-2"/> 免入會費優惠</li>

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-red-500 mr-2"/> 彈性選擇：季卡或半年卡</li>

                                    </ul>

                                </div>

                                {/* Pricing Badge */}

                                <div className="absolute bottom-3 right-3 flex flex-col items-end">

                                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded mb-1">

                                        <Icon name="Tag" size={10} className="text-yellow-600"/>

                                        <span className="text-[10px] text-yellow-700 font-bold">心理定價</span>

                                    </div>

                                    <span className="text-2xl font-extrabold text-red-600">$2,999</span>

                                </div>

                            </div>

                            {/* Card 3: Premium */}

                            <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 overflow-hidden flex flex-col hover:shadow-lg transition text-white relative">

                                <div className="bg-gray-900 p-3 flex justify-between items-center border-b border-gray-700">

                                    <span className="font-bold flex items-center"><Icon name="Crown" size={18} className="mr-1 text-yellow-400"/> 年度白金卡 (Premium)</span>

                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">最高CP值</span>

                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-center">

                                    <div className="text-center mb-3">

                                        <p className="text-3xl font-extrabold text-white">12 <span className="text-base font-normal text-gray-400">個月會籍</span></p>

                                    </div>

                                    <ul className="text-sm text-gray-300 space-y-1">

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-yellow-400 mr-2"/> 贈送 1 個月會籍 (共13個月)</li>

                                        <li className="flex items-center"><Icon name="CheckCircle" size={14} className="text-yellow-400 mr-2"/> 享單點通行資格</li>

                                    </ul>

                                </div>

                            </div>

                            {/* Card 4: Combo */}

                            <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden flex flex-col hover:shadow-lg transition relative">

                                <div className="bg-blue-50 p-3 flex justify-between items-center">

                                    <span className="font-bold text-blue-800 flex items-center"><Icon name="Dumbbell" size={18} className="mr-1 text-blue-600"/> 教練陪跑卡 (Combo)</span>

                                    <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-600">長輩首選</span>

                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-center">

                                    <div className="text-center mb-3">

                                        <p className="text-lg font-bold text-gray-800">會籍 + 私人教練課</p>

                                        <p className="text-xs text-gray-500 mt-1">解決「不會練、不敢練、怕受傷」的痛點</p>

                                    </div>

                                    <div className="flex justify-center space-x-2 text-sm">

                                        <span className="px-2 py-1 bg-gray-100 rounded-full border border-gray-200 text-xs">3 堂入門</span>

                                        <span className="px-2 py-1 bg-gray-100 rounded-full border border-gray-200 text-xs">10 堂特訓</span>

                                    </div>

                                </div>

                                {/* Pricing Badge */}

                                <div className="absolute bottom-3 right-3 flex flex-col items-end">

                                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded mb-1">

                                        <Icon name="Tag" size={10} className="text-yellow-600"/>

                                        <span className="text-[10px] text-yellow-700 font-bold">心理定價</span>

                                    </div>

                                    <span className="text-2xl font-extrabold text-blue-600">$5,988</span>

                                </div>

                            </div>

                        </div>

                    </div>

                );

            case 5:

                return (

                    <div className="h-full flex flex-col px-12 py-4 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-2 text-gray-800">市場策略：雙軌並進</h2>

                        <p className="text-xl text-gray-600 mb-4">不只做熟客，更要吃下大眾贈禮市場 (O2O Strategy)</p>

                        <div className="grid grid-cols-2 gap-6 flex-1">

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                                <div className="bg-gray-900 text-white p-4 text-center">

                                    <Icon name="Users" className="mx-auto mb-2"/>

                                    <h3 className="text-xl font-bold">策略一：內部轉化 (現有會員)</h3>

                                </div>

                                <div className="p-4 space-y-2">

                                    <div>

                                        <span className="font-bold text-gray-800 block mb-1">目標對象：</span>

                                        <span className="text-gray-600 text-sm">25-50 歲具消費力之現有會員。</span>

                                    </div>

                                    <div>

                                        <span className="font-bold text-gray-800 block mb-1">銷售場景：</span>

                                        <ul className="list-disc list-inside text-gray-600 text-sm">

                                            <li>帶父母運動受阻時</li>

                                            <li>會員生日月優惠推廣</li>

                                        </ul>

                                    </div>

                                    <div className="bg-green-50 text-green-800 p-2 rounded mt-2 text-center font-bold text-sm">

                                        優勢：獲客成本 (CAC) 趨近於 0

                                    </div>

                                </div>

                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                                <div className="bg-red-600 text-white p-3 text-center">

                                    <Icon name="Globe" className="mx-auto mb-2"/>

                                    <h3 className="text-xl font-bold">策略二：外部擴張 (大眾市場)</h3>

                                </div>

                                <div className="p-3 space-y-2">

                                    <div>

                                        <span className="font-bold text-gray-800 block mb-1">目標對象：</span>

                                        <span className="text-gray-600 text-sm">想送禮的非會員、企業福委會。</span>

                                    </div>

                                    <div>

                                        <span className="font-bold text-gray-800 block mb-1">銷售通路：</span>

                                        <ul className="list-disc list-inside text-gray-600 text-sm">

                                            <li>線上禮物商城 (E-Gift Card) 或 LINE 禮物商城</li>

                                            <li>B2B 企業團購專案</li>

                                        </ul>

                                    </div>

                                    <div className="mt-1 border-t pt-1 border-red-100">

                                        <span className="font-bold text-gray-800 block mb-1 text-sm flex items-center">

                                            <Icon name="Calendar" size={14} className="mr-1 text-red-500" />

                                            年度關鍵行銷檔期：

                                        </span>

                                        <p className="text-gray-600 text-xs leading-relaxed">

                                            「新年健康大紅包」(1-2月)、

                                            「母親健康感謝禮」(5月)、

                                            「父親節鐵人老爸」(8月)、

                                            「雙11單身健美節」(11月)、

                                            「聖誕跨年許願季」(12月)

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="text-center mt-2 text-sm text-gray-500 font-bold">

                            行銷定位：不只是賣卡，更是賣「健康孝親」的情感價值。

                        </div>

                    </div>

                );

            case 6:

                return (

                    <div className="h-full flex flex-col px-12 py-4 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-2 text-gray-800">財務試算：營收預估模型 (以 3 個月禮物卡為主力)</h2>

                        

                        <div className="flex justify-between items-start mb-2 bg-gray-50 p-2 rounded border border-gray-100">

                            <div className="flex-1 pr-4 border-r border-gray-200">

                                <p className="text-xs font-bold text-gray-700 mb-1 flex items-center"><Icon name="Target" size={12} className="mr-1"/> 銷量推估邏輯：</p>

                                <ul className="text-xs text-gray-500 space-y-1">

                                    <li>• <span className="font-bold">內部轉購 (4,500張)：</span> 45 萬活躍會員 × 1% 購買滲透率</li>

                                    <li>• <span className="font-bold">外部開發 (1,500張)：</span> 50 萬年度目標受眾觸及 × 0.3% 年度轉化滲透率</li>

                                </ul>

                            </div>

                            <div className="flex-1 pl-4">

                                <p className="text-xs font-bold text-gray-700 mb-1 flex items-center"><Icon name="Info" size={12} className="mr-1"/> 試算基準與 LTV 推導：</p>

                                <div className="text-xs text-gray-500 space-y-1">

                                    <p className="mb-1"><span className="font-bold">單價設定：</span> 主力推廣 <span className="font-bold text-gray-900">3個月定期養成卡</span> (NT$3,000/張)</p>

                                    <p className="flex items-center text-[11px] text-red-600 mb-1"><Icon name="Tag" size={10} className="mr-1"/> 實際銷售建議採 <span className="font-bold mx-1">$2,999</span> 心理定價，本模型為便利計算採 $3,000 估算</p>

                                    <p className="flex justify-between"><span className="font-semibold">LTV公式:</span> <span>6,000 張 × 20% (轉正率) = <span className="font-bold text-gray-700">1,200 位新會員</span></span></p>

                                    <p className="flex justify-between"><span className="font-semibold">延伸產值:</span> <span>1,200 人 × NT$12,000 (首年年費) = <span className="font-bold text-red-600">1,440 萬</span></span></p>

                                </div>

                            </div>

                        </div>

                        

                        {/* Custom Bar Chart replacing Recharts */}

                        <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-1">

                            <CustomBarChart data={REVENUE_DATA_3M} maxValueOverride={5000} />

                            <TotalRevenueDisplay qty="6,000" cash="1,800" ltv="1,440" total="3,240" />

                        </div>

                        <div className="absolute top-10 right-12">

                            <PitchBadge text="財務亮點：獲客成本極低，淨利潤極高" />

                        </div>

                    </div>

                );

            case 7: // NEW Slide: 6-Month Scenario

                return (

                    <div className="h-full flex flex-col px-12 py-4 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-yellow-500 text-gray-800 pl-4 mb-2 flex items-center">

                            財務試算：進階情境 (6個月方案)

                            <span className="ml-3 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300">高客單策略</span>

                        </h2>

                        

                        <div className="flex justify-between items-start mb-2 bg-yellow-50 p-2 rounded border border-yellow-100">

                            <div className="flex-1 pr-4 border-r border-yellow-200">

                                <p className="text-xs font-bold text-gray-700 mb-1 flex items-center"><Icon name="Zap" size={12} className="mr-1 text-yellow-600"/> 情境假設：</p>

                                <ul className="text-xs text-gray-600 space-y-1">

                                    <li>• 若成功引導購買 <span className="font-bold">6個月定期養成卡</span> (單價提升至 NT$6,000)</li>

                                    <li>• 實際銷售建議採 <span className="font-bold text-red-600">$5,988</span> 心理定價 (本模型採 $6,000 估算)</li>

                                    <li>• 假設銷量維持 6,000 張 (透過加強行銷力道達成)</li>

                                </ul>

                            </div>

                            <div className="flex-1 pl-4">

                                <p className="text-xs font-bold text-gray-700 mb-1 flex items-center"><Icon name="TrendingUp" size={12} className="mr-1 text-green-600"/> 效益預估：</p>

                                <div className="text-xs text-gray-600 space-y-1">

                                    <p className="flex justify-between"><span className="font-semibold">預收現金流:</span> <span>6,000 張 × NT$6,000 = <span className="font-bold text-red-600 text-sm">3,600 萬</span> (翻倍!)</span></p>

                                    <p className="flex justify-between"><span className="font-semibold">總體效益:</span> <span>3,600 萬 + 1,440 萬 (LTV) = <span className="font-bold text-gray-900 text-sm">5,040 萬</span></span></p>

                                </div>

                            </div>

                        </div>

                        

                        {/* Custom Bar Chart for 6M */}

                        <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-1">

                            <CustomBarChart data={REVENUE_DATA_6M} maxValueOverride={5000} />

                            <TotalRevenueDisplay qty="6,000" cash="3,600" ltv="1,440" total="5,040" />

                        </div>

                        <div className="absolute top-10 right-12">

                            <PitchBadge text="戰略目標：拉高客單價，創造爆炸性現金流" />

                        </div>

                    </div>

                );

            case 8:

                return (

                    <div className="h-full flex flex-col px-12 py-8 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-4 text-gray-800">多方效益分析：三贏策略</h2>

                        

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full flex-1 mb-2">

                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center text-center">

                                <Icon name="ShieldCheck" size={48} className="text-red-600 mb-2"/>

                                <h3 className="text-lg font-bold mb-2 text-red-800">對公司 (Company)</h3>

                                <ul className="text-left space-y-2 text-gray-700 text-sm">

                                    <li>• 提早取得現金流</li>

                                    <li>• 降低退費爭議成本</li>

                                    <li>• 獲取無效名單 (Lead Gen)</li>

                                </ul>

                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col items-center text-center">

                                <Icon name="TrendingUp" size={48} className="text-gray-800 mb-2"/>

                                <h3 className="text-lg font-bold mb-2 text-gray-800">對業務 (Sales)</h3>

                                <ul className="text-left space-y-3 text-gray-700 text-sm">

                                    <li className="flex items-start">

                                        <Icon name="CheckCircle" size={16} className="text-green-500 mr-2 mt-0.5 shrink-0"/> 

                                        <div className="leading-snug">

                                            <span className="font-bold text-gray-900">業績互補不衝突：</span>

                                            禮物卡無長約優惠，想簽長約仍需找業務。

                                        </div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="CheckCircle" size={16} className="text-green-500 mr-2 mt-0.5 shrink-0"/> 

                                        <div className="leading-snug">

                                            <span className="font-bold text-gray-900">定價區隔策略：</span>

                                            標準價販售，保留業務談判「折扣優惠」的空間。

                                        </div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="CheckCircle" size={16} className="text-green-500 mr-2 mt-0.5 shrink-0"/> 

                                        <div className="leading-snug">

                                            <span className="font-bold text-gray-900">降低門檻養客：</span>

                                            先用低門檻禮物卡讓長輩進場，體驗好再轉化，成功率更高。

                                        </div>

                                    </li>

                                </ul>

                            </div>

                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center text-center">

                                <Icon name="Gift" size={48} className="text-red-600 mb-2"/>

                                <h3 className="text-lg font-bold mb-2 text-red-800">對消費者 (Customer)</h3>

                                <ul className="text-left space-y-2 text-gray-700 text-sm">

                                    <li>• 解決送禮煩惱</li>

                                    <li>• 長輩使用無心理負擔</li>

                                    <li>• 體驗流程更加順暢</li>

                                </ul>

                            </div>

                        </div>

                        <div className="mt-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-center border border-yellow-200 text-sm font-bold flex justify-center items-center">

                            <Icon name="Info" size={16} className="mr-2"/> 戰略定位：禮物卡是「降低門檻的開門磚」，目的是為了把餅做大，提升分店總業績。

                        </div>

                    </div>

                );

            case 9:

                return (

                    <div className="h-full flex flex-col px-12 py-6 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-4 text-gray-800">營運配套：標準作業流程 (SOP)</h2>

                        

                        <div className="flex-1 grid grid-cols-3 gap-4">

                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col">

                                <div className="flex items-center mb-2">

                                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">A</div>

                                    <h3 className="font-bold text-gray-800 text-lg">購買流程 (贈與者)</h3>

                                </div>

                                <ul className="text-sm text-gray-600 space-y-3 flex-1">

                                    <li className="flex items-start">

                                        <Icon name="CreditCard" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug">確認需求與付款 (實體/電子卡)</div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="ShieldCheck" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug">說明 <span className="text-red-600 font-bold mx-1">履約保證</span> 與使用規範</div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="Send" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug">交付禮卡與簡易說明指南</div>

                                    </li>

                                </ul>

                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col">

                                <div className="flex items-center mb-2">

                                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">B</div>

                                    <h3 className="font-bold text-gray-800 text-lg">啟用流程 (受贈者)</h3>

                                </div>

                                <ul className="text-sm text-gray-600 space-y-3 flex-1">

                                    <li className="flex items-start">

                                        <Icon name="UserPlus" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug">建立/綁定會員帳戶</div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="ClipboardList" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug"><span className="text-red-600 font-bold">高齡運動風險評估表 (PAR-Q)</span> 與免責簽署</div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="CheckCircle" size={14} className="mr-2 mt-1 text-red-500 shrink-0"/>

                                        <div className="leading-snug">完成啟用並進行首次測量</div>

                                    </li>

                                </ul>

                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col">

                                <div className="flex items-center mb-2">

                                    <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">C</div>

                                    <h3 className="font-bold text-gray-800 text-lg">後勤管理 (門市端)</h3>

                                </div>

                                <ul className="text-sm text-gray-600 space-y-3 flex-1">

                                    <li className="flex items-start">

                                        <Icon name="Target" size={14} className="mr-2 mt-1 text-gray-800 shrink-0"/>

                                        <div className="leading-snug">

                                            業績歸屬 (建議): <br/>

                                            <span className="text-xs">銷售70% / 啟用30% (確保啟用服務品質)</span>

                                        </div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="AlertCircle" size={14} className="mr-2 mt-1 text-gray-800 shrink-0"/>

                                        <div className="leading-snug">異常處理 (遺失補發/過期轉抵用)</div>

                                    </li>

                                    <li className="flex items-start">

                                        <Icon name="BarChart3" size={14} className="mr-2 mt-1 text-gray-800 shrink-0"/>

                                        <div className="leading-snug">每月禮卡庫存與兌換率盤點</div>

                                    </li>

                                </ul>

                            </div>

                        </div>

                        <div className="mt-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-center border border-yellow-200 text-sm font-bold flex justify-center items-center">

                            <Icon name="Info" size={16} className="mr-2"/> 營運重點：透過標準化 SOP 降低客訴風險，確保每位長輩都能獲得一致的優質體驗。

                        </div>

                    </div>

                );

            case 10: // NEW Slide: FAQ

                return (

                    <div className="h-full flex flex-col px-12 py-6 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-6 text-gray-800 flex items-center">

                            常見問題 FAQ (門市/LINE客服專用)

                            <span className="ml-3 text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200 font-normal">Q&A Database</span>

                        </h2>

                        

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">

                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-red-600 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q1: 禮物卡可以退費嗎？</p>

                                    <p className="text-sm text-gray-700">A: 僅原購買者在<span className="font-bold">未啟用前</span>可申請退貨。一旦存入受贈者帳戶或已啟用，即視為服務開始，不可退貨。</p>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-red-600 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q2: 禮物卡有使用期限嗎？</p>

                                    <p className="text-sm text-gray-700">A: 設有「優惠效期」(如1年)。期滿後<span className="font-bold">不會失效</span>，但將視為等值現金抵用，需補足屆時定價差額。</p>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-gray-800 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q3: 啟用時需要帶什麼？</p>

                                    <p className="text-sm text-gray-700">A: 只需攜帶<span className="font-bold">禮物卡(或序號)</span>及<span className="font-bold">身分證件</span>即可。購買者(子女)不需陪同到場。</p>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-gray-800 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q4: 長輩現場會看到費用嗎？</p>

                                    <p className="text-sm text-gray-700">A: 固定期間制禮卡(如3個月卡)在系統與現場<span className="font-bold">完全隱藏價格</span>，降低長輩心理負擔。</p>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-gray-800 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q5: 禮物卡遺失怎麼辦？</p>

                                    <p className="text-sm text-gray-700">A: 只要購買者能提供<span className="font-bold">購買證明</span>(發票或刷卡紀錄)，經後勤核對序號未被使用，即可協助補發。</p>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">

                                    <p className="font-bold text-gray-800 mb-2 flex items-center"><Icon name="MessageSquare" size={16} className="mr-2"/> Q6: 現有會員可以使用嗎？</p>

                                    <p className="text-sm text-gray-700">A: 可以。現有會員收到禮物卡，可用於<span className="font-bold">延長當前的會籍效期</span>。</p>

                                </div>

                            </div>

                        </div>

                    </div>

                );

            case 11:

                return (

                    <div className="h-full flex flex-col px-12 py-8 animate-fadeIn">

                        <h2 className="text-3xl font-bold border-l-8 border-red-600 pl-4 mb-8 text-gray-800">執行計畫與時程 Roadmap</h2>

                        

                        <div className="space-y-8 mt-4 relative">

                            <div className="absolute left-8 top-4 bottom-4 w-1 bg-gray-200"></div>

                            <div className="relative pl-20">

                                <div className="absolute left-4 top-0 w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold z-10">1</div>

                                <h3 className="text-xl font-bold text-red-600">Phase 1: 籌備與調研 (Month 1)</h3>

                                <p className="text-gray-600 mt-1">發送會員意願問卷、確認法規與定型化契約內容、設計實體卡片/電子序號機制。</p>

                            </div>

                            <div className="relative pl-20">

                                <div className="absolute left-4 top-0 w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold z-10">2</div>

                                <h3 className="text-xl font-bold text-red-600">Phase 2: 試點運行 (新年檔期)</h3>

                                <p className="text-gray-600 mt-1">

                                    推出首波<span className="font-bold">「新年健康大紅包」</span>活動，選定 5 家旗艦店 + 線上表單試賣，測試市場水溫。

                                </p>

                            </div>

                            <div className="relative pl-20">

                                <div className="absolute left-4 top-0 w-9 h-9 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center text-gray-900 font-bold z-10">3</div>

                                <h3 className="text-xl font-bold text-gray-800">Phase 3: 全面導入 (年度循環)</h3>

                                <p className="text-gray-600 mt-1">

                                    建立常態化禮物卡機制，並依序推動父親節、雙11、聖誕跨年等主題活動。

                                </p>

                                <div className="mt-2">

                                    <PitchBadge text="執行節奏：小步快跑，驗證後快速複製" />

                                </div>

                            </div>

                        </div>

                    </div>

                );

            case 12:

                return (

                    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn bg-gray-900 text-white rounded-lg">

                        <Icon name="Gift" size={80} className="text-red-500 mb-4 animate-bounce" />

                        <h1 className="text-4xl font-extrabold leading-tight">

                            WorldGym 禮物卡<br />連接家庭健康的橋樑

                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl">

                            這是一個低風險、高潛力的嘗試。<br/>

                            將被動等待長輩入會，轉變為<span className="text-red-500 font-bold">主動創造</span>進店動機。

                        </p>

                        <div className="mt-12 p-4 border border-gray-700 rounded-lg">

                            <p className="text-lg">懇請批准進入 Phase 1 市場調研階段</p>

                        </div>

                        <p className="text-sm text-gray-500 mt-8">Thank You / Q&A</p>

                    </div>

                );

            default:

                return null;

        }

    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 font-sans p-4">

            <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">

                <button 

                    onClick={() => setIsPrintMode(!isPrintMode)}

                    className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 flex items-center gap-2 transition font-bold text-sm"

                >

                    {isPrintMode ? (

                         <>

                            <Icon name="Monitor" size={16} />

                            返回簡報模式

                         </>

                    ) : (

                         <>

                            <Icon name="Printer" size={16} />

                            🖨️ 列印 / 匯出 PDF

                         </>

                    )}

                </button>

            </div>

            {isPrintMode ? (

                 <div className="w-full max-w-5xl mx-auto space-y-8 pb-20 print:space-y-0 print:pb-0">

                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-center print:hidden">

                        <p className="font-bold">🖨️ 列印模式已開啟</p>

                        <p className="text-sm mt-1">請使用瀏覽器列印功能 (Ctrl+P / Command+P) 並選擇「另存為 PDF」。建議設定版面為「橫向」。</p>

                    </div>

                    {Array.from({ length: totalSlides }).map((_, idx) => (

                        <div key={idx} className="w-full aspect-video bg-white shadow-xl rounded-xl overflow-hidden relative flex flex-col print:break-after-page print:shadow-none print:border print:border-gray-200 print:mb-0 print:rounded-none print:h-screen">

                            <div className="h-2 w-full bg-red-600"></div>

                            <div className="flex-1 overflow-hidden relative">

                                {renderSlideContent(idx)}

                            </div>

                            <div className="bg-gray-100 border-t border-gray-200 px-6 py-3 flex justify-between items-center select-none print:bg-white">

                                <div className="text-gray-500 text-sm font-medium">

                                    WorldGym Project Proposal | {idx + 1} / {totalSlides}

                                </div>

                            </div>

                        </div>

                    ))}

                 </div>

            ) : (

                <div className="w-full max-w-5xl aspect-video bg-white shadow-2xl rounded-xl overflow-hidden relative flex flex-col">

                    <div className="h-2 w-full bg-red-600"></div>

                    <div className="flex-1 overflow-hidden relative">

                        {renderSlideContent(currentSlide)}

                    </div>

                    <div className="bg-gray-100 border-t border-gray-200 px-6 py-3 flex justify-between items-center select-none">

                        <div className="text-gray-500 text-sm font-medium">

                            WorldGym Project Proposal | {currentSlide + 1} / {totalSlides}

                        </div>

                        <div className="flex space-x-4">

                            <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-2 rounded-full transition-colors ${currentSlide === 0 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-200 hover:text-red-600'}`}>

                                <Icon name="ChevronLeft" size={24} />

                            </button>

                            <div className="flex space-x-1 items-center">

                                {Array.from({ length: totalSlides }).map((_, idx) => (

                                    <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-gray-300'}`}></div>

                                ))}

                            </div>

                            <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1} className={`p-2 rounded-full transition-colors ${currentSlide === totalSlides - 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-200 hover:text-red-600'}`}>

                                <Icon name="ChevronRight" size={24} />

                            </button>

                        </div>

                    </div>

                </div>

            )}

            {!isPrintMode && <p className="mt-4 text-gray-500 text-sm">提示：點擊箭頭或使用鍵盤左右鍵切換頁面</p>}

        </div>

    );

};

export default App;

