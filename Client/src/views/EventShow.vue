<!--Andreas
Denne filen oppretter viewet som skal vises i det man trykker på en gruppe.
I metoder kan man se at data() henter ut events som objekter. 
Events er i denne sammenheng grupper. Gruppeinformasjonen blir hentet ut 
ved event.description, event.attendees og lignende.-->
<template>
  <v-container class="my-5">
    <div>
      <div class="event-header">
        <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
        <h1 class="title">{{ event.title }}</h1>
        <h5>Organized by {{ event.organizer }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>
      <BaseIcon name="map"><h2>Location</h2></BaseIcon>
      <address>{{ event.location }}</address>
      <h2>Event details</h2>
      <p>{{ event.description }}</p>
      <h2>
        Attendees
        <span class="badge badge-info">{{
          event.attendees ? event.attendees.length : 0
        }}</span>
      </h2>
      <ul class="list-group">
        <li
          v-for="(attendee, index) in event.attendees"
          :key="index"
          class="list-item"
        >
          <b>{{ attendee.name }}</b>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ["id"],
  data() {
    return {
      event: {}
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("There was an error", error.response);
      });
  }
};
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
.badge-info {
  background-color: #3871f7;
}
</style>
