export default function FellowAvatar({ fellow, size = 'sm' }) {
  const initials = (fellow.name || '').split(' ').map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
  const cls = size === 'lg' ? 'm-avatar' : 'fellow-avatar';
  const iCls = size === 'lg' ? 'm-avatar-i' : 'fellow-avatar-initials';

  return (
    <div className={cls}>
      {fellow.photoUrl
        ? <img src={fellow.photoUrl} alt={fellow.name} onError={e => { e.target.style.display = 'none'; }} />
        : <span className={iCls}>{initials}</span>
      }
    </div>
  );
}
