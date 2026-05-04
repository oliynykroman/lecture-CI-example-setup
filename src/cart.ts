export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((subtotal, item) => {
    validateCartItem(item);

    return subtotal + item.price * item.quantity;
  }, 0);
}

export function applyDiscount(total: number, discountPercent: number): number {
  if (total < 0) {
    throw new Error("Total cannot be negative.");
  }

  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount percent must be between 0 and 100.");
  }

  const discountMultiplier = 1 - discountPercent / 100;
  const discountedTotal = total * discountMultiplier;

  return Number(discountedTotal.toFixed(2));
}

export function calculateTotal(items: CartItem[], discountPercent = 0): number {
  const subtotal = calculateSubtotal(items);

  return applyDiscount(subtotal, discountPercent);
}

function validateCartItem(item: CartItem): void {
  if (item.name.trim().length === 0) {
    throw new Error("Cart item name cannot be empty.");
  }

  if (item.price < 0) {
    throw new Error("Cart item price cannot be negative.");
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1) {
    throw new Error("Cart item quantity must be a positive integer.");
  }
}
