<template>
  <div class="index container">
    <div class="card blue lighten-5" v-for="smoothie in smoothies" :key="smoothie.id">
     <div class="card-content">
      <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
       <h4 class="indigo-text">{{smoothie.title}}</h4>
        <ul  class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
             <span class="chip">{{ ing }}</span>
          </li> 
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab orange">
      <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
     <i class="material-icons edit">edit</i>
      </router-link>            
     </span>
     <span class="btn-floating btn-large halfway-fab left orange">
      <router-link :to="{ name: 'DetailSmoothie', params: {smoothie_slug: smoothie.slug}}">
     <i class="material-icons details">details</i>
      </router-link>            
     </span>
    </div>
   </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },

  methods: {
     deleteSmoothie(id){
     db.collection('smoothies').doc(id).delete()
     this.smoothies = this.smoothies.filter(smoothie=>{
       return smoothie.id != id
     })  

   }
  },

  created(){
      // fetch data from firestore
     db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        /* console.log(doc.data())*/
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    });
  }
} 
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h4 {
  text-align: center;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #bcaaa4;
}
</style>
