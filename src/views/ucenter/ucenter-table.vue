<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <div>
        <Row :gutter="10">
            <Col >
                <Card>
                    <p slot="title">
                        <Icon type="pinpoint"></Icon>
                        一个条件搜索
                    </p>
                    <Row>
                        <Col span="8">
                            <Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入编号搜索..." style="width: 200px" />

                        </Col>
                        <Col span="2" offset="14">
                            <Button justify="right" type="primary"  icon="ios-search"  @click="openModal">添加</Button>
                        </Col>
                        <Modal v-model="modal2" width="360">
                            <modal2></modal2>
                            <div slot="footer">
                                <Button type="error" size="large" >Delete</Button>
                            </div>
                        </Modal>
                    </Row>

                    <Row class="margin-top-10 searchable-table-con1">
                        <div class="edittable-table-height-con">
                            <can-edit-table refs="table2" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>
                        </div>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="100" :current="1" @on-change="changePage"></Page>
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
    import canEditTable from '../tables/components/canEditTable.vue';
    import tableData from './ucenter-table';
    import modal2 from './ucenter-add.vue';

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
                modal2:this.modal2
            };
        },
        methods: {
            openModal: function () {
                this.modal2 = true;
            },
            getData () {
                this.editInlineColumns = tableData.editInlineColumns;
                this.editInlineData = this.initTable1 = tableData.editInlineData;
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
            changePage () {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.editInlineData = tableData.editInlineData;
            }

        },
        created () {
            this.getData();
        },

    };
</script>
