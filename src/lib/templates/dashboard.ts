import type { Ticket } from '@shared/schema';

interface DashboardData {
  username: string;
  recentTickets: Ticket[];
  stats: {
    total: number;
    open: number;
    inProgress: number;
    closed: number;
  };
}

export const dashboardTemplate = (data: DashboardData) => {
  const statusBadge = (status: string) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      closed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const priorityBadge = (priority?: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
      medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const statusLabel = (status: string) => {
    return status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return `
<div class="min-h-screen flex flex-col bg-background">
  <nav class="w-full border-b bg-card">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-primary">EonTickets</a>
      <div class="flex items-center gap-4">
        <span class="text-sm text-muted-foreground">Welcome, ${data.username}</span>
        <a href="/tickets" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4">
          My Tickets
        </a>
        <button id="logout-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4">
          Logout
        </button>
      </div>
    </div>
  </nav>

  <main class="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
      <p class="text-muted-foreground">Overview of your support tickets</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="border bg-card rounded-lg p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-muted-foreground">Total Tickets</p>
        </div>
        <p class="text-3xl font-bold">${data.stats.total}</p>
      </div>
      
      <div class="border bg-card rounded-lg p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-muted-foreground">Open</p>
        </div>
        <p class="text-3xl font-bold text-blue-600">${data.stats.open}</p>
      </div>
      
      <div class="border bg-card rounded-lg p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-muted-foreground">In Progress</p>
        </div>
        <p class="text-3xl font-bold text-yellow-600">${data.stats.inProgress}</p>
      </div>
      
      <div class="border bg-card rounded-lg p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-muted-foreground">Closed</p>
        </div>
        <p class="text-3xl font-bold text-green-600">${data.stats.closed}</p>
      </div>
    </div>

    <div class="border bg-card rounded-lg">
      <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">Recent Tickets</h2>
      </div>
      <div class="p-6">
        ${data.recentTickets.length > 0 ? `
          <div class="space-y-4">
            ${data.recentTickets.map((ticket: Ticket) => `
              <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div class="flex-1">
                  <h3 class="font-semibold mb-1">${ticket.title}</h3>
                  ${ticket.description ? `<p class="text-sm text-muted-foreground mb-2">${ticket.description}</p>` : ''}
                  <div class="flex gap-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(ticket.status)}">
                      ${statusLabel(ticket.status)}
                    </span>
                    ${ticket.priority ? `
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityBadge(ticket.priority)}">
                        ${ticket.priority}
                      </span>
                    ` : ''}
                  </div>
                </div>
                <a href="/tickets#${ticket.id}" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4">
                  View
                </a>
              </div>
            `).join('')}
          </div>
        ` : `
          <p class="text-muted-foreground text-center py-8">No tickets yet. Create your first ticket to get started!</p>
        `}
        
        <a href="/tickets" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 mt-6 w-full">
          Create New Ticket
        </a>
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
};
