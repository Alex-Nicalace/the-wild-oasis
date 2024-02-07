import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      // в компоненте ProtectedRoute происходит запрос получения данных о пользователе и помещение этих данных в кэш
      // это проиходит с некоторой периодичностью и тем самым происходит проверка авторизации. есть смысл после аунтификации
      // сразу поместить данные о пользователе в кэш чтобы не делать лишний запрос за запросом
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время входа произошла ошибка! ${err.message}`);
    },
  });

  return { login, isLogging };
}
