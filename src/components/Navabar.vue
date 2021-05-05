<template>
  <div style="height: 362px; background-color:#1f601f ">
    <v-menu
     open-on-hover
      top
      offset-x
      v-for="Category in Categories"    
      v-bind:key="Category.name"
       style="max-width: 600px"
       class="link_category"
        transition="slide-x-transition"

    >
     <template v-slot:activator="{ on, attrs }">
      
        <v-btn
          :style=" {minHeight: 362/Categories.length +'px' }"
          dark
          v-bind="attrs"
          v-on="on"
          text
          width="100%"
         :to="'/list/category/'+Category.id+'/0'" class="link_category"
        >
           <span class="name_category">
                     {{Category.name}} 
                  </span>
        </v-btn>
        
      </template>
     
     <v-list max-width="1000" v-if="Category.subCategory.length">
       <span
        v-for="(item , index) in Category.subCategory"
          :key="index"
       >
          <v-list-item
          v-if="item.status"
         
        >
         
          <router-link 
              tag='a'
              :to="'/list/category/'+item.id+'/0'" class="link_subCategory"
              >
                <span class="name_subCategory">
                     {{item.name}} 
                  </span>
              </router-link>
        </v-list-item>
       </span>
       
      </v-list>
    </v-menu>
      <!-- <v-list>
              <v-list-item  v-for="Category in Categories" :style=" {minHeight: 362/Categories.length +'px' }" v-bind:key="Category.name" class="pa-0"> 
              <router-link 
              tag='a'
              :to="'/list/category/'+Category.id+'/0'" class="link_category"
              >
                <span class="name_category">
                     {{Category.name}} 
                  </span>
              </router-link>
             
              </v-list-item>
          </v-list> -->
  </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
    name: "Navabar",
    
data() {
    return {
       test: 9,
    }
    
   
    
    
},
created() {
  this.$store.dispatch("LOAD_CATEGORY",1);
},
computed: {
  ...mapState(["Categories"]),
   maxWith()
  {
    return this.Categories.length;
  }
  },
 
}
</script>

<style scoped>
.name_category{
  font-size: 13px;
    font-weight: 400;
    letter-spacing: 0px;
    color: #ecf0f1;
}
.link_category{
 text-decoration: none;
 width: 70%;
 height: 100%;
padding-left: 10px;
}
.link_category:hover{
  background-color: #199427;
  animation-delay: 1000ms;

  
}

.v-list-item:hover{
 background-color: #199427;

}
.link_subCategory{
  text-decoration: none;
 width: 70%;
 height: 100%;
padding-left: 10px;
}
.link_subCategory:hover{
   background-color: #199427;
  animation-delay: 1000ms;
}
.name_subCategory
{
  font-size: 12px;
    font-weight: 400;
    letter-spacing: 0px;
    color: #070707;
}
</style>