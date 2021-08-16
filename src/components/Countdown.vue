<template>
  <div>
    <!-- TIME ELAPSED -->
    <div id="time-elapsed">
    <span class="time">{{ displayMinutes }}:{{ displaySeconds }}</span>
    <small>Temps écoulé</small>
    </div>
    <!-- / TIME ELAPSED -->
  </div>
</template>

<script>

export default {
  name: 'countdown',
  data () {
    return {
      displaySeconds: '00',
      displayMinutes: '00',
      timer: null
    }
  },
  created: function () {
    let seconds = 0
    let minutes = 0
    // Create new timer to set the time elapsed
    this.timer = setInterval(() => {
      seconds++
      if (seconds > 59) {
        seconds = 0
        this.displaySeconds = '00'
        minutes++
        this.displayMinutes = ('0' + minutes).slice(-2)
      } else {
        this.displaySeconds = ('0' + seconds).slice(-2)
      }
    }, 1000)
  },
  methods: {
    /**
     * Stop the timer
     */
    stopTimer () {
      if (this.timer !== null) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
