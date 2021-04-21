<template>
  <router-view ></router-view>
</template>

<script>



import ComHeader from '@/components/ComHeader.vue';
import ComFooter from '@/components/ComFooter.vue'

export default {
  name: 'App',
 
  components: {
   
    ComHeader,
    ComFooter
  },

 data() {
   return {
    
     kq: 0,
   }
 },
};
</script>
