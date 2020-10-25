<template>
  <div class="Grupper">
    <h1 class="v-subheader grey--text">Grupper</h1>

    <v-container class="my-5">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Error oppstått: " + error.response);
      });
  }
};
</script>

<style scoped></style>
