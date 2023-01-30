type Meta = {
  name: string;
  content: string;
} | {
  property: string;
  content: string;
};

type CommonMeta = {
  title: string;
  author: string;
  description: string;
};

type OpengraphMeta = {
  siteName: string;
  type: string;
  url: string;
  title: string;
  description: string;
  image: string;
};

type TwitterMeta = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
};

const createMeta = (props: Meta) => {
  const meta = document.createElement('meta');

  Object.entries(props).forEach(([key, value]) => {
    meta.setAttribute(key, value);
  });

  return meta;
};

export const createCommonMeta = ({ title, author, description }: CommonMeta) => {
  const fragment = document.createDocumentFragment();

  const $title = document.createElement('title');
  $title.textContent = title;

  const $author = createMeta({ name: 'author', content: author });
  const $desc = createMeta({ name: 'description', content: description });

  fragment.append($title, $author, $desc);

  return fragment;
};

export const createOpengraphMeta = ({ siteName, type, url, title, description, image }: OpengraphMeta) => {
  const fragment = document.createDocumentFragment();

  const $siteName = createMeta({ property: 'og:site_name', content: siteName });
  const $type = createMeta({ property: 'og:type', content: type });
  const $url = createMeta({ property: 'og:url', content: url });
  const $title = createMeta({ property: 'og:title', content: title });
  const $desc = createMeta({ property: 'og:description', content: description });
  const $image = createMeta({ property: 'og:image', content: image });

  fragment.append($siteName, $type, $url, $title, $desc, $image);

  return fragment;
};

export const createTwitterMeta = ({ card, site, title, description, image }: TwitterMeta) => {
  const fragment = document.createDocumentFragment();

  const $card = createMeta({ name: 'twitter:card', content: card });
  const $site = createMeta({ name: 'twitter:site', content: site });
  const $title = createMeta({ name: 'twitter:title', content: title });
  const $desc = createMeta({ name: 'twitter:description', content: description });
  const $image = createMeta({ name: 'twitter:image', content: image });

  fragment.append($card, $site, $title, $desc, $image);

  return fragment;
};
