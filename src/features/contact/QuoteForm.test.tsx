import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { products } from "@/content/products";
import { QuoteForm } from "@/features/contact/QuoteForm";
import { QuoteProvider } from "@/features/quote/QuoteProvider";

function renderForm() {
  return render(
    <QuoteProvider>
      <QuoteForm products={products} whatsapp="[NUMBER]" />
    </QuoteProvider>,
  );
}

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows field errors before calling the server", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderForm();

    await user.click(screen.getByRole("button", { name: "Request a quote" }));
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the WhatsApp handoff after a successful submit", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );
    renderForm();

    await user.type(screen.getByLabelText("Name"), "Asha Patil");
    await user.type(screen.getByLabelText("Phone"), "9876543210");
    await user.type(screen.getByLabelText("Email"), "asha@example.com");
    await user.type(screen.getByLabelText("City"), "Chikhali");
    await user.type(screen.getByLabelText("Message"), "Please survey our terrace this week.");
    await user.click(screen.getByRole("button", { name: "Request a quote" }));

    expect(await screen.findByRole("status")).toHaveTextContent("We will contact you");
    expect(screen.getByRole("link", { name: "Continue on WhatsApp" })).toBeInTheDocument();
  });
});
