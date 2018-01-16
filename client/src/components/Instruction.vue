<template class="text-xs-center">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1 v-if="!error && instruction.message !== 'Throw the die' &&
                  instruction.message !== 'Pick a card of same category' &&
                  instruction.message !== 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?' &&
                  instruction.message !== 'Choose the colored card you want to use' &&
                  instruction.message !== 'Remember to discard physical cards'"
        >{{instruction.message}}</h1>

        <div v-else-if="!error && instruction.message === 'Throw the die' || instruction.message === 'Pick a card of same category'">
          <h1>{{instruction.message}}</h1>
          <v-btn @click="nextInstructionAfterThrow">Done</v-btn>
        </div>

        <div v-else-if="!error && instruction.message === 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?'">
          <h1>{{instruction.message}}</h1>
          <v-btn @click="yesUseCards">Yes</v-btn>
          <v-btn @click="noDontUseCards">No</v-btn>
        </div>

        <div v-else-if="!error && instruction.message === 'Choose the colored card you want to use'">
          <h1>{{instruction.message}}</h1>
          <!-- Here I show a v-card with the same color as the category -->
          <v-card v-for="card in collectedCards" :key="card.name">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0"> {{card.name}} </h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" @click="removeCardFromCollected(card.name)">Use this power</v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div v-else-if="!error && instruction.message === 'Remember to discard physical cards'">
          <h1>{{instruction.message}}</h1>
          <h2> {{ currentPlayer === "player" ? player.name : caregiver.name }} discards 2 cards, while {{ currentPlayer === "player" ? caregiver.name : player.name }} discards 1</h2>
          <v-btn @click="cardsDiscarded">ok</v-btn>
        </div>

        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0">
          <h1>{{error}} </h1>
          <v-btn>done</v-btn>
        </div>

        <h1 v-else> {{error}} </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['instruction', 'error', 'currentPlayer'],
    data () {
      return {
        errors: [
          {message: "Please move the pawn a little around in the square"},
          {message: "Please remove last placed pawn, and place it back after X seconds"},
        ],
        collectedCards: []
      }
    },
    computed: {
      player(){
        return this.$store.state.player
      },
      caregiver(){
        return this.$store.state.caregiver
      }
    },
    methods:{
       nextInstructionAfterThrow(){
        if(this.instruction.message === 'Throw the die')
          Event.$emit('die-thrown')
        else
          Event.$emit('card-picked')
      },
      yesUseCards(){
        // change instruction to choose cards
        Event.$emit('choose-cards')
      },
      noDontUseCards(){
         // go bck to normal flow, throw the die
        Event.$emit('throw-die-after-discard')
      },
      cardsDiscarded(){
        // now go to the throw the die instruction screen
        Event.$emit('throw-die-after-discard')
      },
      removeCardFromCollected(category){
        // removes 2 cards from current player and 1 from the other one
        this.$store.dispatch('removePlayersCards', {activePlayer: this.currentPlayer, category: category})

        // show screen of how many cards they need to discard
        Event.$emit('cards-discarded')
      },
      retrieveUserCards(currentPlaya){
        // look for the ones to display
        console.log("currentPlaya is " + currentPlaya.name)

        if(currentPlaya.categoriesCollected.length) {
          console.log("User " + currentPlaya.name + " has categoriesCollected")
          for (let i = 0; i < currentPlaya.categoriesCollected.length; i++) {
            console.log("Now checking category " + currentPlaya.categoriesCollected[i].name)
            if (currentPlaya.categoriesCollected[i].count >= 2) {
              console.log("Category " + currentPlaya.categoriesCollected[i].name + " has " + currentPlaya.categoriesCollected[i].count + " cards")
              this.collectedCards.push(currentPlaya.categoriesCollected[i])
            }
          }
        }

        console.log("Now collectedCards is ", this.collectedCards)
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

      // retrieve information to display cards possessed by player or caregiver
      if(this.instruction.message === 'Choose the colored card you want to use' && this.collectedCards < 5){
        console.log("currentPlayer is " + this.currentPlayer)
        if(this.currentPlayer === "player"){
          this.retrieveUserCards(this.player)
        } else {
          this.retrieveUserCards(this.caregiver)
        }
      }
    },
    created(){

    }
  }
</script>

<style>

</style>
