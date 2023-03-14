<script>
import "@/i18n";
import { mapState } from "vuex";
import appConfig from "@/app.config";
import PageHeader from "@/components/admin/layout/page-header";
import Layout from "../../../layouts/admin/main";
import ManageSchoolModal from "@/components/admin/school-and-campus/manage-modal.vue"
import AddOrUpdateSchoolModal from "@/components/admin/school-and-campus/add-or-update-modal.vue"
import ActionButton from "@/components/admin/school-and-campus/action-button.vue"
import EmptyList from "@/components/state/empty-data.vue"

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "School and Campuses",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    ManageSchoolModal,
    AddOrUpdateSchoolModal,
    ActionButton,
    EmptyList
},
  data() {
    return {
      school: {
        loaded: false,
        isempty: false,
        fields: [
          {key: "#", thClass: "text-center", tdClass: "text-center"},
          {key: "schoolFullName" },
          {key: "schoolNumber", thClass: "text-center", tdClass: "text-center"},
          {key: "action", thClass: "text-center", tdClass: "text-center"}
        ],
        perPage: 4,
        currentPage: 1
      },
      isUpdateMode: false,
      toUpdate: null
    };
  },
  methods: {

    onManage(schoolToManage) {
      this.$store.dispatch('schoolManageModal/show', {modal: this.$bvModal, target: "manageSchoolModal", data: schoolToManage})
    },

    onCreate() {
      this.$store.dispatch('schoolAddOrUpdateModal/createSchool', {modal: this.$bvModal, target: "addOrUpdateSchoolModal"})
    },

    onUpdate(schoolToUpdate) {
      this.$store.dispatch('schoolAddOrUpdateModal/updateSchool', {modal: this.$bvModal, target: "addOrUpdateSchoolModal", data: schoolToUpdate});
    },

    onDelete(id) {
      this.$store.dispatch('school/deleteSchool', id);
    }

  },
  computed: {
    ...mapState("school", ["items"])
  },
  mounted() {
    this.$store.dispatch("school/fetchAll")
    .then(() => (this.school.loaded = true));
  },
  watch: {
    items() {
        this.school.isempty = (this.items.length === 0);
    },
  }
};
</script>

<template>
  <Layout>

    <PageHeader title="School and campuses" />

    <ManageSchoolModal 
      id="manageSchoolModal"/>

    <!-- add or update school modal -->
    <AddOrUpdateSchoolModal 
      id="addOrUpdateSchoolModal" />
    
    <b-container class="bg-white shadow-sm">
      <b-row>
        <b-col class="px-0" offset="12">
          <div class="py-3">
            
            <b-container>
                <b-row>

                    <b-col cols="12">
                        <div v-if="!school.loaded" class="text-center">
                            <b-spinner variant="primary" label="Spinning"></b-spinner>
                            <h4 class="my-3 text-muted">Loading data...</h4>
                        </div>
                        <div v-else>
                            
                            <div v-if="items.length > 0 && !school.isempty">

                                <b-button
                                    class="d-block ms-auto mb-3"
                                    size="sm"
                                    variant="success"
                                    @click="onCreate">
                                    <i class="bx bxs-plus-square"></i>
                                    New school
                                </b-button>

                                <b-table
                                    id="schoolTable"
                                    class="border"
                                    ref="schoolTable"
                                    striped
                                    bordered
                                    :per-page="school.perPage"
                                    :current-page="school.currentPage"
                                    :fields="school.fields"
                                    :items="items">

                                    <template #cell(#)="row">
                                        {{ row.item.id }}
                                    </template>

                                    <template #cell(action)="row">
                                        <ActionButton 
                                        @manage="() => onManage(row.item)"
                                        @delete="() => onDelete(row.item.id)" 
                                        @update="() => onUpdate(row.item)" />
                                    </template>

                                </b-table>
                                    
                                <div class="overflow-auto">
                                    <b-pagination
                                        align="right" 
                                        v-model="school.currentPage" 
                                        :total-rows="items.length" 
                                        :per-page="school.perPage" 
                                        aria-controls="schoolTable"></b-pagination>
                                </div>
                            </div>
                            <div v-else-if="school.isempty">
                                <EmptyList 
                                    label="Your school collection is empty."
                                    icon-class="bx bxs-plus-square"
                                    buttonLabel="New school" 
                                    @onAction="onCreate"/>
                            </div>
                            
                        </div>
                    </b-col>
                </b-row>
            </b-container>

          </div>
        </b-col>
      </b-row>
    </b-container>

  </Layout>
</template>

<style>
</style>