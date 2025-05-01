import SearchClientForm from './components/SearchClientForm';
import SearchHistory from './components/SearchHistory';

export default function Search() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-[400px]">
        <SearchClientForm />
        <SearchHistory />
      </div>
    </div>
  );
}
