import { Helmet } from 'react-helmet-async';
import { config } from '../config';

export const Archive = () => (
  <Helmet>
    <title>Archive - {config.blogName}</title>
    <meta property="og:site_name" content={config.blogName} />
  </Helmet>
);
