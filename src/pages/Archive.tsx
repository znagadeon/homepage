import { Helmet } from 'react-helmet-async';
import { config } from '../config';

export const Archive = () => {
  const title = `Archive - ${config.blogName}`;
  const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="author" content={config.author} />
      <meta name="description" content={config.description} />

      <meta property="og:site_name" content={config.blogName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.host} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={gravatar} />
    </Helmet>
  );
};
