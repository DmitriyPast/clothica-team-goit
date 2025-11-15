import css from './MessageNoInfo.module.css';

export default function MessageNoInfo({
  text,
  buttonText,
  onClick,
}: {
  text: string;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <div className={css.wrapInfo}>
      <p className={css.text}>{text}</p>
      <button onClick={onClick} className={`btn btn-primary ${css.button}`}>
        {buttonText}
      </button>
    </div>
  );
}