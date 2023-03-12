

<script>
    import axios from "axios"
    import { mapState } from 'vuex';
    import { required } from 'vuelidate/lib/validators';

    // eslint-disable-next-line
    import {actionMap} from "./manage-modal-action-map"

    export default {
        name: "ManageModal",
        props: {
            id: {
                required: true,
                type: String
            }
        },
        data() {
            return {
                actionTabs: {0: "Manage school", 1: "New campus", 2: ""},
                tabIndex: 0,
                actionMap,

                countries: [],

                campusFormSubmitted: false,

                // campus
                campusName: "",
                campusShortName: "",
                
                // zipcode
                zipcodeBarangay: "",
                zipcodeCity: "",
                zipcodeProvince: "",
                zipcodeRegion: "",
                zipcodeCountry: ""
            }
        },
        methods: {
            async onShow() {
                if (!this.school) return

                this.$store.dispatch("school/getSchool", this.school.id)

                this.countries = (await axios.get("https://restcountries.com/v3.1/all")).data
                // eslint-disable-next-line
                console.log(this.countries)

            },


            onCreateCampus() {
                this.campusFormSubmitted = true
                this.$v.$touch()

                if (this.$v.$invalid)
                    return
                
                this.$store.dispatch("campus/newCampus", {
                    campusName: this.campusName,
                    campusShortName: this.campusShortName,
                    barangay: this.zipcodeBarangay,
                    city: this.zipcodeCity,
                    province: this.zipcode.zipcodeProvince,
                    region: this.zipcodeRegion,
                    country: this.zipcode.zipcodeCountry,
                    schoolId: this.school.id
                })
                .then(this.whenCampusDone)
            },

            onCancelCampus() {
                this.whenCampusDone()
            },

            whenCampusDone() {
                this.tabIndex = 0
                this.campusName = ""
                this.campusShortName = ""
                this.zipcodeBarangay = ""
                this.zipcodeCity = ""
                this.zipcodeProvince = ""
                this.zipcodeRegion = ""
                this.zipcodeCountry = ""
                this.$v.$reset()
            }

        },
        computed: {
            ...mapState("school", ["campuses"]),
            ...mapState("schoolManageModal", ["school"])
        },
        validations: {

            // campus
            campusName: { required },
            campusShortName: { required },
            // zipcode
            zipcodeBarangay: { required },
            zipcodeCity: { required },
            zipcodeProvince: { required },
            zipcodeRegion: { required },
            zipcodeCountry: { required }
        }
    }
</script>

<template>
    <b-modal 
        :id="id" 
        :title="actionTabs[tabIndex]"
        size="xl" 
        header-class="border-0"
        footer-class="border-0"
        content-class="bg-white rounded shadow-sm"
        no-close-on-esc 
        no-close-on-backdrop
        hide-footer
        @show="onShow"
        @close="tabIndex = 0">

        <b-tabs v-model="tabIndex">
            <!-- default -->
            <b-tab
                title="Manage school"
                title-link-class="d-none">
                <b-tabs>
                    <b-tab v-if="school" :title="school.schoolName">
                        <b-container fluid class="mt-4">
                            <b-row>
                                <b-col v-if="campuses.length > 0" cols="12" class="px-0">
                                    <div class="d-flex justify-content-between">
                                        <h4 class="h4">Campuses</h4>
                                        <b-button
                                            variant="warning" 
                                            size="sm">
                                            <i class="bx bxs-plus-square"></i> Create campus 
                                        </b-button>
                                    </div>
                                </b-col>
                                <b-col cols="12" class="mb-3 px-0">
                                    <b-container v-if="campuses.length <= 0" fluid id="manage-modal__emptyCampus" class="my-5">
                                        <b-row>
                                            <b-col cols="12" class="text-center">
                                                <h1 class="d-block display-1 bx bx-rocket"></h1>
                                                <p class="d-block h1 my-3">You're all set!</p>
                                                <b-button
                                                    variant="primary" 
                                                    @click="tabIndex = actionMap.default.createCampus">
                                                    <i class="bx bxs-plus-square"></i> Create your first campus
                                                </b-button>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                    <div v-else class="accordion accordion-flush" id="accordionFlushExample">
                                        <div v-for="campus in campuses" class="accordion-item" :key="campus.id">
                                            <h2 class="accordion-header" id="flush-headingOne">
                                                <b-button 
                                                    v-b-toggle.accordion-1
                                                    class="accordion-button collapsed" type="button">
                                                    {{ campus.campusName }}
                                                </b-button>
                                            </h2>
                                            <b-collapse id="accordion-1" visible accordion="accordionFlushExample" role="tabpanel">
                                                <b-card-body>
                                                    <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                                                </b-card-body>
                                            </b-collapse>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>
                </b-tabs>
            </b-tab>

            <b-tab
                title="Create campus"
                title-link-class="d-none">
                
                <b-form @submit.prevent="onCreateCampus" method="POST">
                    <b-container>
                        <b-row>
                            <b-col cols="12" md="8" lg="5" offset-md="2" offset-lg="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Campus name"
                                    label-for="campus-name">
                                    <b-form-input
                                        v-model="campusName"
                                        id="campus-name"
                                        type="text"
                                        placeholder="campus name"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.campusName.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.campusName.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.campusName.required">Campus name is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="8" lg="3" offset-md="2" offset-lg="0" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Campus short name"
                                    label-for="campus-short-name">
                                    <b-form-input
                                        v-model="campusShortName"
                                        id="campus-short-name"
                                        type="text"
                                        placeholder="campus short name"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.campusShortName.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.campusName.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.campusShortName.required">Campus short name is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="4" offset-md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Barangay"
                                    label-for="zipcode-barangay">
                                    <b-form-input
                                        v-model="zipcodeBarangay"
                                        id="zipcode-barangay"
                                        type="text"
                                        placeholder="barangay"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.zipcodeBarangay.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.zipcodeBarangay.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.zipcodeBarangay.required">Barangay is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="City"
                                    label-for="zipcode-city">
                                    <b-form-input
                                        v-model="zipcodeCity"
                                        id="zipcode-city"
                                        type="text"
                                        placeholder="city"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.zipcodeCity.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.zipcodeCity.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.zipcodeCity.required">City is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Province"
                                    label-for="zipcode-province">
                                    <b-form-input
                                        v-model="zipcodeProvince"
                                        id="zipcode-province"
                                        type="text"
                                        placeholder="province"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.zipcodeCity.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.zipcodeCity.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.zipcodeProvince.required">Province is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="2" offset-md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Region"
                                    label-for="zipcode-region">
                                    <b-form-input
                                        v-model="zipcodeRegion"
                                        id="zipcode-region"
                                        type="number"
                                        placeholder="region"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.zipcodeRegion.$error }">
                                    </b-form-input>
                                    <div v-if="campusFormSubmitted && $v.zipcodeRegion.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.zipcodeRegion.required">Region is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="3" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Country"
                                    label-for="zipcode-country">
                                    <select
                                        v-model="zipcodeCountry"
                                        id="zipcode-country"
                                        placeholder="country"
                                        :class="{ 'is-invalid': campusFormSubmitted && $v.zipcodeCountry.$error, 'form-select': true }">
                                        <option 
                                            v-for="(country, idx) in countries.map(c => c.name.common).sort()" 
                                            :key="idx">
                                            {{ country }}
                                        </option>
                                    </select>
                                    <div v-if="campusFormSubmitted && $v.zipcodeCountry.$error"
                                        class="invalid-feedback">
                                        <span v-if="!$v.zipcodeCountry.required">Country is required.</span>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="8" offset-md="2" class="text-center my-3">
                                
                                <b-button variant="dark" class="px-4 rounded-pill"
                                    @click="onCancelCampus">
                                    cancel
                                </b-button>

                                <b-button variant="outline-primary" class="ms-3 px-4 rounded-pill" type="submit">
                                    submit
                                </b-button>

                            </b-col>
                        </b-row>
                    </b-container>
                </b-form>

            </b-tab>

        </b-tabs>

       

        <template #modal-cancel>
            close
        </template>

    </b-modal>
</template>

