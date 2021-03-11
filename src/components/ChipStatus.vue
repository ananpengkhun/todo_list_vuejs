<template>
  <v-chip v-if="probA == 0" class="ma-1" color="red" text-color="white">Todo</v-chip>
  <v-chip v-else-if="probA == 1" class="ma-1" color="blue" text-color="white">Doing</v-chip>
  <v-chip v-else-if="probA == 2" class="ma-1" color="green" text-color="white">Complete</v-chip>
</template>
<script>
export default {
  props: {
    probA: Number,
  },
  data: () => ({}),
  created() {},
  methods: {},
  computed: {},
};
</script>