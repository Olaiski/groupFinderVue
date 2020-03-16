<template>
  <v-app>
    <appNav />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    <appFooter/>
  </v-app>
</template>

<script>
  import Footer from "@/components/Footer";
  import Navigation from "@/components/Navigation";

  export default {

    props: {
      source: String
    },
    components: {
      appFooter: Footer,
      appNav: Navigation
    },

  };
</script>
<style></style>
