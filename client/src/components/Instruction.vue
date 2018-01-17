<template class="text-xs-center">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1 v-if="!error && instruction.message !== 'Gooi de dobbelsteen opnieuw' &&
                  instruction.message !== 'Pak een kaart met dezelfde kleur als de  categorie waarop uw pion nu staat, bijvoorbeeld Familie(geel)' &&
                  instruction.message !== 'Je hebt twee kaarten van dezelfde kleur/ categorie. Wil je deze kaarten gebruiken om 1 kaart van dezelfde categorie te verwijderen uit het dek van je tegenstander?' &&
                  instruction.message !== 'Kies de gekleurde kaarten die je wilt inleveren voor het verwijderen van de kaart vanuit het dek van je tegenstander.' &&
                  instruction.message !== 'Remember to discard physical cards'"
        >{{instruction.message}} </h1>

        <div v-else-if="!error && instruction.message === 'Gooi de dobbelsteen opnieuw' || instruction.message === 'Pak een kaart met dezelfde kleur als de  categorie waarop uw pion nu staat, bijvoorbeeld Familie(geel)'">
          <h1>{{instruction.message}} </h1>
          <v-btn color="deep-purple" dark @click="nextInstructionAfterThrow">Klaar</v-btn>
        </div>

        <div v-else-if="!error && instruction.message === 'Je hebt twee kaarten van dezelfde kleur/ categorie. Wil je deze kaarten gebruiken om 1 kaart van dezelfde categorie te verwijderen uit het dek van je tegenstander?'">
          <h1>{{instruction.message}} </h1>
          <v-btn color="deep-purple" dark @click="yesUseCards">Ja</v-btn>
          <v-btn color="deep-purple" dark @click="noDontUseCards">Nee</v-btn>
        </div>

        <div v-else-if="!error && instruction.message === 'Kies de gekleurde kaarten die je wilt inleveren voor het verwijderen van de kaart vanuit het dek van je tegenstander.'">
          <h1>{{instruction.message}} </h1>
          <!-- Here I show a v-card with the same color as the category -->
          <v-card v-for="card in collectedCards" :key="card.name">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0"> {{card.name}} </h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple" dark @click="removeCardFromCollected(card.name)">Lever deze twee kaarten in</v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div v-else-if="!error && instruction.message === 'Remember to discard physical cards'">
          <h1>{{instruction.message}} </h1>
          <h2> {{ currentPlayer === "player" ? player.name : caregiver.name }} legt twee kaarten af. {{ currentPlayer === "player" ? caregiver.name : player.name }} legt een kaart af.</h2>
          <v-btn color="deep-purple" dark @click="cardsDiscarded">ok</v-btn>
        </div>

        <!-- used generally for special squares -->
        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0 && error !== 'Ga terug naar je vorige kleurvak' && error !== 'Verwijder een verdiende kleurkaart' && error !== 'Geef de laast verdiende kaart aan de vorige speler'">
          <h1> {{error}} </h1>
          <v-btn color="deep-purple" dark @click="goToThrowDie">Klaar</v-btn>
        </div>

        <!-- used generally for special squares, but this one especially for Verwijder.. -->
        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0 && error === 'Verwijder een verdiende kleurkaart'">
          <h1> {{error}} </h1>

          <!-- showing the right cards owned by current player -->

          <!-- for patient: -->
          <div v-if="currentPlayer === 'player'">
            <div v-if="!player.categoriesCollected">
              <h2>No cards to discard, go on and play!</h2>
              <v-btn color="deep-purple" dark @click="goToThrowDie">Klaar</v-btn>
            </div>
            <v-layout v-else row wrap>
              <v-flex xs12 sm12>
                <v-card v-for="category in player.categoriesCollected" :key="category.name" class="mb-3">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ category.name }}</h3>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="deep-purple" dark @click="discardCardSpecial(player.name, category.name)">Discard</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <!-- else show instruction for caregiver -->
          <div v-else>
            <div v-if="!caregiver.categoriesCollected">
              <h2>No cards to discard, go on and play!</h2>
              <v-btn color="deep-purple" dark @click="goToThrowDie">Klaar</v-btn>
            </div>
            <v-layout v-else row wrap>
              <v-flex xs12 sm12>
                <v-card v-for="category in caregiver.categoriesCollected" :key="category.name" class="mb-3">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ category.name }}</h3>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="deep-purple" dark @click="discardCardSpecial(caregiver.name, category.name)">Discard</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </div>

        <!-- used generally for special squares, but this one especially for Geef de laast verdiende kaart aan de vorige speler -->
        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0 && error === 'Geef de laast verdiende kaart aan de vorige speler'">
          <h1> {{error}} </h1>
          <h2> {{ currentPlayer === "player" ? player.name : caregiver.name }} gives to {{ currentPlayer === "player" ? caregiver.name : player.name }} one {{ currentPlayer === "player" ? player.lastItem : caregiver.lastItem }} card.</h2>
          <v-btn color="deep-purple" dark @click="giveOneCardToOtherPlayer">Klaar</v-btn>
        </div>

        <!-- used generally for special squares, but this one especially for Ga terug.. -->
        <div v-else-if="errors.filter(function(e){ return e.message === error}).length === 0 && error === 'Ga terug naar je vorige kleurvak'">
          <h1> {{error}} </h1>
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
          {message: "Verplaats de pion alsjeblieft iets meer naar het midden van het vakje"},
          {message: "Haal de laatst geplaatste pion alsjeblieft 10 seconden even van het vakje  en plaats het daarna terug"},
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
        if(this.instruction.message === 'Gooi de dobbelsteen opnieuw')
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
      },
      discardCardSpecial(playerName, categoryName){
        // discard the card either from player or caregiver
        if(playerName === this.player.name){
          // send action to store to remove one card for player
          this.$store.dispatch('removeOneCardPlayer', categoryName)
        } else {
          // ... or for the caregiver
          this.$store.dispatch('removeOneCardCaregiver', categoryName)
        }

        Event.$emit('switch-turn-verwijder')
      },
      goToThrowDie(){
        Event.$emit('switch-turn-verwijder')
      },
      giveOneCardToOtherPlayer(){
         if(this.currentPlayer === "player"){
           this.$store.dispatch("giveCardToCaregiver")
         } else {
           this.$store.dispatch("giveCardToPlayer")
         }

        Event.$emit('switch-turn-verwijder')
      }
    },
    updated(){
      // keeping reference of this
      var self = this

      if(this.error){
        console.log("There is an error message @updated")
        if(this.errors.filter(function(e){
          return e.message === self.error
          }).length > 0){
          console.log("Changing toolbar to attention!")
          Event.$emit('toolbar-data', "Attentie!", false, "amber")
        } else {
          console.log("Changing toolbar to special square!")
          Event.$emit('toolbar-data', "Speciale categorie", false, "orange")
        }
      }

      // retrieve information to display cards possessed by player or caregiver
      if(this.instruction.message === 'Kies de gekleurde kaarten die je wilt inleveren voor het verwijderen van de kaart vanuit het dek van je tegenstander.' && this.collectedCards < 5){
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
  h1 {
    font-size: 3em;
  }
</style>
