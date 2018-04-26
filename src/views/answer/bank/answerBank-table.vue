<style lang="less">
    @import "../../../styles/common.less";
</style>
<template>
    <div>
        <Row :gutter="10">
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="pinpoint"></Icon>
                        条件搜索
                    </p>
                    <Row>
                        <Col span="8">
                            <Input v-model="searchConName1" icon="search" @on-change="handleSearch1"
                                   placeholder="请输入编号搜索..." style="width: 200px"/>

                        </Col>
                        <Col span="2" offset="14">
                            <Button justify="right" type="primary" icon="ios-search" @click="openModal">添加</Button>
                        </Col>
                        <Modal v-model="modal2" width="360">
                            <modal2 ref="modal2"></modal2>
                            <div slot="footer">
                                <!--
                                                                <Button type="success" size="large" @click="saveData">保存</Button>
                                -->
                            </div>
                        </Modal>
                    </Row>

                    <Row class="margin-top-10 searchable-table-con1">
                        <div class="edittable-table-height-con">

                            <can-edit-table refs="canEditTable" v-model="editInlineData"
                                            :columns-list="editInlineColumns"
                                            v-on:listenToChildEvent="sortChange"
                                            v-on:listenToFitelEvent="fitelChange"
                                            v-on:listenToDelectEvent="delect"
                                            v-on:listenToEditEvent="updateChage"
                            ></can-edit-table>

                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="totalCount" :page-size="listQuery.size" :current="listQuery.current"
                                      @on-change="changePage"></Page>
                            </div>
                        </div>
                        <!--
                                                <Table :columns="columns1" :data="data1"></Table>
                        -->
                    </Row>
                </Card>
            </Col>
        </Row>

    </div>
</template>
<script>
    import canEditTable from './edit/canEditTable.vue';
    import tableData from './answerBank-table';
    import modal2 from './add/answerBank-add.vue';

    import {
        pageList,
        delObj,
        putObj
    } from 'api/moudel/answer/bank/index';

    export default {
        name: 'searchable-table',
        components: {
            canEditTable,
            modal2
        },
        data () {
            return {
                searchConName1: '',
                editInlineColumns: [],
                editInlineData: [],
                initTable1: [],
                form: [],
                modal2: this.modal2,
                total: null,
                listQuery: {
                    size: 20, // 条数
                    current: 1, // 查询页
                    type: 'system_creat_time desc', // 排序
                    whereType: {
                        onOff: false,
                        data: {
                            key: 0,
                            val: 0,
                            type: 0
                        }
                    } // 条件筛选
                },
                totalCount: 0
            };
        },
        methods: {
            openModal: function () {
                this.modal2 = true;
            },
            getData () {
                this.editInlineColumns = tableData.editInlineColumns;
            },
            getList () {
                pageList(this.listQuery)
                    .then(response => {
                        this.editInlineData = this.initTable1 = response.object.records;
                        this.totalCount = response.object.total;
                    });
            },
            delObj (obj) {
                delObj(obj)
                    .then(response => {
                    });
            },
            search (data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch1 () {
                this.editInlineData = this.initTable1;
                this.editInlineData = this.search(this.editInlineData, {nickName: this.searchConName1});
            },
            changePage (index) {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数
                this.loading = true;
                this.listQuery.current = index;
                this.getList();
            },
            sortChange: function (data) {
                this.listQuery.type = data.key.replace(/([A-Z])/g, '_$1').toLowerCase() + '  ' + data.order;
                this.getList();
            },
            fitelChange: function (value, key, type) {
                if (value[0] === undefined) {
                    this.listQuery.whereType.onOff = false;
                    this.getList();
                } else {
                    this.listQuery.whereType.onOff = true;
                    this.listQuery.whereType.data.key = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                    this.listQuery.whereType.data.val = value[0];
                    this.listQuery.whereType.data.type = type;
                    this.getList();
                }
            },
            delect: function (data) {
                this.delObj(data);
            },
            updateChage: function (data) {
                putObj(data.id, data)
                    .then(response => {
                    });
            }
        },
        created () {
            this.getData();
            this.getList();
        }

    };
</script>
