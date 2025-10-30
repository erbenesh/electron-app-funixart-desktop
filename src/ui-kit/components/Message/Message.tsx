import React from 'react';

type MessageType = 'info' | 'success' | 'warning' | 'error';

type OpenArgs = { content: React.ReactNode; duration?: number; type?: MessageType };

let holder: HTMLDivElement | null = null;
const queue: HTMLElement[] = [];

function ensureHolder() {
  if (!holder) {
    holder = document.createElement('div');
    holder.style.position = 'fixed';
    holder.style.top = '1rem';
    holder.style.left = '50%';
    holder.style.transform = 'translateX(-50%)';
    holder.style.zIndex = '9999';
    document.body.appendChild(holder);
  }
}

export const message = {
  open({ content, duration = 2000, type = 'info' }: OpenArgs) {
    ensureHolder();
    const el = document.createElement('div');
    el.style.marginTop = '.5rem';
    el.style.padding = '.5rem 1rem';
    el.style.borderRadius = '6px';
    el.style.background = '#303030';
    el.style.color = '#fff';
    el.style.opacity = '0';
    el.style.transition = 'opacity 150ms ease';
    el.textContent = typeof content === 'string' ? content : '';
    holder!.appendChild(el);
    queue.push(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; });
    window.setTimeout(() => {
      el.style.opacity = '0';
      window.setTimeout(() => { el.remove(); const i = queue.indexOf(el); if (i >= 0) queue.splice(i, 1); }, 180);
    }, duration);
  },
  info(content: React.ReactNode, duration?: number) { this.open({ content, duration, type: 'info' }); },
  success(content: React.ReactNode, duration?: number) { this.open({ content, duration, type: 'success' }); },
  warning(content: React.ReactNode, duration?: number) { this.open({ content, duration, type: 'warning' }); },
  error(content: React.ReactNode, duration?: number) { this.open({ content, duration, type: 'error' }); },
};

export default message;


