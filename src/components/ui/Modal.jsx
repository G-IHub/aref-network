import { useEffect } from 'react';

export default function Modal({ open, onClose, children, maxWidth }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-bg open"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={maxWidth ? { maxWidth } : {}}>
        {children}
      </div>
    </div>
  );
}
