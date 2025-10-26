import { Auth } from '../auth';
import { navigate } from '../router';
import { showToast } from '../toast';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

(window as any).attachLoginHandlers = () => {
  const form = document.getElementById('login-form') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    try {
      // Validate
      loginSchema.parse(data);
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';
      
      // Attempt login
      await Auth.login(data.username, data.password);
      
      showToast('Login successful', 'success', `Welcome back, ${data.username}!`);
      navigate('/dashboard');
    } catch (error: any) {
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Login';
      
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          const field = form.querySelector(`[name="${err.path[0]}"]`);
          if (field) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-600 text-sm mt-1';
            errorDiv.textContent = err.message;
            field.parentElement?.appendChild(errorDiv);
          }
        });
      } else {
        showToast('Login failed', 'error', error.message || 'Invalid credentials. Please try again.');
      }
    }
  });
};
