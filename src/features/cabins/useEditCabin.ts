import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TNewCabin, createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({
      cabinData,
      editId,
    }: {
      cabinData: TNewCabin;
      editId: number;
    }) => createEditCabin(cabinData, editId),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isEditing,
    editCabin,
  };
}
