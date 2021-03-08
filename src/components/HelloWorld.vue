<template>
  <div>
<template>
  <div class="text-right">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left">Topic</th>
            <th class="text-left">Description</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(todo, index) in user"
            :key="index"
            @click="editTodo(todo)"
          >
            <td>{{ todo.name }}</td>
            <td>{{ todo.todo }}</td>
            <td>
              <ChipStatus :probA="todo.status" />
            </td>

            <td>
              <v-icon small @click="removeTodo(todo.id)"> mdi-delete </v-icon>
            </td>
          </tr>
        </tbody>
      </template>

      <template>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Update</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Edit Topic*"
                      v-model="topic"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      name="input-7-1"
                      label="Description"
                      v-model="descript"
                      hint="Add Description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ChipStatus from "./ChipStatus";
export default {
  data: () => ({
    idRemove: -1,
    topic: "",
    descript: "",
    dialog: false,
    dialogDelete: false,
    desserts: [],
    items: [
        { title: 'TODO' },
        { title: 'DOING' },
        { title: 'COMPLETE' },
        ],
  }),
  created() {
    this.fetchFood();
  },
  methods: {
    fetchFood() {
      this.$store.dispatch("getTodo");
    },
    editTodo(todo) {
      console.log("editTodo row at :" + todo.id);
      this.topic = todo.name;
      this.descript = todo.todo;
      if (!this.dialogDelete) this.dialog = true;
    },
    removeTodo(id) {
      console.log("removeTodo row at :" + id);
      this.idRemove = id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      var request = {
        id: this.idRemove,
      };
      this.$store.dispatch("removeTodo", request);
      this.dialogDelete = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  components: {
    ChipStatus,
  },
};
</script>
