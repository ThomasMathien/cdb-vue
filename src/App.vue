<template>
  <v-app id="app">
    <v-app-bar
        absolute
        app
        color="primary"
        dark
    >
      <v-app-bar-title>{{ $t('title') }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="flags">
        <button
            v-for="entry in languages"
            :key="entry.title"
            @click="changeLocale(entry.language)">
          <flag
              :iso="entry.flag"
              v-bind:squared=false
          />
          {{ $t(entry.title) }}
        </button>
      </div>

      <div class="accountButton">
        <v-btn
            v-if="user.email"
            color="primary"
            dark
            elevation="0"
            @click.stop="drawer = !drawer"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                  src="https://lh3.googleusercontent.com/proxy/aDsmrX9OtlLgcmbOm7RZ1EnOKedH7Ka2KErqPCY_cUCTitdULuMqXn9rpClyBjv-zs_TIYUY9I1TwHYYPy1DijQKOPWIu0uxL2KICRUtkXRrIUJTv5AM3w1G7G3B3-MNSWAhpMDn9RnVUbTvFxw"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ this.user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-btn>

        <v-btn
            v-if="!user.email"
            color="button"
            class="mr-4"
            to="/login"
        >
          Login
        </v-btn>

      </div>

      <template
          v-if="user.email"
          v-slot:extension
      >
        <v-tabs
            fixed-tabs
        >
          <v-tab
              to="/dashboard/computer"
          >
            Dashboard Computer
          </v-tab>
          <v-tab
              v-if="user.role == 'ADMIN'"
              to="/dashboard/company"
          >
            Dashboard Company
          </v-tab>
          <v-tab
              v-if="user.role == 'ADMIN'"
              to="/dashboard/user"
          >
            Dashboard User
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
    <v-main>
      <router-view
          @connect="login"
          @changeUsername="changeUsername"
          @changeEmail="changeEmail"
          @changePassword="changePassword"
          @changeBirthday="changeBirthday"
          :user="user"
          role="ROLE_ADMIN"
      />

      <v-navigation-drawer
          v-model="drawer"
          absolute
          right
          temporary
      >
        <v-list
            v-if="user.email"
            dense
            nav
        >
          <v-list-item
              v-for="item in items"
              :key="item.title"
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
        <v-row
            align="center"
            justify="space-around"
        >
          <v-switch
              v-model="$vuetify.theme.dark"
              inset
              false-value
              :label="$t('darkMode')"
          />

          <v-btn
              v-if="user.email"
              color="error"
              class="mr-4"
              @click="disconnect"
              to="/login"
          >
            Disconnect
          </v-btn>
        </v-row>

      </v-navigation-drawer>

    </v-main>

    <v-footer
        app
        color="primary"
        dark
        padless
    >
      <v-card
          flat
          tile
      >
      </v-card>

      <v-card-text>
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
        role: "ADMIN",
        username: "John Leider",
        email: "jleider@excilys.com",
        password: "SalutJohn",
        birthday: new Date().toISOString().substr(0,10),
      },
      items: [
        {title: 'My Account', icon: 'mdi-account-box', link: '/account'},
        {title: 'My Computers', icon: 'mdi-laptop', link: '/mycomputers'},
      ],
      languages: [
        {flag: 'us', language: 'en', title: 'english'},
        {flag: 'fr', language: 'fr', title: 'french'}
      ]
    }
  },
  methods: {
    login(user) {
      this.user.email = user.email;
      this.user.password = user.password;
    },
    disconnect() {
      this.user.role = "";
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
    },
    changeUsername(username) {
      this.user.username = username;
    },
    changeEmail(email) {
      this.user.email = email;
    },
    changePassword(password) {
      this.user.password = password;
    },
    changeBirthday(birthday) {
      this.user.birthday = birthday;
    },
    changeLocale(locale) {
      i18n.locale = locale;
    },
  },
};
</script>

<style>

.flags {
  margin-left: 10px;
  margin-right: 10px;
}

.accountButton {
  margin-left: 10px;
}

h2 {
  font-size: 40px;
  color: #00A096;
  margin-top: 2%;
  text-align: center;
}

navDrawerButton {
  text-align: center;
}

footer {
  text-align: center
}

</style>
