import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router';
import { config } from '../config';
import { useScript } from '../hooks/useScript';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const title = `Search - ${config.blogName}`;
  const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;

  useScript(`https://cse.google.com/cse.js?cx=${config.googleSearch}`, {
    async: true,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="author" content={config.author} />
        <meta name="description" content={config.description} />

        <meta property="og:site_name" content={config.blogName} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${config.host}/search?q=${searchParams.get('q')}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content={gravatar} />
      </Helmet>
      <div className="gcse-searchresults-only" />
    </>
  );
};
