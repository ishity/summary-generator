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
    <div id="app" class="right-content">
      <div class="right-top">
        <textarea v-model="text" placeholder="文章を入力してください。" />
        <button @click="summarize">要約する</button>
        <div class="summarized">
          <h3>要約は下記の通りです。</h3>
          <p>{{ summary }}</p>
        </div>
      </div>
  </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.right-content{
  display:flex;
  flex-flow: column;
  text-align: center;
}
button{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 40px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 3%;
}
textarea{
  width: 500px;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  margin-bottom: 10px;
}
.summarized{
  background-color: rgb(232, 232, 232);
  color: #000;
  padding: 10px;
  margin: 50px 0px;
}
.summarized h3{
  padding: 10px 0px;
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
      summary: ""
    };
  },
  methods: {
    summarize() {
      axios
      .post('http://localhost:5000/api/summarize', { text: this.text })
        .then(res => {
          this.summary = res.data.summary;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>