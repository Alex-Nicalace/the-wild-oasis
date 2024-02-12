import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: '7', label: 'Последние 7 дней' },
        { value: '30', label: 'Последние 30 дней' },
        { value: '90', label: 'Последние 90 дней' },
      ]}
    />
  );
}

export default DashboardFilter;
