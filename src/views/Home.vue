<template>
    <v-container>
        <HelloWorld/>
    </v-container>
    
</template>

<script>
import HelloWorld from '../components/HelloWorld';
export default {
  name: "hello",

  data: () => ({
    
  }),
  components:{
      HelloWorld
  }
};
</script>
