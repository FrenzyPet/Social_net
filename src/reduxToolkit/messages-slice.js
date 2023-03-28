import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogsData: [
    { name: 'Artem', id: '001' },
    { name: 'Andrey', id: '002' },
    { name: 'Pavel', id: '003' }
  ],
  messagesData: [
    { text: 'Привет', id: '0001', isMine: false },
    { text: 'Сможешь скинуть на карту 5к рублей?', id: '0002', isMine: false },
    { text: 'Очень нужно, срочно', id: '0003', isMine: false },
    { text: 'Тебя взломали?', id: '0004', isMine: true },
  ],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const newMessage = {
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