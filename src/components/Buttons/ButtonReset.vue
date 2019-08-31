<template>
  <button @click="resetGame" class="rgvms-reset rgvms-btn">Reset</button>
</template>

<script>
export default {
  methods: {
    resetGame() {
      this.$store.dispatch("resetGame");
    }
  }
}
</script>

<style>

</style>