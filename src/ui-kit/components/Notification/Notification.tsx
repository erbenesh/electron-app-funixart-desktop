type Args = { message: string; description?: string; duration?: number; closable?: boolean };

let holder: HTMLDivElement | null = null;

function ensureHolder() {
  if (!holder) {
    holder = document.createElement('div');
    holder.style.position = 'fixed';
    holder.style.top = '1rem';
    holder.style.right = '1rem';
    holder.style.zIndex = '10000';
    document.body.appendChild(holder);
  }
}

export const notification = {
  open({ message, description, duration = 3500, closable }: Args) {
    ensureHolder();
    const box = document.createElement('div');
    box.style.minWidth = '16rem';
    box.style.marginTop = '0.5rem';
    box.style.padding = '0.75rem 1rem';
    box.style.borderRadius = '8px';
    box.style.background = 'rgba(48,48,48,0.96)';
    box.style.color = '#fff';
    box.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
    box.style.opacity = '0';
    box.style.transform = 'translateY(-6px)';
    box.style.transition = 'opacity 200ms ease, transform 200ms ease';
    box.innerHTML = `<div style="display:flex;align-items:start;gap:8px">
      <div style="flex:1">
        <div style="font-weight:600;margin-bottom:4px">${message}</div>
        ${description ? `<div style=\"opacity:.85\">${description}</div>` : ''}
      </div>
      ${closable ? `<button data-close style=\"background:transparent;border:none;color:#fff;opacity:.8;cursor:pointer\">×</button>` : ''}
    </div>`;
    if (closable) {
      const btn = box.querySelector('[data-close]') as HTMLButtonElement | null;
      btn?.addEventListener('click', () => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(-6px)';
        window.setTimeout(() => box.remove(), 220);
      });
    }
    holder!.appendChild(box);
    // fade-in
    requestAnimationFrame(() => {
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    });
    // auto close with fade-out
    window.setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(-6px)';
      window.setTimeout(() => box.remove(), 220);
    }, duration);
    return { close: () => box.remove() };
  }
};

export default notification;


