import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import { useDarkModeContext } from '../../context/useDarkModeContext';
import { TBookingsAfterDate } from '../../services/apiBookings';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// const fakeData = [
//   { label: 'Jan 09', totalSales: 480, extrasSales: 20 },
//   { label: 'Jan 10', totalSales: 580, extrasSales: 100 },
//   { label: 'Jan 11', totalSales: 550, extrasSales: 150 },
//   { label: 'Jan 12', totalSales: 600, extrasSales: 50 },
//   { label: 'Jan 13', totalSales: 700, extrasSales: 150 },
//   { label: 'Jan 14', totalSales: 800, extrasSales: 150 },
//   { label: 'Jan 15', totalSales: 700, extrasSales: 200 },
//   { label: 'Jan 16', totalSales: 650, extrasSales: 200 },
//   { label: 'Jan 17', totalSales: 600, extrasSales: 300 },
//   { label: 'Jan 18', totalSales: 550, extrasSales: 100 },
//   { label: 'Jan 19', totalSales: 700, extrasSales: 100 },
//   { label: 'Jan 20', totalSales: 800, extrasSales: 200 },
//   { label: 'Jan 21', totalSales: 700, extrasSales: 100 },
//   { label: 'Jan 22', totalSales: 810, extrasSales: 50 },
//   { label: 'Jan 23', totalSales: 950, extrasSales: 250 },
//   { label: 'Jan 24', totalSales: 970, extrasSales: 100 },
//   { label: 'Jan 25', totalSales: 900, extrasSales: 200 },
//   { label: 'Jan 26', totalSales: 950, extrasSales: 300 },
//   { label: 'Jan 27', totalSales: 850, extrasSales: 200 },
//   { label: 'Jan 28', totalSales: 900, extrasSales: 100 },
//   { label: 'Jan 29', totalSales: 800, extrasSales: 300 },
//   { label: 'Jan 30', totalSales: 950, extrasSales: 200 },
//   { label: 'Jan 31', totalSales: 1100, extrasSales: 300 },
//   { label: 'Feb 01', totalSales: 1200, extrasSales: 400 },
//   { label: 'Feb 02', totalSales: 1250, extrasSales: 300 },
//   { label: 'Feb 03', totalSales: 1400, extrasSales: 450 },
//   { label: 'Feb 04', totalSales: 1500, extrasSales: 500 },
//   { label: 'Feb 05', totalSales: 1400, extrasSales: 600 },
//   { label: 'Feb 06', totalSales: 1450, extrasSales: 400 },
// ];

type SalesChartProps = {
  bookings: TBookingsAfterDate;
  numDays: number;
};
function SalesChart({ bookings, numDays }: SalesChartProps): JSX.Element {
  const { isDarkMode } = useDarkModeContext();

  // получаем все даты в указанном промежутке дат
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'dd MMM', { locale: ru }),
      totalSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, cur) => acc + (cur.extraPrice ?? 0), 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <Heading as="h3">Продажи</Heading>

      {/* отзывчивый контейнер. Можно обойтись без него */}
      <ResponsiveContainer height={300} width="100%">
        {/* Контейнер для графика. Пропсы width и height обязательны, если не использовать отзывчивый контейнер ResponsiveContainer */}
        <AreaChart data={data}>
          {/* То как и что будет отражено по оси X */}
          <XAxis
            dataKey={'label'}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* То как и что будет отражено по оси Y */}
          <YAxis
            unit={'$'}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* Декартова сетка */}
          <CartesianGrid strokeDasharray={4} />
          {/* Всплывающая подсказка */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* График */}
          <Area
            dataKey="totalSales" // поле данных
            type="monotone" // вид кривой
            stroke={colors.totalSales.stroke} // цвет кривой
            fill={colors.totalSales.fill} // цвет заливки
            strokeWidth={2} // ширина кривой
            name="Общие продажи" // название кривой
            unit="$" // единица измерения
          />
          {/* График */}
          <Area
            dataKey="extrasSales" // поле данных
            type="monotone" // вид кривой
            stroke={colors.extrasSales.stroke} // цвет кривой
            fill={colors.extrasSales.fill} // цвет заливки
            strokeWidth={2} // ширина кривой
            name="Дополнительные продажи" // название кривой
            unit="$" // единица измерения
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
