<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ title }}</h3>
          </div>
        </v-card-title>
        <slot></slot>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  v-card {
    align-self: flex-start;
  }
</style>
