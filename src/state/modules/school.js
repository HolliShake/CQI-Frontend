import _ from "lodash";

import { axiosSwagger }  from "@/helpers/axios-swagger/axios-swagger";

/**
 * Use axios config to call API src/helpers/axiosswagger/index.js
 * TODO: remove dispatch to toast.
 */


// const storedData = JSON.parse(localStorage.getItem("schools"))

export const state = {
//    ...(storedData ? {items: storedData} : {items: []}),
    items: [],
    campuses: [], // current selected school campuses
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
        .then(res => commit("setItem", res.data))
    },
    
    getSchool({commit}, id) {
        axiosSwagger.get(`/api/School/${id}/campuses`)
        .then(res => commit("setCampuses", res.data.campuses))
    },

    async newSchool({dispatch, commit}, {schoolName, schoolNumber, schoolShortName}) {
        return axiosSwagger.post("/api/School/create", {
            SchoolName: schoolName,
            SchoolNumber: schoolNumber,
            SchoolShortName: schoolShortName
        })
        .then(res => {
            commit("appendSchool", res.data)
            dispatch("toast/success", "School created successfully!", {root: true})
        })
    },

    async updateSchool({dispatch, commit}, {id, schoolName, schoolNumber, schoolShortName}) {
        return axiosSwagger.put(`/api/School/update/${id}`, {
            SchoolName: schoolName,
            SchoolNumber: schoolNumber,
            SchoolShortName: schoolShortName
        })
        .then(() => {
            commit("modifySchool", {id, schoolName, schoolNumber, schoolShortName})
            dispatch("toast/success", "School updated successfully!", {root: true})
        })
    },

    async deleteSchool({dispatch, commit}, id) {
        return axiosSwagger.delete(`/api/School/delete/${id}`)
        .then(() => {
            commit("removeSchool", id)
            dispatch("toast/success", `School deleted successfully!`, {root: true})
        })
    },

    pushCampus({commit}, data) {
        commit("appendCampus", data)
    }
};

export const mutations = {

    setItem(state, data) {
        state.items = data
    },

    setCampuses(state, data) {
        state.campuses = data
    },

    appendSchool(state, data) {
        _.merge(data, {schoolFullName: `${data.schoolName} (${data.schoolShortName})`})
        state.items.push(data)
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