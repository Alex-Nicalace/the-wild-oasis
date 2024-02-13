import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';
import { useMemo } from 'react';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = new Date();
  queryDate.setDate(queryDate.getDate() - numDays);
  const queryDateISO = queryDate.toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDateISO),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = useMemo(
    () =>
      stays?.filter(
        (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
      ),
    [stays]
  );

  return { isLoading, stays, confirmedStays, numDays };
}
