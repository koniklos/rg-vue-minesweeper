<template>
  <div class="rgvms-board-container" v-if="this.$store.state.gameStarted">
    <WinScreen v-if="gameWin && showWinScreen" />
    <div v-show="!gameWin">
      <BoardHead />
      <Board />
    </div>
    <ScoreBoard v-if="showScoreBoard"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Board from '@/components/Board/Board.vue';
import BoardHead from '@/components/Board/BoardHead.vue';
import WinScreen from '@/components/Screens/WinScreen.vue';
import ScoreBoard from '@/components/Screens/ScoreBoard.vue';

export default {
  components: {
    Board,
    BoardHead,
    WinScreen,
    ScoreBoard
  },

  computed: {
    ...mapGetters({
      "gameWin": "gameWin",
      "showScoreBoard": "showScoreBoard",
      "showWinScreen": "showWinScreen"
    })
  }
}
</script>

<style>

</style>