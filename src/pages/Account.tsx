import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account(): JSX.Element {
  return (
    <>
      <Heading as="h1">Обновите свою учетную запись</Heading>

      <Row>
        <Heading as="h3">Обновление пользовательских данных</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Обновление пароля</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
