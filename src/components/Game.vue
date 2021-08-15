<template>
  <section id="game">
    <div class="inner">
      <!-- TURN LABEL -->
      <h2 id="title-turn-label" class="">
        A ton tour, <b id="player-firstname">Céline</b>
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
          <li class="symbol" data-id="0">
            <!-- example with a cross -->
            <div class="symbol-cross"></div>
          </li>
          <li class="symbol" data-id="1">
            <!-- example with a circle -->
            <div class="symbol-circle"></div>
          </li>
          <li class="symbol" data-id="2"></li>
          <li class="symbol" data-id="3"></li>
          <li class="symbol" data-id="4"></li>
          <li class="symbol" data-id="5"></li>
          <li class="symbol" data-id="6"></li>
          <li class="symbol" data-id="7"></li>
          <li class="symbol" data-id="8"></li>
        </ul>
        <!-- / SYMBOLS -->
      </div>
      <!-- / BOARD GAME -->

      <!-- TIME ELAPSED -->
      <div id="time-elapsed">
        <span class="time">00:00</span>
        <small>Temps écoulé</small>
      </div>
      <!-- / TIME ELAPSED -->

      <a class="btn" id="btn-replay">
        <span class="btn-inner">Quitter la partie</span>
      </a>
    </div>
  </section>
</template>
