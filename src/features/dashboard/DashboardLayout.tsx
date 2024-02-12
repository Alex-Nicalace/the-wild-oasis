import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout(): JSX.Element {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, isLoading: isLoadingStays } = useRecentStays();
  const isLoading = isLoadingBookings || isLoadingStays;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Статистика</div>
      <div>Cегодняшняя деятельность</div>
      <div>Продолжительность пребывания</div>
      <div>График продаж</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
