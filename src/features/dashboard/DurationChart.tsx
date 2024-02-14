import styled from 'styled-components';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { TStaysAfterDate } from '../../services/apiBookings';
import Heading from '../../ui/Heading';
import { useDarkModeContext } from '../../context/useDarkModeContext';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 ночь',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 ночи',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 ночи',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 ночей',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 ночей',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 ночей',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 ночей',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ ночей',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 ночь',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 ночи',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 ночи',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 ночей',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 ночей',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 ночей',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 ночей',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ ночей',
    value: 0,
    color: '#7e22ce',
  },
];

type TStartData = typeof startDataLight;

function prepareData(startData: TStartData, stays: TStaysAfterDate) {
  // Немного уродливый код, но иногда это именно то, что требуется при работе с реальными данными 😅

  function incArrayValue(arr: TStartData, field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights ?? -1;
      if (num === 1) return incArrayValue(arr, '1 ночь');
      if (num === 2) return incArrayValue(arr, '2 ночи');
      if (num === 3) return incArrayValue(arr, '3 ночи');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 ночей');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 ночей');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 ночей');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 ночей');
      if (num >= 21) return incArrayValue(arr, '21+ ночей');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

type DurationChartProps = {
  confirmedStays: TStaysAfterDate;
};
function DurationChart({ confirmedStays }: DurationChartProps): JSX.Element {
  const { isDarkMode } = useDarkModeContext();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Продолжительность пребывания</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data} // Исходные данные, каждый элемент которых является объектом
            dataKey="value" // значения каждого сектора
            nameKey="duration" //имя каждого сектора
            innerRadius={85} // Внутренний радиус всех секторов. Percentage | Number
            outerRadius={110} // Внешний радиус всех секторов. Percentage | Number
            cx="40%" // Координата X центра. Percentage | Number
            cy="50%" // Координата Y центра. Percentage | Number
            paddingAngle={3} // Угол между двумя секторами. Percentage | Number

            // Компонент Pie сомодостаточен. Для построения диаграммы достатосно самозакрывающегося <Pie />.
            // Но если необходимо влиять на отрисовку отдельных секторов, то внутри Pie можно использовать дополнительные компоненты (например, Cell)
          >
            {data.map((entry) => (
              <Cell
                key={entry.duration}
                fill={entry.color} // Цвет сектора
                stroke={entry.color} // Цвет контура сектора
              />
            ))}
          </Pie>
          {/* Всплывающая подсказка */}
          <Tooltip />
          <Legend // Расшифровка каждого сектора
            verticalAlign="middle" // Выравнивание легенды по вертикали.
            align="right" // Выравнивание легенды по горизонтали.
            layout="vertical" // Расположение легенды.
            iconSize={15} // Размер иконки.
            iconType="circle" // Тип внешнего вида иконки.
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
