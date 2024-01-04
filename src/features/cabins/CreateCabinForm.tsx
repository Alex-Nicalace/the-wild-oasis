import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { TNewCabin, createEditCabin } from '../../services/apiCabins';
import { TCabin } from '../../pages/Cabins';

// Задаем типы входных данных для формы
export type TInputs = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  descr: string;
  image: File[];
  // image: string;
};

interface ICreateCabinFormProps {
  cabinToEdit?: TCabin;
}

function CreateCabinForm({ cabinToEdit }: ICreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const {
    register, // функция регистрации инпута в форме
    handleSubmit, // функция обработки события отправки формы
    reset, // функция для очистки формы
    getValues /* чтения значений формыю Разница между watch и getValuesзаключается в том, 
    что они getValues не вызывают повторную визуализацию или подписку на изменения входных данных. */,
    formState: { errors },
  } = useForm<TInputs>({ defaultValues: editId ? editValues : {} }); // Используем хук useForm с указанием типов входных данных
  // Доступ к данным, которые были созданы с помощью new QueryClient()
  const queryClient = useQueryClient();

  // Mutations
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created');
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

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
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const cabinData = {
      ...data,
      image: typeof data.image === 'string' ? data.image : data.image[0],
    };
    if (editId) {
      editCabin({ cabinData, editId });
    } else createCabin(cabinData);
  };

  function onError(err: FieldErrors<TInputs>) {
    console.error(err);
  }

  return (
    /* "handleSubmit" будет валидировать ваши инпуты перед вызовом "onSubmit"
    в случае ошибки будет вызвана функция onError */
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        {/* Регистрируем инпут в форме с помощью функции "register" */}
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Minimum value is 1' },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'This field is required',
            min: { value: 1, message: 'Minimum value is 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            valueAsNumber: true,
            validate: (value) =>
              (value >= 0 && value < getValues().regularPrice) ||
              'Discount must be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.descr?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('descr', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: editId ? false : 'This field is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>{editId ? 'Edit' : 'Add cabin'}</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
