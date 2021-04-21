<template>
  <div>
    <v-toolbar color="#16a085" dark class="ma-4 mb-0">
      <span class="subheading">Quản lý sản phẩm</span>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <!-- <addProduct idEdit=''/> -->
         <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> add Product </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-4"> {{formTitle}}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Tên sản phẩm*"
                  v-model="name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="category_id"
                  :items="Categories"
                  :hint="`${category_id.name}, ${category_id.id}`"
                  menu-props="auto"
                  label="Danh Mục Sản Phẩm"
                  hide-details
                  item-text="name"
                  item-value="id"
                 
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="provider_id"
                  :hint="`${provider_id.name}, ${provider_id.id}`"
                  :items="providers"
                  menu-props="auto"
                  label="Nhà Cung Cấp"
                  hide-details
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Gía đề xuất (vnđ)*"
                  v-model="deal"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Gía bán (vnđ)*"
                  v-model="price"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-file-input
                  counter
                  show-size
                  truncate-length="15"
                  label="Avatar"
                  v-model="avatar"
                ></v-file-input>
              </v-col>

              <v-col cols="12" sm="12">
                <label for="description">Mô tả sản phẩm</label>
                <ckeditor
                  :editor="editor"
                  v-model="description"
                  :config="editorConfig"
                  id="description"
                ></ckeditor>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#2ecc71" @click="dialog = false">Xem Trước </v-btn>
          <v-btn color="#3498db" @click="addProduct()">Lưu</v-btn>
          <v-btn color="#e74c3c" @click="cancel()">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="product"
      :items-per-page="5"
      :search="search"
      class="elevation-1 ma-4 mt-0"
      show-select
      :single-select="singleSelect"
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
              class="mr-4"
              @click=" editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Sửa</span>
        </v-tooltip>

        <v-tooltip top v-if="item.status">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="#e74c3c"
              small
              @click="deleteItem(item)"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-4"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Private</span>
        </v-tooltip>

        <v-tooltip top v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="#2ecc71"
              small
              @click="deleteItem(item)"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-4"
            >
              mdi-check
            </v-icon>
          </template>
          <span>Public</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import addProduct from "@/components/Admin/product/product.vue";
import { mapState } from "vuex";
export default {
 async beforeCreate() {
    
    this.$store.commit("CHANGE_LOADING", true);
    this.$store.commit("LOAD_CATEGORY");
    this.$store.dispatch("loadAllProduct");
    await this.$store.dispatch("loadAllProvider");
    this.$store.commit("CHANGE_LOADING", false);
  },

  data() {
    return {

      // ckeditor
         editor: ClassicEditor,
      description: "<p>Mô tả sản phẩm.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      // xử lý bảng product
      singleSelect: false,
      selected: [],
      list: this.product,
      search: "",
    
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
        { text: "Trạng Thái", value: "Status", sortable: false },
        { text: "Action", value: "actions" },
      ],
      // xử lý edit sản phẩm.
      editedId: -1,
      dialog: false,

      // các thông tin về sản phẩm
      id: '',
       category_id: "",
      provider_id: "",
      avatar: null,
      name: "",
      price: "",
      deal: "",
      //
    };
  },
  components: {
    // addProduct,
    ckeditor: CKEditor.component,

  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
       providers: (state) => state.provider.provider,
       editProduct: (state) => state.product.editProduct,
    }),
    ...mapState(["loading","Categories"]),
    formTitle()
    {
      return this.editedId === -1 ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'
    }
  },
  methods: {

   //xử lý private ?? public sản phẩm???

    async deleteItem(item) {
      let message =
        item.status === true
          ? "Ngừng phát hành lại sản phẩm ?"
          : "Phát hành lại sản phẩm ?";

      this.$confirm(message, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.$store.commit("CHANGE_LOADING", true);
          await this.$store.dispatch("deleteProduct", item.id);
          await this.$store.dispatch("loadAllProduct");
          console.log(item.id);
          this.$message({
            type: "success",
            message: "Xóa Thành Công!!",
          });
          this.$store.commit("CHANGE_LOADING", false);
        })
        .catch(() => {
         
          this.$store.commit("CHANGE_LOADING", false);
        });
    },
    
    //thêm sản phẩm
      async addProduct() {
      if (
        this.category_id === "" ||
        this.provider_id === "" ||
        this.price === "" ||
        this.deal === "" ||
        // this.avatar === null||
        this.name===""
      ) {
        this.$notify({
          title: "Warning",
          message: "Mọi thông tin cần được điền đầy đủ",
          type: "warning",
        });
      } else {
        
        this.$store.commit("CHANGE_LOADING", true);
        var product ;
     
        if( this.editedId===-1)
        {
          product = {
          name: this.name,
          deal: this.deal,
          Price: this.price,
          description: this.description,
          };
        }
        else{
          product = {
          id: this.editedId,
          name: this.name,
          deal: this.deal,
          Price: this.price,
          description: this.description,
         };
        }
      
        var formData = new FormData();
        formData.append("file", this.avatar);
        formData.append("product", JSON.stringify(product));
        var data = {
          formData: formData,
          category_id: this.category_id,
          provider_id: this.provider_id,
        };
      console.log(product);
        try {
          await this.$store.dispatch("addProduct", data);
          this.$store.dispatch("loadAllProduct");

          this.$notify({
            title: "Success",
            message: this.editedId===-1 ? "Thêm thành công" : "Cập Nhập Thành Công",
            type: "success",
          });
          
        } catch (error) {
          console.log(error);
          this.$notify({
            title: "Success",
            message: "Thêm thất bại",
            type: "error",
          });
        } finally {
        this.category_id = "";
        this.provider_id ='';
        this.price ='';
        this.deal ='';
        this.avatar =null;
        this.dialog = false;
        this.dialog = false;
        this.$store.commit("CHANGE_LOADING", false);
        }
      }
    },
    cancel()
    {
      
        this.$confirm('Bạn có chắc muốn hủy ?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
           this.dialog = false;
          this.category_id = "";
        this.provider_id ="";
        this.price ="";
        this.deal ="";
        this.avatar =null;
        this.name="";
       
        this.editedId =-1;
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });          
        });
    },

    // xử lý sửa sản phẩm
     async editItem(item) {
         this.$store.commit("CHANGE_LOADING", true);
       this.editedId = item.id;
       
       await this.$store.dispatch('loadDetailProduct',item.id);
       console.log(this.editProduct);
        this.name = this.editProduct.name;
        this.deal = this.editProduct.deal;
        this.price = this.editProduct.price;
        this.description = this.editProduct.description;
           this.category_id=this.editProduct.categories.id;      
           this.provider_id = this.editProduct.provider.id,
          
        this.$store.commit("CHANGE_LOADING", false);
        this.dialog = true;
        

     },
    
  },
  watch:{
    dialog(val)
    {
      if(!val)
      {
        this.editedId =-1;
        this.category_id = "";
        this.provider_id ="";
        this.price ="";
        this.deal ="";
        this.name="";
        this.avatar =null;
        
      }
       
    },

  },

};
</script>
<style>
</style>