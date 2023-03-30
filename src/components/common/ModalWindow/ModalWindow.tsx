import { useEffect, FC } from 'react';
import * as React from 'react';
import style from './ModalWindow.module.css'

type PropsType = {
  isActive: boolean
  setIsActive: (value: boolean) => void
  width: string
  children: React.ReactNode
}

const ModalWindow: FC<PropsType> = ({isActive, setIsActive, children, width}) => {
  useEffect(() => {
    const handleEscKey = (evt: any) => {
      if (evt.keyCode === 27) {
        setIsActive(false);
      }
    }

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setIsActive]);

  return (
    <div
      className={isActive ? (style.backsheet + ' ' + style.backsheet__active) : `${style.backsheet}`}
      onClick={() => setIsActive(false)}
      >
      <div
        className={isActive ? style.content + ' ' + style.content__active : style.content}
        style={{width: `${width}px`}}
        onClick={evt => evt.stopPropagation()}
        >
        {children}
      </div>
    </div>
  );
}
 
export default ModalWindow;