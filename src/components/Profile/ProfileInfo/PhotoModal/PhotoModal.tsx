import { FC } from 'react';
import * as React from 'react';
import { updatePhoto } from '../../../../reduxToolkit/profile-slice'
import style from './PhotoModal.module.css'
import ModalWindow from '../../../common/ModalWindow/ModalWindow';
import { useAppDispatch } from '../../../../hooks/typedHooks';

type PropsType = {
  isPhotoModal: boolean
  setPhotoModal: (value: boolean) => void
}

const PhotoModal: FC<PropsType> = ({ isPhotoModal, setPhotoModal }) => {
  const dispatch = useAppDispatch()

  const onUpdatePhoto = (evt: any) => {
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