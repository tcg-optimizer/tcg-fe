import Card from './components/Card';
import CardInfo from './components/CardInfo';

export default function ResultPage() {
  return (
    <div>
      <div className="w-full flex h-[400px] gap-4">
        <Card />
        <CardInfo />
      </div>

      <div className="w-full mt-8"></div>
    </div>
  );
}
