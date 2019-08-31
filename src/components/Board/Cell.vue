<template>
  <div
    :class="classObject"
    @click="open(cellData)"
    @contextmenu.prevent="flagging(cellData)"
  >{{ cellContent }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    cellData: Object
  },

  computed: {
    ...mapGetters({
      "findMines": "findMines",
      "board": "board",
      "flags": "flags",
      "gameOn": "gameOn",
      "gameOver": "gameOver"
    }),

    cellContent() {

      if (this.cellData.isOpen && this.cellData.count !== 0 && !this.cellData.hasMine) {
        return this.cellData.count;
      }

    },

    classObject() {
      return {
        "rgvms-cell--closed": !this.cellData.isOpen,
        "rgvms-cell--closed__had-mine": this.cellData.hasMine && !this.cellData.isOpen && this.gameOver && !this.cellData.hasFlag,
        "rgvms-cell--closed__has-flag": this.cellData.hasFlag,
        "rgvms-cell--open": this.cellData.isOpen,
        "rgvms-cell--open__hit-mine": this.cellData.hasMine && this.cellData.isOpen,
        "rgvms-cell--open__text-blue": this.cellData.count === 1 && !this.cellData.hasMine,
        "rgvms-cell--open__text-green": this.cellData.count === 2 && !this.cellData.hasMine,
        "rgvms-cell--open__text-red": this.cellData.count === 3 && !this.cellData.hasMine,
        "rgvms-cell--open__text-darkBlue": this.cellData.count === 4 && !this.cellData.hasMine,
        "rgvms-cell--open__text-darkRed": this.cellData.count === 5 && !this.cellData.hasMine,
        "rgvms-cell--open__text-petrol": this.cellData.count === 6 && !this.cellData.hasMine,
        "rgvms-cell--open__text-darkGreen": this.cellData.count === 7 && !this.cellData.hasMine,
        "rgvms-cell--open__text-grey": this.cellData.count === 8 && !this.cellData.hasMine
      }
    }
  },

  methods: {
    open(cell) {
      
      if (this.gameOver) {
        return;
      }

      let countMines = new Promise(resolve => {
        resolve(this.findMines(cell))
      })
      .then(numberOfMines => {
        let currentCell = this.board[cell.y][cell.x];

        if (currentCell.hasMine && !this.gameOn) {
          // First picked cell has mine, restart
          this.$store.dispatch("createBoard");
          this.open(cell);
        } else {
          if (!cell.hasFlag && !currentCell.isOpen) {
            this.$store.dispatch("handleCellClick");

            this.$store.commit("SETCELLOPEN", {
              ...currentCell,
              count: numberOfMines
            });

            if (!currentCell.hasMine && numberOfMines === 0) {
              this.openEmptyCells(cell);
            }

            if (currentCell.hasMine && this.gameOn) {
              this.$store.commit("ENDGAME");
            }

            this.$store.dispatch("checkForWin");
          }
        }
      });
    },

    openEmptyCells(cell) {
      // Going through each cell and open them one by one until we react a mine
      for (let row = -1; row <= 1; row += 1) {
        for (let col = -1; col <= 1; col += 1) {
          if (cell.y + row >= 0 && cell.x + col >= 0) {
            if (cell.y + row < this.board.length && cell.x + col < this.board[0].length) {
              if (
                !this.board[cell.y + row][cell.x + col].hasMine &&
                !this.board[cell.y + row][cell.x + col].isOpen
              ) {
                this.open(this.board[cell.y + row][cell.x + col]);
              }
            }
          }
        }
      }
    },

    flagging(cell) {
      if (this.gameOver || !this.gameOn || cell.isOpen) {
        return;
      }

      if (this.flags === 0 && !cell.hasFlag) {
        return;
      }

      this.$store.dispatch("setCellFlag", cell);
      this.$store.dispatch("setFlags", cell.hasFlag ? -1 : 1);
    }
  }
}
</script>

<style>

</style>