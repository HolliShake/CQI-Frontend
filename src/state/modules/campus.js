import { axiosSwagger } from "../../helpers/axios-swagger/axios-swagger"

/**
 * Use axios config to call API src/helpers/axios/index.js
 * TODO: remove dispatch to toast.
 */

export const state = {}

export const getters = {}

export const actions = {
    async newCampus({dispatch}, campus) {
        return axiosSwagger.post("/api/Campus/create", {
            CampusName: campus.campusName,
            CampusShortName: campus.campusShortName,
            Barangay: campus.barangay,
            City: campus.city,
            Province: campus.province,
            SchoolId: campus.schoolId,
            ZipCodeId: campus.zipCodeId
        })
            .then(res => {
                dispatch("school/pushCampus", res.data, {root: true})
                dispatch("toast/success", "School created successfully!", {root: true})
            })
    }
}
