import * as React from 'react';
import style from './Preloader.module.css';
import preloader from '../../../assets/images/preloader.svg';

const Preloader: React.FC = () => {
  return (
    <img className={style.preloader} src={preloader} alt="preloader" />
  )
}

export default Preloader;