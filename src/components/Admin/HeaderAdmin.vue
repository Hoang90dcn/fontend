<template>
    <div>
        <v-app-bar
      app
      color="primary"
      dark
    >
     <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
     
     

      <v-btn 
      text
      to="/about">
      About
    </v-btn>
    <v-btn 
      text
      @click="printRole()"
     >
      Test
    </v-btn>
    <v-btn
    @click="logOut"
    text
    >
      LogOut
    </v-btn>

      <v-btn
   to="/admin"
    text
    >
      admin
    </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>


    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" color="#636e72">
      <v-list>
          <v-list-item
          v-for="item in listNavigation"
          :key="item.id"
          link
         
          :to="item.link"
          
          >
         <v-list-item-icon class="text" >
            <v-icon color="#b8c7ca">{{item.icon}}</v-icon>
         </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title class="text">{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>

</template>


<script>
export default {
    data (){
        return{
            drawer: false,
            listNavigation: [
                {id: 1, name: "Dashboard",icon: "mdi-view-dashboard", link: {  name: 'Dashboard'}},
                {id: 2, name: "Product", icon: "mdi-alpha-p-box-outline", link: {name: 'Product'}},
                {id: 3, name: "News", icon: "mdi-newspaper", link: "/news"},
                {id: 4, name: "Category", icon: "mdi-alpha-c-box-outline", link: "admin/categories"},
                {id: 5, name: "Cart",  icon: "mdi-account-cash", link: { name: 'CartAdmin'}},
                {id: 6, name: "Account", icon: "mdi-account-multiple-check", link: "/Acount"}
            ],
        }
    }

}
</script>

<style scoped>
.text{
    color: #b8c7ca;
}
</style>