<template>
  <div>
    <template>
      <div class="text-right">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <span class="mr-2">{{ currentFilter }}</span>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in itemsFilter"
              :key="index"
              @click="filterSelect(item)"
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
                  <v-col>
                    <template>
                      <div class="text-left">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              <span class="mr-2">{{ currentStatus }}</span>
                              <v-icon>mdi-menu-down</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="(item, index) in editFilter"
                              :key="index"
                              @click="statusSelect(item)"
                            >
                              <v-list-item-title>{{
                                item.title
                              }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </template>
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
    currentFilter: "All",
    idRemove: -1,
    topic: "",
    descript: "",
    dialog: false,
    dialogDelete: false,
    desserts: [],
    itemsFilter: [
      { title: "All" },
      { title: "TODO" },
      { title: "DOING" },
      { title: "COMPLETE" },
    ],
    currentStatus: "TODO",
    editFilter: [
      { title: "TODO", status: 0 },
      { title: "DOING", status: 1 },
      { title: "COMPLETE", status: 2 },
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
      this.currentStatus = this.editFilter.find((item) => {
        if (item.status == todo.status) return item;
      }).title;
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
    filterSelect(item) {
      // console.log(item.title);
      this.currentFilter = item.title;
      this.sortTodoByStatus();
    },
    sortTodoByStatus() {
      if (this.itemsFilter[1].title == this.currentFilter) {
        this.$store.dispatch("filterTodo", 0);
      } else if (this.itemsFilter[2].title == this.currentFilter) {
        this.$store.dispatch("filterTodo", 1);
      } else if (this.itemsFilter[3].title == this.currentFilter) {
        this.$store.dispatch("filterTodo", 2);
      } else {
        this.$store.dispatch("filterTodo", 99);
      }
    },
    statusSelect(status) {
      this.currentStatus = status.title;
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
