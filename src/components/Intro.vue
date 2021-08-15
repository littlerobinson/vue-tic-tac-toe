<template>
  <section id="intro" v-show="isVisible">
    <div class="inner">
      <!-- STEP CHOOSE GAME MODE -->
      <div id="step-choose-game-mode" v-show="isChooseGameMode === false">
        <h3>Choisissez votre mode de jeu</h3>
        <a class="btn" data-mode="vs" v-on:click="gameMode = 'vs'">
          <span class="btn-inner">Joueur vs Joueur</span>
        </a>
        <div class="clear"></div>
        <a class="btn" data-mode="ai" v-on:click="gameMode = 'ai'">
          <span class="btn-inner">Joueur vs IA</span>
        </a>
      </div>
      <!-- / STEP CHOOSE GAME MODE -->

      <!-- STEP FORM PLAYER VS PLAYER -->
      <form id="step-player-info" v-on:submit.prevent="checkTypeGameForm" v-show="isChooseGameMode === true">
        <h3 v-if="gameMode ==='vs'">Prénoms des joueurs</h3>
        <h3 v-else>Votre prénom</h3>

        <div class="input input-player-1">
          <input type="text" name="player-1" placeholder="Joueur 1" autocomplete="off" v-model="player1" />
        </div>

        <div class="input input-player-2" v-show="gameMode ==='vs'">
          <input type="text" name="player-2" placeholder="Joueur 2" autocomplete="off"  v-model="player2"  />
        </div>

        <button name="submit" type="submit" class="btn">
          <span class="btn-inner" v-on:click="checkTypeGameForm">Jouer</span>
        </button>
      </form>
      <!-- / STEP FORM PLAYER VS PLAYER -->

    </div>
  </section>
</template>

<script>

export default {
  name: 'intro',
  data () {
    return {
      // List of errors for this component
      errors: [],
      // Set the visibility of the component
      isVisible: true,
      gameMode: '',
      isPlayersCreated: false,
      player1: '',
      player2: ''
    }
  },
  computed: {
    /**
     * Get a flag if player as choose a game mode
     * Game mode can be :
     * - vs -> 2 reals players play
     * - ai -> 1 player play between one AI
     */
    isChooseGameMode () {
      return this.gameMode !== '' && (this.gameMode.includes('vs') || this.gameMode.includes('ai'))
    }
  },
  methods: {
    /**
     * Check the validity of the forms
     * Check that player are completed the fields with nickname
     */
    checkTypeGameForm () {
      switch (this.gameMode) {
        case 'vs':
          this.isPlayersCreated = this.player1.length > 0 && this.player2.length > 0
          if (this.isPlayersCreated === false) {
            this.$notify({ type: 'warn', text: 'Champ manquants vs.' })
          }
          break
        case 'ai':
          this.isPlayersCreated = this.player1.length > 0
          if (this.isPlayersCreated === false) {
            this.$notify({ type: 'warn', text: 'Champ manquants ai.' })
          }
          break
        default:
          this.isPlayersCreated = false
          break
      }
      if (this.isPlayersCreated) {
        this.$router.push('game')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
