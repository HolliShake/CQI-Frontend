<script>
    import { layoutComputed } from "@/state/helpers";
    import HorizontalTopbar from "@/components/admin/layout/horizontal-topbar";
    import HorizontalNav from "@/components/admin/layout/horizontal-nav";
    import Footer from "@/components/global/layout/footer";

    /**
     * Horizontal-layout
     */
    export default {
        props: {
        },
        components: {
            HorizontalTopbar,
            HorizontalNav,
            Footer
        },
        data() {
            return {};
        },
        computed: {
            ...layoutComputed,
        },
        created: () => {
            document.body.setAttribute("data-layout", "horizontal");
            document.body.setAttribute("data-topbar", "dark");
            document.body.removeAttribute("data-sidebar");
            document.body.removeAttribute("data-layout-size");
            document.body.classList.remove("auth-body-bg");
        },
        methods: {
            toggleRightSidebar() {
                document.body.classList.toggle("right-bar-enabled");
            },
            hideRightSidebar() {
                document.body.classList.remove("right-bar-enabled");
            },
        },
        mounted() {
            if (this.loader === true) {
                document.getElementById("preloader").style.display = "block";
                document.getElementById("status").style.display = "block";

                setTimeout(function () {
                    document.getElementById("preloader").style.display = "none";
                    document.getElementById("status").style.display = "none";
                }, 2500);
            } else {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("status").style.display = "none";
            }
        }
    };
</script>

<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <!-- Begin page -->
    <div id="layout-wrapper">
      <HorizontalTopbar :type="topbar" :width="layoutWidth" />
      <HorizontalNav />
      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <slot />
          </div>
          <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
        <Footer />
      </div>
      <!-- end main content-->
    </div>
    <!-- END layout-wrapper -->
    <RightBar />
  </div>
</template>