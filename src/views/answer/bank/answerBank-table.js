import {formatDate32} from 'utils/date';
import {
    pageList
} from 'api/moudel/answer/bank/index';
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
        title: '问题图片',
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
                        src: params.row.img, style: 'width: 40px;height: 40px;text-align:center;border-radius: 2px;'
                    },
                    style: {}
                })
            ]);
        }
    },
    {
        title: '问题',
        align: 'center',
        key: 'problem',
        sortable: 'custom',
        width: 195,
        editable: true
    },
    {
        title: '答案',
        key: 'answer',
        sortable: 'custom',
        width: 150,
        align: 'center'
    },
    {
        title: '选项A',
        key: 'optionOne',
        sortable: 'custom',
        width: 150
    },
    {
        title: '选项B',
        align: 'center',
        key: 'optionTwo',
        sortable: 'custom',
        width: 150
    },
    {
        title: '选项C',
        align: 'center',
        key: 'optionThree',
        sortable: 'custom',
        width: 150
    },
    {
        title: '选项D',
        align: 'center',
        key: 'optionFour',
        sortable: 'custom',
        width: 150
    },
    {
        title: '题型',
        align: 'center',
        key: 'type',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            const color = row.type === 1 ? 'blue' : row.type === 0 ? 'green' : 'red';
            const text = row.type === 1 ? '识图' : row.type === 0 ? '文字' : 'Fail';
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        },
        filters: [
            {
                label: '识图',
                value: 1
            },
            {
                label: '文字',
                value: 0

            }
        ],
        filterMultiple: false,
        filterRemote (value, row, tttype) {
            this.$emit('listenToFitelEvent', value, row, '=');
        }
    },
    {
        title: '开放题',
        align: 'center',
        key: 'openState',
        sortable: 'custom',
        width: 150,
        render: (h, params) => {
            const row = params.row;
            const color = row.openState === 1 ? 'blue' : row.openState === 0 ? 'green' : 'red';
            const text = row.openState === 1 ? '开放' : row.openState === 0 ? '不开放' : 'Fail';
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                }
            }, text);
        }
    },
    {
        title: '操作',
        align: 'center',
        width: 190,
        key: 'handle',
        handle: ['delete']
    }
];

const tableData = {
    editInlineColumns: columns1
};

export default tableData;
