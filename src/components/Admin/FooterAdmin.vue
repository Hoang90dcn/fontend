<template>
  <v-footer padless color="#18dcff">
      <v-row justify="center" no-gutters >
          <!-- <v-btn color="white" v-for="link in links" :key="link" class="my-2" rounded >
              {{link}}
          </v-btn> -->
         
        <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
      Trang QUẢN TRỊ
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
      </v-row>
  </v-footer>
</template>

<script>
export default {
name: 'ComFooter',
 data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
      
}
</script>

<style>

</style>