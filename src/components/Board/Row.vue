<template>
  <div>
    <Cell class="rgvms-cell" v-for="(cell, index) in cells" :key="index" :cellData="cell" />
  </div>
</template>

<script>
import Cell from "@/components/Board/Cell";

export default {
  components: {
    Cell
  },

  props: {
    cells: Array
  }
}
</script>

<style>

</style>