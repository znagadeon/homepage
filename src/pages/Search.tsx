import { useEffect } from 'react';
import { useScript } from '@src/hooks/useScript';
import { blogName, name, description, host, social, googleSearch } from '@root/config';
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';

export const Search = () => {
  useScript({
    appendTo: 'body',
    src: `https://cse.google.com/cse.js?cx=${googleSearch}`,
    async: true,
  });

  useEffect(() => {
    const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
    const siteName = `Search - ${blogName}`;
    const common = createCommonMeta({
      title: siteName,
      author: name,
      description: description,
    });
    const opengraph = createOpengraphMeta({
      siteName,
      type: 'website',
      url: host,
      title: blogName,
      description: description,
      image: gravatar,
    });
    const twitter = createTwitterMeta({
      card: 'summary',
      site: `@${social.twitter}`,
      title: blogName,
      description: description,
      image: gravatar,
    });

    document.head.append(common, opengraph, twitter);
  }, []);

  return (
    <div className="gcse-searchresults-only"></div>
  );
};
