import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';
import { subDays } from 'date-fns';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  // нативный способ получить дату относительно текущей даты
  // const queryDate = new Date();
  // queryDate.setDate(queryDate.getDate() - numDays);
  // const queryDateISO = queryDate.toISOString();

  // с помощью date-fns
  const queryDateISO = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDateISO),
    queryKey: ['booking', `last-${numDays}`],
  });

  return { isLoading, bookings };
}
