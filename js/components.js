/* ========================================
   超灵智能 - 共享组件
   动态注入 Nav / Footer / CTA
   ======================================== */

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return './';
}

function renderNav() {
  const base = getBasePath();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const isActive = (page) => currentPage === page ? 'active' : '';

  return `
  <nav class="nav" role="navigation" aria-label="主导航">
    <a href="${base}index.html" class="logo" aria-label="超灵智能首页">
      <svg class="logo-icon" viewBox="0 0 32 32" width="36" height="36">
        <rect width="32" height="32" rx="6" fill="#2563EB"/>
        <path d="M16 6 L22 12 L16 12 L20 18 L14 18 L18 24 L8 14 L14 14 L10 8 Z" fill="white" opacity="0.95"/>
      </svg>
      <span class="logo-text">超灵智能<small>SUPRAAI</small></span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="${base}index.html" class="${isActive('index.html')}">首页</a>
      <div class="nav-dropdown">
        <a class="nav-dropdown-trigger ${['services.html','industries.html','mcp-dev.html'].includes(currentPage) ? 'active' : ''}">服务方案 <span class="nav-arrow">▾</span></a>
        <div class="nav-dropdown-menu">
          <a href="${base}pages/services.html" class="${isActive('services.html')}">服务总览</a>
          <a href="${base}pages/industries.html" class="${isActive('industries.html')}">行业方案</a>
          <a href="${base}pages/mcp-dev.html" class="${isActive('mcp-dev.html')}">定制开发</a>
        </div>
      </div>
      <a href="${base}pages/cases.html" class="${isActive('cases.html')}">案例</a>
      <a href="${base}pages/training.html" class="${isActive('training.html')}">培训</a>
      <a href="${base}pages/about.html" class="${isActive('about.html')}">关于</a>
      <a href="${base}pages/contact.html" class="${isActive('contact.html')}">联系我们</a>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <button class="nav-cta" onclick="location.href='${base}pages/contact.html'">免费咨询 →</button>
      <button class="nav-toggle" id="navToggle" aria-label="菜单">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

function renderFooter() {
  const base = getBasePath();
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${base}index.html" class="logo" style="margin-bottom:12px;">
            <svg class="logo-icon" viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="6" fill="#2563EB"/>
              <path d="M16 6 L22 12 L16 12 L20 18 L14 18 L18 24 L8 14 L14 14 L10 8 Z" fill="white" opacity="0.95"/>
            </svg>
            <span class="logo-text" style="font-size:16px;">超灵智能<small>SUPRAAI</small></span>
          </a>
          <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.7;max-width:280px;">专注为大湾区中小企业提供 AI 转型一站式服务，让每一家企业都能真正用上 AI。</p>
        </div>
        <div class="footer-links">
          <h4>服务</h4>
          <a href="${base}pages/services.html">服务总览</a>
          <a href="${base}pages/industries.html">行业方案</a>
          <a href="${base}pages/mcp-dev.html">定制开发</a>
          <a href="${base}pages/training.html">培训课程</a>
        </div>
        <div class="footer-links">
          <h4>公司</h4>
          <a href="${base}pages/cases.html">项目案例</a>
          <a href="${base}pages/about.html">关于我们</a>
          <a href="${base}pages/contact.html">联系我们</a>
        </div>
        <div class="footer-links">
          <h4>联系</h4>
          <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.8;">📍 广东 · 粤港澳大湾区<br/>📧 hello@chaolng.ai<br/>📺 B站/公众号：超灵智能</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 超灵智能 SUPRAAI · 粤港澳大湾区 AI 转型一站式服务商</p>
      </div>
    </div>
  </footer>`;
}

function renderCTA() {
  const base = getBasePath();
  return `
  <section class="page-cta fade-in">
    <div class="cta-section">
      <h2>30 天内让您的企业用上 AI</h2>
      <p>先做免费诊断，找到最适合的 AI 落地场景，再决定是否合作。</p>
      <div class="cta-btns">
        <button class="btn-white" onclick="location.href='${base}pages/contact.html'">预约免费诊断</button>
        <button class="btn-outline-white" onclick="location.href='${base}pages/cases.html'">查看案例</button>
      </div>
    </div>
  </section>`;
}

/* === 初始化共享组件 === */
function initComponents() {
  // 注入导航
  const navPlaceholder = document.getElementById('shared-nav');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = renderNav();
  }

  // 注入 CTA
  const ctaPlaceholder = document.getElementById('shared-cta');
  if (ctaPlaceholder) {
    ctaPlaceholder.outerHTML = renderCTA();
  }

  // 注入 Footer
  const footerPlaceholder = document.getElementById('shared-footer');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = renderFooter();
  }

  // 重新初始化导航交互
  initNavigation();
  initScrollAnimations();
}

document.addEventListener('DOMContentLoaded', initComponents);
