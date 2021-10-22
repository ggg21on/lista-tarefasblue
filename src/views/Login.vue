<template>
  <v-container fill-height fluid text-center>
    <v-container>
      <v-row>
        <v-col
          class="primary--text text-center mx-auto pb-4"
          clos="1"
          sm="4"
          offset="4"
          ><h1 class="h1">Login</h1></v-col
        >
      </v-row>
      <v-row class="elavation-3 mx-auto">
        <v-col cols="auto">
          <v-img
            max-height="150"
            max-width="250"
            src="@/assets/images/firebase_logo.png"
          ></v-img>
        </v-col>
        <v-col>
          <v-form>
            <v-text-field
              label="Email"
              append-icon="mdi-email"
              v-model="user.email"
            >
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-btn class="ml-2" color="warning" @click="reset">Cancel</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar color="red" v-model="errorLogin" danger multline timeout="2000"
      >Username or password is invalid.</v-snackbar
    >
    <v-dialog v-model="novaConta" persistent max-width="300">
      <v-card>
        <v-card-title>Account not found.</v-card-title>
        <v-card-text>
          Account not found. Do you want to create a new account with the data
          entered?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green draken-1" text @click="criarNovaConta">Yes</v-btn>
          <v-btn color="red draken-1" text @click="novaConta = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = "";
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>
</style>