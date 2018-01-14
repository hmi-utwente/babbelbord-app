<template class="text-xs-center">
  <div class="text-xs-center">
    <h1 v-if="!error">{{instruction.message}}</h1>
    <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0">
      <h1>{{error}}</h1>
      <v-btn>done</v-btn>
    </div>
    <h1 v-else> {{error}} </h1>
  </div>
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
