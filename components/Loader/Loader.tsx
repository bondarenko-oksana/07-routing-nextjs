import css from './Loader.module.css';

interface LoaderProps {
  small?: boolean;
  className?: string;
}

export default function Loader({ small = false, className = '' }: LoaderProps) {
  return (
    <div className={`${css.loader} ${small ? css.small : ''} ${className}`}>
      <div className={css.dot} />
      <div className={css.dot} />
      <div className={css.dot} />
    </div>
  );
}