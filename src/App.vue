<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">My Todo</div>

      <v-spacer></v-spacer>

      <AddTodoDialog />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>TODO</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>TODO</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>TODO</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>TODO</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main> <router-view></router-view></v-main>
  </v-app>
</template>

<script>
import AddTodoDialog from './components/AddTodoDialog';

export default {
  name: "App",
  watch: {
    group() {
      this.drawer = false;
    },
  },

  components: {
    AddTodoDialog,
  },

  data: () => ({
    drawer: false,
    group : null,
  }),
};
</script>
