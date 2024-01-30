import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import ReactDOM from 'react-dom';
import {useCallback, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";

export function Modal(props) {
  const closePath = props.closePath; // '/test/list';
  const {id} = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const closeRef = useRef(null);

  // обработчики. close
  const handleClick = useCallback((e) => {
    const target = e.target;
    if (target === overlayRef.current || target === closeRef.current || target.closest('button') === closeRef.current) {
      navigate(closePath); // closeModal();
    }
  }, [navigate, closePath]); // closeModal
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') navigate(closePath); // closeModal();
  }, [navigate, closePath]); // closeModal

  // навешиваем слушателей
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => { document.removeEventListener('click', handleClick); };
  }, [handleClick]);
  useEffect(() => {
    document.addEventListener('keydown', handleKey); return () => { document.removeEventListener('keydown', handleKey); };
  }, [handleKey]);
  const c = closeRef.current;
  useEffect(() => {
    if (!c) return;
    c.addEventListener('click', handleClick);
    return () => { c.removeEventListener('click', handleClick); };
  }, [handleClick, c]);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {/* <h1>Modal here. ItemId: {id}</h1> */}

        <button className={style.close} ref={closeRef}>
          <CloseIcon />
        </button>

        {props.children}

      </div>
    </div>,
    document.getElementById('modal-root')
  );
};