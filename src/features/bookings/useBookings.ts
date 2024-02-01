import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  //  FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? undefined
      : { field: 'status', value: filterValue };

  // SORT
  const sortByValue = (searchParams.get('sortBy') || 'startDate-desc').split(
    '-'
  );
  const sortBy = !sortByValue.length
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  // pagination
  const page = Number(searchParams.get('page') || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return {
    isLoading,
    error,
    bookings: data?.bookings,
    count: data?.count,
  };
}
