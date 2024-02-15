import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { TCabin } from '../../pages/Cabins';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

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
  onCloseModal?: () => void;
}
function CreateCabinForm({ cabinToEdit, onCloseModal }: ICreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const {
    register, // функция регистрации инпута в форме
    handleSubmit, // функция обработки события отправки формы
    reset, // функция для очистки формы
    getValues /* чтения значений формыю Разница между watch и getValuesзаключается в том, 
    что они getValues не вызывают повторную визуализацию или подписку на изменения входных данных. */,
    formState: { errors },
  } = useForm<TInputs>({ defaultValues: editId ? editValues : {} }); // Используем хук useForm с указанием типов входных данных

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const cabinData = {
      ...data,
      image: typeof data.image === 'string' ? data.image : data.image[0],
    };
    if (editId)
      editCabin(
        { cabinData, editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  };

  function onError(err: FieldErrors<TInputs>) {
    console.error(err);
  }

  return (
    /* "handleSubmit" будет валидировать ваши инпуты перед вызовом "onSubmit"
    в случае ошибки будет вызвана функция onError */
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Название номера" error={errors.name?.message}>
        {/* Регистрируем инпут в форме с помощью функции "register" */}
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'Это поле обязательно' })}
        />
      </FormRow>

      <FormRow label="Макс. вместимость" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'Это поле обязательно',
            min: { value: 1, message: 'Минимальное значение 1' },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Цена" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'Это поле обязательно',
            min: { value: 1, message: 'Минимальное значение 1' },
          })}
        />
      </FormRow>

      <FormRow label="Скидка" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'Это поле обязательно',
            valueAsNumber: true,
            validate: (value) =>
              (value >= 0 && value < getValues().regularPrice) ||
              'Скидка должна быть меньше обычной цены',
          })}
        />
      </FormRow>

      <FormRow label="Описание" error={errors.descr?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('descr', { required: 'Это поле обязательно' })}
        />
      </FormRow>

      <FormRow label="Фото номера" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: editId ? false : 'Это поле обязательно',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset" onClick={onCloseModal}>
            Отменить
          </Button>
          <Button disabled={isWorking}>
            {editId ? 'Редактировать' : 'Создать номер'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
