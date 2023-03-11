


export const actions = {
    // eslint-disable-next-line no-unused-vars
    success({dispatch, commit}, message) {
        this.$refs.toastr.s(message);
    }
}