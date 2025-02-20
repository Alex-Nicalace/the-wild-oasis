import { useState } from 'react';
import styled from 'styled-components';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';

import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import ButtonText from '../../ui/ButtonText';

const DemoLogData = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLogging } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  function handleDemoLogin() {
    setEmail('alex@example.com');
    setPassword('pas123');
  }

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <DemoLogData>
        Используйте логин: alex@example.com, пароль: pas123.
        <ButtonText onClick={handleDemoLogin} type="button">
          Заполнить демо-данные
        </ButtonText>
      </DemoLogData>
      <FormRowVertical label="Э-мэйл">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Пароль">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogging}>
          {!isLogging ? 'Войдите' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
