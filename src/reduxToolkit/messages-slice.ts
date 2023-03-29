import { createSlice } from "@reduxjs/toolkit";
import { MessageType, DialogType } from "../types/types";

type MessagesSliceState = {
  dialogsData: Array<DialogType>
  messagesData: Array<MessageType>
}

type SendMessageActionType = {
  type: string
  payload: string
}

const initialState: MessagesSliceState = {
  dialogsData: [
    { name: 'Artem', id: 1 },
    { name: 'Andrey', id: 2 },
    { name: 'Pavel', id: 3 }
  ],
  messagesData: [
    { text: 'Привет', id: 1, isMine: false },
    { text: 'Сможешь скинуть на карту 5к рублей?', id: 2, isMine: false },
    { text: 'Очень нужно, срочно', id: 3, isMine: false },
    { text: 'Тебя взломали?', id: 4, isMine: true },
  ],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, action: SendMessageActionType) => {
      const newMessage: MessageType = {
        text: action.payload,
        id: state.messagesData.length + 1,
        isMine: true
      }
      state.messagesData.push(newMessage)
    },
  }
})

export const { sendMessage } = messagesSlice.actions

export default messagesSlice.reducer;