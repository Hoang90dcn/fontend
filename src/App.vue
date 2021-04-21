<template>
 
  <v-app 
  v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    
  
   <router-view name="view-header"></router-view>
    
    <v-main>
      <router-view></router-view>
      
    </v-main>
     <router-view name="view-footer"></router-view>
  </v-app>
</template>

<script>


import ComHeader from '@/components/ComHeader.vue';
import {mapState} from 'vuex'

export default {
  name: 'App',
 
  components: {
    
    ComHeader,
    // ComFooter
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },

 data() {
   return {
    
     kq: 0,
   }
 },
};
</script>
