import axios from "axios";
import _ from "lodash";
import { authHeader } from "@/helpers/authservice/auth-header";


const config = {headers: authHeader()};


const storedData = JSON.parse(localStorage.getItem("schools"))

export const state = {
   ...(storedData ? {items: storedData} : {items: []}),
   campuses: [],
   isNoConnection: false
};


export const getters = {
    items: () => state.items,
    campuses: () => state.campuses,
    isNoConnection: () => state.isNoConnection
};

export const actions = {

    fetchAll({commit}) {

        axios.get("/api/School/all", config)
        .then(res => {
            commit("setItem", res.data)
            commit("setNoConnection", false)
        })
        .catch(() => commit("setNoConnection", true))

    },
    
    getSchool({dispatch, commit}, id) {
        axios.get(`/api/School/${id}/campuses`, config)
        .then(res => {
            commit("setCampuses", res.data.campuses)
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    },

    async newSchool({dispatch, commit}, {schoolName, schoolNumber, schoolShortName}) {
        return axios.post("/api/School/create", {
            SchoolName: schoolName,
            SchoolNumber: schoolNumber,
            SchoolShortName: schoolShortName
        }, config)
        .then(res => {
            commit("appendSchool", res.data)
            dispatch("toast/success", "School created successfully!", {root: true})
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    },

    async updateSchool({dispatch, commit}, {id, schoolName, schoolNumber, schoolShortName}) {
        return axios.put(`/api/School/update/${id}`, {
            SchoolName: schoolName,
            SchoolNumber: schoolNumber,
            SchoolShortName: schoolShortName
        }, config)
        .then(() => {
            commit("modifySchool", {id, schoolName, schoolNumber, schoolShortName})
            dispatch("toast/success", "School updated successfully!", {root: true})
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    },

    async deleteSchool({dispatch, commit}, id) {
        return axios.delete(`/api/School/delete/${id}`, config)
        .then(() => {
            commit("removeSchool", id)
            dispatch("toast/success", `School deleted successfully!`, {root: true})
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    }
};

export const mutations = {

    setItem(state, data) {
        state.items = data
        localStorage.setItem("schools", JSON.stringify(state.items));
    },

    setCampuses(state, data) {
        state.campuses = data
    },

    appendSchool(state, data) {
        _.merge(data, {schoolFullName: `${data.schoolName} (${data.schoolShortName})`})
        state.items.push(data)
        localStorage.setItem("schools", JSON.stringify(state.items));
    },

    modifySchool(state, data) {
        _.merge(
            state.items.find((item) => item.id == data.id), 
            {   ...data, 
                schoolFullName: `${data.schoolName} (${data.schoolShortName})`
            }
        )
    },

    removeSchool(state, id) {
        state.items = state.items.filter(item => item.id !== id)
    },

    setNoConnection(state, data) {
        state.isNoConnection = data
    }

};