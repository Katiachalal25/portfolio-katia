import http from "./API/axiosAPI";

//Les differentes routes de la table user (meme chose que Postman)

//Ajouter plus de commentaires si necessaire
export const getAllUsers = async (params = {}) => {
    const users = await http.get('/users', { params })
    return users.data.data
}

export const addUser = async user => {
    const result = await http.post('/users', user)
    return result.data
}

export const getUser = async id => {
    const user = await http.get(`/users/${id}`)
    return user.data.data
}

export const updateUser = async (id, user) => {
    const result = await http.put(`/users/${id}`, user)
    return result.data
}

export const deleteUser = async id => {
    const result = await http.delete(`/users/${id}`)
    return result.data
}

export const updateUserPhoto = async (id, data) => {
    const result = await http.put(`/users/${id}/photo`, data)
    return result.data
}

export const userSubjects = async id => {
    const subjects = await http.get(`/users/${id}/subjects`)
    return subjects.data.data
}

export const userDepartment = async id => {
    const department = await http.get(`/users/${id}/department`)
    return department.data.data
}

export const addRoles = async roles => {
    //roles=[id1,id2]
    const result = await http.post(`/users/${id}/roles`, roles)
    return result.data
}

export const addSubjects = async subjects => {
    const result = await http.post(`/users/${id}/subjects`, subjects)
    return result.data
}