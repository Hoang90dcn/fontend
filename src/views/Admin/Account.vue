<template>
  <div>
    <v-toolbar color="#16a085" dark class="ma-4 mb-0">
      <span class="subheading">Quản lý sản phẩm</span>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-dialog v-model="dialog" width="1000">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> </v-btn>
          </template>

          <v-card>
            <v-card-title class="pa-4">Phân quyền user</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="3" sm="3"
                  v-for="item in roles"
                  :key="item.id"
                  >
                    
                    <v-checkbox
                      color="#74b9ff"
                      v-model="selected"
                      :label="item.name"
                      :value="item"
                    ></v-checkbox>
                    
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn color="#3498db" @click="update(item)">Cập Nhật</v-btn>
              <v-btn color="#e74c3c" @click="cancel()">Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>
    <v-simple-table>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Họ tên</th>
              <th class="text-left">Email</th>
              <th class="text-left">Số điện thoại</th>
              <th class="text-left">Trạng Thái</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.fullname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <v-chip
                  class="ma-2"
                  :color="item.status === true ? '#2ecc71' : '#e74c3c'"
                  text-color="white"
                >
                  {{ item.status === true ? "Hoạt động" : "Chặn" }}
                </v-chip>
              </td>
              <td>
                <span v-if="item.status">
                  <v-tooltip top>
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
                    <span>Chặn</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="#2ecc71"
                        small
                        @click="phanQuyen(item)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        class="mr-4"
                      >
                        mdi-account-alert-outline
                      </v-icon>
                    </template>
                    <span>Phân Quyền</span>
                  </v-tooltip>
                </span>

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
                  <span>Bỏ chặn</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-simple-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  async beforeCreate() {
    
  },
  async created(){
    this.$store.commit("CHANGE_LOADING", true);
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getAllRoles");
    this.$store.commit("CHANGE_LOADING", false);

  },

  data() {
    return {
      dialog: false,
      checkbox: true,
      selected: [],
      userEdit: '',
    };
  },

  computed: {
    ...mapState(["users","roles"]),
  },
  methods: {
    async deleteItem(item) {
      this.$store.commit("CHANGE_LOADING", true);
      await this.$store.dispatch("updateStatusUser", item.id);
      await this.$store.dispatch("getAllUsers");
      this.$store.commit("CHANGE_LOADING", false);
    },
    phanQuyen(item) {
      this.dialog = true;
      this.selected= item.roles;
      this.userEdit = item;

    },
    cancel()
    {
      this.dialog = false;
    },
    async update(item)
    {
      this.userEdit.roles = this.selected;
       this.$store.commit("CHANGE_LOADING", true);
      await  this.$store.dispatch("updateRoles",this.userEdit)
      await this.$store.dispatch("getAllUsers");
      this.dialog=false;
      this.$store.commit("CHANGE_LOADING", false);
     
      
     
      console.log(this.userEdit);
    }
  },
};
</script>
<style>
</style>