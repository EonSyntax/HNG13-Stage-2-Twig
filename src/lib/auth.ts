import bcrypt from 'bcryptjs';
import * as storage from './storage';
import { navigate } from './router';
import { showToast } from './toast';

export interface AuthUser {
  id: string;
  username: string;
}

const SESSION_KEY = 'ticketapp_session';

class AuthManager {
  private user: AuthUser | null = null;
  private listeners: Array<(user: AuthUser | null) => void> = [];

  init() {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        this.user = parsed.user;
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  subscribe(listener: (user: AuthUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.user));
  }

  async login(username: string, password: string): Promise<void> {
    const user = storage.getUserByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const authUser: AuthUser = { id: user.id, username: user.username };
    this.user = authUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: authUser }));
    this.notify();
  }

  async signup(username: string, password: string): Promise<void> {
    const existingUser = storage.getUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = storage.createUser(username, hashedPassword);

    const authUser: AuthUser = { id: newUser.id, username: newUser.username };
    this.user = authUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: authUser }));
    this.notify();
  }

  logout() {
    this.user = null;
    localStorage.removeItem(SESSION_KEY);
    this.notify();
    navigate('/');
  }

  requireAuth(): boolean {
    if (!this.isAuthenticated()) {
      showToast('Please login to continue', 'error');
      navigate('/auth/login');
      return false;
    }
    return true;
  }
}

export const Auth = new AuthManager();
