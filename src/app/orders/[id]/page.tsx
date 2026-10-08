import OrdersContent from "@/components/orders/OrdersContent";
export const metadata = {
  title: "Demo order",
  robots: { index: false, follow: false },
};
export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrdersContent id={id} />;
}
