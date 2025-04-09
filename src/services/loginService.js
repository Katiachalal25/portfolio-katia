import http from "./API/axiosAPI";

export const login = async loginData => {
    const result = await http.post('/login', loginData)
    return result.data
}
