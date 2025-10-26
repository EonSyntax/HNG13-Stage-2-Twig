import { Auth } from '../auth';

(window as any).attachDashboardHandlers = () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Auth.logout();
    });
  }
};
