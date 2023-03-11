
<script>
    import EmptyImageBg from "@/assets/images/laptop-img.png"
    export default {
        name: "EmptyData",
        components: { EmptyImageBg },
        props: {
            label: { required: true, type: String }
        }
    }
</script>

<template>
    <div class="text-center">

        <EmptyImageBg />

        <b-button variant="success">
            <i class="bx bxs-plus-square"></i> {{ label }}
        </b-button>

    </div>
</template>

