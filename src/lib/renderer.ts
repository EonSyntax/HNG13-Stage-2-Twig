import { Auth } from './auth';
import * as storage from './storage';
import { navigate } from './router';
import { landingTemplate } from './templates/landing';
import { loginTemplate } from './templates/login';
import { signupTemplate } from './templates/signup';
import { dashboardTemplate } from './templates/dashboard';
import { ticketsTemplate } from './templates/tickets';

type TemplateName = 'landing' | 'login' | 'signup' | 'dashboard' | 'tickets';

const templates: Record<TemplateName, (data?: any) => string> = {
  landing: landingTemplate,
  login: loginTemplate,
  signup: signupTemplate,
  dashboard: dashboardTemplate,
  tickets: ticketsTemplate,
};

export async function renderPage(pageName: string) {
  const app = document.getElementById('app');
  if (!app) return;

  // Check authentication for protected routes
  if (['dashboard', 'tickets'].includes(pageName)) {
    if (!Auth.requireAuth()) {
      return;
    }
  }

  try {
    const templateFn = templates[pageName as TemplateName];
    if (!templateFn) {
      throw new Error(`Template ${pageName} not found`);
    }

    const user = Auth.getUser();
    
    // Get data based on page
    let data: any = {};
    
    if (pageName === 'dashboard') {
      const tickets = user ? storage.getTickets(user.id) : [];
      data = {
        username: user?.username || '',
        recentTickets: tickets.slice(0, 5),
        stats: {
          total: tickets.length,
          open: tickets.filter(t => t.status === 'open').length,
          inProgress: tickets.filter(t => t.status === 'in_progress').length,
          closed: tickets.filter(t => t.status === 'closed').length,
        },
      };
    } else if (pageName === 'tickets') {
      const tickets = user ? storage.getTickets(user.id) : [];
      data = {
        username: user?.username || '',
        tickets,
      };
    }
    
    const html = templateFn(data);
    app.innerHTML = html;
    
    // Attach event listeners after rendering
    attachEventListeners(pageName);
  } catch (error) {
    console.error(`Error rendering ${pageName}:`, error);
    app.innerHTML = '<div class="min-h-screen flex items-center justify-center"><p class="text-red-600">Error loading page</p></div>';
  }
}

function attachEventListeners(pageName: string) {
  // Attach click handlers for navigation links
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    });
  });

  // Page-specific event listeners
  if (pageName === 'login') {
    attachLoginHandlers();
  } else if (pageName === 'signup') {
    attachSignupHandlers();
  } else if (pageName === 'dashboard') {
    attachDashboardHandlers();
  } else if (pageName === 'tickets') {
    attachTicketsHandlers();
  }
}

// Import page-specific handlers
import './pages/login';
import './pages/signup';
import './pages/dashboard';
import './pages/tickets';

function attachLoginHandlers() {
  (window as any).attachLoginHandlers?.();
}

function attachSignupHandlers() {
  (window as any).attachSignupHandlers?.();
}

function attachDashboardHandlers() {
  (window as any).attachDashboardHandlers?.();
}

function attachTicketsHandlers() {
  (window as any).attachTicketsHandlers?.();
}
