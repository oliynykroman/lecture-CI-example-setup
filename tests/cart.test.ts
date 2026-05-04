import { describe, expect, it } from "vitest";

import { applyDiscount, calculateSubtotal, calculateTotal } from "../src/cart.js";

describe("cart calculations", () => {
  it("calculates the subtotal for multiple cart items", () => {
    const subtotal = calculateSubtotal([
      { name: "Notebook", price: 3.5, quantity: 4 },
      { name: "Pen", price: 1.25, quantity: 3 }
    ]);

    expect(subtotal).toBe(17.75);
  });

  it("applies a percentage discount and rounds to two decimal places", () => {
    expect(applyDiscount(19.99, 15)).toBe(16.99);
  });

  it("calculates the final total with a discount", () => {
    const total = calculateTotal(
      [
        { name: "Backpack", price: 45, quantity: 1 },
        { name: "Marker", price: 2, quantity: 5 }
      ],
      20
    );

    expect(total).toBe(44);
  });

  it("returns zero for an empty cart", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("rejects negative item prices", () => {
    expect(() =>
      calculateSubtotal([{ name: "Invalid item", price: -1, quantity: 1 }])
    ).toThrow("Cart item price cannot be negative.");
  });

  it("rejects invalid discount values", () => {
    expect(() => applyDiscount(100, 120)).toThrow(
      "Discount percent must be between 0 and 100."
    );
  });

  it("rejects empty item names", () => {
    expect(() => calculateSubtotal([{ name: " ", price: 10, quantity: 1 }])).toThrow(
      "Cart item name cannot be empty."
    );
  });
});
