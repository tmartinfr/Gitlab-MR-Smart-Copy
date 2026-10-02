const DEFAULT_SHORTCUT = 'c';
let shortcutKey = DEFAULT_SHORTCUT;

function showToast(message) {
  // Find all existing toasters
  let toasters = document.querySelectorAll('#b-toaster-bottom-left');
  let toaster;

  if (toasters.length > 0) {
    // Use the last existing toaster
    toaster = toasters[toasters.length - 1];
  } else {
    // Create one if none exists
    toaster = document.createElement('div');
    toaster.id = 'b-toaster-bottom-left';
    toaster.className = 'b-toaster b-toaster-bottom-left';
    document.body.appendChild(toaster);
  }

  // Find or create slot wrapper
  let slot = toaster.querySelector('.b-toaster-slot.vue-portal-target');
  if (!slot) {
    slot = document.createElement('div');
    slot.className = 'b-toaster-slot vue-portal-target';
    toaster.appendChild(slot);
  }

  // Create toast element
  const toastOuter = document.createElement('div');
  toastOuter.className = 'b-toast b-toast-prepend';
  toastOuter.setAttribute('role', 'status');
  toastOuter.setAttribute('aria-live', 'polite');
  toastOuter.setAttribute('aria-atomic', 'true');
  slot.appendChild(toastOuter);

  const toast = document.createElement('div');
  toast.className = 'toast gl-toast';
  toast.tabIndex = 0;
  toastOuter.appendChild(toast);

  // Header with close button
  const header = document.createElement('header');
  header.className = 'toast-header';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn gl-button btn-default btn-sm btn-default-tertiary btn-icon gl-toast-close-button';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = `<svg data-testid="close-icon" role="img" aria-hidden="true" class="gl-button-icon gl-icon s16 gl-fill-current">
                          <use href="/assets/icons-62cd41f10569bb5050df02409792752f47c042aa91f8d59f11b48b79e724f90d.svg#close"></use>
                        </svg>`;
  closeBtn.addEventListener('click', () => toastOuter.remove());
  header.appendChild(closeBtn);
  toast.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'toast-body';
  body.textContent = message;
  toast.appendChild(body);

  // Auto-remove after 5s
  setTimeout(() => toastOuter.remove(), 5000);
}


function createCopyButton(link, title,isMainPage = false) {
  const copyToClipboard = (link, title) => {
    navigator.clipboard?.write([
      new ClipboardItem({
        'text/plain': new Blob([link], { type: 'text/plain' }),
        'text/html': new Blob([`<a href="${link}">${title}</a>`], { type: 'text/html' })
      })
    ])
  };

  const btn = document.createElement('button');
  btn.type = 'button';
  let tooltip_text = "Copy MR";
  btn.setAttribute('data-toggle', 'tooltip');
  btn.setAttribute('data-container', 'body');
  btn.setAttribute('data-html', 'true');
  if(isMainPage){
    const shortcutLabel = shortcutKey === shortcutKey.toLowerCase() ? shortcutKey : `Shift+${shortcutKey}`;
    btn.setAttribute('aria-keyshortcuts', shortcutLabel);
    tooltip_text = tooltip_text + ` <kbd class='flat gl-ml-2' aria-hidden=true>${shortcutLabel}</kbd>`;
    btn.className = 'btn gl-button btn-default btn-md btn-default-tertiary btn-block gl-flex gl-new-dropdown-toggle gl-new-dropdown-icon-only btn-icon gl-new-dropdown-toggle-no-caret js-source-branch-copy';
    btn.setAttribute('data-placement', 'bottom');

  }else{
    btn.className = 'gl-button btn btn-icon btn-sm btn-default btn-default-tertiary !gl-hidden @md/panel:!gl-inline-block gl-mx-1 js-source-branch-copy';
    btn.setAttribute('data-placement', 'right');

  }
  btn.title = tooltip_text;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('s16', 'gl-icon', 'gl-button-icon');
  svg.innerHTML = `<use href="/assets/icons-62cd41f10569bb5050df02409792752f47c042aa91f8d59f11b48b79e724f90d.svg#copy-to-clipboard"></use>`;
  btn.appendChild(svg);

  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(link, title);
    const tooltip = document.querySelector('.tooltip');
    const tooltip_inner = document.querySelector('.tooltip .tooltip-inner');
    btn.title = "Copied";
    btn.setAttribute('aria-label', 'Copied');
    btn.setAttribute('data-original-title', 'Copied');
    btn.setAttribute('aria-describedby', 'tooltip');
    if (tooltip && tooltip_inner) tooltip_inner.innerHTML = `<span>Copied</span>`;
    const mouseEnterEvent = new Event('mouseenter', { bubbles: true, cancelable: true });
    btn.dispatchEvent(mouseEnterEvent);
    setTimeout(() => {
      const mouseLeaveEvent = new Event('mouseleave', { bubbles: true, cancelable: true });
      btn.dispatchEvent(mouseLeaveEvent);
      btn.blur();
    }, 2000);
  });
  return btn;
}

function addCopyButton() {
  document.querySelectorAll('.issuable-list li.merge-request .issuable-main-info').forEach(issue => {
    const title = issue.querySelector('.issue-title-text');
    if (title && !title.parentNode.querySelector('.js-source-branch-copy')) {
      const link = title.href;
      const btn = createCopyButton(link, title.textContent);
      title.parentNode.insertBefore(btn, title.nextSibling);
    }
  });

  const mrTitle = document.querySelector('h1.title[data-testid="title-content"]');
  if (mrTitle && !mrTitle.parentNode.querySelector('.js-source-branch-copy')) {
    const btn = createCopyButton(window.location.href, mrTitle.textContent, true);
    const wrapper = document.createElement('div');
    wrapper.appendChild(btn);
    mrTitle.parentNode.insertBefore(wrapper, mrTitle.nextSibling);
    
    // Add keyboard shortcut support
    // Add keyboard shortcut support
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    
      // Case-sensitive match: an uppercase shortcut means Shift+letter
      if (
        e.key === shortcutKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        // Find the first visible copy button for MR title
        const btn =
          document.querySelector('h1.title[data-testid="title-content"] + div .js-source-branch-copy') ||
          document.querySelector('.issuable-list li.merge-request .issuable-main-info .js-source-branch-copy');
    
        if (btn) {
          btn.click(); // simulate click
          showToast('Copied MR to clipboard.');
          e.preventDefault();
        }
      }
    });
  }
}

// Load the shortcut before injecting buttons so the tooltip shows the right key
chrome.storage.sync.get({ shortcutKey: DEFAULT_SHORTCUT }, (settings) => {
  shortcutKey = settings?.shortcutKey || DEFAULT_SHORTCUT;

  addCopyButton();

  const observer = new MutationObserver(addCopyButton);
  observer.observe(document.body, { childList: true, subtree: true });
});


