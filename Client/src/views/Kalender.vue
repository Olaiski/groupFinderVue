<!--
 Anders Olai Pedersen - 225280
-->
<template>
    <div>

        <div>
            <h1 class="v-subheader grey--text">Kalender & Romreservasjon</h1>
            <h1 class="v-subheader grey--text">Skal vi ha tekst her?</h1>

        </div>

        <v-row>

            <v-col class="col-md-3 col-xs-0">
                <div class="kalenderInfo">
                    <v-container>

                        <p>Skal vi ha noe her?</p>


                    </v-container>
                </div>
            </v-col>

            <v-col class="col-md-9 col-xs-12">
                <div class="kalender">
                    <v-container class="my-5" >
                        <v-row class="fill-height">
                            <v-col>
                                <v-sheet height="64">
                                    <v-toolbar flat color="white">
                                        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                                            Today
                                        </v-btn>
                                        <v-btn fab text small color="grey darken-2" @click="prev">
                                            <v-icon small>mdi-chevron-left</v-icon>
                                        </v-btn>
                                        <v-btn fab text small color="grey darken-2" @click="next">
                                            <v-icon small>mdi-chevron-right</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>{{ title }}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                        outlined
                                                        color="grey darken-2"
                                                        v-on="on"
                                                >
                                                    <span>{{ typeToLabel[type] }}</span>
                                                    <v-icon right>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item @click.native="type = 'day'">
                                                    <v-list-item-title>Day</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click.native="type = 'week'">
                                                    <v-list-item-title>Week</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click.native="type = 'month'">
                                                    <v-list-item-title>Month</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click.native="type = '4day'">
                                                    <v-list-item-title>4 days</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-toolbar>
                                </v-sheet>
                                <v-sheet height="600">
                                    <v-calendar
                                            ref="calendar"
                                            v-model="focus"
                                            color="primary"
                                            :events="events"
                                            :event-color="getEventColor"
                                            :now="today"
                                            :type="type"
                                            @click:event="showEvent"
                                            @click:date="registrerEvent"
                                    ></v-calendar>

                                    <v-dialog
                                            max-width="500"
                                            v-model="selectedOpenDate"
                                            :close-on-content-click="false"
                                            :activator="selectedElementDate"
                                    >


                                        <v-card>
                                            <v-card-title class="headline">Reserver rom</v-card-title>
                                            <v-card-text>
                                                <span v-html="selectedDate"></span>
                                            </v-card-text>

                                            <v-container>
                                                <v-row>
                                                    <v-col>
                                                        <v-select
                                                                v-model="selectedStart"
                                                                dense outlined
                                                                label="Start tid"
                                                                :items="startTid"
                                                                item-text="startTid"
                                                                @change="setReservationEndTime($event)"
                                                                @input="getVacantRooms"
                                                        >
                                                        </v-select>
                                                    </v-col>
                                                    <v-col>
                                                        <v-select
                                                                dense outlined
                                                                v-model="selectedSlutt"
                                                                label="Slutt tid"
                                                                :items="sluttTid"
                                                                item-text="sluttTid"
                                                                @change="getReservationEndTime($event)"
                                                                @input="getVacantRooms"
                                                        >

                                                        </v-select>
                                                    </v-col>

                                                </v-row>
                                                <hr>

                                                <v-col>
                                                    <v-select
                                                            v-model="selectedGroup"
                                                            :items="this.groupLeaderGroups"
                                                            item-text="groupName"
                                                            item-value="GID"
                                                            label="Hvilken gruppe gjelder det?"
                                                            dense outlined
                                                    >
                                                    </v-select>
                                                </v-col>

                                                <v-col>
                                                    <v-select
                                                            v-model="selectedRoom"
                                                            :items="this.rooms"
                                                            item-text="name"
                                                            item-value="id"
                                                            label="Velg rom"
                                                            dense outlined
                                                    >
                                                    </v-select>

                                                </v-col>


                                            </v-container>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>



                                                <v-btn
                                                        color="blue darken-1"
                                                        text
                                                        @click="selectedOpenDate = false"

                                                >
                                                    Lukk
                                                </v-btn>

                                                <v-btn
                                                        color="blue darken-1"
                                                        text
                                                        @click="reserverRom"
                                                >
                                                    Reserver
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                    <v-menu
                                            v-model="selectedOpen"
                                            :close-on-content-click="false"
                                            :activator="selectedElement"
                                            offset-x
                                    >
                                        <v-card
                                                color="grey lighten-4"
                                                min-width="350px"
                                                flat
                                        >
                                            <v-toolbar
                                                    :color="selectedEvent.color"
                                                    dark
                                            >

                                                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                                <v-spacer></v-spacer>

                                                <v-btn
                                                        icon
                                                        @click="getReservationInfo"
                                                        v-show="showButtonGrpLeader"
                                                >
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                            </v-toolbar>
                                                <v-dialog max-width="500"
                                                          :close-on-content-click="false"
                                                          v-model="editReservationDialog"
                                                >
                                                    <v-card>
                                                        <v-card-title class="headline">Redigere reservasjon</v-card-title>
                                                        <v-container>
                                                            <v-row>
                                                                <v-col>
                                                                    <v-select
                                                                            v-model="selectedStart"
                                                                            dense outlined
                                                                            label="Ny start tid"
                                                                            :items="startTid"
                                                                            item-text="startTid"
                                                                            @change="setReservationEndTime($event)"
                                                                            @input="getVacantRooms"
                                                                    >
                                                                    </v-select>
                                                                </v-col>
                                                                <v-col>
                                                                    <v-select
                                                                            dense outlined
                                                                            v-model="selectedSlutt"
                                                                            label="Ny slutt tid"
                                                                            :items="sluttTid"
                                                                            item-text="sluttTid"
                                                                            @change="getReservationEndTime($event)"
                                                                            @input="getVacantRooms"
                                                                    >

                                                                    </v-select>
                                                                </v-col>

                                                            </v-row>
                                                            <hr>
                                                            <v-col>
                                                                <v-select
                                                                        v-model="selectedRoom"
                                                                        :items="this.rooms"
                                                                        item-text="name"
                                                                        item-value="id"
                                                                        label="Velg rom"
                                                                        dense outlined
                                                                >
                                                                </v-select>

                                                            </v-col>
                                                        </v-container>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>

                                                            <v-btn
                                                                    color="blue darken-1"
                                                                    text
                                                                    @click="editReservationDialog = false"

                                                            >
                                                                Lukk
                                                            </v-btn>

                                                            <v-btn
                                                                    color="blue darken-1"
                                                                    text
                                                                    @click="updateReservation"
                                                            >
                                                                Reserver
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>

                                                </v-dialog>
                                            <v-card-text>
                                                <div >
                                                    <p>Start: <span v-html="selectedEvent.start"></span></p>
                                                    <p>Slutt: <span v-html="selectedEvent.end"></span> </p>
                                                    <p>Romnavn: <span v-html="selectedEvent.RoomName"></span></p>
                                                </div>
                                            </v-card-text>
                                            <v-card-actions>

                                                <v-row justify="center">
                                                    <v-dialog v-model="cancelDialog" persistent max-width="300">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn color="primary" dark v-on="on" v-show="showButtonGrpLeader">Avbestill reservering</v-btn>
                                                        </template>
                                                        <v-card>
                                                            <v-card-title class="headline">Avbestille reservasjon</v-card-title>
                                                            <v-card-text>Er du sikker på at du vil avbestille reservasjon for: </v-card-text>
                                                            <v-card-text style="font-weight: bold">{{ selectedEvent.name }}</v-card-text>
                                                            <p></p>

                                                            <v-card-text>Start: {{ selectedEvent.start }}</v-card-text>
                                                            <v-card-text>Slutt: {{ selectedEvent.end }}</v-card-text>
                                                            <v-card-text>Rom: {{ selectedEvent.RoomName }}</v-card-text>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="primary" text @click="cancelDialog = false">Tilbake</v-btn>
                                                                <v-btn color="primary" text @click="cancelReservation">Ok</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-row>

                                            </v-card-actions>

                                        </v-card>
                                    </v-menu>
                                </v-sheet>
                            </v-col>
                        </v-row>

                    </v-container>

                </div>

            </v-col>
        </v-row>

        <div class="text-center">
            <v-snackbar
                    :color="snackbar.color"
                    v-model="snackbar.show"
                    :timeout="timeout"
            >
                {{ snackbar.snackText }}
                <v-btn
                        color="white"
                        text
                        @click="snackbar.show = false"
                >
                    Lukk
                </v-btn>
            </v-snackbar>
        </div>
    </div>
</template>
<script>

    import CalendarService from "../services/CalendarService";
    import moment from "moment";
    import {mapState} from 'vuex'


    export default {
        data: () => ({
            today: new Date().toISOString().substr(0, 10),
            focus: new Date().toISOString().substr(0, 10),
            type: "month",
            typeToLabel: {
                month: "Month",
                week: "Week",
                day: "Day",
                "4day": "4 days"
            },
            // Events kalender
            start: null,
            end: null,
            selectedElement: null,
            selectedOpen: false,
            selectedEvent: {},
            events: [],
            // Dato Kalender
            selectedElementDate: null,
            selectedOpenDate: false,
            selectedDate: null,
            nonFormatSelctedDate: null,
            //Reservere rom kalender
            startTid: [],
            sluttTid: [],
            selectedStart: '',
            selectedSlutt: '',
            selectedGroup: '',
            selectedRoom: '',
            rooms: [],
            errorMsg: '',
            groupLeaderGroups :[],
            showButtonGrpLeader : true,

            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: [],
            title: '',
            msg: '',
            cancelDialog: false,
            editReservationDialog: false,

            snackbar:{
                show: false,
                snackText: '',
                color: null
            },
            timeout: 4000,

        }),

        async created() {
            if (!this.$store.getters.isLoggedIn) {
                await this.$router.push('/login');
            }

            this.groupLeaderGroupsAll();
            this.getUserEvents();
        },

        computed:{
            ...mapState(['']),

        },

        mounted () {
            this.$refs.calendar.checkChange();
        },
        methods: {
            // Henter alle ledige rom, en del sjekker her pga 'select' component.. Skulle kanskje ha håndtert rom håndtering bedre visuelt (ala TimeEdit).
            // Blir dette brukt av mange kan det bli tugnvindt å bla igjennom klokkeslettene for å finne en 'kombinasjon' som passer..
            // (Evt. hentet nærmeste dato/klokkeslett og rom som er ledig)
            // Query skjer i det man setter tidspunkt(start og slutt), henter ut alle ledige rom innen for det tidsrommet.
            // Anders Olai Pedersen - 225280
            async getVacantRooms() {
                this.rooms = [];

                try {
                    let tid1 = moment(this.nonFormatSelctedDate + ' ' + this.selectedStart, 'YYYY-MM-DD HH:mm');
                    let tid2 = moment(this.nonFormatSelctedDate + ' ' + this.selectedSlutt, 'YYYY-MM-DD HH:mm');
                    let diff = tid2.diff(tid1, 'minutes');
                    const MAX_DIFF = 300;


                    if (this.nonFormatSelctedDate === 'null' || this.selectedStart === '' || this.selectedSlutt === '') {
                        this.msg = 'Ingen query params..';

                    } else if(this.selectedStart < this.selectedSlutt && diff <= MAX_DIFF){
                        const vacantRooms = await CalendarService.getVacantRooms(this.nonFormatSelctedDate, this.selectedStart, this.selectedSlutt);

                        this.rooms = [];
                        this.rooms = vacantRooms;
                        this.getUserEvents();
                    } else {
                        this.rooms = [];
                    }


                }catch (e) {
                    console.log(e)
                }
            },

            // Åpner 'event/reservasjons'-vindu
            // En del sjekker for å separere dagens dato og enn senere dato.
            // (Hvis man trykker på dagens dato skal klokkeslettet være nærmeste halvtime)
            // Anders Olai Pedersen - 225280
            async registrerEvent ({ date }) {
                this.selectedStart = '';
                this.selectedSlutt = '';
                this.selectedGroup = '';
                this.selectedRoom = '';
                this.rooms = [];

                this.focus = date;
                this.nonFormatSelctedDate = moment(date).format('YYYY-MM-DD');

                if (date >= this.today) {
                    const open = () => {
                        this.selectedDate = moment(date).format('MMM Do YYYY');

                        setTimeout(() => this.selectedOpenDate = true, 10);
                    };

                    if (this.selectedOpenDate) {
                        this.selectedOpenDate = false;
                        setTimeout(open, 10);
                        // } else if(this.$store.getters.getGroupLeaderGroups.length === 0) {
                    }else if(this.groupLeaderGroups.length === 0) {
                        this.snackbar.show = true;
                        this.snackbar.color = "error";
                        this.snackbar.snackText = 'Bare gruppeleder kan reservere rom';
                    }else {
                        open();
                    }

                }else {
                    this.snackbar.show = true;
                    this.snackbar.color = "error";
                    this.snackbar.snackText = 'Kan ikke reservere rom på en tidligere dato';
                }

                const SISTE_RESERVASJONS_TID = '20:00';
                const START_RESERVASJONS_TID = '07:00';
                // const SISTE_SLUTT_RESERVASJONS_TID = '22:00';

                const DATE_CONC = moment().format('YYYY-MM-DD');
                const SISTE_START_RESERVASJON = moment(DATE_CONC + ' ' + SISTE_RESERVASJONS_TID);
                let tidFirst = this.getNearestHalfHourTimeString();
                let dateTid = moment().format('MMM Do YYYY');

                if(dateTid === this.selectedDate) { // Dagens dato, finne rom fra nærmeste halvtime til siste res tid
                    this.startTid = [];
                    this.sluttTid = [];

                    this.startTid.push(tidFirst);
                    let startConc = moment(DATE_CONC + ' ' + tidFirst);
                    let diff = SISTE_START_RESERVASJON.diff(startConc, 'minutes');
                    diff /= 30;

                    for (let i=0; i<diff; i++) { // Legger 30 min intervall på reservasjons tid
                        tidFirst = moment(tidFirst, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.startTid.push(tidFirst);
                    }

                } else if(dateTid !== this.selectedDate) {
                    this.startTid = [];
                    this.sluttTid = [];

                    let startConc = moment(DATE_CONC + ' ' + START_RESERVASJONS_TID);
                    let diff = SISTE_START_RESERVASJON.diff(startConc, 'minutes');
                    diff /= 30;

                    this.startTid.push(startConc.format('HH:mm'));
                    for (let i=0; i<diff; i++) {
                        startConc = moment(startConc, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.startTid.push(startConc);
                    }
                }
            },

            // Setter slutt tiden i forhold til starttiden.
            // Etter klokken 17:00 er det en 'egen' array med tid (pga. max reservasjonstid er 5 timer)
            // Intervallene er på 30 min
            // Anders Olai Pedersen - 225280
            setReservationEndTime(event) {
                const DATE_CONC = moment().format('YYYY-MM-DD');
                // Skulle sikkert blitt håndtert på en annen måte, moment()? For å regne ut differansen på start og slutt
                const SISTE_SLUTT_RESERVASJONS_TID = '22:00';
                const SISTE_START_RESERVASJONS_TID = '17:00';
                const MAX_ANT_RES_TIMER = 5;

                this.sluttTid = [];
                let tid =  moment(DATE_CONC + ' ' + event, 'YYYY-MM-DD HH:mm');
                this.start = moment(tid,'YYYY-MM-DD HH:mm');

                let slutt = moment(DATE_CONC + ' ' + SISTE_SLUTT_RESERVASJONS_TID, 'YYYY-MM-DD HH:mm');
                let diff = slutt.diff(tid, 'minutes');
                diff /= 30;

                let tidCheck = moment(DATE_CONC + ' ' + SISTE_START_RESERVASJONS_TID, 'YYYY-MM-DD HH:mm');
                if (this.start < tidCheck) {
                    for(let i=0; i<MAX_ANT_RES_TIMER*2; i++) {
                        tid = moment(tid, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.sluttTid.push(tid)
                    }
                } else {
                    for(let i=0; i<diff; i++) {
                        tid = moment(tid, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.sluttTid.push(tid)
                    }
                }
            },

            // Hjelpefunksjon
            getReservationEndTime(event) {
                this.selectedSlutt = event;
                return this.selectedSlutt;
            },

            // Sjekker om personen som er logget inn er gruppe leder, og henter de gruppene.
            // Per nå er det bare gruppe ledere som kan reservere rom.
            // Anders Olai Pedersen - 225280
            async groupLeaderGroupsAll(){
                try {
                    const email = this.$store.getters.getUser.email;
                    const res = await CalendarService.groupLeaderGroupsAll(email);

                    this.groupLeaderGroups = res.groupLeaderGroups;

                    // if (this.groupLeaderGroups.length > 0) {
                    //     this.showButtonGrpLeader = true;
                    // }

                }catch (e) {
                    this.msg = e.toString();
                }
            },


            // Henter alle reservasjonene til innlogget bruker
            // Pusher dette inn i kalender kompoenten (axios)
            // Skulle sikkert ha hatt en sjekk om det er nye events i array'en før jeg pusher, pga. ytelse
            // Anders Olai Pedersen - 225280
            async getUserEvents() {
                try {
                    // Henter alle reservasjoner for brukeren, brukes til kalender.
                    const responseUser = await CalendarService.getUserReservations();
                    const userReservations = responseUser.userReservations;

                    this.events = [];
                    for(let i=0; i<userReservations.length; i++) {
                        await this.events.push({
                            name: userReservations[i].groupName,
                            start: userReservations[i].start,
                            end: userReservations[i].end,
                            GID: userReservations[i].GID,
                            email: userReservations[i].email,
                            RID: userReservations[i].RID,
                            RoomName: userReservations[i].RoomName,
                            color: this.colors[this.rnd(0, this.colors.length - 1)]
                        });
                    }

                    // await this.$store.dispatch('userReservations', { userReservations });

                } catch (e) {
                    this.msg = e.response.data.msg;
                }
                // this.events = [];
                // for (let i=0; i<this.$store.getters.getUserReservations.length; i++) {
                //     await this.events.push({
                //         name: this.$store.getters.getUserReservations[i].name,
                //         start: this.$store.getters.getUserReservations[i].start,
                //         end: this.$store.getters.getUserReservations[i].end,
                //         GID: this.$store.getters.getUserReservations[i].GID,
                //         email: this.$store.getters.getUserReservations[i].email,
                //         RID: this.$store.getters.getUserReservations[i].RID,
                //         RoomName: this.$store.getters.getUserReservations[i].RoomName,
                //         color: this.colors[this.rnd(0, this.colors.length - 1)]
                //     });
                // }

            },


            // Setter tid for redigering av reservasjon
            // Ikke helt fornøyd med denne... Mye gjenbruk av kode..
            // Skulle ha laget en samlet funksjon, men pga. tid ble det ikke gjort.
            // Anders Olai Pedersen - 225280
            async getReservationInfo() {
                this.selectedOpen = false;
                this.editReservationDialog = true;
                this.selectedRoom = '';
                this.selectedStart = this.selectedEvent.start;
                this.selectedSlutt = this.selectedEvent.end;
                this.nonFormatSelctedDate = moment(this.selectedStart).format('YYYY-MM-DD');
                this.selectedDate = moment(this.selectedEvent.start, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD');

                const SISTE_RESERVASJONS_TID = '20:00';
                const START_RESERVASJONS_TID = '07:00';


                const DATE_CONC = moment().format('YYYY-MM-DD');
                const SISTE_START_RESERVASJON = moment(DATE_CONC + ' ' + SISTE_RESERVASJONS_TID);
                let tidFirst = this.getNearestHalfHourTimeString();
                let dateTid = moment().format('YYYY-MM-DD');


                if(dateTid === this.selectedDate) {
                    this.startTid = [];
                    this.sluttTid = [];

                    this.startTid.push(tidFirst);
                    let startConc = moment(DATE_CONC + ' ' + tidFirst);
                    let diff = SISTE_START_RESERVASJON.diff(startConc, 'minutes');
                    diff /= 30;

                    for (let i=0; i<diff; i++) { // Legger 30 min intervall på reservasjons tid
                        tidFirst = moment(tidFirst, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.startTid.push(tidFirst);
                    }
                } else if(dateTid !== this.selectedDate) {
                    this.startTid = [];
                    this.sluttTid = [];

                    let startConc = moment(DATE_CONC + ' ' + START_RESERVASJONS_TID);
                    let diff = SISTE_START_RESERVASJON.diff(startConc, 'minutes');
                    diff /= 30;

                    this.startTid.push(startConc.format('HH:mm'));
                    for (let i=0; i<diff; i++) {
                        startConc = moment(startConc, 'HH:mm').add(30, 'minutes').format('HH:mm');
                        this.startTid.push(startConc);
                    }
                }
            },

            // Avbestiller reservasjon
            // Jeg skulla ha håndtert dette på en annen måte, jeg skulla ha tilpasset det slik at
            // endre/avbestille knappene på selve "event(et)" ble synelig ut i fra de gruppene
            // man var gruppeleder i.
            // Anders Olai Pedersen - 225280
            async cancelReservation() {
                this.selectedOpen = false;

                try {
                    const RID = this.selectedEvent.RID;
                    // const SID = this.$store.getters.getUser.id;

                    // const response = await CalendarService.cancelReservation(RID, SID);
                    const response = await CalendarService.cancelReservation(RID);

                    if (response.msg === 'Reservasjon slettet!') {
                        this.snackbar.show = true;
                        this.snackbar.color = "success";
                        this.snackbar.snackText = response.msg;
                    } else {
                        this.snackbar.show = true;
                        this.snackbar.color = "error";
                        this.snackbar.snackText = response.msg;
                    }

                    await this.getUserEvents();
                }catch (e) {
                    this.msg = 'DB problemer.. ' + e.toString();
                }
            },


            // Oppdaterer reservasjon
            // Jeg skulla ha håndtert dette på en annen måte, jeg skulla ha tilpasset det slik at
            // endre/avbestille knappene på selve "event(et)" ble synelig ut i fra de gruppene
            // man var gruppeleder i.
            // Anders Olai Pedersen - 225280
            async updateReservation() {
                try {
                    const RID = this.selectedEvent.RID;
                    const nyStartTid = moment(this.nonFormatSelctedDate + ' ' + this.selectedStart, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
                    const nySluttTid = moment(this.nonFormatSelctedDate + ' ' + this.selectedSlutt, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
                    const roomId = this.selectedRoom;
                    // const SID = this.$store.getters.getUser.id;

                    const response = await CalendarService.updateReservation(RID, nyStartTid, nySluttTid, roomId);

                    // Ikke helt bra måte..
                    if (response.msg === 'Oppdatert reservasjon!') {
                        this.snackbar.show = true;
                        this.snackbar.color = "success";
                        this.snackbar.snackText = response.msg;
                    } else {
                        this.snackbar.show = true;
                        this.snackbar.color = "error";
                        this.snackbar.snackText = response.msg;
                    }

                    await this.getUserEvents();
                    this.editReservationDialog = false;
                }catch (e) {
                    this.snackbar.show = true;
                    this.snackbar.color = "error";
                    this.snackbar.snackText = 'Alle felt må være utfylt!';
                }
            },

            // Reserverer rom
            // Anders Olai Pedersen - 225280
            async reserverRom() {

                if (this.selectedStart === '' || this.selectedSlutt === '' || this.selectedGroup === '' || this.selectedRoom === ''){
                    this.snackbar.show = true;
                    this.snackbar.color = "error";
                    this.snackbar.snackText = 'Alle felt må være utfylt!';
                } else {
                    this.selectedOpenDate = false;

                    try {

                        let date = this.selectedDate;
                        const DATE_CONC = moment(date,'MMM Do YYYY' ).format('YYYY-MM-DD').toString();

                        const resInfo = {
                            startDateTime: DATE_CONC + ' ' + this.selectedStart,
                            endDateTime: DATE_CONC + ' ' + this.selectedSlutt,
                            GroupId: this.selectedGroup,
                            roomId: this.selectedRoom
                        };

                        const response = await CalendarService.reserveRoom(resInfo);
                        this.snackbar.show = true;
                        this.snackbar.color = "success";
                        this.snackbar.snackText = response.msg;

                        await this.getUserEvents();
                    }catch (e) {
                        this.msg = e.toString();
                    }

                }
            },


            // Hjelpe funksjoner for å finne nærmeste halvtime
            // Brukes til utregning når man trykker på dagens dato.
            // Anders Olai Pedersen - 225280
            getNearestHalfHourTimeString() {
                let now = new Date();
                let hour = now.getHours();
                let minutes = now.getMinutes();

                if (minutes < 15) {
                    minutes = "00";
                } else if (minutes < 45) {
                    minutes = "30";
                } else {
                    minutes = "00";
                    ++hour;
                }
                return(hour + ":" + minutes)
            },


            // Metodene under er tatt i fra vuetify docs
            // Hører sammen med kalenderen
            // https://vuetifyjs.com/en/components/calendars/#calendars
            // Anders Olai Pedersen - 225280
            getEventColor (event) {
                return event.color
            },
            setToday () {
                this.focus = this.today
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },
            showEvent ({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    setTimeout(() => this.selectedOpen = true, 10);
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false;
                    setTimeout(open, 10);
                } else {
                    open();
                }

                nativeEvent.stopPropagation();
            },
            rnd (a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },

        }



    }

</script>


<style scoped>
    .kalenderInfo {

    }

    .romSelect {
        margin: 0 auto;
    }

    .tidSelect {
        margin: 0 auto;
    }

    .errorMsg {
        color: red;
    }




</style>
