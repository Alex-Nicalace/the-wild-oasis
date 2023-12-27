import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import CabinTable from '../features/cabins/CabinTable';

export type TCabin = Awaited<ReturnType<typeof getCabins>>[number];
function Cabins(): JSX.Element {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
