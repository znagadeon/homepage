import style from './TagList.module.scss';

type Props = {
  tags: string[];
};

export const TagList = ({ tags }: Props) => {
  return (
    <ul className={style.tags}>
      {tags.map((tag) => (
        <li key={tag} className={style.tags__tag}>
          <a href={`/tag/${tag}`}>#{tag}</a>
        </li>
      ))}
    </ul>
  );
};
