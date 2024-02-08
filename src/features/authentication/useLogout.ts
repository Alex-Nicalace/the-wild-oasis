import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // удаляем все запросы в кэше
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время выхода произошла ошибка! ${err.message}`);
    },
  });

  return { logout, isLoggingOut };
}
