export const loginTemplate = () => `
<div class="min-h-screen flex flex-col bg-background">
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="border bg-card shadow-lg rounded-lg p-8">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
          <p class="text-muted-foreground">Sign in to your EonTickets account</p>
        </div>

        <form id="login-form" class="space-y-6">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium">Username</label>
            <input 
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              required
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your username"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">Password</label>
            <input 
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit"
            class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Sign In
          </button>
        </form>

        <div class="mt-6 text-center text-sm">
          <span class="text-muted-foreground">Don't have an account?</span>
          <a href="/auth/signup" class="text-primary hover:underline ml-1">Sign up</a>
        </div>
      </div>
    </div>
  </main>

  <footer class="w-full border-t bg-card mt-auto">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          © 2025 EonTickets. All rights reserved.
        </p>
        <div class="flex gap-6 text-sm text-muted-foreground">
          <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</div>
`;
