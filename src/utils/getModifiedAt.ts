import { execSync } from 'node:child_process';
import fs from 'node:fs';

export const getModifiedAt = (path: string) => {
  const isoStr = execSync(
    `git log -1 --format=%cd --date=iso-strict -- ${path}`,
    { encoding: 'utf8' },
  );

  if (isoStr) {
    return new Date(isoStr.trim());
  }

  const stat = fs.statSync(path);
  return stat.mtime;
};
