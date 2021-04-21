<template>
  <div>
    <v-toolbar color="#16a085" dark class="ma-4 mb-0">
      <span class="subheading">Quản lý đơn hàng</span>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <addProduct />

        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="product"
      :items-per-page="5"
      :search="search"
      class="elevation-1 ma-4 mt-0"
    >
      <template v-slot:[`item.Status`]="{ item }">
        <v-chip
          class="ma-2"
          :color="item.status === true ? '#2ecc71' : '#e74c3c'"
          text-color="white"
        >
          {{ item.status === true ? "public" : "private" }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              small
              class="mr-1"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Sửa</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="#e74c3c"
              small
              @click="deleteItem(item)"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
            >
              mdi-close
            </v-icon>
          </template>
          <span>Hủy Đơn</span>
        </v-tooltip>


         <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="#2ecc71"
              small
              @click="deleteItem(item)"
              dark
              v-bind="attrs"
              v-on="on"
              
            >
              mdi-check
            </v-icon>
          </template>
          <span>Xác Nhận</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import addProduct from "@/components/Admin/product/product.vue";
import { mapState } from "vuex";
export default {
  beforeCreate() {
    this.$store.dispatch("loadAllProduct");
  },

  data() {
    return {
      list: this.product,
      search: "",
      dialog: false,
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Tên Sản Phẩm",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Gía Đề Xuất(vnd)", value: "price" },
        { text: "Gía Đề Bán(vnd)", value: "deal" },
        { text: "Xếp Hạng(Sao)", value: "rating" },
        { text: "Trạng Thái", value: "Status" },
        { text: "Action", value: "actions" },
      ],
      desserts: this.product,
    };
  },
  components: {
    addProduct,
    ...mapState({
      product: (state) => state.product.product,
    }),
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),
  },
  methods: {
    editItem(item) {},
    deleteItem(item) {},
  },
};
</script>
<style>
</style>