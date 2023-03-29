import style from './AboutPersonModal.module.css';
import ModalWindow from '../../../common/ModalWindow/ModalWindow';
import { FC } from 'react';
import * as React from 'react';
import { useTypedSelector } from '../../../../hooks/typedHooks';

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  value: string
}

const InfoField: FC<FieldProps> = ({ name, value }) => {
  return (
    <div className={style.infoField}>
      <b className={style.infoField__name}>{name}</b>
      <div className={style.infoField__value}>
        { value &&
          value.indexOf('http') === 0
            ? (<a href={value}>{value}</a>)
            : value
        }
      </div>
    </div>
  )
}

interface FormProps {
  isAboutModal: boolean
  setAboutModal: (value: boolean) => void
}

const AboutPersonModal: FC<FormProps> = ({ isAboutModal, setAboutModal }) => {
  const {fullName, aboutMe, contacts, lookingForAJob, lookingForAJobDescription} = useTypedSelector(state => state.profilePage.profile)
  return (
    <ModalWindow isActive={isAboutModal} setIsActive={setAboutModal} width='500'>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>Подробная информация</h1>
        <div className={style.buttonWrapper}>
          <button className={style.closeButton} onClick={() => setAboutModal(false)} type="button"/>
        </div>
      </div>
      <div className={style.infoProfile}>
        <div className={style.section}>
          <h2 className={style.subtitle}>Общее</h2>
          <InfoField name='Полное имя:' value={fullName}/>
          <InfoField name='Обо мне:' value={aboutMe}/>
        </div>
        <div className={style.section}>
          <h2 className={style.subtitle}>Контакты</h2>
          {Object.keys(contacts).map(item => {
            return (
              <InfoField key={item} name={`${item}:`} value={contacts[item] || "не указано"}/>
            )
          })}
        </div>
        <div className={style.section}>
          <h2 className={style.subtitle}>Карьера</h2>
          <InfoField name='Ищу работу:' value={lookingForAJob ? 'Да' : 'Нет'}/>
          {
            lookingForAJob &&
            <InfoField name='Стек:' value={lookingForAJobDescription}/>
          }
        </div>
      </div>
    </ModalWindow>
  )
}

export default AboutPersonModal;