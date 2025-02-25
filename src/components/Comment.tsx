import { config } from '../config';
import { useScript } from '../hooks/useScript';

import './Comment.scss';

export const Comment = ({ title }: { title: string }) => {
  useScript('https://giscus.app/client.js', {
    async: true,
    crossOrigin: 'anonymous',
    data: {
      repo: config.giscus.repository,
      'repo-id': config.giscus.repoId,
      category: config.giscus.category,
      'category-id': config.giscus.categoryId,
      mapping: 'specific',
      term: title,
      'reaction-enabled': 1,
      'emit-metadata': 0,
      theme: 'light',
    },
  });

  return <div className="giscus" />;
};
