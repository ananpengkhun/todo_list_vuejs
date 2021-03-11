<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Rafa Management</div>
      <v-spacer></v-spacer>

      <AddTodoDialog />
    </v-app-bar>

    <v-main> <router-view></router-view></v-main>
  </v-app>
</template>

<script>
import AddTodoDialog from "./components/AddTodoDialog";

export default {
  name: "App",
  components: {
    AddTodoDialog,
  },

  data: () => ({}),

  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "TODO";
      },
    },
  },
};
</script>
