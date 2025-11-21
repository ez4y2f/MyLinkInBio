const translations = {
    zh: {
        title: "ez4y2f",
        "badge.online": "✨ 在线",
        tagline: "全栈开发者 · 高中生",
        bio: '做些有趣的小东西，或者让世界更美好<br>🌈🦊🐾🎵💻💡✂<br><span class="bio-highlight">D3bug the w0r1d!</span>',
        "meta.location.label": "所在地",
        "meta.location.value": "🦊 狐狸窝",
        "meta.status.label": "当前状态",
        "meta.status.value": "睡觉zzz",
        "btn.email": "📩 发邮件",
        "btn.copy": "复制邮箱",
        "section.social": "社交媒体",
        "section.projects": "个人网站 & 项目",
        "link.twitter.title": "X (Twitter)",
        "link.twitter.subtitle": "@ez4y2f",
        "link.twitter.pill": "关注",
        "link.github.title": "GitHub",
        "link.github.subtitle": "奇妙小项目",
        "link.github.pill": "前往",
        "link.bsky.title": "Bluesky",
        "link.bsky.subtitle": "@y2f.xyz",
        "link.bsky.pill": "关注",
        "link.bilibili.title": "哔哩哔哩",
        "link.bilibili.subtitle": "好玩的",
        "link.bilibili.pill": "去看看",
        "link.reddit.title": "Reddit",
        "link.reddit.subtitle": "@ez4y2f",
        "link.reddit.pill": "前往",
        "link.zhihu.title": "知乎",
        "link.zhihu.subtitle": "交流芝士",
        "link.zhihu.pill": "探索",
        "link.telegram.title": "Telegram",
        "link.telegram.subtitle": "欢迎交流",
        "link.telegram.pill": "一起玩",
        "link.home.title": "个人主页",
        "link.home.subtitle": "Blog / Notes / Wiki",
        "link.home.pill": "进入",
        "link.project.title": "我的项目",
        "link.project.subtitle": "开发中的炫酷小东西",
        "link.project.pill": "查看",
        "footer.right": "Made with ❤️ & HTML/CSS/JS",
        "toast.copied": "邮箱已复制 ✨",
        "toast.failed": "复制失败，请手动复制 😢"
    },
    en: {
        title: "ez4y2f",
        "badge.online": "✨ Online",
        tagline: "Full-Stack Developer · Middle School Student",
        bio: 'Making thing interesting, or the world better <br>🌈🦊🐾🎵💻💡✂<br><span class="bio-highlight">D3bug the w0r1d!</span>',
        "meta.location.label": "Location",
        "meta.location.value": "🦊 Foxnest",
        "meta.status.label": "Status",
        "meta.status.value": "Sleeping zzz",
        "btn.email": "📩 Send a mail",
        "btn.copy": "Copy mail",
        "section.social": "Social Media",
        "section.projects": "My website & Projects",
        "link.twitter.title": "X (Twitter)",
        "link.twitter.subtitle": "@ez4y2f",
        "link.twitter.pill": "Subscribe",
        "link.github.title": "GitHub",
        "link.github.subtitle": "things interesting",
        "link.github.pill": "Go",
        "link.bsky.title": "Bluesky",
        "link.bsky.subtitle": "@y2f.xyz",
        "link.bsky.pill": "Subscribe",
        "link.bilibili.title": "Bilibili",
        "link.bilibili.subtitle": "@ez4y2f",
        "link.bilibili.pill": "Watch it",
        "link.reddit.title": "Reddit",
        "link.reddit.subtitle": "@ez4y2f",
        "link.reddit.pill": "Go",
        "link.zhihu.title": "Zhihu",
        "link.zhihu.subtitle": "Some exchanges",
        "link.zhihu.pill": "Discover",
        "link.telegram.title": "Telegram",
        "link.telegram.subtitle": "Welcomed to chat",
        "link.telegram.pill": "Lets go",
        "link.home.title": "Personal Homepage",
        "link.home.subtitle": "Blog / Notes / Wiki",
        "link.home.pill": "Go!",
        "link.project.title": "My projects",
        "link.project.subtitle": "Some cool stuff in development",
        "link.project.pill": "Watch",
        "footer.right": "Made with ❤️ & HTML/CSS/JS",
        "toast.copied": "Mail copied ✨",
        "toast.failed": "copied failed, please do it manually 😢"
    }
};

let currentLang = "zh";
let toastEl = null;

function applyTranslations(lang) {
    const dict = translations[lang] || translations.zh;

    if (dict.title) {
        document.title = dict.title;
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = dict[key];
        if (!value) return;
        el.innerHTML = value;
    });
}

function updateLangButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        const btnLang = btn.getAttribute("data-lang");
        if (btnLang === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function setLanguage(lang) {
    if (!translations[lang]) {
        lang = "zh";
    }
    currentLang = lang;
    localStorage.setItem("pageLang", lang);
    applyTranslations(lang);
    updateLangButtons(lang);
}

function showToast(messageKey) {
    if (!toastEl) return;
    const dict = translations[currentLang] || translations.zh;
    toastEl.textContent = dict[messageKey] || "";
    toastEl.classList.add("show");
    setTimeout(() => {
        toastEl.classList.remove("show");
    }, 1900);
}

document.addEventListener("DOMContentLoaded", () => {
    toastEl = document.getElementById("toast");

    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const saved = localStorage.getItem("pageLang");
    const initialLang = saved === "en" || saved === "zh" ? saved : "zh";
    setLanguage(initialLang);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            setLanguage(lang);
        });
    });

    const copyBtn = document.querySelector(".copy-email");
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            const email = copyBtn.getAttribute("data-email") || "";
            try {
                await navigator.clipboard.writeText(email);
                showToast("toast.copied");
            } catch (e) {
                showToast("toast.failed");
            }
        });
    }
});