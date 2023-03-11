import axios from "axios";
import { authHeader } from "../../helpers/authservice/auth-header";


const config = {headers: authHeader()};

const schoolData = JSON.parse(localStorage.getItem("schools"));

export const state = {
    ...((schoolData) ? {items: schoolData} : {items: []})
};


export const getters = {
    items: () => state.items
};

export const actions = {

    // eslint-disable-next-line no-unused-vars
    newSchool({dispatch, commit}, {schoolName, schoolNumber, schoolShortName}) {
        return;
        // axios.post("/api/School/create", {
        //     SchoolName: schoolName,
        //     SchoolNumber: schoolNumber,
        //     SchoolShortName: schoolShortName
        // }, config)
        // .then(res => {
        //     commit("appendSchool", res.data)
        //     this.$swal("Success", "School created successfully", "success")
        // })
    },

    // eslint-disable-next-line no-unused-vars
    fetchAll({dispatch, commit}) {

        axios.get("/api/School/all", config)
        .then(res => {
            commit("setItem", res.data)
        })

    }

};

export const mutations = {

    setItem(state, data) {
        state.items = data
        localStorage.setItem("schools", JSON.stringify(state.items));
    },

    appendSchool(state, data) {
        state.items.push(data)
        localStorage.setItem("schools", JSON.stringify(state.items));
    }

};