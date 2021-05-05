import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import ListProduct from '../views/ListProduct.vue'
import cart from '../views/Cart.vue'
import CheckOut from '../views/CheckOut.vue'
import HomeAdmin from '../views/Admin/HomeAdmin.vue'
import Product from '../views/Admin/Product.vue'
import Categories from '../components/Admin/Categories/AddCategories.vue'
import index from '../views/index.vue'
import FooterAdmin from '../components/Admin/FooterAdmin.vue'
import Footer from '../components/ComFooter.vue'
import loginTest from '../components/loginTest.vue'
import Header from '../components/ComHeader.vue'
import HeaderAdmin from '../components/Admin/HeaderAdmin.vue'
import CartAdmin from '../views/Admin/Cart.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import ManageCategories from '../views/Admin/Category.vue'
import Account from '../views/Admin/Account.vue'
import { Message } from 'element-ui'
import { store } from '../store/store'
Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Home',
        components: {
            default: index,
            'view-footer': Footer,
            'view-header': Header,
        },
        children: [{
                path: '',
                name: 'Home',
                component: Home // trang chủ
            },
            {
                path: 'detail/:id',
                name: 'Detail', // trang detail
                component: Detail
            },
            {
                path: '/about',
                name: 'About',

                component: function() {
                    return import ( /* webpackChunkName: "about" */ '../views/About.vue')
                }
            },
            {
                path: '/list/:type/:key/:page',
                name: 'ListProduct',
                component: ListProduct
            },
            {
                path: '/cart',
                name: 'cart',
                component: cart
            },
            {
                path: '/Check-Out',
                name: 'CheckOut',
                component: CheckOut
            },
        ]
    },


    // các url của admin  
    {
        path: '/admin',
        name: 'HomeAdmin',
        components: {
            default: HomeAdmin,
            'view-footer': FooterAdmin,
            'view-header': HeaderAdmin,
        },
        //meta: { requiresAuth: true, permission: true },
        children: [{
                path: '',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'product',
                name: 'Product',
                component: Product,

            },
            {
                path: 'admin/categories',
                name: 'Categories',
                component: Categories
            },
            {
                path: 'manager-cart',
                name: 'CartAdmin',
                component: CartAdmin
            },
            {
                path: 'manager-categories',
                name: 'ManageCategories',
                component: ManageCategories
            },
            //Account
            {
                path: 'manager-account',
                name: 'ManageAccount',
                component: Account
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: loginTest
    }




]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {

//         if (!store.state.user.token) {
//             // next({
//             //     path: '/login',
//             //     query: { redirect: to.fullPath }
//             // })
//             Message.error("Bạn cần phải đăng nhập");
//             next({
//                 path: '/',
//                 query: { redirect: to.fullPath }
//             })

//         } else {


//             if (to.matched.some(record => record.meta.permission)) {
//                 console.log("cos roles")
//                 if (!store.state.user.roles.includes("manager")) {
//                     Message.error("Ban ko co quyen");
//                 } else {
//                     console.log("ok")
//                     next()
//                 }
//             } else {
//                 console.log("no roles")
//                 next()
//             }

//         }
//     } else {
//         next()
//     }
// })

export default router