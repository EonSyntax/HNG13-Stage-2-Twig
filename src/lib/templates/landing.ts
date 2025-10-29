export const landingTemplate = () => `
<div class="min-h-screen flex flex-col bg-background">
  <main class="flex-1">
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-32 left-20 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl"></div>
      
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10 w-full">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Streamline Your <span class="text-primary">Support Workflow</span>
          </h1>
          <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track, manage, and resolve support tickets with ease. EonTickets
            brings clarity to your customer support with real-time updates,
            analytics, and team collaboration.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup" class="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-base font-medium">
              Get Started
            </a>
            <a href="/auth/login" class="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors text-base font-medium">
              Login
            </a>
          </div>
        </div>
      </div>

      <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="hsl(var(--card))"/>
      </svg>
    </section>

    <section id="features" class="py-16 md:py-24 bg-card">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage support tickets efficiently
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Smart Ticketing</h3>
              <p class="text-muted-foreground">
                Create, categorize, and prioritize tickets with an intuitive interface designed for speed and clarity.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p class="text-muted-foreground">
                Stay in sync with instant notifications and live status updates across your entire team.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p class="text-muted-foreground">
                Work together seamlessly with shared visibility and collaborative tools for your support team.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column w-6 h-6 text-primary"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p class="text-muted-foreground">
                Get insights into ticket trends, resolution times, and team performance with comprehensive analytics.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Status Tracking</h3>
              <p class="text-muted-foreground">
                Track ticket progress through customizable workflows with clear visual indicators.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-4 p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between">
              <div class="w-12 h-12 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                <svg fill="none" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Time Management</h3>
              <p class="text-muted-foreground">
                Monitor response times and SLAs to ensure your team meets customer expectations consistently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-background">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready To Get Started?
        </h2>
        <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using EonTickets to deliver exceptional customer support
        </p>
        <a href="/auth/signup" class="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-base font-medium">
          Start Free Trial
        </a>
      </div>
    </section>
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
