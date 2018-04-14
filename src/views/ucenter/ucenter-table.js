
export const columns1 = [
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: '编号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '微信昵称',
        align: 'center',
        key: 'nickName',
        width: 90,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '年龄',
        align: 'center',
        key: 'age',
        width: 150,
        editable: true
    },
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
    editInlineColumns: columns1,
/*
    editInlineData: searchTable1
*/
};

export default tableData;
