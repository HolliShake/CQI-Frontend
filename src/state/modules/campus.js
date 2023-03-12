import axios from "axios"
import { authHeader } from "../../helpers/authservice/auth-header"


export const state = {}

export const getters = {}


export const actions = {
    // eslint-disable-next-line no-unused-vars
    async newCampus({commit}, campus) {
        axios.post("/api/Campus/create", campus, authHeader())
    }
}
