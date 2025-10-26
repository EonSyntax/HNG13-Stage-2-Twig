export class Router {
  private routes: Map<string, () => void> = new Map();

  on(path: string, handler: () => void) {
    this.routes.set(path, handler);
  }

  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.resolve();
  }

  resolve() {
    const path = window.location.pathname;
    const handler = this.routes.get(path);
    
    if (handler) {
      handler();
    } else {
      // 404 - redirect to landing
      this.navigate('/');
    }
  }
}

// Create global router instance
export const router = new Router();

// Global navigate function
export function navigate(path: string) {
  router.navigate(path);
}

// Make navigate available globally
(window as any).navigate = navigate;
