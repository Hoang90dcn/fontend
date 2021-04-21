<template>
 <div>
    <h2>Kết quả: {{kq}}</h2>
  <h2>Kết quả: {{numberProduct}}</h2>
 
 </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
  export default {
   computed: {
    ...mapState([
      "kq",
      "numberProduct",
    ]),
    ...mapGetters([
      "NhanMuoi","getLength"
    ])
     
   },
  }
</script>
