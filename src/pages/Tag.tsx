import { useParams } from 'react-router';

export const Tag = () => {
  const { tag } = useParams();

  return <span className="sr-only">Tag {tag}</span>;
};
