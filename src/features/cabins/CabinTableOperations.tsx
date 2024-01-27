import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

// interface ICabinTableOperationsProps {}
function CabinTableOperations(): JSX.Element {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With discount' },
          { value: 'no-discount', label: 'No discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Сортировка по имени' },
          { value: 'name-desc', label: 'Сортировка по имени (обратная)' },
          { value: 'regularPrice-asc', label: 'Сортировка по цене' },
          {
            value: 'regularPrice-desc',
            label: 'Сортировка по цене (обратная)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Сортировка по максимальной вместимости',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Сортировка по максимальной вместимости (обратная)',
          },
          {
            value: 'discount-asc',
            label: 'Сортировка по скидке',
          },
          {
            value: 'discount-desc',
            label: 'Сортировка по скидке (обратная)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
