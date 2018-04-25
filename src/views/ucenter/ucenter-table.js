import {formatDate32} from 'utils/date';
import {
    pageList
} from 'api/moudel/ucenter/index';
export const columns1 = [
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: 'ID',
        key: 'id',
        sortable: 'custom',
        width: 80,
        align: 'center'
    },
    {
        title: '编号',
        key: 'userNumber',
        sortable: 'custom',
        width: 100,
        align: 'center'
    },
    {
        title: '微信头像',
        align: 'center',
        key: 'userHead',
        width: 90,
        render: (h, params) => {
            return h('div', {
                attrs: {
                    style: 'width: 40px;height: 40px;padding-left:5px;'
                }
            }, [
                h('img', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    attrs: {
                        src: params.row.userHead, style: 'width: 40px;height: 40px;text-align:center;border-radius: 2px;'
                    },
                    style: {}
                })
            ]);
        }
    },
    {
        title: '微信昵称',
        align: 'center',
        key: 'nickName',
        sortable: 'custom',
        width: 200,
        editable: true
    },
    {
        title: '手机号',
        key: 'phone',
        sortable: 'custom',
        width: 150,
        align: 'center'
    },
    {
        title: '登陆状态',
        key: 'loginStatus',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            const color = row.loginStatus === 1 ? 'blue' : row.loginStatus === 0 ? 'green' : 'red';
            const text = row.loginStatus === 1 ? 'Working' : row.loginStatus === 0 ? 'Success' : 'Fail';
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            const color = row.sex === '1' ? 'blue' : row.sex === '2' ? 'green' : row.sex === '男' ? 'blue' : row.sex === '女' ? 'green' : 'red';
            const text = row.sex === '1' ? '男' : row.sex === '2' ? '女' : row.sex === '男' ? '男' : row.sex === '女' ? '女' : row.sex;
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        },
        filters: [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 2

            }
        ],
        filterMultiple: false,
        filterRemote (value, row, tttype) {
            this.$emit('listenToFitelEvent', value, row, '=');
        }
    },
    {
        title: '注册时间',
        align: 'center',
        key: 'createDate',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            let date = new Date(row.createDate);
            return formatDate32(
                date, 'yyyy-MM-dd hh:mm'
            );
        }
    },
    {
        title: '认证状态',
        align: 'center',
        key: 'authType',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            const color = row.authType === 0 ? 'gray' : row.authType === 3 ? 'green' : row.authType === 4 ? 'blue' : row.authType === 6 ? 'yellow' : 'red';
            const text = row.authType === 0 ? '未认证' : row.authType === 3 ? '设计师' : row.authType === 4 ? '工人' : row.authType === 6 ? '材料商' : row.authType;
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        },
        filters: [
            {
                label: '材料商',
                value: 6
            },
            {
                label: '工人',
                value: 4

            },
            {
                label: '设计师',
                value: 3

            }
        ],
        filterMultiple: false,
        filterRemote (value, row, tttype) {
            this.$emit('listenToFitelEvent', value, row, '=');
        }},
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const searchTable1 = [
    {
        nickName: 'AAA',
        sex: '男',
        age: '18'
    },
    {
        nickName: 'CCC',
        sex: '男',
        age: '18'
    },
    {
        nickName: 'DDD',
        sex: '男',
        age: '18'
    },
    {
        nickName: 'EEE',
        sex: '男',
        age: '18'
    }
];
const tableData = {
    editInlineColumns: columns1
    /*
        editInlineData: searchTable1
    */
};

export default tableData;
