import { Tag } from './Tag';
import style from './Tag.module.scss';

export const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className={style['tag-list']}>
      {tags.map(tag => (
        <li key={tag}>
          <Tag name={tag} />
        </li>
      ))}
    </ul>
  );
};
