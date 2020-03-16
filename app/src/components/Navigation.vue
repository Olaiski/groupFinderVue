<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                class="grey lighten-3"
                v-if="auth"
        >
            <v-list dense>
                <v-list-item
                        v-for="link in links"
                        :key="link.text"
                        router :to="link.route"
                >
                    <v-icon>{{ link.icon }}</v-icon>
                    <v-list-item-action>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


            </v-list>

        </v-navigation-drawer>
        <v-app-bar
                app
                class="primary darken-2"
                dark

        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">Project</span>
                <span>9</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login" style="padding-right: 20px">
                <v-btn
                        class="primary"
                        v-if="!auth"
                >
                    Login
                    <v-spacer></v-spacer>
                </v-btn>
            </router-link>
            <router-link to="/register">
                <v-btn
                        class="primary"
                        v-if="!auth"
                >
                    Ny bruker
                    <v-spacer></v-spacer>
                </v-btn>
            </router-link>
            <router-link to="/login">
            <v-btn
                    @click="logout"
                    class="primary"
                    v-if="auth"
            >
                Logout
                <v-spacer></v-spacer>
            </v-btn>
            </router-link>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            links: [
                {icon: 'mdi-home', text: 'Hjem', route: '/'},
                {icon: 'mdi-account-group', text: 'Grupper', route: '/grupper'},
                {icon: 'mdi-calendar-clock', text: 'Kalender', route: '/kalender'}

            ],
        }),
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
        },
        computed: {
            auth() {
                return this.$store.getters.isLoggedIn;
            }
        }
    }
</script>

<style scoped>

</style>