<script>
import Layout from "../../../layouts/admin/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import AddOrUpdateSchoolModal from "./school_and_campus_modal.vue"
import ActionButton from "../../../../components/admin/action-button.vue";
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
    AddOrUpdateSchoolModal,
    ActionButton
  },
  data() {
    return {
      title: "School and Campuses",
      school: {
        fields: [
          {key: "#", thClass: "text-center", tdClass: "text-center"},
          "schoolFullName", 
          {key: "schoolNumber", thClass: "text-center", tdClass: "text-center"},
          {key: "action", thClass: "text-center", tdClass: "text-center"}
        ],
        items: this.$store.getters["school/items"],
        perPage: 4,
        currentPage: 1
      },
      isUpdateMode: false
    };
  },
  methods: {

    onDelete() {
      alert('To delete!')
      this.$toast.success('Data saved successfully!');
    },

    onUpdate() {
      this.isUpdateMode = true;
      this.$bvModal.show("addOrUpdateSchoolModal")
      
    }

  },
  computed: {
    schoolRows() {
      return this.school.items.length;
    }
  }
};
</script>

<template>
  <Layout>

    <PageHeader :title="title" />

    <!-- add or update school modal -->
    <AddOrUpdateSchoolModal id="addOrUpdateSchoolModal" :update-mode="isUpdateMode" />
    
    <b-container class="bg-white shadow-sm">
      <b-row>
        <b-col class="px-0" offset="12">
          <div class="py-3">
            <div v-if="school.items.length > 0">
              <b-container>
                <b-row>
                  
                  <b-col cols="12" class="mb-3">
                    <b-button
                      class="d-block ms-auto"
                      size="sm"
                      variant="success"
                      v-b-modal.addOrUpdateSchoolModal>
                        <i class="bx bxs-plus-square"></i>
                        New School
                      </b-button>
                  </b-col>

                  <b-col cols="12">
                    <b-table 
                      id="schoolTable"
                      class="border"
                      striped
                      bordered
                      :per-page="school.perPage"
                      :current-page="school.currentPage"
                      :fields="school.fields"
                      :items="school.items">

                      <template #cell(#)="row">
                        {{ row.item.id }}
                      </template>

                      <template #cell(action)="row">
                        <ActionButton @delete="onDelete" @update="onUpdate"/> {{ row.schoolFullName }}
                      </template>

                    </b-table>
                    
                    <div class="overflow-auto">
                      <b-pagination
                        align="right" 
                        v-model="school.currentPage" 
                        :total-rows="schoolRows" 
                        :per-page="school.perPage" 
                        aria-controls="schoolTable"></b-pagination>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>

            <div v-else>
              <h1>Empty</h1>
            </div>

          </div>
        </b-col>
      </b-row>
    </b-container>

  </Layout>
</template>

<style>

  .nav.nav-tabs {
    border-color: transparent;
  }

  .nav.nav-tabs .nav-link {
    border: none;
    border-radius: 0 !important;
    border-top: 4px solid transparent;
  
  }

  .nav.nav-tabs .nav-link.active { 
    border-top: 4px solid #6c25be;
  }

</style>