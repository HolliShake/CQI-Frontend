<script>
/**
 * Nav-bar Component
 */
export default {
  name: "ActionButton",
  methods : {
    clickMe() {
        alert("HelloWorld")
    }
  }
};
</script>

<template>
    <b-dropdown 
        toggle-class="p-1"
        right variant="black" menu-class="dropdown-menu-end">
        
        <template v-slot:button-content>
            <i class='bx bx-pencil'></i>
        </template>

        <!-- item-->
        <b-dropdown-item @click="$emit('manage')">
           <span>
                <i class="bx bx-box font-size-16 align-middle me-1"></i>
                {{ $t("action-button.manage") }}
           </span>
        </b-dropdown-item>


        <b-dropdown-divider></b-dropdown-divider>

        <b-dropdown-item @click="$emit('update')">
            <i class="bx bx-edit-alt font-size-16 align-middle me-1"></i>
            {{ $t("action-button.update") }}
        </b-dropdown-item>

        <b-dropdown-item @click="$emit('delete')">
           <span>
                <i class="bx bx-trash font-size-16 align-middle me-1"></i>
                {{ $t("action-button.delete") }}
           </span>
        </b-dropdown-item>

    </b-dropdown>
</template>