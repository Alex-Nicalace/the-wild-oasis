import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),

    onSuccess: ({ id }) => {
      toast.success(`Бронирование №${id} успешно прошло регистрацию!`);
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['booking', id] });
      navigate('/');
    },
    onError: (err) => {
      toast.error('Во время регистрации произошла ошибка!');
      console.error(err);
    },
  });
  return { checkin, isCheckingIn };
}
