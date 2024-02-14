import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

type CheckoutButtonProps = {
  bookingId: number;
};
function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Выписать
    </Button>
  );
}

export default CheckoutButton;
