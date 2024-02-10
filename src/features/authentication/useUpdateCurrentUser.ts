import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success('Данные пользователя успешно обновлены!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        `Во время обновления пользователя произошла ошибка! ${err.message}`
      );
    },
  });

  return { updateCurrentUser, isUpdatingUser };
}
