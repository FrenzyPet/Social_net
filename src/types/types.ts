export type PhotosType = {
  small: string | null
  large: string | null
}

export type PostType = {
  id: number
  message: string
  likesCount: number
}

export type DialogType = {
  id: number
  name: string
}

export type MessageType = {
  id: number
  text: string
  isMine: boolean
}

export type UserType = {
  name: string
  id: number
  photos: PhotosType
  status: string | null
  followed: boolean
}

export type ContactsType = {
  [github: string]: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
  aboutMe: string
}

