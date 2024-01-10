import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings successfully edited');
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isEditing,
    editSettings,
  };
}
