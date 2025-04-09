import http from "./API/axiosAPI";

//Les differentes de la table departments (meme chose que Postman)

//Ajouter plus de commentaires si necessaire
export const getAllDepartments = async (params = {}) => {
    const departments = await http.get('/departments', { params })
    return departments.data.data
}

export const addDepartment = async department => {
    const result = await http.post('/departments', department)
    return result.data
}

export const getDepartment = async id => {
    const department = await http.get(`/departments/${id}`)
    return department.data.data
}

export const updateDepartment = async (id, department) => {
    const result = await http.put(`/departments/${id}`, department)
    return result.data
}

export const deleteDepartment = async id => {
    const result = await http.delete(`/departments/${id}`)
    return result.data
}

export const updateDepartmentImage = async (id, data) => {
    const result = await http.put(`/departments/${id}/image`, data)
    return result.data
}

export const departmentSubjects = async id => {
    const subjects = await http.get(`/departments/${id}/subjects`)
    return subjects.data.data
}

export const departmentUsers = async id => {
    const users = await http.get(`/departments/${id}/users`)
    return users.data.data
}