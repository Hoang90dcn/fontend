<template>
  <div>
    <v-toolbar color="#16a085" dark class="ma-4 mb-0">
      <span class="subheading">Quản lý sản phẩm</span>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-text-field
          
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field> -->
        <!-- <addProduct idEdit=''/> -->

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
          <span>Chặn</span>
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
import {} from ''
export default {
  async beforeCreate() {
    this.$store.dispatch("getAllUsers");
  },

  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Họ tên",
          align: "start",
          sortable: false,
          value: "fullname",
        },
        { text: "Email", value: "email", sortable: false },
        { text: "Số điện thoại", value: "phone", sortable: false },
        // { text: "Quyền quản trị", value: "rating" },
        // { text: "Trạng Thái", value: "status", sortable: false },
        // { text: "Action", value: "actions" },
      ],
    };
  },

  computed: {
    ...mapState(["users"]),
  },
  methods:{
    deleteItem(item)
    {

    }
  }
};
</script>
<style>
</style>