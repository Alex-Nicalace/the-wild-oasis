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
      toast.success(`Бронирование №${id} успешно разрегистрировано!`);
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
    },
    onError: (err) => {
      toast.error('Во время разрегистрации произошла ошибка!');
      console.error(err);
    },
  });
  return { checkout, isCheckingOut };
}
