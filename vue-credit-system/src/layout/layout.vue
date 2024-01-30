<template>
    <el-container>
        <el-aside width="240px">
            <el-menu router class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" router>
                <!-- for循环菜单组件，传入每一个菜单项-->
                <asideMenu v-for="(menu, index) in menuList" :menu="menu" :key="index" />
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <!--//左侧面包屑-->
                <div class="left">
                    <Breadcrumb />
                </div>
                <!--//右侧用户名-->
                <div class="right">
                    <!--当下拉菜单点击时触发doCommand方法-->
                    <el-dropdown @command="doCommand">
                        <span class="el-dropdown-link"> {{ userName }} </span>
                        <el-dropdown-menu slot="dropdown">
                            <!--点击时触发doCommand方法并传入logout-->
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <!-- //放置一个路由出口 -->
                <router-view />

            </el-main>

        </el-container>
    </el-container>
</template> 

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import { logout } from "@/apis/user"
import asideMenu from "@/components/asideMenu.vue"
export default {
    components: {
        Breadcrumb,
        asideMenu
    },
    methods: {
        async doCommand(e) {
            if (e === "logout") {
                //logout接口，成功返回code为20000
                let res = await logout()
                console.log(res);
                if (res.data.code === 603) {
                    //如果成功跳转到login页面
                    localStorage.clear();
                }
            }
        }
    },
    computed: {
        userName() {
            return this.$store.state.userName
        },
        menuList() {
            return this.$store.state.menuList
        }
    }
}
</script>

<style scoped>
a:link {
    text-decoration: none;
    color: #fff;

}

/* 状态二: 已经访问过的链接 */
a:visited {
    text-decoration: none;
    color: #fff;
}

/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
    text-decoration: none;
    color: #fff;
}

/* 状态四: 被点击的链接 */
a:active {
    text-decoration: none;
    color: #fff;
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100vh;
}

.el-menu-vertical-demo {
    border: none;
}

.router-link-active {
    color: rgb(255, 208, 75) !important;
}
</style>