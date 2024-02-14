import supabase from './supabase';
import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from './constants';
import { Tables } from './database.types';

export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string };
  sortBy?: { field: string; value: string };
  page?: number;
}) {
  const query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', {
      count: 'exact',
    });

  // FILTER
  if (filter) query.eq(filter.field, filter.value);

  // SORT
  if (sortBy) {
    query.order(sortBy.field, { ascending: sortBy.value === 'asc' });
  }

  // RANGE
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { bookings: data, count };
}

export type TBookingWithCabinGuests = Awaited<
  ReturnType<typeof getBookings>
>['bookings'][number];

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

export type TBookingWithCabinGuestsExt = Awaited<ReturnType<typeof getBooking>>;

export type TBookingsAfterDate = Awaited<
  ReturnType<typeof getBookingsAfterDate>
>;

// Возвращает все БРОНИРОВАНИЯ, которые были созданы после указанной даты. Полезно, например, для получения бронирований, созданных за последние 30 дней.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extraPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export type TStaysAfterDate = Awaited<ReturnType<typeof getStaysAfterDate>>;
// Возвращает все записи, которые были созданы после заданной даты
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export type TStaysTodayActivity = Awaited<
  ReturnType<typeof getStaysTodayActivity>
>;
// Активность означает, что сегодня есть регистрация заезда или отъезда
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export type TBookingRecord = Partial<
  Omit<Tables<'bookings'>, 'id' | 'created_at'>
>;

export async function updateBooking(id: number, obj: TBookingRecord) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
