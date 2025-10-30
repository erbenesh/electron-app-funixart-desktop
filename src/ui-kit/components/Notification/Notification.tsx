type Args = { message: string; description?: string; duration?: number; closable?: boolean };

let holder: HTMLDivElement | null = null;
type Position = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
let pos: Position = 'topRight';

function ensureHolder() {
  if (!holder) {
    holder = document.createElement('div');
    holder.style.position = 'fixed';
    holder.style.zIndex = '10000';
    document.body.appendChild(holder);
  }
  holder!.style.top = pos.includes('top') ? '1rem' : '';
  holder!.style.bottom = pos.includes('bottom') ? '1rem' : '';
  holder!.style.right = pos.includes('Right') ? '1rem' : '';
  holder!.style.left = pos.includes('Left') ? '1rem' : '';
}

export const notification = {
  config(opts: { placement?: Position }) {
    if (opts.placement) pos = opts.placement;
  },
  open({ message, description, duration = 3500, closable }: Args & { key?: string; onClose?: () => void; placement?: Position }) {
    if (arguments.length && (arguments[0] as any).placement) pos = (arguments[0] as any).placement;
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
    const timer = window.setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(-6px)';
      window.setTimeout(() => { box.remove(); (arguments[0] as any)?.onClose?.(); }, 220);
    }, duration);
    return { close: () => { window.clearTimeout(timer); box.remove(); (arguments[0] as any)?.onClose?.(); } };
  }
};

export default notification;


