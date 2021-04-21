<template>
  <div>
      <button class="btn bnt-success" @click="tang">Tăng</button>
    <button class="btn bnt-success" @click="giam">Giamr</button>
  </div>
</template>

<script>
export default {

 data() {
     return {
         
     }
 },
 methods: {
    mounted() {
        this.$store.commit('tangLen100',30)
    },
     tang()
     {
         this.$store.commit('tangLen100',30)
     },
     giam()
     {
          this.$store.state.kq--
     }
 },
}
</script>

<style>

</style>