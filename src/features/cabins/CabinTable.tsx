import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabin } from './useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable(): JSX.Element {
  const { cabins, isLoading } = useCabin();
  const [searchParams] = useSearchParams();

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

  if (isLoading) return <Spinner />;

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
          data={filteredCabins || []}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
