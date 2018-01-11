<template>
  <v-list-tile avatar :key="player.id" @click.stop="toggleItem(player)" :class="{'enabled': active}">
    <v-list-tile-avatar>
      <v-icon>face</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ player.name }} {{ player.lastname }} </v-list-tile-title>
      <v-list-tile-sub-title>
        <span v-for="topicPlayer in player.skipQuestions">
          <span v-for="topic in topics" v-if="topic.id == topicPlayer" color="amber" text-color="black"> {{ topic.name }} </span>
        </span>
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple :to="`/players/edit/${player.id}`">
        <v-icon medium color="deep-purple">mode_edit</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  export default {
    props: ['player','active'],
    data () {
      return {
      }
    },
    methods: {
      toggleItem(player){
        Event.$emit('item-selected', player.id)
      }
    },
    computed: {
      topics(){
        return this.$store.state.topics
      }
    }
  }
</script>

<style scoped>
  .enabled {
    background: #ffc107!important;
  }
</style>
