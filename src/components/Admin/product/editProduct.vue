<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> add Product </v-btn>
      </template>

      <v-card>
        <v-card-title class="pa-4"> Thêm Sản Phẩm </v-card-title>
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
          <v-btn color="#3498db" @click="addProduct()">Thêm</v-btn>
          <v-btn color="#e74c3c" @click="cancel()">Hủy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState } from "vuex";

export default {
  async created() {
    if(this.id==='')
    {
      console.log("null ok");
    }
    this.$store.commit("CHANGE_LOADING", true);
    this.$store.commit("LOAD_CATEGORY");
    await this.$store.dispatch("loadAllProvider");
    this.$store.commit("CHANGE_LOADING", false);
  },
  data() {
    return {
      category_id: "",
      provider_id: "",
      avatar: null,
      name: "",
      price: "",
      deal: "",
      dialog: false,

      editor: ClassicEditor,
      description: "<p>Mô tả sản phẩm.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  components: {
    ckeditor: CKEditor.component,
  },
  computed: {
    ...mapState(["product", "Categories"]),
    ...mapState({
      providers: (state) => state.provider.provider,
      product: (state) => state.product.product,
    }),
  },
  methods: {
    async addProduct() {
      if (
        this.category_id === "" ||
        this.provider_id === "" ||
        this.price === "" ||
        this.deal === "" ||
        this.avatar === null
      ) {
        this.$notify({
          title: "Warning",
          message: "Mọi thông tin cần được điền đầy đủ",
          type: "warning",
        });
      } else {
        
        this.$store.commit("CHANGE_LOADING", true);
        var product = {
          name: this.name,
          deal: this.deal,
          Price: this.price,
          description: this.description,
        };

        var formData = new FormData();
        formData.append("file", this.avatar);
        formData.append("product", JSON.stringify(product));
        var data = {
          formData: formData,
          category_id: this.category_id,
          provider_id: this.provider_id,
        };
      
        try {
          await this.$store.dispatch("addProduct", data);
          this.$store.dispatch("loadAllProduct");

          this.$notify({
            title: "Success",
            message: "Thêm thành công",
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
          this.category_id = "";
        this.provider_id ='';
        this.price ='';
        this.deal ='';
        this.avatar =null;
        this.dialog = false;

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: 'Delete canceled'
          // });          
        });
    },
    props:{
      id: '',
    }
  },
};
</script>

<style>
</style>