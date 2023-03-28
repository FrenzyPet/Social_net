import classes from './Message.module.css';

const Message = (props) => {
  return (
    <div className={classes.dialogs__message + ' ' + (props.isMine ? classes.dialogs__message_mine : null)}>
      <img className={classes.message__avatar} src="https://media.istockphoto.com/id/1300845620/ru/векторная/пользователь-icon-flat-изолирован-на-белом-фоне-символ-пользователя-иллюстрация-вектора.jpg?s=612x612&w=0&k=20&c=Po5TTi0yw6lM7qz6yay5vUbUBy3kAEWrpQmDaUMWnek=" alt="User"/>
      <span className={classes.message__text}>{props.text}</span>
    </div>
    )
  }
  
export default Message;