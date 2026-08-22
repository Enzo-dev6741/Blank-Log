// ============================================================
// BLANK LOG — COMPLETE FRONTEND
// ============================================================

// ============================================================
// SVG ICONS
// ============================================================
const Icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    chat: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    trending: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
};

// ============================================================
// PLANS
// ============================================================
const PLANS = {
    free: { id: 'free', name: 'Free', price: 0, priceDisplay: '$0', priceLabel: 'Free', limits: { autoPost: 5, chat: 20, kalshi: 5, code: 15 }, badge: 'Free' },
    premium: { id: 'premium', name: 'Premium', price: 10, priceDisplay: '$10', priceLabel: '$10 / month', limits: { autoPost: 25, chat: 100, kalshi: 25, code: 75 }, badge: 'Popular' },
    pro: { id: 'pro', name: 'Pro', price: 25, priceDisplay: '$25', priceLabel: '$25 / month', limits: { autoPost: Infinity, chat: Infinity, kalshi: Infinity, code: Infinity }, badge: 'Best Value', unlimited: true }
};

// ============================================================
// APP STATE
// ============================================================
let AppState = {
    isAuthenticated: true,
    currentUser: {
        id: 'user_001',
        name: '',
        email: '',
        username: '',
        bio: '',
        status: '',
        plan: 'free',
        role: 'user',
        pfp: null,
        banner: null,
        theme: 'dark'
    },
    activeTab: 'home',
    usage: {
        autoPost: { used: 0, limit: 5 },
        chat: { used: 0, limit: 20 },
        kalshi: { used: 0, limit: 5 },
        code: { used: 0, limit: 15 }
    },
    scheduledPosts: [],
    chatMessages: [],
    predictions: [],
    codeHistory: [],
    proofs: [],
    settings: { theme: 'dark' }
};

// ============================================================
// STORAGE
// ============================================================
function saveState() {
    try {
        localStorage.setItem('blanklog_state', JSON.stringify({
            usage: AppState.usage,
            scheduledPosts: AppState.scheduledPosts,
            chatMessages: AppState.chatMessages,
            predictions: AppState.predictions,
            codeHistory: AppState.codeHistory,
            proofs: AppState.proofs,
            currentUser: AppState.currentUser,
            settings: AppState.settings
        }));
    } catch (e) {}
}

function loadState() {
    try {
        const saved = localStorage.getItem('blanklog_state');
        if (saved) {
            const data = JSON.parse(saved);
            AppState.usage = data.usage || AppState.usage;
            AppState.scheduledPosts = data.scheduledPosts || AppState.scheduledPosts;
            AppState.chatMessages = data.chatMessages || AppState.chatMessages;
            AppState.predictions = data.predictions || AppState.predictions;
            AppState.codeHistory = data.codeHistory || AppState.codeHistory;
            AppState.proofs = data.proofs || AppState.proofs;
            if (data.currentUser) AppState.currentUser = { ...AppState.currentUser, ...data.currentUser };
            if (data.settings) AppState.settings = data.settings;
        }
    } catch (e) {}
}
loadState();

// ============================================================
// THEME
// ============================================================
function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    AppState.settings.theme = theme;
    saveState();
}
applyTheme(AppState.settings.theme || 'dark');

// ============================================================
// USAGE HELPERS
// ============================================================
function getRemaining(m) { const limit = AppState.usage[m].limit; const used = AppState.usage[m].used; return Math.max(0, limit - used); }
function getPercent(m) { const limit = AppState.usage[m].limit; const used = AppState.usage[m].used; if (limit === Infinity) return 0; if (limit === 0) return 0; return (used / limit) * 100; }
function getLimitDisplay(m) { const limit = AppState.usage[m].limit; if (limit === Infinity) return 'Unlimited'; return limit; }
function isUnlimited(m) { return AppState.usage[m].limit === Infinity; }
function getPlanBadge() { const plan = AppState.currentUser.plan; if (plan === 'free') return 'badge-free'; if (plan === 'premium') return 'badge-premium'; return 'badge-pro'; }

// ============================================================
// NAVIGATION
// ============================================================
const tabs = [
    { id: 'home', label: 'Home', icon: Icons.home },
    { id: 'autopost', label: 'Auto Post', icon: Icons.send },
    { id: 'chat', label: 'AI Chat', icon: Icons.chat },
    { id: 'kalshi', label: 'Kalshi', icon: Icons.trending },
    { id: 'code', label: 'Code', icon: Icons.code },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
];
if (AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer') {
    tabs.push({ id: 'admin', label: 'Admin', icon: Icons.shield });
}

function setActiveTab(tabId) {
    AppState.activeTab = tabId;
    renderApp();
}

// ============================================================
// SIDEBAR
// ============================================================
function renderSidebar() {
    const plan = AppState.currentUser.plan;
    const planData = PLANS[plan];
    const user = AppState.currentUser;

    return `
        <div class="sidebar">
            <div class="p-5 border-b border-[var(--border-color)]">
                <div class="flex items-center gap-3">
                    <div class="logo-box">◼</div>
                    <div>
                        <h1 class="text-lg font-bold text-[var(--text-primary)]">Blank Log</h1>
                        <p class="text-xs text-[var(--text-muted)]">v3.0.0</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
                ${tabs.map(tab => `
                    <button onclick="setActiveTab('${tab.id}')" 
                        class="nav-link ${AppState.activeTab === tab.id ? 'active' : ''}">
                        ${tab.icon}
                        ${tab.label}
                    </button>
                `).join('')}
            </nav>

            <div class="p-4 border-t border-[var(--border-color)] space-y-3">
                <div class="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-[var(--text-primary)]">${planData.name} Plan</span>
                        <span class="${getPlanBadge()}">${planData.badge}</span>
                    </div>
                    <div class="text-2xl font-bold text-[var(--text-primary)]">${planData.priceLabel}</div>
                    <div class="mt-3">
                        <div class="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                            <span>Used this month</span>
                            <span>${AppState.usage.autoPost.used}/${getLimitDisplay('autoPost')}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${Math.min(100, getPercent('autoPost'))}%"></div></div>
                    </div>
                    ${plan === 'free' ? `<button onclick="showPlansModal()" class="w-full mt-3 btn-primary text-sm py-2">Upgrade</button>` : plan === 'premium' ? `<button onclick="showPlansModal()" class="w-full mt-3 btn-secondary text-sm py-2">Upgrade to Pro</button>` : `<div class="w-full mt-3 text-center text-xs text-[var(--text-muted)]">Unlimited access</div>`}
                </div>
                <div class="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span class="status-dot online"></span>
                    <span>System Online</span>
                    <span class="flex-1 text-right">${user.name || 'User'}</span>
                </div>
                ${user.email ? `<div class="flex items-center gap-2 text-xs text-[var(--text-muted)]"><span>${user.email}</span></div>` : ''}
            </div>
        </div>
    `;
}

// ============================================================
// MOBILE NAV
// ============================================================
function renderMobileNav() {
    return `
        <div class="mobile-nav">
            ${tabs.map(tab => `
                <button onclick="setActiveTab('${tab.id}')" class="${AppState.activeTab === tab.id ? 'active' : ''}">
                    ${tab.icon}
                    ${tab.label}
                </button>
            `).join('')}
        </div>
    `;
}

// ============================================================
// FOOTER
// ============================================================
function renderFooter() {
    return `
        <div class="footer">
            <p>© 2026 Blank Log &bull; blanklogapp@gmail.com &bull; All rights reserved.</p>
        </div>
    `;
}

// ============================================================
// PROOF FEED
// ============================================================
function renderProofFeed() {
    const proofs = AppState.proofs.slice(0, 5);
    return `
        <div class="card p-5 mt-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-[var(--text-primary)]">Proof Feed — Live</h3>
                <span class="text-xs text-[var(--text-muted)]">verified by Proof</span>
            </div>
            <div class="space-y-3">
                ${proofs.map(p => `
                    <div class="proof-feed-item">
                        <div class="proof-avatar">${p.name.charAt(0)}</div>
                        <div class="proof-content">
                            <div>
                                <span class="proof-name">${p.name}</span>
                                <span class="proof-location"> from ${p.location}</span>
                            </div>
                            <div>
                                <span class="proof-amount">Won $${p.amount.toLocaleString()}</span>
                                <span class="text-[var(--text-secondary)] text-sm"> on their bet</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="proof-time">${p.time}</span>
                                <span class="badge-proof">verified by Proof</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
                ${proofs.length === 0 ? '<p class="text-[var(--text-muted)] text-sm">No proofs yet. Be the first!</p>' : ''}
            </div>
            ${proofs.length > 0 ? `<button class="mt-3 text-sm text-[var(--text-primary)] hover:underline">View All Proofs →</button>` : ''}
        </div>
    `;
}

// ============================================================
// HOME TAB
// ============================================================
function renderHomeTab() {
    const plan = AppState.currentUser.plan;
    const planData = PLANS[plan];
    const modules = ['autoPost', 'chat', 'kalshi', 'code'];
    const labels = ['AutoPost', 'AI Chat', 'Kalshi', 'Code'];

    const usageCards = modules.map((m, i) => {
        const remaining = getRemaining(m);
        const percent = getPercent(m);
        const limit = getLimitDisplay(m);
        const used = AppState.usage[m].used;
        const unlimited = isUnlimited(m);
        return `
            <div class="card p-4">
                <div class="flex items-center justify-between mb-3">
                    <span class="font-medium text-[var(--text-primary)]">${labels[i]}</span>
                    <span class="text-xs ${remaining === 0 && !unlimited ? 'text-red-400' : 'text-[var(--text-muted)]'}">${unlimited ? 'Unlimited' : remaining} left</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${unlimited ? 0 : Math.min(100, percent)}%"></div></div>
                <div class="flex justify-between text-xs text-[var(--text-muted)] mt-2">
                    <span>${unlimited ? 'Unlimited' : used + ' / ' + limit}</span>
                    ${remaining === 0 && !unlimited ? '<span class="text-red-400">Upgrade for more</span>' : ''}
                </div>
            </div>
        `;
    }).join('');

    const recentPosts = AppState.scheduledPosts.slice(0, 3).map(post => `
        <div class="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded-lg card">
            <div><p class="text-sm text-[var(--text-primary)]">${post.title}</p><p class="text-xs text-[var(--text-muted)]">${post.platform} • ${new Date(post.scheduledTime).toLocaleString()}</p></div>
            <span class="badge-free text-xs">Scheduled</span>
        </div>
    `).join('');

    return `
        <div class="fade-in">
            <div class="mb-6">
                <h1 class="page-title">Dashboard</h1>
                <p class="text-[var(--text-muted)] mt-1">Welcome back${AppState.currentUser.name ? ', ' + AppState.currentUser.name : ''}</p>
                <div class="mt-2">
                    <span class="${getPlanBadge()}">${planData.name} Plan</span>
                    ${plan === 'free' ? '<span class="text-xs text-[var(--text-muted)] ml-2">— Upgrade to unlock more</span>' : ''}
                    ${plan === 'premium' ? '<span class="text-xs text-[var(--text-muted)] ml-2">— 5x more than Free</span>' : ''}
                    ${plan === 'pro' ? '<span class="text-xs text-[var(--text-muted)] ml-2">— Unlimited access</span>' : ''}
                </div>
            </div>
            <div class="grid-4 mb-6">${usageCards}</div>
            <div class="grid-2">
                <div class="card p-5">
                    <h3 class="section-title">Quick Actions</h3>
                    <div class="grid-2 gap-2">
                        <button onclick="setActiveTab('autopost')" class="btn-secondary text-sm py-3 flex items-center justify-center gap-2">${Icons.plus} New Post</button>
                        <button onclick="setActiveTab('chat')" class="btn-secondary text-sm py-3 flex items-center justify-center gap-2">${Icons.chat} Chat</button>
                        <button onclick="setActiveTab('kalshi')" class="btn-secondary text-sm py-3 flex items-center justify-center gap-2">${Icons.trending} Predict</button>
                        <button onclick="setActiveTab('code')" class="btn-secondary text-sm py-3 flex items-center justify-center gap-2">${Icons.code} Code</button>
                    </div>
                </div>
                <div class="card p-5">
                    <h3 class="section-title">Upcoming Posts</h3>
                    <div class="space-y-2">${recentPosts || '<div class="text-center text-[var(--text-muted)] py-8">No scheduled posts</div>'}</div>
                </div>
            </div>
            ${renderProofFeed()}${renderFooter()}
        </div>
    `;
}

// ============================================================
// SETTINGS TAB
// ============================================================
function renderSettingsTab() {
    const user = AppState.currentUser;
    const theme = AppState.settings.theme || 'dark';
    return `
        <div class="fade-in max-w-3xl mx-auto">
            <h1 class="page-title">⚙️ Settings</h1>
            <div class="card p-5 mb-6">
                <h3 class="section-title">Profile</h3>
                <div class="banner relative">
                    ${user.banner ? `<img src="${user.banner}" alt="Banner">` : '<div class="flex items-center justify-center text-[var(--text-muted)]">Upload Banner</div>'}
                    <button class="absolute bottom-2 right-2 btn-secondary text-xs py-1 px-3" onclick="document.getElementById('bannerUpload').click()">Change Banner</button>
                    <input type="file" id="bannerUpload" accept="image/*" class="hidden" onchange="handleBannerUpload(this)">
                </div>
                <div class="flex items-center gap-4 -mt-10 mb-4 relative z-10">
                    <div class="profile-pic">${user.pfp ? `<img src="${user.pfp}" alt="Profile">` : Icons.user}</div>
                    <button class="btn-secondary text-xs py-1 px-3" onclick="document.getElementById('pfpUpload').click()">Change Photo</button>
                    <input type="file" id="pfpUpload" accept="image/*" class="hidden" onchange="handlePfpUpload(this)">
                </div>
                <div class="grid-2 mt-4">
                    <div><label class="text-xs text-[var(--text-muted)] block mb-1">Username</label><input type="text" id="settingsUsername" value="${user.username || ''}" class="text-sm" placeholder="Enter username"></div>
                    <div><label class="text-xs text-[var(--text-muted)] block mb-1">Status</label><input type="text" id="settingsStatus" value="${user.status || ''}" class="text-sm" placeholder="What's on your mind?"></div>
                </div>
                <div class="mt-3"><label class="text-xs text-[var(--text-muted)] block mb-1">Bio</label><textarea id="settingsBio" rows="2" class="text-sm resize-none" placeholder="Tell us about yourself">${user.bio || ''}</textarea></div>
                <button onclick="saveProfileSettings()" class="mt-3 btn-primary text-sm py-2 px-4">Save Profile</button>
            </div>
            <div class="card p-5 mb-6">
                <h3 class="section-title">Appearance</h3>
                <div class="flex flex-wrap gap-3">
                    <div class="theme-option ${theme === 'dark' ? 'active' : ''}" onclick="setTheme('dark')">⚫️ Dark</div>
                    <div class="theme-option ${theme === 'light' ? 'active' : ''}" onclick="setTheme('light')">💡 Light</div>
                    <div class="theme-option ${theme === 'system' ? 'active' : ''}" onclick="setTheme('system')">💻 System</div>
                </div>
            </div>
            <div class="card p-5 mb-6">
                <h3 class="section-title">Account</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center"><span class="text-sm text-[var(--text-secondary)]">Email</span><span class="text-sm text-[var(--text-primary)]">${user.email || 'Not set'}</span></div>
                    <div class="flex justify-between items-center"><span class="text-sm text-[var(--text-secondary)]">Plan</span><span class="text-sm text-[var(--text-primary)]">${user.plan ? PLANS[user.plan].name : 'Free'}</span></div>
                    <button onclick="showPlansModal()" class="btn-secondary text-sm py-2 w-full">Manage Plan</button>
                    <button class="text-red-400 text-sm hover:text-red-300">Delete Account</button>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// SETTINGS FUNCTIONS
// ============================================================
function handlePfpUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            AppState.currentUser.pfp = e.target.result;
            saveState();
            renderApp();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleBannerUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            AppState.currentUser.banner = e.target.result;
            saveState();
            renderApp();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveProfileSettings() {
    const username = document.getElementById('settingsUsername')?.value;
    const status = document.getElementById('settingsStatus')?.value;
    const bio = document.getElementById('settingsBio')?.value;
    if (username) AppState.currentUser.username = username;
    if (status !== undefined) AppState.currentUser.status = status;
    if (bio !== undefined) AppState.currentUser.bio = bio;
    saveState();
    renderApp();
}

function setTheme(theme) {
    AppState.settings.theme = theme;
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    } else {
        applyTheme(theme);
    }
    saveState();
    renderApp();
}

// ============================================================
// MODALS
// ============================================================
function showPlansModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-[var(--text-primary)]">Choose Your Plan</h2>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-2xl">&times;</button>
            </div>
            <div class="space-y-4">
                ${Object.values(PLANS).map(plan => `
                    <div class="card p-4 ${plan.id === AppState.currentUser.plan ? 'border-[var(--accent)]' : ''}">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <h3 class="font-bold text-[var(--text-primary)]">${plan.name}</h3>
                                ${plan.id === AppState.currentUser.plan ? '<span class="text-xs text-[var(--accent)]">Current Plan</span>' : ''}
                            </div>
                            <span class="${plan.id === 'free' ? 'badge-free' : plan.id === 'premium' ? 'badge-premium' : 'badge-pro'}">${plan.badge}</span>
                        </div>
                        <div class="text-2xl font-bold text-[var(--text-primary)]">${plan.priceDisplay}<span class="text-sm text-[var(--text-muted)]"> / month</span></div>
                        <ul class="mt-3 space-y-1 text-sm text-[var(--text-muted)]">
                            <li>AutoPost: ${plan.limits.autoPost === Infinity ? 'Unlimited' : plan.limits.autoPost}</li>
                            <li>AI Chat: ${plan.limits.chat === Infinity ? 'Unlimited' : plan.limits.chat}</li>
                            <li>Kalshi: ${plan.limits.kalshi === Infinity ? 'Unlimited' : plan.limits.kalshi}</li>
                            <li>Code: ${plan.limits.code === Infinity ? 'Unlimited' : plan.limits.code}</li>
                        </ul>
                        <button onclick="selectPlan('${plan.id}'); document.querySelector('.modal-overlay').remove()" 
                            class="w-full mt-4 ${plan.id === AppState.currentUser.plan ? 'btn-secondary' : 'btn-primary'} py-2">
                            ${plan.id === AppState.currentUser.plan ? 'Current Plan' : 'Select'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function selectPlan(planId) {
    if (planId === AppState.currentUser.plan) return;
    AppState.currentUser.plan = planId;
    const plan = PLANS[planId];
    AppState.usage.autoPost.limit = plan.limits.autoPost;
    AppState.usage.chat.limit = plan.limits.chat;
    AppState.usage.kalshi.limit = plan.limits.kalshi;
    AppState.usage.code.limit = plan.limits.code;
    saveState();
    renderApp();
}

// ============================================================
// AUTH
// ============================================================
function login() {
    const email = document.querySelector('input[type="email"]')?.value || 'user@blanklog.com';
    const name = email.split('@')[0];
    AppState.currentUser.name = name;
    AppState.currentUser.email = email;
    AppState.currentUser.username = '@' + name;
    AppState.isAuthenticated = true;
    saveState();
    renderApp();
}

// ============================================================
// RENDER APP
// ============================================================
function renderApp() {
    if (!AppState.isAuthenticated) {
        document.getElementById('root').innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
                <div class="max-w-md w-full p-6">
                    <div class="text-center mb-8">
                        <div class="auth-logo">◼</div>
                        <h1 class="text-3xl font-bold text-[var(--text-primary)]">Blank Log</h1>
                        <p class="text-[var(--text-muted)] mt-2">Sign in to continue</p>
                    </div>
                    <div class="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border-color)]">
                        <input type="email" placeholder="Email" class="mb-3" value="">
                        <input type="password" placeholder="Password" class="mb-4" value="">
                        <button onclick="login()" class="w-full btn-primary py-2">Sign In</button>
                        <p class="text-center text-xs text-[var(--text-muted)] mt-4">Create an account to get started</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    let content = '';
    switch (AppState.activeTab) {
        case 'home': content = renderHomeTab(); break;
        case 'autopost': content = renderAutoPostTab(); break;
        case 'chat': content = renderChatTab(); break;
        case 'kalshi': content = renderKalshiTab(); break;
        case 'code': content = renderCodeTab(); break;
        case 'settings': content = renderSettingsTab(); break;
        case 'admin': content = renderAdminTab(); break;
        default: content = renderHomeTab();
    }

    document.getElementById('root').innerHTML = `
        <div class="flex">
            ${renderSidebar()}
            <div class="main-content">${content}</div>
            ${renderMobileNav()}
        </div>
    `;
}

// ============================================================
// PLACEHOLDER FUNCTIONS FOR OTHER TABS
// ============================================================
function renderAutoPostTab() {
    return `<div class="fade-in"><h1 class="page-title">Auto Post</h1><p class="page-subtitle">Schedule posts to TikTok, YouTube, and Instagram</p><div class="card p-5 text-center py-12"><p class="text-[var(--text-muted)]">Auto Post tab content goes here</p><p class="text-sm text-[var(--text-muted)] mt-2">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}

function renderChatTab() {
    return `<div class="fade-in"><h1 class="page-title">AI Chat</h1><p class="page-subtitle">Ask me anything</p><div class="card p-5 text-center py-12"><p class="text-[var(--text-muted)]">AI Chat tab content goes here</p><p class="text-sm text-[var(--text-muted)] mt-2">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}

function renderKalshiTab() {
    return `<div class="fade-in"><h1 class="page-title">Kalshi</h1><p class="page-subtitle">Upload a screenshot, AI does deep research, tells you Yes or No</p><div class="card p-5 text-center py-12"><p class="text-[var(--text-muted)]">Kalshi tab content goes here</p><p class="text-sm text-[var(--text-muted)] mt-2">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}

function renderCodeTab() {
    return `<div class="fade-in"><h1 class="page-title">Code Assistant</h1><p class="page-subtitle">AI-powered code analysis and debugging</p><div class="card p-5 text-center py-12"><p class="text-[var(--text-muted)]">Code Assistant tab content goes here</p><p class="text-sm text-[var(--text-muted)] mt-2">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}

function renderAdminTab() {
    const isAdmin = AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer';
    if (!isAdmin) {
        return `<div class="p-12 text-center"><div class="text-6xl mb-4">🔒</div><h2 class="text-2xl font-bold text-[var(--text-primary)]">Access Denied</h2><p class="text-[var(--text-muted)] mt-2">Admin access only</p></div>`;
    }
    return `<div class="fade-in"><h1 class="page-title">Admin Panel</h1><p class="page-subtitle">System administration and controls</p><div class="card p-5 text-center py-12"><p class="text-[var(--text-muted)]">Admin panel content goes here</p><p class="text-sm text-[var(--text-muted)] mt-2">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}

// ============================================================
// INITIALIZE
// ============================================================
renderApp();

window.setActiveTab = setActiveTab;
window.handlePfpUpload = handlePfpUpload;
window.handleBannerUpload = handleBannerUpload;
window.saveProfileSettings = saveProfileSettings;
window.setTheme = setTheme;
window.showPlansModal = showPlansModal;
window.selectPlan = selectPlan;
window.login = login;
