import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: ({ id }) => {
      toast.success(`Заказ №${id} успешно выписан!`);
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error('Во время выписки произошла ошибка!');
      console.error(err);
    },
  });
  return { checkout, isCheckingOut };
}
