document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.classList.add('js');
    const hamburgerBtn = document.querySelector('.chalisahub-hamburger');
    const navMenu = document.getElementById('navMenu');
    const aboutBtn = document.querySelector('.chalisahub-arrow-label');
    const aboutSubmenu = document.getElementById('about-submenu');
    if (!navMenu) return;

    const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function setMenuState(open) {
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', String(Boolean(open)));
        navMenu.classList.toggle('active', Boolean(open));
        navMenu.setAttribute('aria-hidden', String(!open));
    }

    let isDesktop = window.innerWidth > 768;
    setMenuState(isDesktop);

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => setMenuState(!navMenu.classList.contains('active')));
        hamburgerBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburgerBtn.click();
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.chalisahub-nav-container')) setMenuState(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                setMenuState(false);
                if (hamburgerBtn) hamburgerBtn.focus();
            }
            if (aboutSubmenu && aboutSubmenu.classList.contains('active')) {
                toggleAbout(false);
                if (aboutBtn) aboutBtn.focus();
            }
        }
    });

    navMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !navMenu.classList.contains('active') || window.innerWidth > 768) return;
        const focusables = Array.from(navMenu.querySelectorAll(focusableSelector)).filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    function toggleAbout(open) {
        if (!aboutSubmenu || !aboutBtn) return;
        aboutSubmenu.classList.toggle('active', Boolean(open));
        aboutBtn.setAttribute('aria-expanded', String(Boolean(open)));
        aboutSubmenu.setAttribute('aria-hidden', String(!open));
        Array.from(aboutSubmenu.querySelectorAll('a')).forEach(a => a.setAttribute('tabindex', open ? '0' : '-1'));
        const arrow = aboutBtn.querySelector('.chalisahub-arrow');
        if (arrow) arrow.classList.toggle('open', Boolean(open));
    }

    if (aboutSubmenu) toggleAbout(false);
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nowOpen = aboutSubmenu.classList.contains('active');
            toggleAbout(!nowOpen);
        });
        aboutBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                aboutBtn.click();
            }
        });
    }

    window.addEventListener('resize', () => {
        const nowDesktop = window.innerWidth > 768;
        if (nowDesktop !== isDesktop) {
            isDesktop = nowDesktop;
            setMenuState(isDesktop);
            if (aboutSubmenu) toggleAbout(false);
        }
    });
});

const fontDisplay = document.getElementById('fontSizeDisplay');
const insideContent = document.querySelector('.chalisahub-article-content');
const STORAGE_KEY = 'chalisahubFontSize';
let currentSize = parseInt(localStorage.getItem(STORAGE_KEY)) || 18;

function changeFontSize(change) {
    currentSize += change;
    if (currentSize < 14) currentSize = 14;

    insideContent.style.fontSize = currentSize + 'px';
    fontDisplay.textContent = currentSize + 'px';
    localStorage.setItem(STORAGE_KEY, currentSize);
}

// Initialize on load
insideContent.style.fontSize = currentSize + 'px';
fontDisplay.textContent = currentSize + 'px';

// Share Functions
const pageTitle = encodeURIComponent(document.title);
const pageUrl = encodeURIComponent(window.location.href);

function shareToWhatsApp() {
    window.open(`https://wa.me/?text=${pageTitle} ${pageUrl}`, '_blank');
}

function shareToTwitter() {
    window.open(`https://x.com/intent/post?text=${pageTitle}&url=${pageUrl}`, '_blank');
}

function shareToFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
}

function shareToTelegram() {
    window.open(`https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`, '_blank');
}

function shareToLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank');
}

function copyLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ffffff"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>Link Copied';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Copy failed. Please copy the URL manually: ' + window.location.href);
        });
    } else {
        alert('Your browser does not support automatic copying. Please copy the URL manually: ' + window.location.href);
    }
}