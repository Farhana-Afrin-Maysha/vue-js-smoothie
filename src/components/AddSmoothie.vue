 <template>
	<div class="add-smoothie container">
	  <h2 class="center-align teal-text">Add Latest Smoothie Recipe</h2>	
		<div class="form grey lighten-3">
		 <form @submit.prevent="AddSmoothie">
	      <div class="field title">
	      	<label for="title">Smoothie Name:</label>
	      	<input type="text" name="title" v-model="title">
	      </div>

		  <div class="field" v-for="(ing, index) in ingredients" :key="index" >
<label for="ingredient">{{index+1}}.ingredient</label>
<input type="text" name="ingredient" v-model="ingredients[index]">
<i class="material-icons delete" @click="deleteIng(ing)">delete</i>
</div>
<div v-if="flag===1" class="field add-ingredient">
<label for="add-ingredient">Add an ingredient</label>
<input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" >
</div>
		  <div class="field right-align">
	  	<p v-if="feedback" class="red-text center-align">{{feedback}}</p>
	  	<br><br>
	      	<button class="btn orange">Add Smoothie</button> 
	      </div>
	     </form>
	  </div>
	</div>
</template>

<script>
import db from 	'@/firebase/init'
import slugify from 'slugify'


export default {
	name: 'AddSmoothie',
	data(){
      return {
       title : null,
       another : null,
       ingredients: [this.another],
       feedback: null,
	   slug: null,
	   flag:1
      }
	},

	methods: {
		AddSmoothie(){ 
		if(this.ingredients.length < 1){
        this.AddIng()
        }
	    if(this.title && this.ingredients.length>0){
          this.feedback = null
          

          this.slug = slugify(this.title,{
          	replacement: '-' ,
          	remove: /[$*_+~.()'"!\-:@]/g,
          	lower: true
          })
		  this.flag=0
		  if (this.another) {
			  this.ingredients[this.ingredients.length]=(this.another)
		  }
          db.collection('smoothies').add({
         title: this.title,
         ingredients: this.ingredients,
         slug: this.slug
          }).then(()=>{
          	this.$router.push({ name: 'Index'})
          }).catch(err =>{
          	console.log(err)
          })
	    } else {
	      this.feedback = 'You must enter a Smoothie Name'
	    }
		
		},
	addIng(){        
	   if(this.another){
		this.ingredients.push(this.another)
        this.another  =null
        this.feedback = null
	   } else{
	   	this.feedback = 'You must enter a value to add an ingredient'
	   }
	},
	deleteIng(ing){
this.ingredients = this.ingredients.filter(ingredient =>{
return ingredient != ing
})

}

}

}	
</script>


<style>
.add-smoothie{
	margin-top: 80px;
	padding: 20px;
	max-width: 500px;
    
}
.add-smoothie h2{
	font-size: 2em;
	margin: 20px auto;
}
.add-smoothie .field{
   margin: 20px auto;
   padding: 20px;
   color: #263238;
   position:relative;
}
.add-smoothie .delete {
	position:absolute;
	right: 0;
	bottom: 16px;
	color:blueviolet;
	cursor: pointer;
	font-size: 1.4em;
}

</style> 

