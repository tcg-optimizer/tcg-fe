import FinalCart from './components/FinalCart';
import FinalHistory from './components/FinalHistory';
import CartClientWrapper from './components/CartClientWrapper';

export default function CartPage() {
  return (
    <div className="">
      <CartClientWrapper>
        <FinalCart />
        <FinalHistory />
      </CartClientWrapper>
    </div>
  );
}
