import Header from '../result/components/Header';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen">
      <Header />

      <div className="flex relative sm:mt-8">
        <div className="max-w-[1200px] mx-auto grow p-4">{children}</div>
      </div>
    </main>
  );
}
