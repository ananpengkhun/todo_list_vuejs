<template>
  <v-chip v-if="probA == 0" class="ma-1" color="red">Todo</v-chip>
  <v-chip v-else-if="probA == 1" class="ma-1" color="blue">Doing</v-chip>
  <v-chip v-else-if="probA == 2" class="ma-1" color="green">Complete</v-chip>
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