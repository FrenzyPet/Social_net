import preloader from '../../../assets/images/preloader.svg';
import classes from './Preloader.module.css';

const Preloader = (props) => {
  return (
    <img className={classes.preloader} src={preloader} alt="preloader" />
  )
}

export default Preloader;