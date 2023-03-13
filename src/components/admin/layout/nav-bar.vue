<script>
import i18n from "@/i18n";
import simplebar from "simplebar-vue";

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      userName: this.$store.getters["auth/userName"],
      lan: i18n.locale,
    
      value: null,
    };
  },
  components: { simplebar },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    logoutUser() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link tag="a" to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo.svg" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="17" />
            </span>
          </router-link>

          <router-link tag="a" to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-light.svg" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="19" />
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu">
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown right variant="black" toggle-class="header-item" menu-class="dropdown-menu-end">
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-1.jpg"
              alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1">{{
              userName
            }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link tag="span" to="/contacts/profile">
              <i class="bx bx-user font-size-16 align-middle me-1"></i>
              Profile
            </router-link>
          </b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>

          <b-button
            variant="link"
            @click="logoutUser"
            class="dropdown-item text-danger">
            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
            Logout
        </b-button>
        </b-dropdown>

        <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black">

          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span class="badge bg-danger rounded-pill">3</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  Notifications
                </h6>
              </div>
              <div class="col-auto">
                <a href="#" class="small">#</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px">

            <!-- resolve with v-for -->
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"/>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    Someone else's daughter
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      Wanna bang tonight??
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      08:00PM
                    </p>
                  </div>
                </div>
              </div>
            </a>

          </simplebar>
          <div class="p-2 border-top d-grid">
            <a
              class="btn btn-sm btn-link font-size-14 text-center"
              href="javascript:void(0)">
              <i class="mdi mdi-arrow-right-circle me-1"></i>
              Show more
            </a>
          </div>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>
