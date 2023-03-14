import axios from "axios"
import { authHeader } from "../../helpers/authservice/auth-header"

/**
 * Use axios config to call API src/helpers/axios/index.js
 * TODO: remove dispatch to toast.
 */

export const state = {}

export const getters = {}


export const actions = {
    // eslint-disable-next-line no-unused-vars
    async newCampus({dispatch, commit}, campus) {
        return axios.post("/api/Campus/create", {
            CampusName: campus.campusName,
            CampusShortName: campus.campusShortName,
            Barangay: campus.barangay,
            City: campus.city,
            Province: campus.province,
            SchoolId: campus.schoolId,
            ZipCodeId: campus.zipCodeId
        }, authHeader())
            .then(res => {
                dispatch("school/pushCampus", res.data, {root: true})
                dispatch("toast/success", "School created successfully!", {root: true})
            })
            .catch((err) => { 
                // eslint-disable-next-line no-console
                console.log(err.response)
                dispatch("toast/connectionProblem", {}, {root: true}) })
    }
}
