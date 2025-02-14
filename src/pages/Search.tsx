import { useSearchParams } from 'react-router';

export const Search = () => {
  const [searchParams] = useSearchParams();

  return <span className="sr-only">Search {searchParams.get('q')}</span>;
};
