import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

import { useUser } from './useUser';
import { useUpdateCurrentUser } from './useUpdateCurrentUser';

type TPresentUpdateUserDataForm = {
  email: string;
  initialfullName: string;
};
function PresentUpdateUserDataForm({
  email,
  initialfullName,
}: TPresentUpdateUserDataForm): JSX.Element {
  const [fullName, setFullName] = useState(initialfullName);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { updateCurrentUser, isUpdatingUser } = useUpdateCurrentUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    updateCurrentUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          if (e.target instanceof HTMLFormElement) e.target.reset();
        },
      }
    );
  }

  function handleReset() {
    setFullName(initialfullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      <FormRow label="Электронная почта">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Полное имя">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Аватар">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdatingUser}>
          Отмена
        </Button>
        <Button disabled={isUpdatingUser}>Обновить аккаунт</Button>
      </FormRow>
    </Form>
  );
}

function UpdateUserDataForm(): JSX.Element {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  if (!user) return <Empty resource="Пользователь не найден" />;

  const { email, user_metadata } = user;
  const { fullName: currentFullName } =
    (user_metadata as { fullName: string | null | undefined }) || {};

  return (
    <PresentUpdateUserDataForm
      key={email ?? '' + currentFullName ?? ''}
      email={email || ''}
      initialfullName={currentFullName || ''}
    />
  );
}

export default UpdateUserDataForm;

//---------------------------
// function UpdateUserDataForm() {
//   // Нам не нужно состояние загрузки, и мы можем немедленно использовать пользовательские данные, потому что мы знаем, что они уже были загружены на данный момент
//   // Но с другой стороны, использование этого компонента может измениться в иерархии компонентов, и TS говорит о том что ланные могут быть недоступны
//   // Поэтому мы буду использовать useEffect
//   const { user, isLoading } = useUser();

//   const { email, user_metadata } = user || {};

//   const { fullName: currentFullName } =
//     (user_metadata as { fullName: string | null | undefined }) || {};

//   const [fullName, setFullName] = useState<null | string>(null);
//   const [avatar, setAvatar] = useState<null | File>(null);

//   useEffect(() => {
//     let ignore = false;
//     if (!isLoading && currentFullName && !fullName && !ignore) {
//       setFullName(currentFullName);
//     }

//     return () => {
//       ignore = true;
//     };
//   }, [currentFullName, isLoading, fullName]);

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRow label="Email address">
//         <Input value={email} disabled />
//       </FormRow>
//       <FormRow label="Full name">
//         <Input
//           type="text"
//           value={fullName || ''}
//           onChange={(e) => setFullName(e.target.value)}
//           id="fullName"
//         />
//       </FormRow>
//       <FormRow label="Avatar image">
//         <FileInput
//           id="avatar"
//           accept="image/*"
//           onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
//         />
//       </FormRow>
//       <FormRow>
//         <Button type="reset" variation="secondary">
//           Cancel
//         </Button>
//         <Button>Update account</Button>
//       </FormRow>
//     </Form>
//   );
// }
