import fs from 'node:fs';
import path from 'node:path';

export const getPosts = (root: string) => {
  const dirents = fs.readdirSync(root, { withFileTypes: true });

  return dirents
    .filter((dirent) => {
      return !(dirent.isFile() && dirent.name === '.DS_Store');
    })
    .map((dirent) => {
      if (dirent.isFile()) return path.join(root, dirent.name);
      return path.join(root, dirent.name, 'index.md');
    });
};
