<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="要約ジェネレーター" />
    </div>
  </header>

  <main>
    <div id="app">
    <input v-model="text" placeholder="文章を入力してください。" />
    <button @click="summarize">Summarize</button>
    <div v-if="summary" class="summary-sentence">
      <h2>Summary</h2>
      <p>{{ summary }}</p>
    </div>
  </div>
  </main>
</template>



<style scoped>
header {
  line-height: 1.5;
}
input {
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
}
button {
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
  background-color: #4CAF50;
  color: white;
}
.summary-sentence{
  background-color: #4caf4f20;
}

  main {
    margin: 50px 0px;  
  }
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      text: "",
      summary: "",
    };
  },
  methods: {
    summarize() {
      axios
        .post("/api/summarize", { text: this.text}).then(res => {
          this.summary = res.data.summary;
        }).catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
