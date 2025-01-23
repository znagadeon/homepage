import feather, {type FeatherIconNames} from 'feather-icons';
import style from './Icon.module.scss';

type Props ={
  name: FeatherIconNames;
  size: number;
}

export const Icon = ({ name, size }: Props) => {
  const icon = feather.icons[name].toSvg({
    width: size,
    height: size,
  });

  return (
    <span className={style['feather-icon']} dangerouslySetInnerHTML={{ __html: icon }} />
  );
};
