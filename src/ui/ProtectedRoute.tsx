import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

type ProtectedRouteProps = {
  children: React.ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const navigate = useNavigate();
  // 1. Загрузка аутентифицированных данных пользователя
  const { isLoading, isAuthenticated } = useUser();

  // 3. Если пользователь не аутентифицирован, показать страницу авторизации
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate, isLoading]);

  // 2. Пока идет загрузка паказать спиннер
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. Если пользователь аутентифицирован, показать содержимое страницы
  return <>{isAuthenticated && children}</>;
}

export default ProtectedRoute;
