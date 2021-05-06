<template>
  <v-app>
    <v-app-bar
        absolute
        app="true"
        color="#43a047"
        dark
    >
      <v-app-bar-title>{{ $t('title') }}</v-app-bar-title>

      <v-spacer></v-spacer>

    <div>
        <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
            <flag :iso="entry.flag" v-bind:squared=false /> {{$t(entry.title)}}
        </button>
    </div>

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
      <router-view @connect="login" role="ROLE_ADMIN"></router-view>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          right
          temporary
      >
        <v-list dense>
          <v-list-item v-if="user.email">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ this.user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <router-link to="/login" v-else>
            <v-btn
                color="primary"
                class="mr-4"
                @click="disconnect"
            >
              {{$t('login')}}
            </v-btn>
          </router-link>

          <v-divider></v-divider>

          <v-switch
              v-model="$vuetify.theme.dark"
              inset
              :label="$t('darkMode')"
          ></v-switch>

          <router-link to="/login" v-if="user.email">
            <v-btn
                color="error"
                class="mr-4"
                @click="disconnect"
            >
              Disconnect
            </v-btn>
          </router-link>

        </v-list>
      </v-navigation-drawer>

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
import i18n from '@/plugins/vue-i18n';

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      user: {
        role: "",
        username: "",
        email: "",
        password: ""
      },
      languages: [
          { flag: 'us', language: 'en', title: 'english'},
          { flag: 'fr', language: 'fr', title: 'french' }
      ]    
    }
  },
  methods: {
    login(user) {
      this.user.email = user.email;
    },
    disconnect() {
      this.user.role = "";
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
    },
    changeLocale(locale) {
        i18n.locale = locale;
    },
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
