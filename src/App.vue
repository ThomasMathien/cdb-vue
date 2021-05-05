<template>
  <v-app id="app">
    <v-app-bar
        absolute
        app
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
      <router-view
          @connect="login"
          :user="user"
      />

      <v-navigation-drawer
          v-model="drawer"
          absolute
          right
          temporary
      >
        <v-list-item v-if="user.email">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ this.user.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <router-link to="/login" v-if="!user.email">
          <v-btn
              color="primary"
              class="mr-4"
              @click="disconnect"
          >
            Login
          </v-btn>
        </router-link>

        <v-list
            v-if="user.email"
            dense
            nav
        >
          <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.link"
          >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="Dark Mode"
        />

        <router-link to="/login" v-if="user.email">
          <v-btn
              color="error"
              class="mr-4"
              @click="disconnect"
          >
            Disconnect
          </v-btn>
        </router-link>

      </v-navigation-drawer>

    </v-main>

    <v-footer
        app
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
      user: {
        role: "",
        username: "",
        email: "",
        password: ""
      },
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/dashboard'},
        {title: 'My Account', icon: 'mdi-account-box', link: '/account'},
        {title: 'My Computers', icon: 'mdi-laptop', link: '/mycomputers'},
      ],
    }
  },
  methods: {
    login(user) {
      this.user.email = user.email;
      console.log(user.password);
      this.user.password = user.password;
    },
    disconnect() {
      this.user.role = "";
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
    }
  },
};
</script>

<style>

h1 {
  font-size: 35px;
  color: darkcyan;
  margin-top: 5%;
}

#app {
  text-align: center;
}

</style>
