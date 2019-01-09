<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
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

var cookies = require('js-cookie')
const api = {
  CreateUser: '/users/register',
  Login: '/users/login'
}

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'iRzone',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      const params = {
        UserName: this.form.userName,
        PassWord: Base64.encode(this.form.password)
      }
      instance.post(api.Login, { params }).then(res => {
        if (res.data.Code === 200) {
          cookies.set('token', res.data.token, { expires: 3 })
          this.$Message.success('登录成功')
          this.$router.push({name: 'home'})
        }
      })
    },
    createSubmit () {
      const params = {
        UserName: this.form.userName,
        PassWord: Base64.encode(this.form.password)
      }
      instance.post(api.CreateUser, { params }).then(res => {
        if (res.data.Code === 200) {
          this.$Message.success('注册成功')
        }
      })
    }
  }
}
</script>
