import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { sendMessage } from '../../reduxToolkit/messages-slice';
import style from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogsItem/DialogsItem';

const Dialogs = () => {
  const { dialogsData, messagesData } = useSelector(state => state.messagesPage)

  let dialogsElements = dialogsData.map((item) => (<DialogItem name={item.name} id={item.id} key={item.id}/>));
  let messagesElements = messagesData.map((item) => (<Message text={item.text} id={item.id} isMine={item.isMine} key={item.id}/>));

  return (
    <div className={style.dialogs}>
      <div className={style.dialogs__list}>
        <div className={style.dialogs__search}>
          <input className={style.dialogs__search__input} type="text" placeholder='Найти диалог' />
        </div>
        { dialogsElements }
      </div>
      <div className={style.dialogs__content}>
        <div className={style.dialogs__messageList}>
          { messagesElements }
        </div>
        <MessageForm/>
      </div>
    </div>
  )
}

const MessageForm = () => {

  const dispatch = useDispatch()
  const { handleSubmit, register, reset, formState, formState: { errors } } = useForm({defaultValues: {newMessage: ''}});

  const onSubmit = (formData) => {
    dispatch(sendMessage(formData.newMessage))
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ newMessage: '' });
    }
  }, [formState, reset]);

  const validateConfig = {
    required: "Ну напиши что-нибудь!",
    maxLength: {
      value: 300,
      message: "Слишком длинное сообщение. Краткость - сестра таланта."
    }
  }

  const textareastyle = [style.textarea]

  if (errors.newMessage) {
    textareastyle.push(style.textarea__error)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.textareaWrapper}>
        <textarea
              {...register('newMessage', validateConfig)}
              className={textareastyle.join(' ')}
              placeholder='Ну давай, ответь'
        />
        {errors.newMessage && <span className={style.error}>{errors.newMessage.message}</span>}
      </div>
      <button className={style.dialogs__sendButton}>Отправить</button>
    </form>
  )
}

export default Dialogs;