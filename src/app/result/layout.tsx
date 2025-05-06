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
        <div className="hidden xl:block mx-auto">
          <History />
        </div>
        <div className="max-w-[1024px] mx-auto grow p-4">{children}</div>
        <div className="hidden xl:block mx-auto">
          <Cart />
        </div>
        <div className="sticky h-[calc(100vh-64px-2rem)] top-20 space-y-4 hidden md:block xl:hidden mr-4">
          <Cart />
          <History />
        </div>
      </div>
    </main>
  );
}
