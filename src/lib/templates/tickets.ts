import type { Ticket } from "@shared/schema";

interface TicketsData {
  username: string;
  tickets: Ticket[];
}

export const ticketsTemplate = (data: TicketsData) => {
  const statusBadge = (status: string) => {
    const colors = {
      open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      in_progress:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      closed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const priorityBadge = (priority?: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      medium:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const statusLabel = (status: string) => {
    return status === "in_progress"
      ? "In Progress"
      : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return `
<div class="min-h-screen flex flex-col bg-background">
  <nav class="w-full border-b bg-card">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-primary">EonTickets</a>
      <div class="flex items-center gap-4">
        <span class="text-sm text-muted-foreground">Welcome, ${
          data.username
        }</span>
        <a href="/dashboard" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4">
          Dashboard
        </a>
        <button id="logout-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4">
          Logout
        </button>
      </div>
    </div>
  </nav>

  <main class="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">My Tickets</h1>
        <p class="text-muted-foreground">Manage your support tickets</p>
      </div>
      <button id="create-ticket-btn" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
        Create Ticket
      </button>
    </div>

    <div class="border bg-card rounded-lg">
      ${
        data.tickets.length > 0
          ? `
        <div class="divide-y">
          ${data.tickets
            .map(
              (ticket: Ticket) => `
            <div class="p-6 hover:bg-accent/30 transition-colors">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold mb-2">${ticket.title}</h3>
                  ${
                    ticket.description
                      ? `<p class="text-muted-foreground mb-3">${ticket.description}</p>`
                      : ""
                  }
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(
                      ticket.status
                    )}">
                      ${statusLabel(ticket.status)}
                    </span>
                    ${
                      ticket.priority
                        ? `
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityBadge(
                        ticket.priority
                      )}">
                        ${ticket.priority}
                      </span>
                    `
                        : ""
                    }
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Created ${new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div class="flex gap-2">
                  <button data-ticket-id="${
                    ticket.id
                  }" class="edit-ticket-btn inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4">
                    Edit
                  </button>
                  <button data-ticket-id="${
                    ticket.id
                  }" class="delete-ticket-btn inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-9 px-4">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : `
        <div class="p-12 text-center">
          <p class="text-muted-foreground mb-4">No tickets yet. Create your first ticket to get started!</p>
          <button id="create-ticket-btn-empty" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
            Create Your First Ticket
          </button>
        </div>
      `
      }
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

<!-- Create Dialog -->
<div id="create-dialog" class="hidden fixed inset-0 z-50 bg-black/80 items-center justify-center p-4">
  <div class="border bg-background shadow-lg rounded-lg w-full max-w-lg">
    <div class="flex items-center justify-between p-6 border-b">
      <h2 class="text-lg font-semibold">Create Ticket</h2>
      <button id="close-create-dialog" class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form id="create-form" class="p-6 space-y-4">
      <div class="space-y-2">
        <label for="create-title" class="text-sm font-medium">Title</label>
        <input 
          id="create-title"
          name="title"
          type="text"
          required
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter ticket title"
        />
      </div>
      <div class="space-y-2">
        <label for="create-description" class="text-sm font-medium">Description</label>
        <textarea 
          id="create-description"
          name="description"
          rows="3"
          class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
          placeholder="Describe the issue"
        ></textarea>
      </div>
      <div class="space-y-2">
        <label for="create-status" class="text-sm font-medium">Status</label>
        <select 
          id="create-status"
          name="status"
          required
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div class="space-y-2">
        <label for="create-priority" class="text-sm font-medium">Priority</label>
        <select 
          id="create-priority"
          name="priority"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div class="flex justify-end gap-2 pt-4">
        <button type="button" id="cancel-create" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4">
          Cancel
        </button>
        <button type="submit" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
          Create
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Edit Dialog -->
<div id="edit-dialog" class="hidden fixed inset-0 z-50 bg-black/80 items-center justify-center p-4">
  <div class="border bg-background shadow-lg rounded-lg w-full max-w-lg">
    <div class="flex items-center justify-between p-6 border-b">
      <h2 class="text-lg font-semibold">Edit Ticket</h2>
      <button id="close-edit-dialog" class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form id="edit-form" class="p-6 space-y-4">
      <input type="hidden" id="edit-ticket-id" name="ticketId" />
      <div class="space-y-2">
        <label for="edit-title" class="text-sm font-medium">Title</label>
        <input 
          id="edit-title"
          name="title"
          type="text"
          required
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter ticket title"
        />
      </div>
      <div class="space-y-2">
        <label for="edit-description" class="text-sm font-medium">Description</label>
        <textarea 
          id="edit-description"
          name="description"
          rows="3"
          class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
          placeholder="Describe the issue"
        ></textarea>
      </div>
      <div class="space-y-2">
        <label for="edit-status" class="text-sm font-medium">Status</label>
        <select 
          id="edit-status"
          name="status"
          required
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div class="space-y-2">
        <label for="edit-priority" class="text-sm font-medium">Priority</label>
        <select 
          id="edit-priority"
          name="priority"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div class="flex justify-end gap-2 pt-4">
        <button type="button" id="cancel-edit" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4">
          Cancel
        </button>
        <button type="submit" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
`;
};
