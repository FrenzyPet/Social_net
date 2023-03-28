import { useDispatch } from 'react-redux'
import { updatePhoto } from '../../../../reduxToolkit/profile-slice'
import style from './PhotoModal.module.css'
import ModalWindow from '../../../common/ModalWindow/ModalWindow'

const PhotoModal = ({ isPhotoModal, setPhotoModal }) => {
  const dispatch = useDispatch()

  const onUpdatePhoto = (evt) => {
    dispatch(updatePhoto(evt.target.files[0]))
    setPhotoModal(false)
  }

  return (
    <ModalWindow isActive={isPhotoModal} setIsActive={setPhotoModal} width='500'>
      <h1 className={style.title}>Загрузка новой фотографии</h1>
      <div className={style.description}>Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.</div>
      <button className={style.closeButton} onClick={() => setPhotoModal(false)} type="button"/>
      <div className={style.input__wrapper}>
        <label className={style.label}>
          Загрузить новое фото
          <input className={style.input__photo} onChange={onUpdatePhoto} type='file'/>
        </label>
      </div>
    </ModalWindow>
  )
}

export default PhotoModal;