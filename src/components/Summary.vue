<template>
  <aside id="end-game">
    <!-- OVERLAY -->
    <div class="overlay"></div>
    <!-- / OVERLAY -->

    <div class="inner">
      <div class="modal-wrapper">
        <h2>Partie terminée !</h2>

        <p id="text-end-game" v-if="playerName !== ''">Bravo ! vous avez gagné, {{ playerName }}</p>
        <p id="text-end-game" v-else>Pas de chance, j’ai encore gagné</p>

        <a class="btn white" id="btn-restart">
          <span class="btn-inner" v-on:click="exit">Recommencer une partie</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script>

export default {
  name: 'summary',
  props: {
    playerName: String
  },
  methods: {
    /**
     * Exit game method
     * Clean all state data and redirect to the Intro component
     */
    exit () {
      this.$router.push({name: 'intro'})
    }
  }
}
</script>
