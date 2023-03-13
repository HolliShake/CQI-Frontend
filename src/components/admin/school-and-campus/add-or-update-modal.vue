
<script>
    import "@/i18n"
    import { required } from "vuelidate/lib/validators";
    import { mapState } from "vuex";

    export default {
        name: "shcool_and_campus_modal",
        props: {
            id: {
                required: true,
                type: String
            }
        },
        data() {
            return {
                schoolName: "",
                schoolShortName: "",
                schoolNumber: "",
                submitted: false,
            }
        },
        validations: {
            schoolName: { required },
            schoolShortName: { required },
            schoolNumber: { required },
        },
        methods: {

            onShow() {
                if (!this.data) return

                this.schoolName = this.data.schoolName
                this.schoolShortName = this.data.schoolShortName
                this.schoolNumber = this.data.schoolNumber
            },

            onAddSchool() {
                this.submitted = true
                this.$v.$touch();

                if (this.$v.$invalid)
                    return

                if (!this.data) 
                {
                    this.$store.dispatch("school/newSchool", {
                        schoolName: this.schoolName, 
                        schoolShortName: this.schoolShortName,
                        schoolNumber: this.schoolNumber
                    })
                    .then(this.clear)
                    return;
                }

                // if nothing updated return
                if (this.data.schoolName === this.schoolName.trim() && this.data.schoolShortName === this.schoolShortName.trim() && this.data.schoolNumber === this.schoolNumber.trim()) 
                    return this.clear()

                this.$store.dispatch("school/updateSchool", {
                    id: this.data.id,
                    schoolName: this.schoolName, 
                    schoolShortName: this.schoolShortName,
                    schoolNumber: this.schoolNumber
                })
                .then(this.clear)
            },

            onCancel() {
                this.clear();
            },

            clear() {
                this.submitted = false;
                this.schoolName = "";
                this.schoolShortName = "";
                this.schoolNumber = "";
                this.$store.dispatch('schoolAddOrUpdateModal/clear')
            }
        },
        computed: {
            ...mapState("schoolAddOrUpdateModal", ["data"]),
        }
    }
</script>

<template>
        <b-modal 
            :id="id" 
            :title="(!data) ? $t('admin.page.school-and-campuses.modal.add-or-update.title.create.text') : $t('admin.page.school-and-campuses.modal.add-or-update.title.update.text')" 
            header-class="border-0"
            footer-class="border-0"
            content-class="bg-white rounded shadow-sm"
            no-close-on-esc 
            no-close-on-backdrop
            hide-header-close
            :ok-disabled="(this.$v.$invalid) ? true : false"
            @show="onShow"
            @ok="onAddSchool"
            @cancel="onCancel">


            <b-container fluid>
                <b-row>
                    <b-col cols="8" class="mb-2 px-0">
                        <b-form-group
                            class="mb-3"
                            id="input-group-1"
                            label="School Name"
                            label-for="input-schoolName">
                            <b-form-input 
                                id="input-schoolName"
                                v-model="schoolName" 
                                type="text" 
                                placeholder="school name"
                                :class="{ 'is-invalid': submitted && $v.schoolName.$error }"></b-form-input>
                            <div v-if="submitted && $v.schoolName.$error"
                                class="invalid-feedback">
                                <span v-if="!$v.schoolName.required">School name is required.</span>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4" class="mb-2 pe-0">
                        <b-form-group
                            class="mb-3"
                            id="input-group-1"
                            label="Short Name"
                            label-for="input-schoolShortName">
                            <b-form-input 
                                id="input-schoolShortName"
                                v-model="schoolShortName" 
                                type="text" 
                                placeholder="short name"
                                :class="{ 'is-invalid': submitted && $v.schoolShortName.$error }"></b-form-input>
                            <div v-if="submitted && $v.schoolShortName.$error"
                                class="invalid-feedback">
                                <span v-if="!$v.schoolShortName.required">Short name is required.</span>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" class="px-0">
                        <b-form-group
                            class="mb-3"
                            id="input-group-1"
                            label="School ID"
                            label-for="input-schoolNumber">
                            <b-form-input 
                                id="input-schoolNumber"
                                v-model="schoolNumber" 
                                type="text" 
                                placeholder="school number"
                                :class="{ 'is-invalid': submitted && $v.schoolNumber.$error }"></b-form-input>
                            <div v-if="submitted && $v.schoolNumber.$error"
                                class="invalid-feedback">
                                <span v-if="!$v.schoolNumber.required">School number is required.</span>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

            <template #modal-cancel>
                {{ ($v.$invalid) ? "cancel" : "discard" }}
            </template>

            <template #modal-ok>
                {{ data ? "update" : "save" }}
            </template>

        </b-modal>
</template>