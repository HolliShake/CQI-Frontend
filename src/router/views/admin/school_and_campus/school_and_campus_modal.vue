
<script>
    import { required } from "vuelidate/lib/validators";

    export default {
        name: "shcool_and_campus_modal",
        props: {
            id: {
                required: true,
                type: String
            },
            updateMode: {
                type: Boolean,
                default: false
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
            onOk() {
                this.submitted = true
                this.$v.$touch();

                if (this.$v.$invalid)
                    return

                this.$store.dispatch("school/newSchool", {
                    schoolName: this.schoolName, 
                    schoolShortName: this.schoolShortName,
                    schoolNumber: this.schoolNumber})
            },
            onCancel() {
                this.clear();
            },

            clear() {
                this.schoolName = "";
                this.schoolShortName = "";
                this.schoolNumber = "";
            }
        }
    }
</script>

<template>
        <b-modal 
            :ref="id"
            :id="id" 
            title="Create new schools" 
            header-class="border-0"
            footer-class="border-0"
            content-class="bg-white rounded-1"
            no-close-on-esc 
            no-close-on-backdrop
            :ok-disabled="(this.$v.$invalid) ? true : false"
            @ok="onOk"
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
                            label="School Name"
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
                discard
            </template>

            <template #modal-ok>
                {{ updateMode ? "update" : "save" }}
            </template>

        </b-modal>
</template>