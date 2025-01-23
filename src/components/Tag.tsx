import style from './Tag.module.scss';

export const Tag = ({ name }: { name: string }) => {
  return (
    <a className={style.tag} href={`/tag/${name}`}>#{name}</a>
  );
};
