import Header from './components/Header';
import History from './components/History';
import Cart from './components/Cart';

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen">
      <Header />

      <div className="flex min-h-screen relative">
        <History />
        <div className="max-w-[1024px] mx-auto grow p-4">{children}</div>
        <Cart />
      </div>
    </main>
  );
}
