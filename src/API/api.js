
import axios from "axios";



const axiosInstance = axios.create(
  // створюємо екземпляр в якому будуть сидіти наші стандартні дані і функціонал axios
  {
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
  }
);


export const userAPI = {
  // створюємо обєкт в якому буде метод з axios запитом
  getUsers(currentPage = 1, pageSize = 2) {
    return axiosInstance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userID) {
    return axiosInstance.post(`/follow/${userID}`, {});
  },
  unfollow(userID) {
    return axiosInstance.delete(`/follow/${userID}`);
  },
  getProfile(userId) {
    console.log('Use other API'); // зарефакторили, і перенесли в окремий метод, якщо хтоь десь викличе замінить на 
    //основний profileAPI.getProfile(userId)
    return profileAPI.getProfile(userId)
  },
};


export const profileAPI = {
    // створюємо обєкт в якому буде метод з axios запитом

    getProfile(userId) {
      return axiosInstance.get(`/profile/` + userId);
    },
    getStatus(userId) {
        return axiosInstance.get(`profile/status/` + userId);
      },
    updateStatus(status) {
        return axiosInstance.put(`profile/status/`, { 
          // в пут запит ми передаємо 2 параметр як і хоче наша АПІ. Це обєкт з значенням статус
          // в нього ми і передаємо наш статус
          status: status
        });
      },
  };





export const authAPI = {
    me() {
        return axiosInstance.get(`/auth/me`)
    },
    login (email, password, rememberMe = false) {
      return axiosInstance.post(`/auth/login`, {email, password, rememberMe}) 
    },
    logout () {
      return axiosInstance.delete(`/auth/login`) 
    }
}