import { useParams } from 'react-router';

export const Post = () => {
  const { title } = useParams();

  return <span className="sr-only">Post {title}</span>;
};
