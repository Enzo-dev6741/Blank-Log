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
            Object.assign(AppState.usage, data.usage || {});
            AppState.scheduledPosts = data.scheduledPosts || [];
            AppState.chatMessages = data.chatMessages || [];
            AppState.predictions = data.predictions || [];
            AppState.codeHistory = data.codeHistory || [];
            AppState.proofs = data.proofs || [];
            if (data.currentUser) Object.assign(AppState.currentUser, data.currentUser);
            if (data.settings) Object.assign(AppState.settings, data.settings);
        }
    } catch (e) {}
}
loadState();

// ============================================================
// THEME
// ============================================================
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    AppState.settings.theme = theme;
    saveState();
}
applyTheme(AppState.settings.theme || 'dark');

// ============================================================
// USAGE HELPERS
// ============================================================
function getRemaining(m) {
    const limit = AppState.usage[m].limit;
    const used = AppState.usage[m].used;
    return Math.max(0, limit - used);
}
function getPercent(m) {
    const limit = AppState.usage[m].limit;
    const used = AppState.usage[m].used;
    if (limit === Infinity) return 0;
    if (limit === 0) return 0;
    return Math.min(100, (used / limit) * 100);
}
function getLimitDisplay(m) {
    const limit = AppState.usage[m].limit;
    return limit === Infinity ? 'Unlimited' : limit;
}
function isUnlimited(m) {
    return AppState.usage[m].limit === Infinity;
}
function getPlanBadge() {
    const plan = AppState.currentUser.plan;
    if (plan === 'free') return 'badge-free';
    if (plan === 'premium') return 'badge-premium';
    return 'badge-pro';
}

// ============================================================
// NAVIGATION
// ============================================================
const baseTabs = [
    { id: 'home', label: 'Home', icon: Icons.home },
    { id: 'autopost', label: 'Auto Post', icon: Icons.send },
    { id: 'chat', label: 'AI Chat', icon: Icons.chat },
    { id: 'kalshi', label: 'Kalshi', icon: Icons.trending },
    { id: 'code', label: 'Code', icon: Icons.code },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
];
let tabs = [...baseTabs];
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
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <div class="logo-box">◼</div>
                    <div>
                        <h1>Blank Log</h1>
                        <p>v3.0.0</p>
                    </div>
                </div>
            </div>

            <nav style="padding: 12px 16px; flex: 1;">
                ${tabs.map(tab => `
                    <button onclick="setActiveTab('${tab.id}')" 
                        class="nav-link ${AppState.activeTab === tab.id ? 'active' : ''}">
                        ${tab.icon}
                        ${tab.label}
                    </button>
                `).join('')}
            </nav>

            <div class="sidebar-plan">
                <div class="plan-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span class="plan-name">${planData.name}</span>
                        <span class="${getPlanBadge()}">${planData.badge}</span>
                    </div>
                    <div class="plan-price">${planData.priceLabel}</div>
                    <div style="margin-top: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">
                            <span>Used this month</span>
                            <span>${AppState.usage.autoPost.used}/${getLimitDisplay('autoPost')}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${getPercent('autoPost')}%"></div></div>
                    </div>
                    ${plan === 'free' ? `<button onclick="showPlansModal()" class="btn-primary" style="width:100%; margin-top:12px; font-size:13px; padding:8px;">Upgrade</button>` : plan === 'premium' ? `<button onclick="showPlansModal()" class="btn-secondary" style="width:100%; margin-top:12px; font-size:13px; padding:8px;">Upgrade to Pro</button>` : `<div style="text-align:center; margin-top:12px; font-size:12px; color:var(--text-muted);">Unlimited access</div>`}
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 12px; color: var(--text-muted);">
                    <span class="status-dot online"></span>
                    <span>System Online</span>
                    <span style="flex:1; text-align:right;">${user.name || 'User'}</span>
                </div>
                ${user.email ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${user.email}</div>` : ''}
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
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Proof Feed — Live</h3>
                <span style="font-size: 12px; color: var(--text-muted);">verified by Proof</span>
            </div>
            <div>
                ${proofs.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 20px 0;">No proofs yet. Be the first!</p>' : proofs.map(p => `
                    <div class="proof-feed-item">
                        <div class="proof-avatar">${p.name.charAt(0)}</div>
                        <div class="proof-content">
                            <div>
                                <span class="proof-name">${p.name}</span>
                                <span class="proof-location"> from ${p.location}</span>
                            </div>
                            <div>
                                <span class="proof-amount">Won $${p.amount.toLocaleString()}</span>
                                <span style="font-size: 14px; color: var(--text-secondary);"> on their bet</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="proof-time">${p.time}</span>
                                <span class="badge-proof">verified by Proof</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${proofs.length > 0 ? `<button style="margin-top: 12px; font-size: 13px; color: var(--text-primary); background: none; border: none; cursor: pointer;">View All Proofs →</button>` : ''}
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
            <div class="card usage-card">
                <div class="usage-header">
                    <span class="usage-label">${labels[i]}</span>
                    <span class="usage-remaining">${unlimited ? 'Unlimited' : remaining + ' left'}</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${unlimited ? 0 : percent}%"></div></div>
                <div class="usage-stats">
                    <span>${unlimited ? 'Unlimited' : used + ' / ' + limit}</span>
                    ${remaining === 0 && !unlimited ? '<span style="color: #ef4444;">Upgrade for more</span>' : ''}
                </div>
            </div>
        `;
    }).join('');

    const recentPosts = AppState.scheduledPosts.slice(0, 3).map(post => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 8px;">
            <div>
                <p style="font-size: 14px; color: var(--text-primary);">${post.title}</p>
                <p style="font-size: 12px; color: var(--text-muted);">${post.platform} • ${new Date(post.scheduledTime).toLocaleString()}</p>
            </div>
            <span class="badge-free">Scheduled</span>
        </div>
    `).join('');

    return `
        <div class="fade-in">
            <div style="margin-bottom: 24px;">
                <h1 class="page-title">Dashboard</h1>
                <p style="color: var(--text-muted);">Welcome back${AppState.currentUser.name ? ', ' + AppState.currentUser.name : ''}</p>
                <div style="margin-top: 8px;">
                    <span class="${getPlanBadge()}">${planData.name} Plan</span>
                    ${plan === 'free' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Upgrade to unlock more</span>' : plan === 'premium' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— 5x more than Free</span>' : '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Unlimited access</span>'}
                </div>
            </div>
            <div class="grid-4" style="margin-bottom: 24px;">${usageCards}</div>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Quick Actions</h3>
                    <div class="grid-2" style="gap: 8px;">
                        <button onclick="setActiveTab('autopost')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.plus} New Post</button>
                        <button onclick="setActiveTab('chat')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.chat} Chat</button>
                        <button onclick="setActiveTab('kalshi')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.trending} Predict</button>
                        <button onclick="setActiveTab('code')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.code} Code</button>
                    </div>
                </div>
                <div class="card">
                    <h3 class="section-title">Upcoming Posts</h3>
                    ${recentPosts || '<p style="color: var(--text-muted); text-align: center; padding: 20px 0;">No scheduled posts</p>'}
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
        <div class="fade-in" style="max-width: 600px; margin: 0 auto;">
            <h1 class="page-title">⚙️ Settings</h1>
            <div class="card" style="margin-bottom: 24px;">
                <h3 class="section-title">Profile</h3>
                <div class="banner" style="position: relative;">
                    ${user.banner ? `<img src="${user.banner}" alt="Banner">` : '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted);">Upload Banner</div>'}
                    <button onclick="document.getElementById('bannerUpload').click()" style="position: absolute; bottom: 8px; right: 8px; background: var(--bg-hover); border: 1px solid var(--border-color); color: var(--text-secondary); padding: 4px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">Change Banner</button>
                    <input type="file" id="bannerUpload" accept="image/*" style="display:none;" onchange="handleBannerUpload(this)">
                </div>
                <div style="display: flex; align-items: center; gap: 16px; margin-top: -32px; margin-bottom: 16px; position: relative; z-index: 2;">
                    <div class="profile-pic">${user.pfp ? `<img src="${user.pfp}" alt="Profile">` : Icons.user}</div>
                    <button onclick="document.getElementById('pfpUpload').click()" class="btn-secondary" style="font-size: 12px; padding: 4px 12px;">Change Photo</button>
                    <input type="file" id="pfpUpload" accept="image/*" style="display:none;" onchange="handlePfpUpload(this)">
                </div>
                <div class="grid-2">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px;">Username</label>
                        <input type="text" id="settingsUsername" value="${user.username || ''}" placeholder="Enter username">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px;">Status</label>
                        <input type="text" id="settingsStatus" value="${user.status || ''}" placeholder="What's on your mind?">
                    </div>
                </div>
                <div style="margin-top: 12px;">
                    <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px;">Bio</label>
                    <textarea id="settingsBio" rows="2" style="resize: none;" placeholder="Tell us about yourself">${user.bio || ''}</textarea>
                </div>
                <button onclick="saveProfileSettings()" class="btn-primary" style="margin-top: 12px; font-size: 13px; padding: 8px 16px;">Save Profile</button>
            </div>
            <div class="card" style="margin-bottom: 24px;">
                <h3 class="section-title">Appearance</h3>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <div class="theme-option ${theme === 'dark' ? 'active' : ''}" onclick="setTheme('dark')">⚫️ Dark</div>
                    <div class="theme-option ${theme === 'light' ? 'active' : ''}" onclick="setTheme('light')">💡 Light</div>
                    <div class="theme-option ${theme === 'system' ? 'active' : ''}" onclick="setTheme('system')">💻 System</div>
                </div>
            </div>
            <div class="card">
                <h3 class="section-title">Account</h3>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                    <span style="color: var(--text-muted);">Email</span>
                    <span style="color: var(--text-primary);">${user.email || 'Not set'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                    <span style="color: var(--text-muted);">Plan</span>
                    <span style="color: var(--text-primary);">${user.plan ? PLANS[user.plan].name : 'Free'}</span>
                </div>
                <button onclick="showPlansModal()" class="btn-secondary" style="width: 100%; margin-top: 12px; font-size: 13px;">Manage Plan</button>
                <button style="margin-top: 8px; color: #ef4444; background: none; border: none; cursor: pointer; font-size: 13px;">Delete Account</button>
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
    if (theme === 'dark') {
        document.body.classList.remove('light-mode');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Choose Your Plan</h2>
                <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${Object.values(PLANS).map(plan => `
                    <div class="card" style="padding: 16px; ${plan.id === AppState.currentUser.plan ? 'border: 2px solid var(--accent);' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">${plan.name}</h3>
                            ${plan.id === AppState.currentUser.plan ? '<span style="font-size: 11px; color: var(--accent);">Current Plan</span>' : ''}
                            <span class="${plan.id === 'free' ? 'badge-free' : plan.id === 'premium' ? 'badge-premium' : 'badge-pro'}">${plan.badge}</span>
                        </div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--text-primary);">${plan.priceDisplay} <span style="font-size: 14px; font-weight: 400; color: var(--text-muted);">/ month</span></div>
                        <ul style="margin-top: 8px; list-style: none; font-size: 13px; color: var(--text-muted);">
                            <li>AutoPost: ${plan.limits.autoPost === Infinity ? 'Unlimited' : plan.limits.autoPost}</li>
                            <li>AI Chat: ${plan.limits.chat === Infinity ? 'Unlimited' : plan.limits.chat}</li>
                            <li>Kalshi: ${plan.limits.kalshi === Infinity ? 'Unlimited' : plan.limits.kalshi}</li>
                            <li>Code: ${plan.limits.code === Infinity ? 'Unlimited' : plan.limits.code}</li>
                        </ul>
                        <button onclick="selectPlan('${plan.id}'); document.querySelector('.modal-overlay').remove();" 
                            class="${plan.id === AppState.currentUser.plan ? 'btn-secondary' : 'btn-primary'}" style="width: 100%; margin-top: 12px; font-size: 13px; padding: 8px;">
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
            <div class="min-h-screen flex items-center justify-center" style="background: var(--bg-primary);">
                <div style="max-width: 400px; width: 100%; padding: 24px;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div class="auth-logo">◼</div>
                        <h1 style="font-size: 28px; font-weight: 700; color: var(--text-primary);">Blank Log</h1>
                        <p style="color: var(--text-muted); margin-top: 8px;">Sign in to continue</p>
                    </div>
                    <div style="background: var(--bg-secondary); padding: 24px; border-radius: 12px; border: 1px solid var(--border-color);">
                        <input type="email" placeholder="Email" style="margin-bottom: 12px;" value="">
                        <input type="password" placeholder="Password" style="margin-bottom: 16px;" value="">
                        <button onclick="login()" class="btn-primary" style="width: 100%;">Sign In</button>
                        <p style="text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 16px;">Create an account to get started</p>
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
        <div style="display: flex; min-height: 100vh;">
            ${renderSidebar()}
            <div class="main-content">${content}</div>
            ${renderMobileNav()}
        </div>
    `;
}

// ============================================================
// PLACEHOLDERS
// ============================================================
function renderAutoPostTab() {
    return `<div class="fade-in"><h1 class="page-title">Auto Post</h1><p class="page-subtitle">Schedule posts to TikTok, YouTube, and Instagram</p><div class="card" style="text-align: center; padding: 60px 20px;"><p style="color: var(--text-muted);">Auto Post tab content goes here</p><p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}
function renderChatTab() {
    return `<div class="fade-in"><h1 class="page-title">AI Chat</h1><p class="page-subtitle">Ask me anything</p><div class="card" style="text-align: center; padding: 60px 20px;"><p style="color: var(--text-muted);">AI Chat tab content goes here</p><p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}
function renderKalshiTab() {
    return `<div class="fade-in"><h1 class="page-title">Kalshi</h1><p class="page-subtitle">Upload a screenshot, AI does deep research, tells you Yes or No</p><div class="card" style="text-align: center; padding: 60px 20px;"><p style="color: var(--text-muted);">Kalshi tab content goes here</p><p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}
function renderCodeTab() {
    return `<div class="fade-in"><h1 class="page-title">Code Assistant</h1><p class="page-subtitle">AI-powered code analysis and debugging</p><div class="card" style="text-align: center; padding: 60px 20px;"><p style="color: var(--text-muted);">Code Assistant tab content goes here</p><p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Backend integration coming soon</p></div>${renderFooter()}</div>`;
}
function renderAdminTab() {
    const isAdmin = AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer';
    if (!isAdmin) {
        return `<div style="text-align: center; padding: 60px 20px;"><div style="font-size: 48px; margin-bottom: 16px;">🔒</div><h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary);">Access Denied</h2><p style="color: var(--text-muted); margin-top: 8px;">Admin access only</p></div>`;
    }
    return `<div class="fade-in"><h1 class="page-title">Admin Panel</h1><p class="page-subtitle">System administration and controls</p><div class="card" style="text-align: center; padding: 60px 20px;"><p style="color: var(--text-muted);">Admin panel content goes here</p><p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Backend integration coming soon</p></div>${renderFooter()}</div>`;
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
