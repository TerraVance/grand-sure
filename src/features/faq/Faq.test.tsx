import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Faq } from "@/features/faq/Faq";
import { faq, faqSection } from "@/content/site";

describe("Faq", () => {
  it("opens one answer at a time", async () => {
    const user = userEvent.setup();
    render(<Faq section={faqSection} items={faq} />);

    expect(screen.getByText(/priced per kilowatt/i)).toBeVisible();
    await user.click(screen.getByRole("button", { name: /Will my roof take the weight/i }));
    expect(screen.getByText(/Concrete slabs and many metal roofs/i)).toBeVisible();
    expect(screen.getByText(/priced per kilowatt/i)).not.toBeVisible();
  });
});
