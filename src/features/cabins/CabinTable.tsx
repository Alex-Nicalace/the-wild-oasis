import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabin } from './useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import { isTCabinTableKeys } from '../../services/apiCabins';
import Empty from '../../ui/Empty';

function CabinTable(): JSX.Element {
  const { cabins, isLoading } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins || cabins.length === 0) return <Empty resource="cabins" />;

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all';
  const filteredCabins =
    filterValue === 'all'
      ? cabins
      : cabins?.filter((cabin) => {
          if (filterValue === 'with-discount') {
            return (cabin.discount || 0) > 0;
          } else {
            return (cabin.discount || 0) === 0;
          }
        });

  // 2. Sort
  const [sortBy, direction] = (searchParams.get('sortBy') || 'name-asc').split(
    '-'
  );
  const sortedCabins = isTCabinTableKeys(sortBy)
    ? filteredCabins?.sort((a, b) => {
        if (typeof a[sortBy] === 'string' || typeof b[sortBy] === 'string') {
          const aValue = a[sortBy]?.toString() || '';
          const bValue = b[sortBy]?.toString() || '';
          if (direction === 'asc') {
            return aValue.localeCompare(bValue);
          }
          return bValue.localeCompare(aValue);
        }
        const aValue = +(a[sortBy] ?? 0);
        const bValue = +(b[sortBy] ?? 0);
        const modifier = direction === 'asc' ? 1 : -1;
        return (aValue - bValue) * modifier;
      })
    : filteredCabins;

  return (
    <Menus isLockScroll={false}>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins || []}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
