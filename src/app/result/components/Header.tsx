import SearchInput from '@/components/SearchInput';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 shadow-sm w-full h-16 bg-white">
      <div className="w-full h-full flex items-center justify-center">
        <SearchInput />
      </div>
    </header>
  );
}
