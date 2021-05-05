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
       
        <v-dialog v-model="dialog" width="920">
        

          <v-card>
            <v-card-title class="pa-4">Chi Tiết đơn hàng</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4" class="col">
                    Họ Tên Khách Hàng: {{ editItem.user.fullname }}
                  </v-col>
                  <v-col cols="8">
                    Địa chỉ: {{ editItem.address }}
                  </v-col>
                </v-row>
                 <v-row>
                  <v-col cols="4" class="col">
                    Số điện thoại: {{ editItem.user.phone }}
                  </v-col>
                  <v-col cols="4">
                    Trạng thái:  <span v-if="editItem.status">
          <v-chip
           
            :color="editItem.confirm === true ? '#2ecc71' : '#e74c3c'"
            text-color="white"
          >
            {{ editItem.confirm === true ? "Đã xác nhận" : "Chưa xác nhận" }}
          </v-chip>
        </span>
                  </v-col>
                   <v-col cols="4" class="col">
                  Tổng đơn hàng: {{formatMoney( editItem.total)}}
                  </v-col>
                </v-row>
              
                <v-row>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Tên Sản Phẩm</th>
                          <th lass="text-left">Image</th>
                          <th lass="text-left">Số lượng</th>
                          <th class="text-left">Gía</th>
                           <th class="text-left">Thành Tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in editItem.listDetailOders"
                          :key="item.producst"
                        >
                          <td>
                            {{ item.producst.name }}
                          </td>
                          <td>
                            <v-img
                              :lazy-src="'http://localhost:9000/files/'+item.producst.avatar"
                              :src="'http://localhost:9000/files/'+item.producst.avatar"
                              max-height="100"
                              max-width="100"
                            >
                              <template v-slot:placeholder>
                                <v-row
                                  class="fill-height ma-0"
                                  align="center"
                                  justify="center"
                                >
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </td>
                          <td>{{ item.amount}}</td>
                          <td>{{formatMoney(item.price)}}</td>
                          <td>{{thanhTien(item)}}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-row>
                
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#e74c3c" @click="cancel()">Quay lại</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="cart.listCart"
      :items-per-page="5"
      :search="search"
      class="elevation-1 ma-4 mt-0"
    >
      <template v-slot:[`item.confirm`]="{ item }">
        <span v-if="item.status">
          <v-chip
            class="ma-2"
            :color="item.confirm === true ? '#2ecc71' : '#e74c3c'"
            text-color="white"
          >
            {{ item.confirm === true ? "Đã xác nhận" : "Chưa xác nhận" }}
          </v-chip>
        </span>
        <span v-else>
          <v-chip class="ma-2" color="#e74c3c" text-color="white">
            Đã Hủy
          </v-chip>
        </span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <span v-if="item.status">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="edit(item)"
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
                @click="cancelCart(item)"
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
        </span>
        <v-tooltip top v-if="!item.confirm">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="#2ecc71"
              small
              @click="Confirm(item)"
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
  async beforeCreate() {
    this.$store.commit("CHANGE_LOADING", true);
    await this.$store.dispatch("getAllCart");
    this.$store.commit("CHANGE_LOADING", false);
  },

  data() {
    return {
      dialog: false,
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
          text: "Tên khách hàng",
          align: "start",
          sortable: false,
          value: "user.fullname",
        },
        { text: "Tổng đơn Hàng(vnd)", value: "total", align: "center" },
        { text: "Địa Chỉ", value: "address", align: "center" },
        { text: "Xác Nhận", value: "confirm", align: "center" },
        // { text: "Trạng Thái", value: "Status" ,  align: "center",},
        { text: "Action", value: "actions", align: "center" },
      ],
      editItem: {
        total: "",
        confirm: "",
        address: "",
        user: {
          fullname: "",
          phone: "",
        },
        listDetailOders: [
          {
            producst: {
              createdDate: 1615778654375,
              modifiedBy: null,
              modifiedDate: 1615778654218,
              status: true,
              name: "",
              description: "a",
              avatar: "products/15_Mar_2021_10_24_14_1.jpg",
              price: 220000,
            },
            amount: 3,
            price: 220000,
          },
        ],
      },
    };
  },
  components: {
    addProduct,
    ...mapState({
      product: (state) => state.product.product,
    }),
    ...mapState([]),
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart,
    }),
  },
  methods: {
    formatMoney(money)
    {
      return (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money))
    },
    thanhTien(item)
    {
      return this.formatMoney(item.amount * item.price);
    },
    async Confirm(item) {
      console.log(item);

      this.$store.commit("CHANGE_LOADING", true);

      await this.$store.dispatch("confirm", item.id);
      await this.$store.dispatch("getAllCart");
      this.$store.commit("CHANGE_LOADING", false);
    },

    edit(item) {
      this.dialog = true;
      this.editItem = item;
    },
    async cancelCart(item) {
      this.$confirm("Bạn có chắc muốn hủy đơn hàng ?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.$store.commit("CHANGE_LOADING", true);
          await this.$store.dispatch("cancelCart", item.id);
          await this.$store.dispatch("getAllCart");
          this.$store.commit("CHANGE_LOADING", false);
          this.$notify({
            title: "Success",
            message: "Xóa thành công !!!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    cancel() {
      this.dialog = false;
    },
  },
};
</script>
<style>
</style>