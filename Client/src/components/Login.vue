<template>
    <v-layout  >
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :color="color"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
        >
            {{ text }}
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-flex xs6 offset-xs3>
            <form id="test">
                <h1>Login</h1>
                <v-text-field
                        v-model="email"
                        label="E-mail"
                        name="email"
                        required

                ></v-text-field>

                <v-text-field
                        v-model="password"
                        label="Password"
                        name="password"
                        type="password"
                        required

                ></v-text-field>


                <v-checkbox
                        label="Do you agree?"
                        required
                ></v-checkbox>
                <router-link to="/">
                <v-btn class="mr-4" @click="login">Login</v-btn>
                </router-link>
                <v-btn @click="clear">clear</v-btn>
                <v-spacer></v-spacer>
<!--                <p class="error" v-html="error"></p>-->

            </form>
        </v-flex>
    </v-layout>
</template>

<script>
    import AuthenticationService from "../services/AuthenticationService";

    export default {
        data() {
            return {
                email: '',
                password:'',
                color: '',
                mode: '',
                snackbar: false,
                text: 'Hello, I\'m a snackbar',
                timeout: 6000,
                x: null,
                y: 'top',
            }
        },
        methods: {
            async login() {
              try {
                  const credentials = {
                      email: this.email,
                      password: this.password
                  };
                  const response = await AuthenticationService.login(credentials);
                  this.msg = response.msg;

                  const token = response.token;
                  const user = response.user;

                  await this.$store.dispatch('login', {token, user});
                  await this.$router.push('/');

              } catch (e) {
                  this.msg = e.response.data.msg;
              }
            },

            clear: function () {
                this.email = '';
                this.password = '';
            },

        },

    }
</script>

<style scoped>

</style>