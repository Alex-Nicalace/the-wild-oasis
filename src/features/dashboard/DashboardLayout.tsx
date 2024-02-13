import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabin } from '../cabins/useCabin';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout(): JSX.Element {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabin } = useCabin();
  const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabin;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings ?? []}
        confirmedStays={confirmedStays ?? []}
        numDays={numDays}
        cabinCount={cabins?.length ?? 0}
      />
      <div>Cегодняшняя деятельность</div>
      <div>Продолжительность пребывания</div>
      <SalesChart bookings={bookings ?? []} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
