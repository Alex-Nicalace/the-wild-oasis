import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers(): JSX.Element {
  return (
    <>
      <Heading as="h1">Новые пользователи</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
