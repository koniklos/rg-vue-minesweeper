<template>
  <div class="rgvms-board-head">
    <div class="rgvms-flag-count">{{ flags }}</div>
    <ButtonReset />
    <div class="rgvms-timer">{{ formattedTime }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonReset from "@/components/Buttons/ButtonReset";

export default {
  data () {
    return {
      intervals: [],
      time: 0
    }
  },

  components: {
    ButtonReset
  },

  computed: {
    ...mapGetters({
      "flags": "flags",
      "gameOver": "gameOver",
      "gameOn": "gameOn",
      "gameRestarted": "gameRestarted"
    }),

    formattedTime() {
      let minutes = Math.floor(this.time / 600);
      let seconds = ((this.time % 600) / 10).toFixed(0);

      let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${formattedSeconds}`;
    },

    test() {
      return this.gameOn;
    }
  },
  watch: {
    gameOn: function (gameOn) {
      if (gameOn) {
        this.setIntervals(this.clockTick, 100);
      } else {
        this.intervals.map(clearInterval);
        this.intervals = [];
      }
    },

    gameOver: function(gameOver) {
      if (gameOver && this.$store.state.gameWin) {
        this.$store.dispatch("setTimeAndScore", { deciseconds: this.time, formattedTime: this.formattedTime });
      }
    },

    gameRestarted: function(gameRestarted) {
      this.time = 0;
    }
  },
  methods: {
    clockTick() {
      this.time++
    },

    setIntervals(fn, time) {
      this.intervals.push(setInterval(fn, time));
    }
  }
}
</script>

<style>

</style>