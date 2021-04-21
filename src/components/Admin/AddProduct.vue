<template>
  <v-dialog v-model="dialog" max-width="1200px">
                  <template v-slot:activator="{ on, attrs }">
                    <button
                    v-bind="attrs"
                    v-on="on"
                    >Thêm sản phẩm mới</button>
                    
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Tên sản phẩm"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.price"
                              label="Đơn Gía"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.soluong"
                              label="Số Lượng"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.xuatSu"
                              label="Xuất Sứ"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.nhasx"
                              label="Nhà Sản Xuất"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.pin"
                              label="Thời lượng pin"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.ram"
                              label="Bản RAM"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.chipSet"
                              label="chipSet"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.avatar"
                              label="ảnh đại diện"
                            ></v-text-field>
                          </v-col>
                           <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.thumnail"
                              label="ảnh thu nhỏ"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                           <v-select
                           :items="Categories"
                           item-text="name"
                           item-value="id"
                           v-model="id_category"
                           label="Loại sản phẩm"
                           
                           >

                           </v-select>
                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col>
                            <v-textarea
                            label="Miêu tả"
                            solo
                            v-model="editedItem.description"
                            >

                            </v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Hủy
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save()">
                        Lưu
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
</template>

<script>
export default {
  async created(){
    
  },
   

}
</script>

<style>

</style>