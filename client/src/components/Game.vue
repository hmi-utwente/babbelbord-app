<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div class="text-xs-center">
    <h2 v-if="!isPawnsInstruction">{{ activePlayer === "player" ? player.name : caregiver.name }}, it's your turn!</h2>
    <!-- Switch between different instructions and questions -->
    <instruction v-if="(showInstructions || errorMessage.length > 0) && isPawnsInstruction" :instruction="instructions[0]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isDieInstruction" :instruction="instructions[1]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isMoveToColorInstruction" :instruction="instructions[2]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isPickCardInstruction" :instruction="instructions[3]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isTwoCardsSameColorInstruction" :instruction="instructions[4]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isChooseCardsToUse" :instruction="instructions[5]" :error="errorMessage"/>
    <question v-else :question="currentQuestion" :player="activePlayer"/>
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  // var socket = io()   // use this for production
  var socket = io('http://localhost:8081')   // use this for production

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
          {message: 'Arrange 2 pawns on GAAN'},
          {message: 'Throw the die'},
          {message: 'Move on the color obtained'},
          {message: 'Pick a card of same category'},
          {message: 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?'},
          {message: 'Choose the colored card you want to use'}
        ],
        currentInstruction: {message: 'Throw the die'},
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
        isChooseCardsToUse: false
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
        console.log('Current Category changed to ' + this.currentCategory)

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
          console.log("---- Category id of " + this.currentCategory + " is " + category)

          if(this.activePlayer === 'player') {
            // get all questions of a specific category and avoiding topics / questions to skip
            this.filteredQuestions = this.questions.filter(function (obj) {
              console.log("-------- Inside first filter, these are the objects: ", obj)
              return obj.category == category
            }).filter(function (obj) {
              // filter by skipQuestions
              console.log("-------- Inside second filter, with skipQuestions: ", obj)
              console.log("Player details: ", self.player)

              if (self.player.skipQuestions) {
                console.log("Player has skipQuestions set")
                return !self.player.skipQuestions.includes(obj.id)
              } else {
                return obj
              }
            }).filter(function (obj) {
              console.log("-------- Inside third filter, with skipTopics: ", obj)
              if (self.player.skipTopics) {
                console.log("Player has skipTopics set")
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
        if(this.activePlayer === 'player')
          this.activePlayer = 'caregiver'
        else
          this.activePlayer = 'player'
      },
      toggleQuestionsInstructions(){
        this.showInstructions = !this.showInstructions
      },
      resetAfterTurnChange(){
        this.isPawnsInstruction = false
        this.isDieInstruction = false
        this.isMoveToColorInstruction = false
        this.isPickCardInstruction = true
        this.isTwoCardsSameColorInstruction = false
        this.isChooseCardsToUse = false
      },
      checkCards(){
        // check cards owned by the player or caregiver
        if(this.activePlayer === "player"){
          console.log("Patient is active player")
          if(this.player.categoriesCollected && this.player.categoriesCollected.length > 0){
            console.log("Patient has collected cards")
            for(let i = 0; i < this.player.categoriesCollected.length; i++){
              if(this.player.categoriesCollected[i].count >= 2){
                console.log("Patient has " + this.player.categoriesCollected[i].count + " cards of category " + this.player.categoriesCollected[i].name)
                console.log("Booleans before change:")
                this.printBooleans()
                // this.isDieInstruction = !this.isDieInstruction
                this.isTwoCardsSameColorInstruction = !this.isTwoCardsSameColorInstruction
                this.isPickCardInstruction = !this.isTwoCardsSameColorInstruction
                console.log("Booleans after change:")
                this.printBooleans()
              } else {
                console.log("...but not enough to use the power!")
                this.isDieInstruction = !this.isDieInstruction
              }
            }
          } else {
            console.log("Not enough cards, going to die throw screen")
            this.isDieInstruction = !this.isDieInstruction
          }
        } else {
          // for caregiver
          console.log("Caregiver is active player")
          if(this.caregiver.categoriesCollected && this.caregiver.categoriesCollected.length > 0){
            console.log("Caregiver has collected cards")
            for(let i = 0; i < this.caregiver.categoriesCollected.length; i++){
              if(this.caregiver.categoriesCollected[i].count >= 2){
                console.log("Caregiver has " + this.caregiver.categoriesCollected[i].count + " cards of category " + this.caregiver.categoriesCollected[i].name)
                console.log("Booleans before change:")
                this.printBooleans()
                this.isDieInstruction = !this.isDieInstruction
                this.isTwoCardsSameColorInstruction = !this.isTwoCardsSameColorInstruction
                console.log("Booleans after change:")
                this.printBooleans()
              } else {
                console.log("...but not enough to use the power!")
                this.isDieInstruction = !this.isDieInstruction
              }
            }
          } else {
            console.log("Not enough cards, going to die throw screen")
            this.isDieInstruction = !this.isDieInstruction
          }
        }
      },
      printBooleans(){
        console.log('----------------------------------------')
        console.log('Situation of booleans for isntructions |')
        console.log('----------------------------------------')
        console.log("this.isPawnsInstruction: " + this.isPawnsInstruction)
        console.log("this.isDieInstruction: " + this.isDieInstruction)
        console.log("this.isMoveToColorInstruction: " + this.isMoveToColorInstruction)
        console.log("this.isPickCardInstruction: " + this.isPickCardInstruction)
        console.log("this.isTwoCardsSameColorInstruction: " + this.isTwoCardsSameColorInstruction)
        console.log("this.isChooseCardsToUse: " + this.isChooseCardsToUse)
        console.log('----------------------------------------')
      }
    },
    created(){
      Event.$emit('toolbar-data', "Match is on!", false)

      // saving this for referring to component
      var self = this

      socket.on('category', function(data){

        console.log("Category received from socket is " + data.name)

        if(data.name) {
          console.log("Setting category")
          self.currentCategory = data.name
        }
        else if(data.special){
          console.log("Setting error message")

          // received "Both pawns are at gaan"
          if(data.special === "Both pawns are at gaan"){
            // switch to next instruction, throw the die
            self.isPawnsInstruction = !self.isPawnsInstruction
            self.isDieInstruction = !self.isDieInstruction
            console.log("Inside both pawns are at gaan")

            console.log("Changing isPawnInstructions, updated value is " + self.isPawnsInstruction)
          } else {
            self.errorMessage = data.special

            // toggle between instructions and question
            self.toggleQuestionsInstructions()
          }

          console.log("Error message is: " + self.errorMessage)
        }
      })

      // go to next instruction after die has been thrown
      Event.$on('die-thrown', function() {
        // switch to next instruction
        self.isDieInstruction = !self.isDieInstruction
        self.isMoveToColorInstruction = !self.isMoveToColorInstruction
        self.isPickCardInstruction = !self.isPickCardInstruction
      })

      // go to next instruction after card has been picked up
      Event.$on('card-picked', function() {
        // switch to next instruction
        self.isDieInstruction = !self.isDieInstruction
        self.isPickCardInstruction = !self.isPickCardInstruction
      })

      // remove the skipped questions from the array that holds all the ones that can be asked in this turn
      Event.$on('skipped-question', question => {
        let index = self.filteredQuestions.indexOf(question)
        if (index > -1) {
          self.filteredQuestions.splice(index, 1);
        }

        self.currentQuestion = self.filteredQuestions[Math.floor(Math.random()*self.filteredQuestions.length)];

        //self.filteredQuestions.splice()
        console.log("filtered questions after removal: ", self.filteredQuestions)
      })

      // switch player turns
      Event.$on('switch-turn', function(){
        self.resetAfterTurnChange()
        self.toggleQuestionsInstructions()
        self.togglePlayers()
        self.currentCategory = 'reset'
      })
    }
  }
</script>

<style>

</style>
