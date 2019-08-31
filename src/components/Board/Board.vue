<template>
  <div class="rgvms-board rgvms-mt-1">
    <Row class="rgvms-row" v-for="(row, index) in rows" :key="index" :cells="row" />
  </div>
</template>

<script>
import Row from "@/components/Board/Row";
import { mapGetters } from "vuex";

export default {
  components: {
    Row
  },

  computed: {
    ...mapGetters({
      board: "board"
    }),

    rows() {
      return this.board
    }
  }
}
</script>

<style>

</style>