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
import NoConenction from "@/components/state/no-connection.vue"

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
    EmptyList,
    NoConenction
},
  data() {
    return {
      school: {
        fields: [
          {key: "#", thClass: "text-center", tdClass: "text-center"},
          {key: this.$t("admin.page.school-and-campuses.table.school-full-name.text") },
          {key: this.$t("admin.page.school-and-campuses.table.school-number.text"), thClass: "text-center", tdClass: "text-center"},
          {key: this.$t("admin.page.school-and-campuses.table.action.text"), thClass: "text-center", tdClass: "text-center"}
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
    ...mapState("school", ["items", "isNoConnection"]),
  },
  mounted() {
    this.$store.dispatch("school/fetchAll");
  }
};
</script>

<template>
  <Layout>

    <PageHeader :title="this.$t('admin.page.school-and-campuses.header.text')" />

    <ManageSchoolModal 
      id="manageSchoolModal"/>

    <!-- add or update school modal -->
    <AddOrUpdateSchoolModal 
      id="addOrUpdateSchoolModal" />
    
    <b-container class="bg-white shadow-sm">
      <b-row>
        <b-col class="px-0" offset="12">
          <div class="py-3">
            <div v-if="items.length > 0">
              <b-container>
                <b-row>
                  <!-- asd -->
                  <b-col cols="12" class="mb-3">
                    <b-button
                      class="d-block ms-auto"
                      size="sm"
                      variant="success"
                      @click="onCreate">
                        <i class="bx bxs-plus-square"></i>
                        {{ $t('admin.page.school-and-campuses.button.new-school.text') }}
                      </b-button>
                  </b-col>

                  <b-col cols="12">
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
                  </b-col>
                </b-row>
              </b-container>
            </div>

            <div v-else-if="isNoConnection">
              <NoConenction 
                icon-class="bx bxs-plus-square"
                buttonLabel="Logout" />
            </div>

            <div v-else>
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

  </Layout>
</template>

<style>
</style>