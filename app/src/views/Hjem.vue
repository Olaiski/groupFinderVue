<template>

    <div class="hjem">
        <h1 class="v-subheader grey--text">Hjem</h1>
        <v-container class="my-5">


            <v-layout row wrap class="pa-3">
                <v-flex xs12 md12 >
                    <v-card
                            style=""
                            class="mx-auto"
                            outlined
                    >
                        <v-list-item three-line>
                            <v-list-item-avatar
                                    circle
                                    size="80"
                                    color="gray"
                            >
                                <v-icon size="80">person_pin</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <div class="overline mb-4">Brukerprofil?</div>
                                <v-list-item-title>
                                        <p>Navn: {{ firstname }} {{ lastname }}</p>
                                        <p>E-post: {{ email }}</p>
                                        <p>Telfon: {{ phonenumber }}</p>
                                        <p>{{ secretMessage }}</p>
<!--                                        <p>Navn: {{ firstname }}</p>-->
                                    <br><span ></span>
                                </v-list-item-title>

                                <hr>
                                <v-list-item-subtitle>Mine fag: </v-list-item-subtitle>
                                <br>
                                <ul
                                >
                                </ul>

                            </v-list-item-content>

                        </v-list-item>


                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn outlined color="blue darken-4">Rediger</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs12 md12 >
                    <v-card style="height: 400px" outlined>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    // import Register from "../components/Register";
    import AuthenticationService from "../services/AuthenticationService";

    // @ is an alias to /src
    export default {
        data() {
            return {
                secretMessage: '',
                email: '',
                firstname: '',
                lastname: '',
                phonenumber: ''
            };
        },
        async created() {
            if (!this.$store.getters.isLoggedIn) {
                await this.$router.push('/login');
            }

            this.firstname = await this.$store.getters.getUser.firstname;
            this.lastname = await this.$store.getters.getUser.lastname;
            this.email = await this.$store.getters.getUser.email;
            this.phonenumber = await this.$store.getters.getUser.phonenumber;

            this.secretMessage = await AuthenticationService.getHomePage();
        },
    }

</script>

<style scoped>

</style>
