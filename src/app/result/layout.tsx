import Header from './components/Header';
import History from './components/History';
import Cart from './components/Cart';

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <Header />

      <History />
      <Cart />

      <div className="max-w-[1024px] mx-auto">{children}</div>
    </main>
  );
}
