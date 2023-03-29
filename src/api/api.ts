import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {"API-KEY" : "6efd009f-3401-4ef7-9940-7b6f29544df0"}
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
      .catch(error => console.log(error.message))
  },
  followUser(userID: number) {
    return instance.post(`follow/${userID}`)
      .then(response => response.data)
      .catch(error => console.log(error.message))
  },
  unfollowUser(userID: number) {
    return instance.delete(`follow/${userID}`)
      .then(response => response.data)
      .catch(error => console.log(error.message))
  }
}

export const profileAPI = {
  getUserProfile(userID: number) {
    return instance.get(`profile/${userID}`)
      .then(response => response.data)
      .catch(error => console.log(error.message))
  },
  getStatus(userID: number) {
    return instance.get(`profile/status/${userID}`)
  },
  updateStatus(statusText: string) {
    return instance.put(`profile/status`, { status: statusText })
  },
  updatePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }  
    })
  },
  updateProfile(profile: ProfileType) {
    return instance.put(`profile`, profile)
  }
}

export const authAPI = {
  startAuthentify() {
    return instance.get(`auth/me`)
      .then(response => response.data)
      .catch(error => console.log(error.message))
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`/security/get-captcha-url`)
  },
}