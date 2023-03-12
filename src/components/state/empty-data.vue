<script>
    export default {
        name: "EmptyData",
        props: {
            label: { required: true, type: String },
            buttonLabel: { required: true, type: String },
        }
    }
</script>

<template>
    <div class="d-flex flex-column align-items-center text-center overflow-hidden">

        <img class="img" src="@/assets/images/state/no-data.jpg" width="300" style="user-select: none;" />

        <h2 class="fw-bold text-muted mt-3 mb-0">Nothing!!</h2>

        <h4 class="text-muted mt-3">{{ label }}</h4>

        <b-button variant="success" size="sm" class="mt-2 rounded-pill" @click="$emit('onAction')">
            <i class="bx bxs-plus-square"></i> {{ buttonLabel }}
        </b-button>

    </div>
</template>

