<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        absolute
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
      >
        <span>Add</span>
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
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Description*"
                v-model="description"
                hint="Add Description"
                :rules="rules"
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
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
        <v-btn color="blue darken-1" text @click="createTodo()"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length > 3) || "Min 4 characters",
    ],
    dialog: false,
    topic: "",
    description: "",
    reqStatus: 0,
    currentStatus: "TODO",
    itemsFilter: [
      { status: 0, title: "TODO" },
      { status: 1, title: "DOING" },
      { status: 2, title: "COMPLETE" },
    ],
  }),
  created() {},
  methods: {
    createTodo() {
      if(!this.validate()) return;
      
      console.log("ADD todo");
      
      var requestTodo = {
        name: this.topic,
        todo: this.description,
        status: this.reqStatus,
      };
      this.$store.dispatch("createTodo", requestTodo).then(() => {
        this.resetField();
        this.dialog = false;
      });
    },
    statusSelect(status) {
      this.currentStatus = status.title;
      this.reqStatus = status.status;
    },
    resetField() {
      this.topic = "";
      this.description = "";
      this.currentStatus = "TODO";
      this.reqStatus = 0;
    },
    validate() {
      var isPass = false;
      if (this.topic.length > 3) {
        if (this.description.length > 3) {
          isPass = true;
        }
      }
      return isPass;
    },
  },
  computed: {},
};
</script>