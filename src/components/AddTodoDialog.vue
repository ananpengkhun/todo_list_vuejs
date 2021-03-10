<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <span class="mr-2">Add</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Add Topic*"
                  v-model="topic"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  label="Description"
                  v-model="description"
                  hint="Add Description"
                ></v-textarea>
              </v-col>
              <v-col>
                <template>
                  <div class="text-left">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                          <span class="mr-2">{{ currentStatus }}</span>
                          <v-icon>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in itemsFilter"
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
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createTodo(), (dialog = false)"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    topic: "",
    description: "",
    currentStatus : "TODO",
    itemsFilter: [
      { title: "TODO" },
      { title: "DOING" },
      { title: "COMPLETE" },
    ],
  }),
  created() {},
  methods: {
    createTodo() {
      console.log("ADD todo");
      console.log("todo :" + this.topic + ", desc :" + this.description);
      var requestTodo = {
        name: this.topic,
        todo: this.description,
      };
      this.$store.dispatch("createTodo", requestTodo);
    },statusSelect(status){
      this.currentStatus = status.title
    }
  },
  computed: {},
};
</script>