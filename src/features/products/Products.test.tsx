import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { categories, products, productsSection, services } from "@/content/products";
import { footer } from "@/content/site";
import { Products } from "@/features/products/Products";
import { QuoteProvider } from "@/features/quote/QuoteProvider";

describe("Products", () => {
  it("filters cards by category", async () => {
    const user = userEvent.setup();
    render(
      <QuoteProvider>
        <Products
          section={productsSection}
          products={products}
          categories={categories}
          services={services}
          enquireLabel={footer.enquireLabel}
        />
      </QuoteProvider>,
    );

    expect(screen.getByRole("heading", { name: "Mono PERC panel" })).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Inverters" }));
    expect(screen.getByRole("heading", { name: "Hybrid inverter" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Mono PERC panel" })).not.toBeInTheDocument();
  });
});
