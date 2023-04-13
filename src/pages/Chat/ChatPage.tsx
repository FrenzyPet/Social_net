import { FC, useEffect, useState, ChangeEventHandler } from 'react'
import React from 'react'
import { v1 } from 'uuid'
import style from './ChatPage.module.css'
import defaultAvatar from '../../assets/images/user-avatar.png'

interface ChatMessageType {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <h2>Чат разработчиков</h2>
      <Chat />
    </div>
  )
}

const Chat: FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    const closeHandler = () => {
      console.log('CLOSE WEBSOCKET')
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws?.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }
    createChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return (
    <div>
      <MessagesBlock wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  )
}

interface MessagesBlockProps {
  wsChannel: WebSocket | null
}

const MessagesBlock: FC<MessagesBlockProps> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<Array<ChatMessageType>>([])

  const getMessages = (evt: any) => {
    const actualMessages = JSON.parse(evt.data)
    setMessages(prev => [...prev, ...actualMessages])
  }

  useEffect(() => {
    wsChannel?.addEventListener('message', getMessages)

    return () => {
      wsChannel?.removeEventListener('message', getMessages)
    }
  }, [wsChannel])

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <ul>
        {messages?.map((msg, index) => (
          <Message key={v1()} message={msg.message} userName={msg.userName} userId={msg.userId} photo={msg.photo} />
        ))}
      </ul>
    </div>
  )
}

const Message: FC<ChatMessageType> = ({ message, userName, photo, ...props }) => {
  return (
    <div>
      <div>
        <img src={photo || defaultAvatar} alt="avatar" width="30" height="30" />
        <b>{userName}</b>
      </div>
      <div>
        <div>{message}</div>
      </div>
      <hr />
    </div>
  )
}

interface AddMessageFormProps {
  wsChannel: WebSocket | null
}

const AddMessageForm: FC<AddMessageFormProps> = ({ wsChannel }) => {
  const [message, setMessage] = useState('')
  const [wsStatus, setWsStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    const openHandler = () => {
      setWsStatus('ready')
    }

    wsChannel?.addEventListener('open', openHandler)

    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel?.send(message)
    setMessage('')
  }

  const editMessage: ChangeEventHandler<HTMLTextAreaElement> = evt => {
    setMessage(evt.currentTarget.value)
  }

  return (
    <div>
      <textarea name="message" onChange={editMessage} value={message} placeholder="напиши тут сообщение"></textarea>
      <button disabled={wsChannel === null || wsStatus !== 'ready'} onClick={sendMessage} type="submit" style={{ display: 'block' }}>
        Отправить
      </button>
    </div>
  )
}

export default ChatPage
