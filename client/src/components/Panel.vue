<template>
  <v-layout>
    <v-flex xs12 sm4 offset-sm2>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ title }}</h3>
          </div>
        </v-card-title>
        <slot></slot>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
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

<style>

</style>
