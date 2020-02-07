<template>
  <div v-if="smoothie" class="detail-smoothie container">
    <h2 class="center-align teal-text">Detail {{smoothie.title}} Smoothie</h2>
    <div class="form grey lighten-3">
      <form @submit.prevent="DetailSmoothie">
        <div class="field title">
          <label for="title">Smoothie Name:</label>
          <input type="text" name="title" v-model="smoothie.title" />
        </div>

        <div class="field" v-for="(ing, index) in smoothie.ingredients" :key="index">
          <label for="ingredient">{{index+1}}.ingredient</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
          
        </div>
        
        <div class="field right-align">
          <p v-if="feedback" class="red-text center-align">{{ feedback }}</p>
          <br />
          <br />
          
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify"; 

export default {
  name: "DetailSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
	  feedback: null,
	  flag:1
    };
  },
  methods: {
    DetailSmoothie() {
      if (this.smoothie.ingredients.length < 1) {
        this.AddIng();
      }
      if (this.smoothie.title && this.smoothie.ingredients.length > 0) {
        this.feedback = null;

        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        }); 
		this.flag=0
		  if (this.another) {
			  this.smoothie.ingredients[this.smoothie.ingredients.length]=(this.another)
		  }
        db.collection("smoothies").doc(this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          }).then(() => {
            this.$router.push({ name:  'Index'}); 
          }).catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a Smoothie Name";
      }
    },
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.detail-smoothie {
  margin-top: 80px;
  padding: 20px;
  max-width: 500px;
}
.detail-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.detail-smoothie .field {
  margin: 20px auto;
  padding: 20px;
  color: #263238;
  position: relative;
}
.detail-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: blueviolet;
  cursor: pointer;
  font-size: 1.4em;
}
</style>