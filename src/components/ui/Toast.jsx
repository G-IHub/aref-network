export default function Toast({ message, type, visible }) {
  return (
    <div className={`toast${visible ? ' show' : ''}${type ? ' ' + type : ''}`}>
      {message}
    </div>
  );
}
