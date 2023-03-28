import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../reduxToolkit/profile-slice';
import ModalWindow from '../../../common/ModalWindow/ModalWindow';
import style from './EditFormModal.module.css'

const FormField = ({ keyName, placeholder, type = "text", register, required }) => {
  return (
    <div className={style.field__wrapper}>
      <label className={style.form__label} htmlFor={keyName}>{`${placeholder}:`}</label>
      <input {...register(keyName, {required})} className={style.form__input} type={type} id={keyName} name={keyName} placeholder={placeholder} />
    </div>
  )
}

const EditFormModal = ( { isEditFormModal, setEditFormModal }) => {
  const profile = useSelector(state => state.profilePage.profile)
  const dispatch = useDispatch()
  const { handleSubmit, register, setError, formState: { errors } } = useForm({ defaultValues: profile })
 
  const onSubmit = async (formData) => {
    dispatch(updateProfile(formData, setError))
    setEditFormModal(false)
  }

  return (
    <ModalWindow isActive={isEditFormModal} setIsActive={setEditFormModal} width='500'>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Редактировать профиль</h1>
          <div className={style.buttonWrapper}>
            <button className={style.saveButton} type="submit">Сохранить</button>
            <button className={style.closeButton} onClick={() => setEditFormModal(false)} type="button"/>
          </div>
        </div>
        <div className={style.section}>
          <h2 className={style.subtitle}>Общее</h2>
          <div className={style.errorWrapper}>
            <FormField register={register} required keyName="fullName" placeholder="Полное имя"/>
            {errors.fullName && <span className={style.error}>Поле обязательно к заполнению</span>}
          </div>
          <div className={style.errorWrapper}>
            <FormField register={register} required keyName="aboutMe" placeholder="Обо мне"/>
            {errors.aboutMe && <span className={style.error}>Поле обязательно к заполнению</span>}
          </div>
        </div>
        <div className={style.section}>
          <h2 className={style.subtitle}>Контакты</h2>
          { Object.keys(profile.contacts).map(item => <FormField register={register} key={item} keyName={`contacts.${item}`} placeholder={item}/>) }
        </div>
        <div className={style.section}>
          <h2 className={style.subtitle}>Работа</h2>
          <FormField register={register} keyName="lookingForAJob" placeholder="Ищу работу" type="checkbox"/>
          <div className={style.errorWrapper}>
            <FormField register={register} required keyName="lookingForAJobDescription" placeholder="Стек"/>
            {errors.lookingForAJobDescription && <span className={style.error}>Поле обязательно к заполнению</span>}
          </div>
        </div>
      </form>
    </ModalWindow>
  )
}

export default EditFormModal;