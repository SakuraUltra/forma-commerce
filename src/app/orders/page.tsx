import OrdersContent from "@/components/orders/OrdersContent";
export const metadata = {
  title: "Demo orders",
  robots: { index: false, follow: false },
};
export default function OrdersPage() {
  return <OrdersContent />;
}
