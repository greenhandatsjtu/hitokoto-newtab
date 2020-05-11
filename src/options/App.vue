<template>
  <v-app>
    <v-content>
      <p v-text="message"></p>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: ()=>({
    message: 'hitokoto options'
  })
};
</script>
