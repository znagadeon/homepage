import fs from 'fs';
import path from 'path';

const _getPosts = (contentDir: string) => {
  const root = fs.readdirSync(contentDir, { withFileTypes: true });
  let results: string[] = [];

  root.forEach((dirent) => {
    if (dirent.isFile()) {
      if (!['.DS_Store'].some((v) => dirent.name.includes(v))) {
        results.push(path.join(contentDir, dirent.name));
      }
    } else {
      results = [
        ...results,
        ..._getPosts(path.join(contentDir, dirent.name)),
      ];
    }
  });

  return results;
};

const isPage = (path: string) => Boolean(path.match(/\.md$/));

export const getPosts = (contentDir: string) => _getPosts(contentDir).filter(v => isPage(v));
