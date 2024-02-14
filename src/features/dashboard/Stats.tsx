import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import {
  TBookingsAfterDate,
  TStaysAfterDate,
} from '../../services/apiBookings';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

type StatsProps = {
  bookings: TBookingsAfterDate;
  confirmedStays: TStaysAfterDate;
  numDays: number;
  cabinCount: number;
};
function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps): JSX.Element {
  // 1.
  const numBookings = bookings.length;
  // 2. общий объем продаж
  const sales = bookings.reduce((acc, booking) => {
    return (booking.totalPrice ?? 0) + acc;
  }, 0);
  // 3. кол. регистрированных
  const numRegistered = confirmedStays.length;
  // 4. заполняемость
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + (cur.numNights ?? 0), 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Заказы"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={String(numBookings)}
      />
      <Stat
        title="Продажи"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Регистрация"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={String(numRegistered)}
      />
      <Stat
        title="Заполняемость"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={String(Math.round(occupation * 100)) + '%'}
      />
    </>
  );
}

export default Stats;
