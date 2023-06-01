import styles from './styles.module.scss';

export const Tag = ({ tags }: { tags: string[] }) => {
  return (
    <ul className={styles.tags}>
      {tags?.map((tag, i) => (
        <li className={styles.tags__tag} key={i}>
          <a href={`/tag/${tag}/index.html`}>#{tag}</a>
        </li>
      ))}
    </ul>
  );
};
