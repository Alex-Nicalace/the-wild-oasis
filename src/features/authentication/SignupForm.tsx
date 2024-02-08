import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

type TSignupForm = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupForm>();

  // Обработчик события отправки формы
  const onSubmit: SubmitHandler<TSignupForm> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Полное имя" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'Это поле обязательно' })}
        />
      </FormRow>

      <FormRow label="Электронная почта" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Это поле обязательно',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Поле заполнено некорректно',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Пароль (мин. 8 символов)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
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
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'Это поле обязательно',
            // validate: (value) =>
            //   value === getValues('password') || 'Пароли должны совпадать',
            validate: (value, formValues) =>
              value === formValues.password || 'Пароли должны совпадать',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
