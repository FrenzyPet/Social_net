import axios from "axios";
import { ProfileType, UserType } from "../types/types";

export enum ResponseCodes {
  Succses = 0,
  Error = 1,
  Captcha = 10
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {"API-KEY" : "6efd009f-3401-4ef7-9940-7b6f29544df0"}
});

type GetUsersResponse = {
  items: Array<UserType>
  totalCount: number
  error: string
}
type FollowUserResponse = {
  data: {}
  resultCode: ResponseCodes
  messages: Array<string>
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance.get<GetUsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
                   .then(response => response.data)
  },
  followUser(userID: number) {
    return instance.post<FollowUserResponse>(`follow/${userID}`)
                   .then(response => response.data)
  },
  unfollowUser(userID: number) {
    return instance.delete<FollowUserResponse>(`follow/${userID}`)
                   .then(response => response.data)
  }
}

type GetUserProfileResponse = ProfileType
type UpdateStatusResponse = {
  data: {}
  resultCode: ResponseCodes
  messages: Array<string>
}
type UpdatePhotoResponse = {
  data: { small: string, large: string}
  resultCode: ResponseCodes
  messages: Array<string>
}
type UpdateProfileResponse = {
  data: {}
  resultCode: ResponseCodes
  messages: Array<string>
}

export const profileAPI = {
  getUserProfile(userID: number) {
    return instance.get<GetUserProfileResponse>(`profile/${userID}`)
                   .then(response => response.data)
  },
  getStatus(userID: number) {
    return instance.get<string>(`profile/status/${userID}`)
  },
  updateStatus(statusText: string) {
    return instance.put<UpdateStatusResponse>(`profile/status`, { status: statusText })
  },
  updatePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put<UpdatePhotoResponse>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }  
    })
      .then(response => response.data)
  },
  updateProfile(profile: ProfileType) {
    return instance.put<UpdateProfileResponse>(`profile`, profile)
  }
}

type StartAuthentifyResponse = {
  data: { id: number, email: string, login: string }
  resultCode: ResponseCodes
  messages: Array<string>
}
type LoginResponse = {
  data: { userId: number }
  resultCode: ResponseCodes
  messages: Array<string>
}
type LogoutResponse = {
  data: {}
  resultCode: ResponseCodes
  messages: Array<string>
}

export const authAPI = {
  startAuthentify() {
    return instance.get<StartAuthentifyResponse>(`auth/me`)
                   .then(response => response.data)
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post<LoginResponse>(`auth/login`, {email, password, rememberMe, captcha})
                   .then(response => response.data)
  },
  logout() {
    return instance.delete<LogoutResponse>(`auth/login`)
                   .then(response => response.data)
  }
}

type GetCaptchaResponse = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaResponse>(`/security/get-captcha-url`)
                   .then(response => response.data)
  },
}
