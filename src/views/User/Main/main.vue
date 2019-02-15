<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="user_home" @on-select="optionLink">
          <div class="layout-logo">
            <img src="@/assets/images/logo.png">
          </div>
          <div class="layout-nav">
            <MenuItem name="user_home">
              <Icon type="ios-home" />
              首页
            </MenuItem>
            <MenuItem name="new">
              <Icon type="ios-document" />
              沙雕新闻
            </MenuItem>
            <MenuItem name="us">
              <Icon type="ios-people" />
              关于我们
            </MenuItem>
            <Submenu name="user_avatar">
              <template slot="title">
                <Avatar v-if="user.Avatar" :src="`https://i.loli.net/${user.Avatar.path}`" />&nbsp;
                {{ user.UserName }}
              </template>
              <MenuGroup title="操作">
                <MenuItem name="log_out">退出系统</MenuItem>
              </MenuGroup>
            </Submenu>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem v-for="item in breadcumb" :key="item">{{ item }}</BreadcrumbItem>
        </Breadcrumb>
        <div>
          <router-view></router-view>
        </div>
      </Content>
      <Footer class="layout-footer-center">2011 - {{ thisYear }} &copy; by DOSH.</Footer>
    </Layout>
    <Modal v-model="visible" title="恭喜发现彩蛋！">
      <p>Surprise Mother Fucker.</p>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

const Mousetrap = require('mousetrap')
export default {
  data () {
    return{
      visible: false,
      thisYear: '',
      user: {}
    }
  },
  computed: {
    ...mapState({
      breadcumb: state => state.breadcumb
    })
  },
  mounted () {
    const vm = this
    vm.user = JSON.parse(localStorage.getItem('UserMsg'))
    vm.getThisYear()
    vm.bindMousetrap()
  },
  methods: {
    ...mapMutations([
      'handleBreadcumb', 'userLogOut'
    ]),
    bindMousetrap () {
      Mousetrap.bind('f2', () => {
        this.visible = true
      });
    },
    optionLink (e) {
      let n = ''
      switch (e) {
        case 'user_home':
          n = '首页'
          break
        case 'new':
          n = '沙雕新闻'
          break
        case 'us':
          n = '关于我们'
          break
        case 'log_out':
          this.userLogOut()
          this.$router.push({ name: 'login' })
          break
      }
      if (e !== 'user_avatar') {
        this.$router.push({name: e})
      }
      this.handleBreadcumb(n)
    },
    getThisYear () {
      let date = new Date()
      this.thisYear = date.getFullYear()
    }
  }
}
</script>

<style lang="less" scoped>
.body{
  width:100%;
  height:100%;
  padding:8px;
}
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height:100%;
}
.layout-logo{
  width: 100px;
  height: 30px;
  background: #fff;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  > img{
    display: block;
    width:90%;
    height:90%;
    margin:2px auto;
  }
}
.layout-nav{
  width: 482px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center{
  text-align: center;
  width:100%;
  position: absolute;
  bottom:0;
}
</style>
