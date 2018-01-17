<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div class="text-xs-center">
    <h2 v-if="!isPawnsInstruction && !isPickCardInstruction && errorMessage.length === 0">{{ activePlayer === "player" ? player.name : caregiver.name }}, het is jouw beurt!</h2>

    <!-- Switch between different instructions and questions -->
    <instruction v-if="showInstructions && errorMessage.length > 0" :instruction="instructions[7]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isPawnsInstruction" :instruction="instructions[0]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isDieInstruction" :instruction="instructions[1]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isMoveToColorInstruction" :instruction="instructions[2]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isPickCardInstruction" :instruction="instructions[3]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isTwoCardsSameColorInstruction" :instruction="instructions[4]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isChooseCardsToUse" :instruction="instructions[5]" :error="errorMessage" :currentPlayer="activePlayer"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isDiscardPhysicalCards" :instruction="instructions[6]" :error="errorMessage" :currentPlayer="activePlayer"/>
    <question v-else :question="currentQuestion" :player="activePlayer"/>
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  // var socket = io()   // use this for production
  var socket = io('http://localhost:8081')   // use this for local

  export default {
    components: { Question, Instruction },
    data () {
      return {
        activePlayer: 'player',
        gameStatus: 'turn',   // can be turn or win
        currentQuestion: {},  // contains also current category when filtered from set of questions
        currentSubQuestions: [],   // contains also current category when filtered from set of questions
        currentCategory: '',
        showInstructions: true,
        instructions: [
          {message: 'Zet de twee pionnen op het vakje “gaan”'},
          {message: 'Gooi de dobbelsteen opnieuw'},
          {message: 'Zet de pion naar de bijpassende kleur op de dobbelsteen'},
          {message: 'Pak een kaart met dezelfde kleur als de  categorie waarop uw pion nu staat, bijvoorbeeld Familie(geel)'},
          {message: 'Je hebt twee kaarten van dezelfde kleur/ categorie. Wil je deze kaarten gebruiken om 1 kaart van dezelfde categorie te verwijderen uit het dek van je tegenstander?'},
          {message: 'Kies de gekleurde kaarten die je wilt inleveren voor het verwijderen van de kaart vanuit het dek van je tegenstander.'},
          {message: 'Remember to discard physical cards'},
          {message: 'Prova'}
        ],
        currentInstruction: {message: 'Gooi de dobbelsteen opnieuw'},
        categoriesColors: [
          {name: "Familie", color: "yellow"},
          {name: "Liefde", color: "red"},
          {name: "Tienertijd", color: "cyan"},
          {name: "Kindertijd", color: "green"},
          {name: "Hobbies", color: "purple"},
        ],
        filteredQuestions: [],
        errorMessage: '',
        // these boolean variables are for deciding which instruction to display
        isPawnsInstruction: true,
        isDieInstruction: false,
        isMoveToColorInstruction: false,
        isPickCardInstruction: false,
        isTwoCardsSameColorInstruction: false,
        isChooseCardsToUse: false,
        isDiscardPhysicalCards: false
      }
    },
    computed: {
      questions() {
        return this.$store.state.questions
      },
      categories() {
        return this.$store.state.categories
      },
      player() {
        return this.$store.state.player
      },
      caregiver(){
        return this.$store.state.caregiver
      }
    },
    watch: {
      currentCategory: function(){
        console.log('\nCurrent Category watcher: changed to ' + this.currentCategory)

        this.checkCards()

        // keeping this as reference to access component data
        var self = this

        // do computations only if the category has been set properly (fixing issue of same category in a row)
        if(this.currentCategory !== 'reset'){
          console.log('---- currentCategory != reset')

          // map category to its ID
          let currentCategoryParse = this.categories.filter(function(obj){
            return obj.name == self.currentCategory
          })[0]

          var category = currentCategoryParse.id

          if(this.activePlayer === 'player') {
            // get all questions of a specific category and avoiding topics / questions to skip
            this.filteredQuestions = this.questions.filter(function (obj) {
              return obj.category == category
            }).filter(function (obj) {
              // filter by skipQuestions
              if (self.player.skipQuestions) {
                return !self.player.skipQuestions.includes(obj.id)
              } else {
                return obj
              }
            }).filter(function (obj) {
              if (self.player.skipTopics) {
                return !self.player.skipTopics.includes(obj.topics)
              } else {
                return obj
              }
            })
          } else {
            this.filteredQuestions = this.questions.filter(function (obj) {
              return obj.category == category
            })
          }

            this.currentQuestion = this.filteredQuestions[Math.floor(Math.random()*this.filteredQuestions.length)];

            Event.$on('category-name', catName => {
              // find color associated to category
              let currentCat = this.categoriesColors.filter(function(category){
                return category.name == catName
              })[0]

              // send data to toolbar
              Event.$emit('toolbar-data', catName, false, currentCat.color)
            })

            // toggle between instructions and question
            this.toggleQuestionsInstructions()
        }
      }
    },
    methods: {
      togglePlayers(){
        console.log("\nI am inside togglePlayers()")
        if(this.activePlayer === 'player')
          this.activePlayer = 'caregiver'
        else
          this.activePlayer = 'player'
      },
      toggleQuestionsInstructions(){
        console.log("\nI am inside toggleQuestionsInstructions()")
        this.showInstructions = !this.showInstructions
      },
      resetAfterTurnChange(){
        console.log("\nI am inside resetTurnAfterChange()")
        this.isPawnsInstruction = false
        this.isDieInstruction = false
        this.isMoveToColorInstruction = false
        this.isPickCardInstruction = true
        this.isTwoCardsSameColorInstruction = false
        this.isChooseCardsToUse = false
        this.isDiscardPhysicalCards = false
      },
      checkCards(){

        // keep scope of component
        var self = this

        console.log("\nI am inside checkCards()")

        // check cards owned by the player or caregiver
        if(this.activePlayer === "player"){
          console.log("---- Patient is active player")
          if(this.player.categoriesCollected && this.player.categoriesCollected.length > 0){
            console.log("---- Patient has collected cards")
            for(let i = 0; i < this.player.categoriesCollected.length; i++){
              if(this.player.categoriesCollected[i].count >= 2){
                console.log("---- Patient has " + this.player.categoriesCollected[i].count + " cards of category " + this.player.categoriesCollected[i].name)

                // check if caregiver has collected at least one card of the same category
                if(this.caregiver.categoriesCollected.length > 0){
                  let sameCategory = this.caregiver.categoriesCollected.filter(function(obj){
                    console.log("-------- obj.name is " + obj.name + ", while current player category is " + self.player.categoriesCollected[i].name)
                    return obj.name == self.player.categoriesCollected[i].name
                  })

                  console.log("sameCategory: ", sameCategory)

                  if(sameCategory.length > 0){
                    if(sameCategory[0].count >= 1){
                      this.isTwoCardsSameColorInstruction = !this.isTwoCardsSameColorInstruction
                      // this.isPickCardInstruction = !this.isTwoCardsSameColorInstruction
                      this.isPickCardInstruction = !this.isPickCardInstruction
                    }
                  }
                }
              } else {
                console.log("---- ...but not enough to use the power!")
                // this.isDieInstruction = !this.isDieInstruction
              }
            }
          } else {
            //this.isDieInstruction = !this.isDieInstruction
            // console.log("Not enough cards, going to die throw screen")
          }
        } else {
          // for caregiver
          console.log("---- Caregiver is active player")
          if(this.caregiver.categoriesCollected && this.caregiver.categoriesCollected.length > 0){
            console.log("---- Caregiver has collected cards")
            for(let i = 0; i < this.caregiver.categoriesCollected.length; i++){
              if(this.caregiver.categoriesCollected[i].count >= 2){
                console.log("---- Caregiver has " + this.caregiver.categoriesCollected[i].count + " cards of category " + this.caregiver.categoriesCollected[i].name)

                // check if player has collected at least one card of the same category
                if(this.player.categoriesCollected.length > 0){
                  let sameCategory = this.player.categoriesCollected.filter(function(obj){
                    console.log("-------- obj.name is " + obj.name + ", while current player category is " + self.caregiver.categoriesCollected[i].name)
                    return obj.name == self.caregiver.categoriesCollected[i].name
                  })

                  console.log("sameCategory: ", sameCategory)

                  if(sameCategory.length > 0){
                    if(sameCategory[0].count >= 1){
                      this.isTwoCardsSameColorInstruction = !this.isTwoCardsSameColorInstruction
                      this.isPickCardInstruction = !this.isPickCardInstruction
                    }
                  }
                }

                // Instruction switch probably wrong from before, just using the same as player before

                // this.isDieInstruction = !this.isDieInstruction
                // this.isTwoCardsSameColorInstruction = !this.isTwoCardsSameColorInstruction

              } else {
                console.log("---- ...but not enough to use the power!")
                //this.isDieInstruction = !this.isDieInstruction
              }
            }
          } else {
            // console.log("Not enough cards, going to die throw screen")
            // this.isDieInstruction = !this.isDieInstruction
          }
        }
      },
      printBooleans(){
        console.log('\n----------------------------------------')
        console.log('Situation of booleans for instructions |')
        console.log('----------------------------------------')
        console.log("this.isPawnsInstruction: " + this.isPawnsInstruction)
        console.log("this.isDieInstruction: " + this.isDieInstruction)
        console.log("this.isMoveToColorInstruction: " + this.isMoveToColorInstruction)
        console.log("this.isPickCardInstruction: " + this.isPickCardInstruction)
        console.log("this.isTwoCardsSameColorInstruction: " + this.isTwoCardsSameColorInstruction)
        console.log("this.isChooseCardsToUse: " + this.isChooseCardsToUse)
        console.log("this.isDiscardPhysicalCards: " + this.isDiscardPhysicalCards)
        console.log('----------------------------------------')
      }
    },
    created(){
      Event.$emit('toolbar-data', "Babbelbord", false)

      // saving this for referring to component
      var self = this

      socket.on('category', function(data){
        console.log("\nI am now inside category(socket) event")
        console.log("---- Category received from socket is " + (data.name ? data.name : data.special))

        // reset booleans to show the next correct screen
        self.isMoveToColorInstruction = !self.isMoveToColorInstruction

        if(data.name) {

          if(self.errorMessage){
            self.errorMessage = ''
            self.isMoveToColorInstruction = true
          }

          console.log("---- Setting category")
          self.currentCategory = data.name
          self.isDieInstruction = !self.isDieInstruction
        }
        else if(data.special){
          console.log("---- Setting error message")

          let message = data.special

          // map the old values with the new keywords
          if(message === "Het"){
            message = "Het is je geluksdag er gebeurt niks"
          } else if(message === "Ga"){
            message = "Ga terug naar je vorige kleurvak"
          } else if(message === "Verwijder") {
            message = "Verwijder een verdiende kleurkaart"
          } else if(message === "Geef") {
            message = "Geef de laast verdiende kaart aan de vorige speler"
          } else if(message === "START") {
            message = "Both pawns are at gaan"
          } else if(message === "MOVEPAWN"){
            message = "Verplaats de pion alsjeblieft iets meer naar het midden van het vakje"
          } else if(message === "MOVEDPAWNTOOFAST") {
            message = "Haal de laatst geplaatste pion alsjeblieft 10 seconden even van het vakje  en plaats het daarna terug"
          }

          console.log("After checking the data received, message is now " + message)

          // received "Both pawns are at gaan"
          if(message === "Both pawns are at gaan"){
            // switch to next instruction, throw the die
            self.isPawnsInstruction = false
            self.isDieInstruction = true
            self.isMoveToColorInstruction= false
            console.log("---- Inside both pawns are at gaan")
          } else if(message === "Verplaats de pion alsjeblieft iets meer naar het midden van het vakje" || message === "Ga terug naar je vorige kleurvak") {
            self.errorMessage = message
            console.log("---- Inside move pawn square")
            // self.toggleQuestionsInstructions()
          }
          console.log("---- Error message is: " + (self.errorMessage ? self.errorMessage : "No error, pawns at gaan"))
        }
      })

      // go to next instruction after die has been thrown
      Event.$on('die-thrown', function() {
        console.log("\nI am now inside die-thrown event")
        // switch to next instruction
        self.isDieInstruction = false
        self.isMoveToColorInstruction = true
        //self.isPickCardInstruction = !self.isPickCardInstruction
      })

      // go to next instruction after card has been picked up
      Event.$on('card-picked', function() {
        console.log("\nI am now inside card-picked event")
        // switch to next instruction
        self.isDieInstruction = !self.isDieInstruction
        self.isPickCardInstruction = !self.isPickCardInstruction
      })

      // remove the skipped questions from the array that holds all the ones that can be asked in this turn
      Event.$on('skipped-question', question => {
        console.log("\nI am now in skipped-question event")
        let index = self.filteredQuestions.indexOf(question)
        if (index > -1) {
          self.filteredQuestions.splice(index, 1);
        }

        self.currentQuestion = self.filteredQuestions[Math.floor(Math.random()*self.filteredQuestions.length)];

        //self.filteredQuestions.splice()
        console.log("---- filtered questions after removal: ", self.filteredQuestions)
      })

      // change to choose cards to discard
      Event.$on('choose-cards', function(){
        console.log("\nInside choose-cards event: before...")
        self.printBooleans()
        self.isChooseCardsToUse = true
        self.isTwoCardsSameColorInstruction = false
        self.isPickCardInstruction = false
        console.log("...and after")
        self.printBooleans()
      })

      // change to choose cards to discard
      Event.$on('cards-discarded', function(){
        console.log("\nI am now inside cards-discarded event")
        self.isChooseCardsToUse = false
        self.isDiscardPhysicalCards = true
      })

      // switch player turns
      Event.$on('switch-turn', function(){
        console.log("\nI am now inside switch-turn event")
        self.toggleQuestionsInstructions()
        self.resetAfterTurnChange()
        console.log("---- Situation after switch-turn")
        self.printBooleans()
        self.togglePlayers()
        self.currentCategory = 'reset'
      })

      // Go back to throw die after the users confirmend they discarded the physical cards
      Event.$on('throw-die-after-discard', function(){
        console.log("\nI am now inside throw-die-after-discard event")
        self.isDiscardPhysicalCards = false
        self.isDieInstruction = true
      })
    }
  }
</script>

<style>

</style>
