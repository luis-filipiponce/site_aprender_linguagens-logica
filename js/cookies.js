/**
 * ============================================================================
 * GERENCIADOR DE COOKIES, CONSENTIMENTO E PRIVACIDADE (LGPD/GDPR)
 * Ponce Metodologias & Dev — Portal de Ensino, Lógica e Programação
 * ============================================================================
 * Recursos:
 * - Leitura, escrita e exclusão segura de cookies (SameSite=Lax, expiração, path=/)
 * - Banner informativo com explicação detalhada do que será feito ao aceitar
 * - Modal de personalização granular (Essenciais, Preferências, Progresso)
 * - Painel de diagnóstico em tempo real ("O que está salvo na sua máquina")
 * - Totalmente acessível (ARIA, navegação por teclado, suporte a Light/Dark/Alto Contraste)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PonceCookies = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const COOKIE_CONSENT_KEY = 'ponce_cookie_consent';
  const COOKIE_THEME_KEY = 'ponce_theme';
  const CONSENT_VERSION = 1;
  const EXPIRY_DAYS = 365;

  /**
   * Grava um cookie de forma segura
   * @param {string} name 
   * @param {string} value 
   * @param {number} days 
   * @param {string} sameSite 
   */
  function setCookie(name, value, days = EXPIRY_DAYS, sameSite = 'Lax') {
    if (typeof document === 'undefined') return;
    let expires = '';
    if (typeof days === 'number' && days > 0) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + d.toUTCString();
    }
    const isHttps = typeof location !== 'undefined' && location.protocol === 'https:';
    const secureFlag = isHttps ? '; Secure' : '';
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=${sameSite}${secureFlag}`;
  }

  /**
   * Lê o valor de um cookie pelo nome
   * @param {string} name 
   * @returns {string|null}
   */
  function getCookie(name) {
    if (typeof document === 'undefined' || !document.cookie) return null;
    const key = name + '=';
    const parts = document.cookie.split(';');
    for (let i = 0; i < parts.length; i++) {
      let c = parts[i].trim();
      if (c.indexOf(key) === 0) {
        try {
          return decodeURIComponent(c.substring(key.length));
        } catch (e) {
          return c.substring(key.length);
        }
      }
    }
    return null;
  }

  /**
   * Remove um cookie
   * @param {string} name 
   */
  function deleteCookie(name) {
    if (typeof document === 'undefined') return;
    const isHttps = typeof location !== 'undefined' && location.protocol === 'https:';
    const secureFlag = isHttps ? '; Secure' : '';
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax${secureFlag}`;
  }

  /**
   * Retorna todos os cookies atuais como um objeto chave/valor
   * @returns {Record<string, string>}
   */
  function getAllCookies() {
    if (typeof document === 'undefined' || !document.cookie) return {};
    const res = {};
    const parts = document.cookie.split(';');
    for (let i = 0; i < parts.length; i++) {
      const item = parts[i].trim();
      if (!item) continue;
      const eqIdx = item.indexOf('=');
      if (eqIdx !== -1) {
        const k = item.substring(0, eqIdx).trim();
        const v = item.substring(eqIdx + 1).trim();
        try {
          res[k] = decodeURIComponent(v);
        } catch (e) {
          res[k] = v;
        }
      }
    }
    return res;
  }

  /**
   * Obtém o consentimento atual
   * @returns {{ version: number, essential: boolean, preferences: boolean, progress: boolean, status: string, timestamp: number } | null}
   */
  function getConsent() {
    const raw = getCookie(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.version === CONSENT_VERSION) {
        return parsed;
      }
    } catch (e) {
      // Formato inválido ou legado
    }
    return null;
  }

  /**
   * Salva as preferências de consentimento
   */
  function saveConsent(options = {}) {
    const consent = {
      version: CONSENT_VERSION,
      essential: true, // Essenciais são sempre obrigatórios
      preferences: !!options.preferences,
      progress: !!options.progress,
      status: options.status || (options.preferences && options.progress ? 'accepted' : 'custom'),
      timestamp: Date.now()
    };

    setCookie(COOKIE_CONSENT_KEY, JSON.stringify(consent), EXPIRY_DAYS);

    // Se preferência foi autorizada, sincroniza o tema
    if (consent.preferences) {
      if (typeof document !== 'undefined') {
        const theme = (document.documentElement && typeof document.documentElement.getAttribute === 'function' ? document.documentElement.getAttribute('data-theme') : null) ||
          (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function' ? localStorage.getItem('edumet-theme') || localStorage.getItem('ponce-theme') : null) || 'light';
        if (theme) setCookie(COOKIE_THEME_KEY, theme, EXPIRY_DAYS);
      }
    } else {
      deleteCookie(COOKIE_THEME_KEY);
    }

    // Dispara evento customizado para que outros componentes reajam
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('ponce:cookie-consent-updated', { detail: consent }));
      } catch (e) {}
    }

    return consent;
  }

  /**
   * Notificação Toast flutuante
   */
  function showToast(message) {
    if (typeof document === 'undefined') return;
    let toast = document.getElementById('cookie-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cookie-toast';
      toast.className = 'cookie-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4000);
  }

  /**
   * Fecha o banner de cookies com transição suave
   */
  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('cookie-banner-hidden');
      setTimeout(() => banner.remove(), 400);
    }
  }

  /**
   * Cria e exibe o banner de consentimento inicial
   */
  function showBanner() {
    if (typeof document === 'undefined' || document.getElementById('cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Consentimento de Cookies e Armazenamento');

    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-header">
          <div class="cookie-banner-icon" aria-hidden="true">🍪</div>
          <div>
            <h2 class="cookie-banner-title">Privacidade & Armazenamento no seu Navegador</h2>
            <p class="cookie-banner-desc">
              Utilizamos cookies e armazenamento local para lembrar suas preferências, salvar seu tema visual e registrar seu progresso nos 22 módulos de lógica e questionários.
            </p>
          </div>
        </div>

        <div class="cookie-banner-details" id="cookie-banner-details">
          <h3 class="cookie-details-title">📋 O que será feito ao aceitar?</h3>
          <ul class="cookie-details-list">
            <li>
              <span class="cookie-tag essential">⚙️ Essenciais</span>
              <div>
                <strong>Segurança e Consentimento (Obrigatório):</strong>
                <span>Guarda seu consentimento e garante a integridade da navegação sem coletar dados sensíveis.</span>
              </div>
            </li>
            <li>
              <span class="cookie-tag preferences">🎨 Preferências</span>
              <div>
                <strong>Tema Visual (Opcional):</strong>
                <span>Salva o tema escolhido (Claro ☀️, Escuro 🌙 ou Alto Contraste 👁️) para mantê-lo ativo nas suas próximas visitas.</span>
              </div>
            </li>
            <li>
              <span class="cookie-tag progress">📊 Progresso</span>
              <div>
                <strong>Aulas & Questionários (Opcional):</strong>
                <span>Guarda localmente suas notas, respostas corretas e módulos concluídos para que você não perca seu avanço nos estudos.</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="cookie-banner-actions">
          <button type="button" class="cookie-btn cookie-btn-primary" id="cookie-btn-accept-all">
            ✅ Aceitar Todos
          </button>
          <button type="button" class="cookie-btn cookie-btn-secondary" id="cookie-btn-accept-essential">
            🔒 Apenas Essenciais
          </button>
          <button type="button" class="cookie-btn cookie-btn-outline" id="cookie-btn-customize">
            ⚙️ Personalizar & Detalhes
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Bindings de botões
    const btnAcceptAll = document.getElementById('cookie-btn-accept-all');
    const btnAcceptEssential = document.getElementById('cookie-btn-accept-essential');
    const btnCustomize = document.getElementById('cookie-btn-customize');

    if (btnAcceptAll) {
      btnAcceptAll.addEventListener('click', () => {
        saveConsent({ preferences: true, progress: true, status: 'accepted' });
        hideBanner();
        showToast('✅ Cookies e preferências salvos com sucesso no seu dispositivo!');
      });
    }

    if (btnAcceptEssential) {
      btnAcceptEssential.addEventListener('click', () => {
        saveConsent({ preferences: false, progress: false, status: 'essential' });
        hideBanner();
        showToast('🔒 Apenas cookies essenciais foram ativados.');
      });
    }

    if (btnCustomize) {
      btnCustomize.addEventListener('click', () => {
        openModal();
      });
    }
  }

  /**
   * Abre o Modal de Configuração e Diagnóstico de Cookies
   */
  function openModal() {
    if (typeof document === 'undefined') return;

    let modal = document.getElementById('cookie-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cookie-modal';
      modal.className = 'cookie-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'cookie-modal-title');
      document.body.appendChild(modal);
    }

    const currentConsent = getConsent() || {
      essential: true,
      preferences: true,
      progress: true
    };

    const cookiesSalvos = getAllCookies();
    const cookieKeys = Object.keys(cookiesSalvos);

    modal.innerHTML = `
      <div class="cookie-modal-card">
        <div class="cookie-modal-header">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:1.6rem;" aria-hidden="true">🍪</span>
            <div>
              <h2 id="cookie-modal-title" class="cookie-modal-heading">Gerenciar Preferências de Cookies</h2>
              <p class="cookie-modal-sub">Controle exatamente o que é armazenado na sua máquina.</p>
            </div>
          </div>
          <button type="button" class="cookie-modal-close" id="cookie-modal-btn-close" aria-label="Fechar Modal">✕</button>
        </div>

        <div class="cookie-modal-body">
          <!-- Categoria: Essenciais -->
          <div class="cookie-pref-item">
            <div class="cookie-pref-header">
              <div class="cookie-pref-info">
                <div class="cookie-pref-title">
                  <strong>⚙️ Cookies Essenciais</strong>
                  <span class="cookie-badge required">Sempre Ativo</span>
                </div>
                <p class="cookie-pref-desc">
                  Necessários para o funcionamento básico do site, controle de segurança e para guardar seu próprio consentimento. Não podem ser desativados.
                </p>
                <div class="cookie-technical-info">
                  <code>ponce_cookie_consent</code> (Guarda seu status de privacidade)
                </div>
              </div>
              <div class="cookie-switch-wrapper">
                <input type="checkbox" id="cookie-check-essential" checked disabled class="cookie-switch"/>
                <label for="cookie-check-essential" class="cookie-switch-label disabled" aria-label="Cookies Essenciais sempre ativos"></label>
              </div>
            </div>
          </div>

          <!-- Categoria: Preferências -->
          <div class="cookie-pref-item">
            <div class="cookie-pref-header">
              <div class="cookie-pref-info">
                <div class="cookie-pref-title">
                  <strong>🎨 Preferências de Interface</strong>
                  <span class="cookie-badge optional">Opcional</span>
                </div>
                <p class="cookie-pref-desc">
                  Memoriza suas escolhas de tema visual (Claro, Escuro ou Alto Contraste) para manter seu conforto visual toda vez que você retornar ao portal.
                </p>
                <div class="cookie-technical-info">
                  <code>ponce_theme</code> (Guarda o tema visual selecionado)
                </div>
              </div>
              <div class="cookie-switch-wrapper">
                <input type="checkbox" id="cookie-check-preferences" ${currentConsent.preferences ? 'checked' : ''} class="cookie-switch"/>
                <label for="cookie-check-preferences" class="cookie-switch-label" aria-label="Ativar cookies de Preferências"></label>
              </div>
            </div>
          </div>

          <!-- Categoria: Progresso -->
          <div class="cookie-pref-item">
            <div class="cookie-pref-header">
              <div class="cookie-pref-info">
                <div class="cookie-pref-title">
                  <strong>📊 Progresso de Estudos & Questões</strong>
                  <span class="cookie-badge optional">Opcional</span>
                </div>
                <p class="cookie-pref-desc">
                  Permite salvar no armazenamento local do navegador suas respostas aos questionários, pontuações, notas e o andamento nos 22 módulos de Lógica Pura.
                </p>
                <div class="cookie-technical-info">
                  <code>localStorage: edumet_progresso</code>, <code>ponce-progresso</code>
                </div>
              </div>
              <div class="cookie-switch-wrapper">
                <input type="checkbox" id="cookie-check-progress" ${currentConsent.progress ? 'checked' : ''} class="cookie-switch"/>
                <label for="cookie-check-progress" class="cookie-switch-label" aria-label="Ativar persistência de Progresso de Estudos"></label>
              </div>
            </div>
          </div>

          <!-- Diagnóstico: O que está salvo agora -->
          <div class="cookie-inspect-section">
            <details class="cookie-inspect-details">
              <summary class="cookie-inspect-summary">
                🔍 <strong>Ver dados atualmente gravados na sua máquina</strong> (${cookieKeys.length} cookies detectados)
              </summary>
              <div class="cookie-inspect-content">
                ${cookieKeys.length > 0 ? `
                  <table class="cookie-table">
                    <thead>
                      <tr>
                        <th>Nome do Cookie</th>
                        <th>Conteúdo / Finalidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${cookieKeys.map(k => `
                        <tr>
                          <td><code>${escapeHtml(k)}</code></td>
                          <td><code>${escapeHtml(cookiesSalvos[k].substring(0, 80))}${cookiesSalvos[k].length > 80 ? '...' : ''}</code></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                ` : '<p class="cookie-empty-text">Nenhum cookie gravado no momento.</p>'}
                <div style="margin-top:0.8rem; display:flex; justify-content:flex-end;">
                  <button type="button" class="cookie-btn-danger" id="cookie-btn-clear-all">
                    🗑️ Limpar Todos os Cookies do Site
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

        <div class="cookie-modal-footer">
          <div class="cookie-modal-footer-left">
            <button type="button" class="cookie-btn cookie-btn-secondary" id="cookie-modal-btn-essential">
              Apenas Essenciais
            </button>
            <button type="button" class="cookie-btn cookie-btn-outline" id="cookie-modal-btn-all">
              Aceitar Todos
            </button>
          </div>
          <button type="button" class="cookie-btn cookie-btn-primary" id="cookie-modal-btn-save">
            💾 Salvar Minhas Escolhas
          </button>
        </div>
      </div>
    `;

    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';

    // Foco acessível no botão fechar ou salvar
    const btnClose = document.getElementById('cookie-modal-btn-close');
    if (btnClose) btnClose.focus();

    // Funções de fechamento
    function closeModal() {
      modal.classList.remove('visible');
      document.body.style.overflow = '';
    }

    if (btnClose) {
      btnClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape' && modal.classList.contains('visible')) {
        closeModal();
        document.removeEventListener('keydown', onEsc);
      }
    });

    // Salvar personalizado
    const btnSave = document.getElementById('cookie-modal-btn-save');
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const prefCheck = document.getElementById('cookie-check-preferences');
        const progCheck = document.getElementById('cookie-check-progress');
        const isPref = prefCheck ? prefCheck.checked : false;
        const isProg = progCheck ? progCheck.checked : false;

        saveConsent({
          preferences: isPref,
          progress: isProg,
          status: isPref && isProg ? 'accepted' : (!isPref && !isProg ? 'essential' : 'custom')
        });

        closeModal();
        hideBanner();
        showToast('✅ Suas preferências de cookies foram salvas com sucesso!');
      });
    }

    // Aceitar todos via modal
    const btnModalAll = document.getElementById('cookie-modal-btn-all');
    if (btnModalAll) {
      btnModalAll.addEventListener('click', () => {
        saveConsent({ preferences: true, progress: true, status: 'accepted' });
        closeModal();
        hideBanner();
        showToast('✅ Todos os cookies foram aceitos e salvos na sua máquina!');
      });
    }

    // Apenas essenciais via modal
    const btnModalEssential = document.getElementById('cookie-modal-btn-essential');
    if (btnModalEssential) {
      btnModalEssential.addEventListener('click', () => {
        saveConsent({ preferences: false, progress: false, status: 'essential' });
        closeModal();
        hideBanner();
        showToast('🔒 Apenas cookies essenciais foram mantidos.');
      });
    }

    // Limpar tudo
    const btnClearAll = document.getElementById('cookie-btn-clear-all');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        if (confirm('Deseja realmente remover todos os cookies salvos na sua máquina para este site?')) {
          const all = getAllCookies();
          Object.keys(all).forEach(k => deleteCookie(k));
          closeModal();
          showToast('🗑️ Todos os cookies locais foram removidos.');
          setTimeout(() => {
            showBanner();
          }, 600);
        }
      });
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Adiciona o botão discreto ou listeners de rodapé
   */
  function attachFooterListeners() {
    if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return;

    // Conecta botões existentes com data-open-cookies ou classe
    try {
      document.querySelectorAll('[data-open-cookies], .btn-manage-cookies, a[href="#cookies-modal"]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal();
        });
      });
    } catch (e) {}

    // Cria botão flutuante discreto no canto inferior se não houver no rodapé
    if (typeof document.getElementById === 'function' && !document.getElementById('cookie-floating-btn') && document.body) {
      const floatBtn = document.createElement('button');
      floatBtn.id = 'cookie-floating-btn';
      floatBtn.className = 'cookie-floating-btn';
      floatBtn.type = 'button';
      floatBtn.setAttribute('aria-label', 'Gerenciar Preferências de Cookies');
      floatBtn.setAttribute('title', 'Privacidade & Cookies (Configurar)');
      floatBtn.innerHTML = '🍪 <span class="cookie-float-text">Cookies</span>';
      floatBtn.addEventListener('click', () => openModal());
      document.body.appendChild(floatBtn);
    }
  }

  /**
   * Inicialização automática na carga da página
   */
  function init() {
    if (typeof document === 'undefined') return;

    // 1. Aplica tema a partir de cookie se houver e estiver autorizado
    const consent = getConsent();
    if (!consent || consent.preferences) {
      const savedTheme = getCookie(COOKIE_THEME_KEY);
      if (savedTheme && document.documentElement && typeof document.documentElement.setAttribute === 'function') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }

    // 2. Se ainda não há consentimento registrado, exibe o banner informativo no navegador
    if (!consent && typeof document.createElement === 'function' && document.body) {
      // Delay suave para não conflitar com a animação de entrada da página
      setTimeout(() => {
        showBanner();
      }, 700);
    }

    // 3. Conecta listeners de rodapé e botão flutuante
    attachFooterListeners();
  }

  // Executa quando o DOM estiver pronto no navegador
  if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    setCookie,
    getCookie,
    deleteCookie,
    getAllCookies,
    getConsent,
    saveConsent,
    showBanner,
    openModal,
    hideBanner,
    showToast,
    COOKIE_CONSENT_KEY,
    COOKIE_THEME_KEY
  };
});
