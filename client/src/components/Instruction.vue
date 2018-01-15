<template class="text-xs-center">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1 v-if="!error && instruction.message !== 'Throw the die' && instruction.message !== 'Pick a card of same category' ">{{instruction.message}}</h1>
        <div v-else-if="!error && instruction.message === 'Throw the die' || instruction.message === 'Pick a card of same category'">
          <h1>{{instruction.message}}</h1>
          <v-btn @click="nextInstructionAfterThrow">Done</v-btn>
        </div>
        <div v-else-if="!error && instruction.message === 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?'">
          <h1>{{instruction.message}}</h1>
          <v-btn @click="yesUseCards">Yes</v-btn>
          <v-btn @click="noDontUseCards">No</v-btn>
        </div>
        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0">
          <h1>{{error}}</h1>
          <v-btn>done</v-btn>
        </div>
        <h1 v-else> {{error}} </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['instruction', 'error'],
    data () {
      return {
        errors: [
          {message: "Please move the pawn a little around in the square"},
          {message: "Please remove last placed pawn, and place it back after X seconds"},
        ]
      }
    },
    methods:{
      nextInstructionAfterThrow(){
        if(this.instruction.message === 'Throw the die')
          Event.$emit('die-thrown')
        else
          Event.$emit('card-picked')
      }
    },
    updated(){
      // keeping reference of this
      var self = this

      if(this.error){
        console.log("There is an error message @created")
        if(this.errors.filter(function(e){
          return e.message === self.error
          }).length > 0){
          console.log("Changing toolbar to attention!")
          Event.$emit('toolbar-data', "Attention!", false, "amber")
        } else {
          console.log("Changing toolbar to special square!")
          Event.$emit('toolbar-data', "Special square", false, "orange")
        }
      }
    }
  }
</script>

<style>

</style>
