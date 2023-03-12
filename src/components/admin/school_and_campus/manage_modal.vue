

<script>
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
                actionTabs: {0: "Manage school", 1: "Create campus", 2: ""},
                tabIndex: 0,
                actionMap,

                campusModel: {
                    campusName: "",
                    campusShortName: ""
                },

                zipcodeModel: {
                    zipcodeBarangay: "",
                    zipcodeCity: "",
                    zipcodeProvince: "",
                    zipcodeRegion: "",
                    zipcodeCountry: ""
                }
            }
        },
        methods: {
            onShow() {
                this.$store.dispatch("school/getSchool", this.school.id)
            },


            onCreateCampus() {
                alert("Hello")
            },

            onCancelCampus() {
                this.tabIndex = 0


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
        size="xl" 
        :title="actionTabs[tabIndex]"
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
                            <b-col cols="12" md="8" lg="6" offset-md="2" offset-lg="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Campus name"
                                    label-for="campus-name">
                                    <b-form-input
                                        id="campus-name"
                                        type="text"
                                        placeholder="campus name">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="8" lg="2" offset-md="2" offset-lg="0" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Campus short name"
                                    label-for="campus-short-name">
                                    <b-form-input
                                        id="campus-short-name"
                                        type="text"
                                        placeholder="campus short name">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="3" offset-md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Barangay"
                                    label-for="zipcode-barangay">
                                    <b-form-input
                                        id="zipcode-barangay"
                                        type="text"
                                        placeholder="barangay">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="City"
                                    label-for="zipcode-city">
                                    <b-form-input
                                        id="zipcode-city"
                                        type="text"
                                        placeholder="city">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" md="3" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Province"
                                    label-for="zipcode-province">
                                    <b-form-input
                                        id="zipcode-province"
                                        type="text"
                                        placeholder="province">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="2" offset-md="2" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Region"
                                    label-for="zipcode-region">
                                    <b-form-input
                                        id="zipcode-region"
                                        type="number"
                                        placeholder="region">
                                    </b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="12" md="3" class="mb-3">
                                <b-form-group
                                    class="text-muted"
                                    label="Country"
                                    label-for="zipcode-country">
                                    <b-form-input
                                        id="zipcode-country"
                                        type="text"
                                        placeholder="country">
                                    </b-form-input>
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

