import styled from 'styled-components';
import { useUser } from './useUser';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar(): JSX.Element {
  const { user } = useUser();

  if (!user) return <> </>;

  const { fullName, avatar } = user.user_metadata as {
    fullName: string | null | undefined;
    avatar: string | null | undefined;
  };

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || 'default-user.jpg'}
        alt={`Аватар пользователя ${fullName ?? 'без имени'}`}
      />
      <span>{fullName ?? 'Без имени'}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
