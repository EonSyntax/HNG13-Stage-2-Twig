import { Auth } from "../auth";
import * as storage from "../storage";
import { showToast } from "../toast";
import { renderPage } from "../renderer";
import { insertTicketSchema } from "@shared/schema";
import { z } from "zod";

const ticketFormSchema = insertTicketSchema.omit({ userId: true });

(window as any).attachTicketsHandlers = () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Auth.logout();
    });
  }

  // Create dialog handlers
  const createBtn = document.getElementById("create-ticket-btn");
  const createDialog = document.getElementById("create-dialog");
  const createForm = document.getElementById("create-form") as HTMLFormElement;
  const cancelCreateBtn = document.getElementById("cancel-create");

  if (createBtn && createDialog) {
    createBtn.addEventListener("click", () => {
      createDialog.classList.remove("hidden");
      createDialog.classList.add("flex");
    });
  }

  if (cancelCreateBtn && createDialog) {
    cancelCreateBtn.addEventListener("click", () => {
      createDialog.classList.remove("flex");
      createDialog.classList.add("hidden");
      createForm?.reset();
    });
  }

  if (createForm) {
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = Auth.getUser();
      if (!user) return;

      const formData = new FormData(createForm);
      const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as string,
        priority: formData.get("priority") as string,
      };

      // Clear previous errors
      document.querySelectorAll(".error-message").forEach((el) => el.remove());

      try {
        const validatedData = ticketFormSchema.parse(data);

        storage.createTicket({
          title: validatedData.title,
          description: validatedData.description,
          status: validatedData.status as "open" | "in_progress" | "closed",
          priority: validatedData.priority as
            | "low"
            | "medium"
            | "high"
            | undefined,
          userId: user.id,
        });

        createDialog?.classList.remove("flex");
        createDialog?.classList.add("hidden");
        createForm.reset();
        showToast("Success", "success", "Ticket created successfully");

        // Re-render page
        await renderPage("tickets");
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = createForm.querySelector(`[name="${err.path[0]}"]`);
            if (field) {
              const errorDiv = document.createElement("div");
              errorDiv.className = "error-message text-red-600 text-sm mt-1";
              errorDiv.textContent = err.message;
              field.parentElement?.appendChild(errorDiv);
            }
          });
        } else {
          showToast("Error", "error", "Failed to create ticket");
        }
      }
    });
  }

  // Edit and delete handlers
  document.querySelectorAll("[data-edit-ticket]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ticketId = btn.getAttribute("data-edit-ticket");
      if (ticketId) openEditDialog(ticketId);
    });
  });

  document.querySelectorAll("[data-delete-ticket]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ticketId = btn.getAttribute("data-delete-ticket");
      if (ticketId) openDeleteDialog(ticketId);
    });
  });
};

function openEditDialog(ticketId: string) {
  const user = Auth.getUser();
  if (!user) return;

  const tickets = storage.getTickets(user.id);
  const ticket = tickets.find((t) => t.id === ticketId);
  if (!ticket) return;

  const editDialog = document.getElementById("edit-dialog");
  const editForm = document.getElementById("edit-form") as HTMLFormElement;

  if (!editDialog || !editForm) return;

  // Populate form
  (editForm.querySelector('[name="title"]') as HTMLInputElement).value =
    ticket.title;
  (
    editForm.querySelector('[name="description"]') as HTMLTextAreaElement
  ).value = ticket.description || "";
  (editForm.querySelector('[name="status"]') as HTMLSelectElement).value =
    ticket.status;
  (editForm.querySelector('[name="priority"]') as HTMLSelectElement).value =
    ticket.priority || "medium";

  editDialog.classList.remove("hidden");
  editDialog.classList.add("flex");

  // Setup submit handler
  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(editForm);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
    };

    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    try {
      const validatedData = ticketFormSchema.parse(data);

      storage.updateTicket(ticketId, user.id, {
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status as "open" | "in_progress" | "closed",
        priority: validatedData.priority as
          | "low"
          | "medium"
          | "high"
          | undefined,
      });

      editDialog.classList.remove("flex");
      editDialog.classList.add("hidden");
      editForm.reset();
      showToast("Success", "success", "Ticket updated successfully");

      await renderPage("tickets");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const field = editForm.querySelector(`[name="${err.path[0]}"]`);
          if (field) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message text-red-600 text-sm mt-1";
            errorDiv.textContent = err.message;
            field.parentElement?.appendChild(errorDiv);
          }
        });
      } else {
        showToast("Error", "error", "Failed to update ticket");
      }
    }
  };

  editForm.removeEventListener("submit", onSubmit as any);
  editForm.addEventListener("submit", onSubmit);

  const cancelBtn = document.getElementById("cancel-edit");
  if (cancelBtn) {
    const onCancel = () => {
      editDialog.classList.remove("flex");
      editDialog.classList.add("hidden");
      editForm.reset();
    };
    cancelBtn.removeEventListener("click", onCancel);
    cancelBtn.addEventListener("click", onCancel);
  }
}

function openDeleteDialog(ticketId: string) {
  const deleteDialog = document.getElementById("delete-dialog");
  if (!deleteDialog) return;

  deleteDialog.classList.remove("hidden");

  const confirmBtn = document.getElementById("confirm-delete");
  const cancelBtn = document.getElementById("cancel-delete");

  const onConfirm = async () => {
    const user = Auth.getUser();
    if (!user) return;

    storage.deleteTicket(ticketId, user.id);
    deleteDialog.classList.add("hidden");
    showToast("Success", "success", "Ticket deleted successfully");

    await renderPage("tickets");
  };

  const onCancel = () => {
    deleteDialog.classList.add("hidden");
  };

  if (confirmBtn) {
    confirmBtn.removeEventListener("click", onConfirm);
    confirmBtn.addEventListener("click", onConfirm);
  }

  if (cancelBtn) {
    cancelBtn.removeEventListener("click", onCancel);
    cancelBtn.addEventListener("click", onCancel);
  }
}
