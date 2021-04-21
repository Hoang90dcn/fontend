<template>
  <div style="height: 362px">
      <v-list>
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
          </v-list>
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
  this.$store.commit("LOAD_CATEGORY")
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
    color: black;
}
.link_category{
 text-decoration: none;
 width: 70%;
 height: 100%;
padding-left: 10px;
}
.link_category:hover{
  background-color: cornflowerblue;
  animation-delay: 1000ms;

  
}

.v-list-item:hover{
 background-color: cornflowerblue;

}
</style>