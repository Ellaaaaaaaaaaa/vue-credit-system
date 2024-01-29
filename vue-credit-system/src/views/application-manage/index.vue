<template>
    <div id="application-manage">

        <el-row>
            <el-col :span="22">
                <!--这个属性接收名称，下面统一定义 -->
                <el-input placeholder="请输入名称" type="text" v-model="query"></el-input>
            </el-col>
            <el-col :span="2">
                <!-- 按钮事件也是下面统一定义 -->
                <el-button type="primary" @click="setQueryName">搜索</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" id="gbox" :useIndex="true" :stripe="true" :border="true" :fit="true"
            :useMultiSelect="false">
            <!--第一列序号-->
            <el-table-column type="index" label="序号" width="55" align="center">
            </el-table-column>
            <el-table-column v-for="(col, index) in columns" :key="index" :label="col.label" :prop="col.prop"
                :width="col.width">
                <!-- 默认插槽  column是所有列信息，row是当前行信息-->
                <template v-slot="{ column, row }">
                    <!-- 如果列的prop的值为status-->
                    <div v-if="column.property === 'status'">
                        <!-- 使用两个过滤器来格式化方法，因为后端返回的申请状态是0到7 -->
                        <el-tag :type="row[column.property] | statusColor">{{ row[column.property] | status }}
                        </el-tag>
                    </div>

                    <div v-else>
                        {{ row[column.property] }}
                    </div>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
import { getLoanList } from '@/apis/loan.js'
export default {
    filters: {
        statusColor(status) {
            switch (status) {
                case 0:
                    return 'success'
                case 1:
                    return ''
                case 2:
                    return 'success'
                case 3:
                    return 'danger'
                case 4:
                    return 'warning'
                case 5:
                    return 'success'
                case 6:
                    return 'danger'
                case 7:
                    return 'success'
                default:
                    return 'danger'

            }
        },
        status(status) {
            switch (status) {
                case 0:
                    return '进件'
                case 1:
                    return '提交初审'
                case 2:
                    return '初审通过'
                case 3:
                    return '初审拒绝'
                case 4:
                    return '提交终审'
                case 5:
                    return '终审通过'
                case 6:
                    return '终审拒绝'
                case 7:
                    return '生成合同'
                default:
                    return '出错了'
            }
        }

    },
    data() {
        return {
            query: '',
            tableData: [],
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "80",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "160",
                },
                {
                    label: "性别",
                    prop: "sex",
                },
                {
                    label: "教育程度",
                    prop: "education",
                },
                {
                    label: "居住地址",
                    prop: "address1",
                },
                {
                    label: "手机号",
                    prop: "mobile_phone",
                },
                {
                    label: "申请状态",
                    prop: "status",
                },
                {
                    label: "操作",
                    width: "280",
                    prop: "opts",
                },
            ],
            pageOptions: {
                pageNo: 1,
                pageSize: 10
            },
            rows: 0
        }
    },
    methods: {
        getBirthday(date) {
            let dateNow = new Date(date);
            function convert(data) {
                return data < 10 ? "0" + data : data;
            }
            let year = dateNow.getFullYear();
            let month = convert(dateNow.getMonth());
            let day = convert(dateNow.getDate());

            let hours = convert(dateNow.getHours());
            let minutes = convert(dateNow.getMinutes());
            let seconds = convert(dateNow.getSeconds());
            let dateStr =
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;
            return dateStr;
        },
        getSex(str) {
            return str === "man" ? "男" : "女";
        },
        getEducation(str) {
            return str === "college" ? "大学" : "高中";
        },

        async setQueryName() {

        },
        async getLoanList() {
            let res = await getLoanList(this.pageOptions)
            if (res.data.code === 20000) {
                //对数据格式化
                this.tableData = res.data.data.data.data.map(item => {
                    item.birthday = this.getBirthday(item.birthday);
                    item.sex = this.getSex(item.sex);
                    item.education = this.getEducation(item.education);
                    return item;
                })

                this.rows = res.data.data.rows
            }
        }
    },
    mounted() {
        this.getLoanList();
    }
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 10px;
}
</style>