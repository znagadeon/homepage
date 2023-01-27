import styles from './styles.module.scss';

// FIXME: optional
export const Tag = ({ tags }: { tags?: string[] }) => {
  return (
    <ul className={styles.tags}>
      {tags?.map((tag, i) => (
        <li className={styles.tags__tag} key={i}>
          <a href={`/tag/${tag}`}>#{tag}</a>
        </li>
      ))}
    </ul>
  );
};
