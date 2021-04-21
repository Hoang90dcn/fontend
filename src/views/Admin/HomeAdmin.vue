<template>
  <router-view></router-view>
</template>

<script>
import NavabarAdmin from "@/components/Admin/NavabarAdmin.vue";
import {mapState} from 'vuex'
export default {
  
  created() {
    //this.$store.commit("GET_NEW_CART")
    
    // GET_ALL_PRODUCT
  },
  data() {
    return {
      
      headers: [
        {
          text: "Xác Nhận",
          align: "start",
          sortable: false,
          value: "id",
        },
        
        { text: "Ngày Tạo", value: "modifiedDate" },
        { text: "Tổng đơn hàng", value: "total" },
        { text: "Địa Chỉ", value: "address" },
        ,
      ],
    };
  },
  computed: {
    // ...mapState([
    //   "cart"
    // ])
  },
  components: {
    NavabarAdmin,
  },
};
</script>

<style>

</style>