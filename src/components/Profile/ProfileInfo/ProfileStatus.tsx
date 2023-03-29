import { useEffect, useState, FC } from 'react';
import * as React from 'react';
import classes from './ProfileInfo.module.css'

type PropsType = {
  status: string
  isOwner: string
  updateStatus: (statusText: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect( () => setStatus(props.status), [props.status] )
  
  const activateEditMode = () => {
    if (!props.isOwner) {
      setEditMode(true)
    }
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (evt: any) => {
    setStatus(evt.currentTarget.value)
  }

  return (
    <div className={classes.status__wrapper + ' ' + (props.isOwner ? classes.status__wrapper__notOwner : '')}>
      { !editMode &&
        (<div className={classes.statusbar}>
          <span onDoubleClick={ activateEditMode }>{props.status || (!props.isOwner ? "введите статус" : null)}</span>
        </div>)
      }
      { editMode &&
        (<div className={classes.statusbar}>
          <input autoFocus={true}
                 onBlur={ deactivateEditMode }
                 onChange={ onStatusChange }
                 value={status}></input>
        </div>)
      }
    </div>
  )
}

export default ProfileStatus;