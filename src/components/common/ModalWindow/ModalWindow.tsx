import { useEffect, FC } from 'react'
import * as React from 'react'
import style from './ModalWindow.module.css'
import classnames from 'classnames'

type PropsType = {
  isActive: boolean
  setIsActive: (value: boolean) => void
  width: string
  children: React.ReactNode
}

const ModalWindow: FC<PropsType> = ({ isActive, setIsActive, children, width }) => {
  useEffect(() => {
    const handleEscKey = (evt: any) => {
      if (evt.keyCode === 27) {
        setIsActive(false)
      }
    }

    window.addEventListener('keydown', handleEscKey)

    return () => {
      window.removeEventListener('keydown', handleEscKey)
    }
  }, [setIsActive])

  const backsheetClasses = classnames({
    [style.backsheet]: true,
    [style.backsheet__active]: isActive,
  })

  const modalClasses = classnames({
    [style.content]: true,
    [style.content__active]: isActive,
  })

  return (
    <div className={backsheetClasses} onClick={() => setIsActive(false)}>
      <div
        className={modalClasses}
        style={{ width: `${width}px` }}
        onClick={evt => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalWindow
