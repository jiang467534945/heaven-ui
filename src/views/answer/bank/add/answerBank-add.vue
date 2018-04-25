<style lang="less">
    @import 'upload.less';
</style>
<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
        <FormItem label="问题内容" prop="problem">
            <Input v-model="formValidate.problem" placeholder="请输入问题内容"></Input>
        </FormItem>
        <FormItem label="问题答案" prop="answer">
            <Select v-model="formValidate.answer" placeholder="请选择答案">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
            </Select>
        </FormItem>
        <FormItem label="问题题型" prop="type">
            <Select v-model="formValidate.type" placeholder="请选择题型">
                <Option value="0">文字</Option>
                <Option value="1">识图</Option>
            </Select>
        </FormItem>
        <FormItem label="选项A" prop="optionOne">
            <Input v-model="formValidate.optionOne" placeholder="请输入选项A内容"></Input>
        </FormItem>
        <FormItem label="选项B" prop="optionTwo">
            <Input v-model="formValidate.optionTwo" placeholder="请输入选项B内容"></Input>
        </FormItem>
        <FormItem label="选项C" prop="optionThree">
            <Input v-model="formValidate.optionThree" placeholder="请输入选项C内容"></Input>
        </FormItem>
        <FormItem label="选项D" prop="optionFour">
            <Input v-model="formValidate.optionFour" placeholder="请输入选项D内容"></Input>
        </FormItem>
        <FormItem label="是否开放" prop="openState">
            <RadioGroup v-model="formValidate.openState">
                <Radio label="1">开放</Radio>
                <Radio label="0">不开放</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="请点击选择图片">
            <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess2"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError2"
                    :on-exceeded-size="handleMaxSize"
                    multiple
                    type="drag"
                    :action="aliyunAction"
                    :data="aliyunDate"
                    style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <div class="height-150px">
                <div class="admin-upload-list">
                    <template>
                        <img :src="uploadList.url">
                    </template>

                </div>
            </div>
            <Input v-model="formValidate.img" v-show="visible"></Input>

        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>

</template>

<script>
    import {
        ossToken
    } from 'api/moudel/oss/index';
    import {
        addObj
    } from 'api/moudel/answer/bank/index';

    export default {
        data () {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                visible: false,
                formValidate: {
                    problem: '',
                    answer: '',
                    optionOne: '',
                    optionTwo: '',
                    optionThree: '',
                    optionFour: '',
                    openState: '',
                    img: '',
                    type: ''
                },
                aliyunDate: {
                    key: '',
                    policy: '',
                    OSSAccessKeyId: '',
                    success_action_status: '',
                    callback: '',
                    signature: ''
                },
                uploadList: {
                    name: '',
                    url: ''
                },
                imgfurl: '',
                imgName: '',
                aliyunAction: 'http://huizhuangfang.oss-cn-beijing.aliyuncs.com',
                ruleValidate: {
                    problem: [
                        {required: true, message: '问题内容不允许为空', trigger: 'blur'}
                    ],
                    answer: [
                        {required: true, message: '问题答案不允许为空', trigger: 'blur'}
                    ],
                    optionOne: [
                        {required: true, message: '答案选项A不允许为空', trigger: 'change'}
                    ],
                    optionTwo: [
                        {required: true, message: '答案选项B不允许为空', trigger: 'change'}
                    ],
                    optionThree: [
                        {required: true, message: '答案选项C不允许为空', trigger: 'change'}
                    ],
                    optionFour: [
                        {required: true, message: '答案选项D不允许为空', trigger: 'change'}
                    ],
                    openState: [
                        {required: true, message: '题型不允许为空', trigger: 'change'}
                    ],
                    state: [
                        {required: true, message: '是否开放答案不允许为空', trigger: 'change'}
                    ],
                    img: [
                        {required: true, message: '图片不允许为空', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {

            // 随机生成文件名
            random_string (len) {
                len = len || 32;
                var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                var maxPos = chars.length;
                var pwd = '';
                for (let i = 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            get_suffix (filename) {
                var pos = filename.lastIndexOf('.');
                var suffix = '';
                if (pos !== -1) {
                    suffix = filename.substring(pos);
                }
                return suffix;
            },
            getList () {
                ossToken()
                    .then(response => {
                        this.aliyunDate.OSSAccessKeyId = response.OSSAccessKeyId;
                        this.aliyunDate.key = response.dir + '/' + this.random_string(6) + '_' + new Date().getTime() + '.png';
                        this.aliyunDate.signature = response.signature;
                        this.aliyunDate.policy = response.policy;
                        this.aliyunDate.callback = response.callback;
                        this.aliyunDate.success_action_status = 200;
                        this.aliyunAction = response.action;
                    });
            },
            handleSuccess2 (response, file, fileList) {
                this.uploadList.url = response.object.filename;
                this.formValidate.img = response.object.filename;
                this.uploadList.name = this.random_string(6);
                this.getList();
            },
            handleFormatError2 (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        addObj(this.formValidate)
                            .then(response => {
                                this.$Message.success('保存成功');
                            });
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created () {
            this.getList();
        }
    };
</script>
