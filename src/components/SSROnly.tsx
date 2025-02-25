import type { PropsWithChildren } from 'react';
import { renderToString } from 'react-dom/server';

export const SSROnly = ({ children }: PropsWithChildren) => {
  return (
    <div
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{
        __html: renderToString(children),
      }}
    />
  );
};
