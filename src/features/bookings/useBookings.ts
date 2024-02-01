import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../services/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  const {
    data: { bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const totalPage = Math.ceil(count ?? 0 / PAGE_SIZE);

  // предварительная подгрузка следующей страницы
  if (page < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    isLoading,
    error,
    bookings,
    count: count,
  };
}
