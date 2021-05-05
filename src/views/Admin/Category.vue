<template>
  <div>
    <v-toolbar color="#16a085" dark class="ma-4 mb-0">
      <span class="subheading">Quản danh mục</span>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
         
          hide-details
        ></v-text-field>
        
      <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> Thêm danh mục</v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-4"> {{formTitle}}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Tên danh mục"
                  v-model="name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" v-if="category_id!==1">
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
         
          <v-btn color="#3498db" @click="addCategory()">Lưu</v-btn>
          <v-btn color="#e74c3c" @click="cancel()">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="Categories"
      :items-per-page="5"
      :search="search"
      class="elevation-1 ma-4 mt-0"
        show-expand
       :expanded.sync="expanded"
       
    >
     <template v-slot:[`item.createdDate`]="{ item }">
       {{ convertDate(item.createdDate)}}
      </template>
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

      
      </template>
      <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
       


        <v-expansion-panels class="pt-2 pb-2">
    <v-expansion-panel
     
    >
      <v-expansion-panel-header>
        Danh sách danh mục con
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-data-table
       :headers="headers"
      :items="item.subCategory"
      :items-per-page="5"
      :search="search"
      class="elevation-1 ma-4 mt-0"
       >
         <template v-slot:[`item.createdDate`]="{ item }">
       {{ convertDate(item.createdDate)}}
      </template>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>


      </td>
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
      await this.$store.dispatch("LOAD_CATEGORY",1);
   
    this.$store.commit("CHANGE_LOADING", false);
  },

  data() {
    return {

      // ckeditor
         editor: ClassicEditor,
      description: "<p>Mô tả danh mục</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      // xử lý bảng product
     
    
      search: "",
    
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Tên danh mục",
          align: "start",
          sortable: false,
          value: "name",
        },
        
        { text: "Ngày Tạo", value: "createdDate" },
       
        { text: "Trạng Thái", value: "Status", sortable: false },
        { text: "Action", value: "actions" },
        { text: '', value: 'data-table-expand' }
      ],
      // xử lý edit sản danh mục.
      editedId: -1,
      dialog: false,

    
        id: '',
        category_id: "",
        name: "",
    };
  },
  components: {
   
    ckeditor: CKEditor.component,

  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
       providers: (state) => state.provider.provider,
       editProduct: (state) => state.product.editProduct,
    }),
    ...mapState(["loading","Categories","category"]),
    formTitle()
    {
      return this.editedId === -1 ? 'Thêm danh mục' : 'Chỉnh sửa danh mục'
    }
  },
  methods: {
    resetData()
    {
       this.id= '';
        this.category_id= "";
        this.name= "";
    },
      convertDate(date)
    {
      return new Date(date).toLocaleString();

    },

   //xử lý private ?? public danh mục???

    async deleteItem(item) {
      let message =
        item.status === true
          ? "Ngừng phát hành danh mục ?"
          : "Phát hành danh mục";

      this.$confirm(message, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.$store.commit("CHANGE_LOADING", true);
           await this.$store.dispatch("updateStatus", item.id);
          await this.$store.dispatch("LOAD_CATEGORY",1);
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
    
    //thêm category
      async addCategory() {
      if (
        this.category_id === "" ||
        this.name===""
      ) {
        this.$notify({
          title: "Warning",
          message: "Mọi thông tin cần được điền đầy đủ",
          type: "warning",
        });
      } else {
        try {
          this.$store.commit("CHANGE_LOADING", true);
        await this.$store.dispatch('saveCategory',{
          id: this.id,
          name: this.name,
          description: this.description,
          id_parent:{
            id: this.category_id
          }
        
        });
         await this.$store.dispatch("LOAD_CATEGORY",1);
   
         this.$notify({
            title: "Success",
            message: this.editedId===-1 ? "Thêm thành công" : "Cập Nhập Thành Công",
            type: "success",
          });
        } catch (error) {
           this.$notify({
          title: "Error",
          message: "Thêm danh mục thất bại",
          type: "error",
        });
        }
        finally{
          this.dialog = false;
           this.$store.commit("CHANGE_LOADING", false);
           resetData();
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
          this.category_id = "",
        this.editedId =-1;
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });   ;       
        });
    },

    // xử lý sửa sản phẩm
     async editItem(item) {
      this.$store.commit("CHANGE_LOADING", true);
       this.editedId = item.id;
       
       await this.$store.dispatch('loadCategory',item.id);
       console.log(this.editProduct);
       this.id =  item.id;
      this.name = this.category.name;
        this.description = this.category.description;      
  
      this.category_id=this.category.id_parent.id;
        
        
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
      
        
        
        this.deal ="";
        this.name="";
        

        
      }
       
    },

  },

};
</script>
<style>
</style>