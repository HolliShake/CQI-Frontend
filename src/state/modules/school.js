import axios from "axios";
import _ from "lodash";
import { authHeader } from "@/helpers/authservice/auth-header";

import { axiosSwagger }  from "@/helpers/axios-swagger/axios-swagger";

/**
 * Use axios config to call API src/helpers/axiosswagger/index.js
 * TODO: remove dispatch to toast.
 */


// const storedData = JSON.parse(localStorage.getItem("schools"))

export const state = {
//    ...(storedData ? {items: storedData} : {items: []}),
    items: [],
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

        axiosSwagger.get("/api/School/all")
        .then(res => {
            commit("setItem", res.data)
        })

    },
    
    getSchool({dispatch, commit}, id) {
        axios.get(`/api/School/${id}/campuses`, authHeader())
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
        }, authHeader())
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
        }, authHeader())
        .then(() => {
            commit("modifySchool", {id, schoolName, schoolNumber, schoolShortName})
            dispatch("toast/success", "School updated successfully!", {root: true})
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    },

    async deleteSchool({dispatch, commit}, id) {
        return axios.delete(`/api/School/delete/${id}`, authHeader())
        .then(() => {
            commit("removeSchool", id)
            dispatch("toast/success", `School deleted successfully!`, {root: true})
        })
        .catch(() => dispatch("toast/connectionProblem", {}, {root: true}))
    },

    pushCampus({commit}, data) {
        commit("appendCampus", data)
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
    },


    appendCampus(state, data) {
        state.campuses.push(data)
    }

};