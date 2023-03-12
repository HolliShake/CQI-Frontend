<script>
    export default {
        name: "NoConenction",
        props: {
            iconClass: { required: true, type: String },
            buttonLabel: { required: true, type: String },
        }
    }
</script>

<template>
    <div class="d-flex flex-column align-items-center text-center overflow-hidden">

        <img class="img" src="@/assets/images/state/no-connection.jpg" width="300" style="user-select: none;" />

        <h2 class="fw-bold text-muted mt-3 mb-0">No Connection</h2>

        <b-button variant="danger" size="sm" class="mt-2 rounded-pill" @click="$emit('onAction')">
            <i :class="iconClass"></i> {{ buttonLabel }}
        </b-button>

    </div>
</template>