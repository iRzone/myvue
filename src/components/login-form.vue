<template>
  <Form ref="loginForm" :model="form" :rules="ruleValidate" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button style="margin-bottom: 10px" @click="handleSubmit" type="primary" long>登录</Button>
      <Button @click="createSubmit" type="warning" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import instance from '@/libs/util.js'
import Base64 from 'base-64'
import { mapState, mapMutations } from 'vuex'

var cookies = require('js-cookie')
const api = {
  CreateUser: '/users/register',
  Login: '/users/login'
}

export default {
  name: 'LoginForm',
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不可以为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: '',
        password: ''
      },
      ruleValidate: {
        userName: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      breadcumb: state => state.breadcumb
    })
  },
  mounted () {
    // console.log(this.$store.state.breadcumb)
  },
  methods: {
    ...mapMutations([
      'handleBreadcumb', 'clearBreadcumb'
    ]),
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const params = {
            UserName: this.form.userName,
            PassWord: Base64.encode(this.form.password)
          }
          instance.post(api.Login, { params }).then(res => {
            if (res.data.Code === 200) {
              this.clearBreadcumb()
              cookies.set('token', res.data.token, { expires: 3 })
              this.$Message.success('登录成功')
              if (res.data.Data.Admin === 1) {
                this.$router.push({name: 'admin_home'})
              } else {
                this.$router.push({name: 'user_home'})
              }
              this.handleBreadcumb('首页')
              localStorage.setItem('UserMsg', JSON.stringify(res.data.Data))
              this.init()
            }
          })
        }
      })
    },
    createSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const params = {
            UserName: this.form.userName,
            PassWord: Base64.encode(this.form.password)
          }
          instance.post(api.CreateUser, { params }).then(res => {
            if (res.data.Code === 200) {
              this.$Message.success('注册成功')
              this.init()
            }
          })
        }
      })
    },
    init () {
      this.form = Object.assign(this.form, this.$options.data().form)
    }
  }
}
</script>
