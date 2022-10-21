import fs from 'fs';
import path from 'path';

const IGNORE_PATHS = ['.DS_Store'];

const getPosts = (contentDir: string): string[] => {
  const root = fs.readdirSync(contentDir, { withFileTypes: true });

  const result = root.reduce((acc, cur) => {
    if (cur.isFile()) {
      return !IGNORE_PATHS.some((v) => cur.name.includes(v))
        ? [...acc, path.join(contentDir, cur.name)]
        : acc;
    } else {
      return [
        ...acc,
        ...getPosts(path.join(contentDir, cur.name)),
      ];
    }
  }, [] as string[]);

  return result;
};

const isPage = (path: string) => Boolean(path.match(/\.md$/));

export default (contentDir: string) => getPosts(contentDir).filter(v => isPage(v));
