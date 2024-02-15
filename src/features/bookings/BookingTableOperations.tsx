import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'Все' },
          { value: 'checked-out', label: 'Выписан' },
          { value: 'checked-in', label: 'Вписан' },
          { value: 'unconfirmed', label: 'Не подтвержден' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'startDate-desc',
            label: 'Сортировка по дате (сначала недавняя)',
          },
          {
            value: 'startDate-asc',
            label: 'Сортировка по дате (сначала более ранняя)',
          },
          {
            value: 'totalPrice-desc',
            label: 'Сортировка по стоимости (сначала высокая)',
          },
          {
            value: 'totalPrice-asc',
            label: 'Сортировка по стоимости (сначала низкая)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
