import './index.css';
import { router } from './lib/router';
import { Auth } from './lib/auth';
import { renderPage } from './lib/renderer';

// Initialize auth
Auth.init();

// Define routes
router.on('/', () => renderPage('landing'));
router.on('/auth/login', () => renderPage('login'));
router.on('/auth/signup', () => renderPage('signup'));
router.on('/dashboard', () => renderPage('dashboard'));
router.on('/tickets', () => renderPage('tickets'));

// Handle initial route
router.resolve();

// Handle navigation
window.addEventListener('popstate', () => router.resolve());
