import { useSearchParams } from 'react-router-dom';
import Select from './Select';

interface ISortByProps {
  options: { value: string; label: string }[];
}
function SortBy({ options }: ISortByProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }
  return <Select options={options} onChange={handleChange} value={sortBy} />;
}

export default SortBy;
