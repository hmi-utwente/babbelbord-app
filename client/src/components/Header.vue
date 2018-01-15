<template>
  <v-toolbar v-bind:color=color app>
    <v-btn v-if="backArrow" @click="goBack" icon class="hidden-xs-only">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="goToHome">
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        backArrow: false,
        color: 'amber'
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      goToHome(){
        // reset player and caregiver from store
        this.$store.dispatch('resetPlayerCaregiver')

        this.$router.push('/')
      }
    },
    created(){
      Event.$on('toolbar-data', (title, backArrow, color) => {
        this.title = title;
        this.backArrow = backArrow
        if(color)
          this.color = color
      })
    }
  }
</script>

<style scoped>

</style>
