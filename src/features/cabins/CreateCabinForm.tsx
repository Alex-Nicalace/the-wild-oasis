import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

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

function CreateCabinForm() {
  const {
    register, // функция регистрации инпута в форме
    handleSubmit, // функция обработки события отправки формы
    reset, // функция для очистки формы
    getValues /* чтения значений формыю Разница между watch и getValuesзаключается в том, 
    что они getValues не вызывают повторную визуализацию или подписку на изменения входных данных. */,
    formState: { errors },
  } = useForm<TInputs>(); // Используем хук useForm с указанием типов входных данных
  // Доступ к данным, которые были созданы с помощью new QueryClient()
  const queryClient = useQueryClient();

  // Mutations
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
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
  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue=""
          {...register('descr', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'This field is required',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
