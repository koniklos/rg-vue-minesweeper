<template>
  <div class="rgvms-center">
    <h3>Select Difficulty</h3>
    <Spinner v-if="isLoading" />
    <div v-show="!isLoading">
      <select v-model="selectedLvl" name="select-level" id="select-level" class="rgvms-select rgvms-mt-1">
        <option
          v-for="(level) in levels"
          :key="level.level_id"
          :value="level.level_id"
          >{{ level.label }}
        </option>
      </select>
      <div class="rgvms-mt-1">
        <button class="rgvms-btn" @click="setBoard" :disabled="!selectedLvl">Play</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Spinner from "@/components/Utils/Spinner";

export default {
  created() {
    if (!this.gameRestarted) {
      this.$store.dispatch("setLoading", true);
      this.fetchLevels();
    }
  },

  computed: {
    ...mapGetters({
      "isLoading": "isLoading",
      "gameRestarted": "gameRestarted"
    })
  },

  data() {
    return {
      levels: this.$store.state.levels,
      selectedLvl: '1'
    }
  },

  components: {
    Spinner
  },

  methods: {
    fetchLevels() {
      this.$store.dispatch("fetchLevels");
    },

    setBoard() {
      if (!this.selectedLvl) {
        return;
      }

      this.$store.dispatch("setBoard", this.selectedLvl);
    }
  }
}
</script>

<style>

</style>