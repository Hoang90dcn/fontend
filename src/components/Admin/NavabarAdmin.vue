<template>
  <div>
      <v-list v-for="category in categories" v-bind:key="category.id" to="/list">
           <a v-bind:href="category.id" style="text-decoration: none">
              <v-list-item-group >
              <v-list-item>
                
                <v-list-item-icon class="pa-1 ma-1">
                  <v-icon left style="width: 24px; heigth: 24px">
                    {{category.icon}}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pa-1 ma-1">
                  <span class="font-weight-light custom-transform-class text-none body-2 pb-0 ten_sp">
                    {{category.name}}
                    
                  </span>
                  
                </v-list-item-content>
              
              </v-list-item>
            </v-list-item-group>
           </a>
          </v-list>
  </div>
</template>

<script>
export default {
    name: "Navabar",
data() {
    return {
        categories: [
          {id: "/product", name: "Quản Lý Sản Phẩm"},
          {id: "/admin/categories", name: "Quản Lý Danh Mục"},
          {id: "3", name: "Quản Lý Báo Cáo"},
          {id: "4", name: "Quản Lý Khuyến Mãi"},
          {id: "5", name: "Quản Lý Gio Hàng"},
          {id: "6", name: "Quản Lý Nhân Viên"},
          {id: "7", name: "Quản Lý Khách Hàng"}
          

          ],
    }
},
created() {
  // const URL ="http://localhost:9000/find-all-category";
  // const axios = require("axios").default;
  // axios.get(URL).then((response) => (this.Categories = response.data));
},
}
</script>

<style>

</style>