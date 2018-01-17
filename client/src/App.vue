<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
  import PageHeader from '@/components/Header.vue'



  export default {
    name: 'app',
    components: {
      PageHeader
    }
  }
</script>

<style>
  .btn{
    font-size: 20px;
    padding: 10px;
    height: auto;
  }

  p {
    font-size: 1.4em;
  }

  span{
    font-size: 1.1em;
  }

  .list__tile__title {
    font-size: 20px;
  }

  h2 {
    font-size: 1.8em;
  }

</style>
