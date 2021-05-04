<template>
  <v-app>
    <v-app-bar
        absolute
        app="true"
        color="#43a047"
        dark
    >
      <v-app-bar-title>Computer Database</v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="icons">
        <v-btn
            icon
            dark
            @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </div>

    </v-app-bar>

    <v-main>

      <v-parallax
          src="https://i.pinimg.com/originals/22/97/fb/2297fb6131ffce7d300a2782d6debda3.jpg"
          height="600"
      >

        <div id="nav">
          <router-link to="/login">Login</router-link>
        </div>
        <router-view/>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            right
            temporary
        >
          <v-list dense>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-switch
                v-model="$vuetify.theme.dark"
                inset
                label="Dark Mode"
            ></v-switch>
          </v-list>
        </v-navigation-drawer>
      </v-parallax>
    </v-main>

    <v-footer
        dark
        padless
        class="footer"
    >
      <v-card
          flat
          tile
          class="footerTop"
      >
      </v-card>

      <v-divider></v-divider>

      <v-card-text class="footerBot">
        {{ new Date().getFullYear() }} — <strong>Computer Database</strong>
      </v-card-text>

    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      drawer: null,
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
