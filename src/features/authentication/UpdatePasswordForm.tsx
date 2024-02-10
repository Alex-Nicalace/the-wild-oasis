import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateCurrentUser } from './useUpdateCurrentUser';

type TUpdatePasswordForm = {
  password: string;
  passwordConfirm: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, reset } =
    useForm<TUpdatePasswordForm>();
  const { errors } = formState;

  const { updateCurrentUser, isUpdatingUser } = useUpdateCurrentUser();

  const onSubmit: SubmitHandler<TUpdatePasswordForm> = ({ password }) => {
    updateCurrentUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Новый пароль (мин. 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdatingUser}
          {...register('password', {
            required: 'Это поле обязательно',
            minLength: {
              value: 8,
              message: 'Пароль должен содержать не менее 8 символов',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Подтвердите пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingUser}
          {...register('passwordConfirm', {
            required: 'Это поле обязательно',
            validate: (value, formValues) =>
              formValues.password === value || 'Пароли должны совпадать',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" variation="secondary">
          Отмена
        </Button>
        <Button disabled={isUpdatingUser}>Обновить пароль</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
