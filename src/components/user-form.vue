<template>
  <Modal v-model="modal" title="修改用户信息" @on-ok="ok" @on-cancel="cancel">
    <Form ref="userForm" :model="userForm" :rules="ruleValidate" :label-width="80" style="width: 300px">
      <FormItem label="用户名：" prop="name">
        <Input v-model="userForm.UserName" placeholder="请输入用户名"></Input>
      </FormItem>
      <!-- iview upload 组件 -->
      <FormItem label="头像：">
        <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="/smms"
            style="display: inline-block;width:58px;" :header="requestHeader">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </FormItem>
      <!-- vue-cropper -->
      <FormItem label="裁剪头像：">
        <div class="">
          <label class="btn" for="upload">
            <Icon type="ios-camera" size="20"></Icon>
          </label>
          <input style="display:none;" type="file" id="upload" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadImg($event)">
        </div>
        <vueCropper :outputSize="1" :outputType="'png'" :autoCrop="true" :autoCropWidth="60" :autoCropHeight="60" :fixedBox="true" :centerBox="true"></vueCropper>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { VueCropper } from 'vue-cropper'
// import axios from 'axios' 
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      modal: false,
      userForm: {
        UserName: '',
        HeaderImg: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      },
      imgName: '',
      visible: false,
      uploadList: [],
      requestHeader: {
        dataType: 'jsonp'
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: null
    }
  },
  watch: {
    value: function (e) {
      this.modal = e
    },
    modal: function (e) {
      if (!e) {
        this.$emit('input', e)
      }
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    // 使用iview组件上传图片
    handleView (name) {
      this.imgName = name;
      this.visible = true;
    },
    handleSuccess (res, file) {
      console.log(res)
      console.log(file)
      const vm = this
      if (res.code === 'success') {
        file.url = `https://i.loli.net${res.path}`
        file.name = res.storename
        vm.userForm.HeaderImg = file.url
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 2
      if (!check) {
        this.$Notice.warning({
          title: '抱歉，最多只能上传一张图片~'
        })
      }
      return check
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: `抱歉，${file.name}太大，图片不可超过2M~`
      })
    },
    // 使用vue-cropper组件上传图片
    uploadImg (event) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(event.target.value)) {
        this.$Message.error({
          content: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种~',
        })
        return
      } else if (event.target.files[0].size > 2097152) {
        this.$Message.error({
          content: '图片最大不可以超过2M~',
        })
        return
      }
      let file = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      // let params = {
      //   smfile: event.target.files[0]
      // }
      // axios.post('/smms', params).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.btn{
  width: 58px;
  height:58px;
  line-height: 58px;
  border: 1px dashed #dcdee2;
  display: block;
  text-align: center;
  border-radius:2px;
}
.btn:hover{
  border: 1px dashed #5cadff;
}
</style>
