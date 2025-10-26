import { Auth } from "../auth";
import { navigate } from "../router";
import { showToast } from "../toast";
import { z } from "zod";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

(window as any).attachSignupHandlers = () => {
  const form = document.getElementById("signup-form") as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    try {
      // Validate
      signupSchema.parse(data);

      // Show loading state
      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      submitBtn.disabled = true;
      submitBtn.textContent = "Creating account...";

      // Attempt signup
      await Auth.signup(data.username, data.password);

      showToast(
        "Account created successfully",
        "success",
        `Welcome, ${data.username}!`
      );
      navigate("/dashboard");
    } catch (error: any) {
      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      submitBtn.disabled = false;
      // Keep button text consistent with the template
      submitBtn.textContent = "Create Account";

      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const field = form.querySelector(`[name="${err.path[0]}"]`);
          if (field) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message text-red-600 text-sm mt-1";
            errorDiv.textContent = err.message;
            field.parentElement?.appendChild(errorDiv);
          }
        });
      } else {
        showToast(
          "Signup failed",
          "error",
          error.message || "Failed to create account"
        );
      }
    }
  });
};
