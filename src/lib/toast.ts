export type ToastVariant = 'default' | 'success' | 'error';

export function showToast(message: string, variant: ToastVariant = 'default', description?: string) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `
    p-4 rounded-lg shadow-lg border backdrop-blur-sm transform transition-all duration-300 translate-x-full min-w-[300px] max-w-[420px]
    ${variant === 'error' ? 'bg-red-50 border-red-200 text-red-900' : ''}
    ${variant === 'success' ? 'bg-green-50 border-green-200 text-green-900' : ''}
    ${variant === 'default' ? 'bg-white border-gray-200 text-gray-900' : ''}
  `;

  toast.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="font-semibold text-sm">${message}</div>
        ${description ? `<div class="text-sm opacity-80 mt-1">${description}</div>` : ''}
      </div>
      <button onclick="this.closest('div[class*=\\'rounded-lg\\']').remove()" class="text-current opacity-50 hover:opacity-100">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
