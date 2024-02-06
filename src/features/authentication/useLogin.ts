import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginApi({ email, password });
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время входа произошла ошибка! ${err.message}`);
    },
  });

  return { login, isLogging };
}
