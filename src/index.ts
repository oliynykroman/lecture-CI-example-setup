import { calculateTotal, type CartItem } from "./cart.js";

const items: CartItem[] = [
  { name: "Notebook", price: 3.5, quantity: 4 },
  { name: "Pen", price: 1.25, quantity: 3 }
];

const total = calculateTotal(items, 10);

console.log(`Final total: $${total}`);
