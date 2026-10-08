import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import CheckoutContent from "./CheckoutContent";
import OrdersContent from "@/components/orders/OrdersContent";
import { useCartStore } from "@/store/cart";
import { products } from "@/lib/catalog";
import { orderStorageKey, parseOrders } from "@/lib/orders";
const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
beforeEach(() => {
  localStorage.clear();
  useCartStore.setState({ items: [] });
  push.mockReset();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
function fillCart() {
  useCartStore.getState().addItem({ variantId: products[0].variants[0].id });
}
it("gives an empty cart a shopping route, without a checkout button", () => {
  render(<CheckoutContent />);
  expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(
    screen.queryByRole("button", { name: "Place demo order" }),
  ).not.toBeInTheDocument();
});
it("completes a guest checkout, saves selected items and displays them after remount", () => {
  fillCart();
  const { unmount } = render(<CheckoutContent />);
  fireEvent.click(screen.getByRole("button", { name: "Place demo order" }));
  const [order] = parseOrders(localStorage.getItem(orderStorageKey));
  expect(order.items[0].productName).toBe("Classic Cotton Tee");
  expect(order.total).toBe(3498);
  expect(push).toHaveBeenCalledWith(`/orders/${order.id}`);
  expect(useCartStore.getState().items).toEqual([]);
  unmount();
  render(<OrdersContent id={order.id} />);
  expect(screen.getByText("Classic Cotton Tee")).toBeInTheDocument();
  expect(screen.getByText("$34.98")).toBeInTheDocument();
});
it("leaves the cart intact when an order cannot be saved", () => {
  fillCart();
  render(<CheckoutContent />);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Browser storage unavailable");
  });
  fireEvent.click(screen.getByRole("button", { name: "Place demo order" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Browser storage unavailable",
  );
  expect(useCartStore.getState().items).toHaveLength(1);
  expect(push).not.toHaveBeenCalled();
  expect(
    screen.getByRole("button", { name: "Place demo order" }),
  ).toBeEnabled();
});
it("shows a useful missing-order state instead of fabricated order data", () => {
  render(<OrdersContent id="missing" />);
  expect(
    screen.getByText("Order not found in this browser"),
  ).toBeInTheDocument();
  expect(screen.queryByText("Classic Cotton Tee")).not.toBeInTheDocument();
});
