<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div>
    <instruction v-if="showInstructions" :instruction="currentInstruction"/>
    <question v-else :question="currentQuestion"/>

  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  var socket = io()   // use this for production
  // var socket = io('http://localhost:8081')   // use this for production

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
          {name: "Hobby", color: "purple"},
        ],
        filteredQuestions: [],
        errorMessage: ''
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
        console.log('Current Category changed')

        // keeping this as reference to access component data
        var self = this

        // map category to its ID
        let currentCategoryParse = this.categories.filter(function(obj){
          return obj.name == self.currentCategory
        })[0]

        var category = currentCategoryParse.id

        // get all questions of a specific category and avoiding topics / questions to skip
        this.filteredQuestions = this.questions.filter(function(obj){
          return obj.category == category
        }).filter(function(obj){
          // filter by skipQuestions
          if(self.player.skipQuestions){
            console.log("Player has skipQuestions set")
            return !self.player.skipQuestions.includes(obj.id)
          }
        }).filter(function(obj){
          console.log("Player has skipTopics set")
          if(self.player.skipTopics){
            return !self.player.skipTopics.includes(obj.topics)
          }
        })

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
      }
    },
    created(){
      Event.$emit('toolbar-data', "Match is on!", false)

      // saving this for referring to component
      var self = this

      socket.on('category', function(data){
        console.log("Data received in socket: ", data)
        if(data.name) {
          console.log("Setting current category")
          self.currentCategory = data.name
          console.log("After socket, currentCategory is " + self.currentCategory)
        }
        else if(data.error){
          console.log("Setting error message")
          self.errorMessage = data.error

          // toggle between instructions and question
          self.toggleQuestionsInstructions()

          console.log("Error message is: " + self.errorMessage)
        }
      })

      Event.$on('skipped-question', question => {
        // remove the question skipped from the array of the ones that can be asked in this turn
        let index = self.filteredQuestions.indexOf(question)
        if (index > -1) {
          self.filteredQuestions.splice(index, 1);
        }

        self.currentQuestion = self.filteredQuestions[Math.floor(Math.random()*self.filteredQuestions.length)];

        //self.filteredQuestions.splice()
        console.log("filtered questions after removal: ", self.filteredQuestions)
      })
    }
  }
</script>

<style>

</style>
