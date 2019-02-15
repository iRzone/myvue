<template>
  <Modal width="600" v-model="mode" title="选择图片" @on-ok="ok" @on-cancel="cancel" :mask-closable="false">
    <Row type="flex" justify="space-between">
      <Col span="16">
        <div class="cut">
          <vueCropper ref="cropper" @realTime="realTime" :img="clipImg" :outputSize="1" :outputType="'png'" :autoCrop="true" :autoCropWidth="150" :autoCropHeight="150" :fixedBox="true" :centerBox="true"></vueCropper>
        </div>
      </Col>
      <Col span="7">
        <!-- 按钮 -->
        <div>
          <label class="btn" for="upload">
            选择图片
          </label>
          <input style="display:none;" type="file" id="upload" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadImg($event)">
          <p v-if="imgName !== ''">{{ imgName }}</p>
        </div>
        <!-- 缩略图 -->
        <div class="effect_picture">
          <p>效果图</p>
          <div class="preview">
            <div class="squarePreview">
              <img :src="previews.url" :style="previews.img">
            </div>
            <div class="circlePreview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import uploadImg from 'smms'
// import util from '@/libs/util'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      mode: false,
      imgName: '',
      // vue-cropper参数
      clipImg: '',
      // 预览
      previews: {}
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function (e) {
      this.mode = e
    },
    mode: function (e) {
      if (!e) {
        this.$emit('input', e)
      }
    }
  },
  methods: {
    ok () {
      const vm = this
      // 开始截图
      vm.$refs.cropper.startCrop()
      // 获取截图的base64 数据
      vm.$refs.cropper.getCropData((data) => {
        // do something
        console.log(data)
        let userName = JSON.parse(localStorage.getItem('UserMsg')).UserName + 'Avatar'
        uploadImg(vm.dataURLtoFile(data, userName)).then(res => {
          console.log(res)
          // util.updateAvatar().then(res => {})
        })
      })
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    // 使用vue-cropper组件上传图片
    uploadImg (event) {
      const vm = this
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
      reader.onload = (event) => {
        // console.log(event.target.result)
        vm.clipImg = event.target.result
      }
      reader.readAsDataURL(file)
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    // js-base64转换为file对象
    dataURLtoFile(dataurl, filename) { // 将base64转换为文件
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime})
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
  vertical-align: middle;
  line-height: 1.5;
  border-radius: 4px;
  padding: 5px 15px 6px;
}
.btn:hover{
  background-color: #5cadff;
  border-color: #5cadff;
}
.cut{
  width: 100%;
  height:400px;
}
.effect_picture{
  margin:12px 0;
  > p{
    padding-bottom:4px;
  }
  .preview{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .squarePreview{
      width:150px;
      height:150px;
      border:1px solid #333;
      overflow: hidden;
      margin-bottom:12px;
    }
    .circlePreview{
      width:150px;
      height:150px;
      border:1px solid #333;
      border-radius:50%;
      overflow: hidden;
    }
  }
}

</style>
