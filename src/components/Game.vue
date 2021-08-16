<template>
  <section id="game">
    <div class="inner">
      <!-- TURN LABEL -->
      <h2 id="title-turn-label" v-if="isAiToPlay">
        A mon tour
      </h2>
      <h2 id="title-turn-label" v-else>
        A ton tour, <b id="player-firstname">{{ playerInGame }} </b>
      </h2>
      <!-- / TURN LABEL -->

      <!-- BOARD GAME -->
      <div id="board-game">
        <div class="board">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 329 329"
            width="329px"
            height="329px"
          >
            <path
              d="M0,219H329v1H0v-1Z"
              fill="white"
              fill-opacity="0.5"
              fill-rule="evenodd"
            />
            <path
              d="M0,109H329v1H0v-1Z"
              fill="white"
              fill-opacity="0.5"
              fill-rule="evenodd"
            />
            <path
              d="M219,0h1V329h-1V0Z"
              fill="white"
              fill-opacity="0.5"
              fill-rule="evenodd"
            />
            <path
              d="M109,0h1V329h-1V0Z"
              fill="white"
              fill-opacity="0.5"
              fill-rule="evenodd"
            />
          </svg>
        </div>

        <!-- SYMBOLS -->
        <ul class="symbols">
          <li class="symbol" data-id="0" v-on:click="addEntry(0)"><div v-bind:class="getSquareClass(0)"></div></li>
          <li class="symbol" data-id="1" v-on:click="addEntry(1)"><div v-bind:class="getSquareClass(1)"></div></li>
          <li class="symbol" data-id="2" v-on:click="addEntry(2)"><div v-bind:class="getSquareClass(2)"></div></li>
          <li class="symbol" data-id="3" v-on:click="addEntry(3)"><div v-bind:class="getSquareClass(3)"></div></li>
          <li class="symbol" data-id="4" v-on:click="addEntry(4)"><div v-bind:class="getSquareClass(4)"></div></li>
          <li class="symbol" data-id="5" v-on:click="addEntry(5)"><div v-bind:class="getSquareClass(5)"></div></li>
          <li class="symbol" data-id="6" v-on:click="addEntry(6)"><div v-bind:class="getSquareClass(6)"></div></li>
          <li class="symbol" data-id="7" v-on:click="addEntry(7)"><div v-bind:class="getSquareClass(7)"></div></li>
          <li class="symbol" data-id="8" v-on:click="addEntry(8)"><div v-bind:class="getSquareClass(8)"></div></li>
        </ul>
        <!-- / SYMBOLS -->
      </div>
      <!-- / BOARD GAME -->

      <!-- TIME ELAPSED -->
        <Countdown ref="countdown" />
      <!-- / TIME ELAPSED -->

       <!-- Pop up summary -->
      <Summary v-show="winnerName !== null" v-bind:player-name="winnerName" />
      <!-- / Pop up summary -->

      <a class="btn" id="btn-replay">
        <span class="btn-inner" v-on:click="exit">Quitter la partie</span>
      </a>
    </div>
  </section>
</template>

<script>
import Countdown from './Countdown.vue'
import Summary from './Summary.vue'

export default {
  components: { Countdown, Summary },
  name: 'game',
  data () {
    return {
      // List of errors for this component
      errors: [],
      player1Name: this.$store.state.player1,
      player2Name: this.$store.state.player2,
      playersEntries: [null, null, null, null, null, null, null, null, null],
      nbEntries: 0,
      winnerName: null,
      squareClass: {
        'symbol-cross': this.playerInGame === this.player1Name,
        'symbol-circle': this.playerInGame === this.player2Name
      },
      // Give all the combination to win the game
      winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
    }
  },
  created: function () {
    // Verify in store that player(s) can access to the game
    let canAccessToGame = this.$store.state.canAccessToGame
    if (canAccessToGame === false) {
      this.$router.push({name: 'intro'})
    }
  },
  computed: {
    /**
     * Give the player turn with the attemps number
     * If its an even number it's player 1 turn
     * Else it's player 2 turn
     */
    playerInGame: {
      get () {
        return (this.nbEntries % 2) === 0 ? this.player1Name : this.player2Name
      }
    },
    /**
     * Check if is to a NPC to play
     */
    isAiToPlay () {
      return this.$store.state.gameMode === 'ai' && this.playerInGame === ''
    }
  },
  watch: {
    // whenever question changes, this function will run
    nbEntries: function () {
      if (this.isAiToPlay) {
        console.log('isAiToPlay change : ' + this.randomFreeSquare())
        this.playersEntries[this.randomFreeSquare()] = ''
        const isWin = this.checkVictory()
        if (isWin === false) {
          this.nbEntries++
        }
      }
    }
  },
  methods: {
    /**
     * Get 1 free squares that AI player can play
     */
    randomFreeSquare () {
      const freePlayersEntries = Object.keys(this.playersEntries).filter(key => this.playersEntries[key] === null)
      return parseInt(freePlayersEntries[Math.floor(Math.random() * freePlayersEntries.length)])
    },
    /**
     * Exit game method
     * Clean all state data and redirect to the Intro component
     */
    exit () {
      this.$router.push({name: 'intro'})
    },
    /**
     * Add entry to the player1Entries or player2Entries list.
     * The Entry correspond to the data-id from the row where player play
     * After added the entry check if it's a winner
     */
    addEntry (entryKey) {
      /**
       * Can't play if it the turn to an AI
       */
      if (this.isAiToPlay) {
        return
      }
      // Check if clicked square is already played
      if (this.playersEntries[entryKey] !== null) {
        console.log('entry already played')
        return
      }
      this.playersEntries[entryKey] = this.playerInGame
      const isWin = this.checkVictory()
      if (isWin === false) {
        this.nbEntries++
      }
    },
    getSquareClass (gameIndex) {
      if (this.playersEntries[gameIndex] === this.player1Name) {
        return 'symbol-cross'
      } else if (this.playersEntries[gameIndex] === this.player2Name) {
        return 'symbol-circle'
      } else {
        return ''
      }
    },
    /**
     * Check if there is a victory
     * It can be :
     * - 3 identicals symbols on horizontal lign
     * - 3 identicals symbols on vertical lign
     * - 3 identicals symbols on diagonal lign
     */
    checkVictory () {
      // Get entries for the current player
      let currentplayersEntries = []
      for (let index = 0; index < this.playersEntries.length; index++) {
        if (this.playersEntries[index] === this.playerInGame) {
          currentplayersEntries.push(index)
        }
      }

      console.log(currentplayersEntries)
      // If current player have less than 3 entries we don't need to check more
      if (currentplayersEntries.length < 3) {
        return false
      }
      // Loop on all combination and check if it's a winning one
      for (let combinationIndex = 0; combinationIndex < this.winningCombinations.length; combinationIndex++) {
        // Set the current winning combination
        const combinationList = this.winningCombinations[combinationIndex]
        console.log('combinationList : ' + combinationList)
        let isWinner = true
        for (let lignIndex = 0; lignIndex < combinationList.length; lignIndex++) {
          // Check if a combination number is in the player entries
          let isEntryInCombination = currentplayersEntries.includes(combinationList[lignIndex])
          console.log(combinationList[lignIndex])
          if (isEntryInCombination === false) {
            isWinner = false
            // Exit loop, don't need to check others value in combination list
            break
          }
        }
        if (isWinner) {
          this.winnerName = this.playerInGame
          // Stop countdown timer
          this.$refs.countdown.stopTimer()
          return true
        }
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
