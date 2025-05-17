import Logo from '@/components/Logo';
import SearchClientForm from './components/SearchClientForm';
import SearchHistory from './components/SearchHistory';

export default function Search() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="h-full grid grid-rows-[1fr_auto_1fr] gap-4 p-4 w-full sm:max-w-[400px]">
        <Logo className="w-full mt-auto mb-4 " />
        <SearchClientForm />
        <SearchHistory />
      </div>
    </div>
  );
}
