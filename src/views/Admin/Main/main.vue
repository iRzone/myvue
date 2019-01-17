<template>
<div class="layout">
  <Layout class="ds-layout">
    <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
      <template>
        <div class="layout-logo">
          <img src="@/assets/images/logo.png">
        </div>
      </template>
      <Menu active-name="admin_home" theme="dark" width="auto" :class="menuitemClasses" @on-select="optionLink">
        <MenuItem name="admin_home">
          <Icon type="ios-home"></Icon>
          <span>首页</span>
        </MenuItem>
        <MenuItem name="member">
          <Icon type="md-person"></Icon>
          <span>会员管理</span>
        </MenuItem>
      </Menu>
      <div slot="trigger"></div>
    </Sider>
    <Layout>
      <Header class="layout-header-bar">
        <Dropdown class="dropDown" placement="bottom-start" @on-click="userOperate">
          <Avatar src="https://i.loli.net/2019/01/11/5c384fc809967.jpg" />&nbsp;
          管理员：{{ admin }}
          <Icon type="ios-arrow-down"></Icon>
          <DropdownMenu slot="list">
            <DropdownItem name="log_out">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Header>
      <Breadcrumb :style="{margin: '24px 0 0',padding: '0 24px 24px'}">
        <BreadcrumbItem v-for="item in breadcumb" :key="item">{{ item }}</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{margin: '0 20px 20px 20px', background: '#fff', minHeight: '220px'}">
        <router-view style="padding: 20px"></router-view>
      </Content>
    </Layout>
  </Layout>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCollapsed: false,
      admin: JSON.parse(localStorage.getItem('UserMsg')).UserName
    }
  },
  computed: {
    ...mapState({
      breadcumb: state => state.breadcumb,
    }),
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    // console.log(this)
  },
  methods: {
    ...mapMutations([
      'handleBreadcumb', 'userLogOut'
    ]),
    optionLink (e) {
      let n = ''
      switch (e) {
        case 'admin_home':
          n = '首页'
          break
        case 'member':
          n = '会员管理'
          break
      }
      this.$router.push({name: e})
      this.handleBreadcumb(n)
    },
    userOperate (e) {
      switch (e) {
        case 'log_out':
          this.userLogOut()
          this.$router.push({ name: 'login' })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height:100%;
  .ds-layout{
    height:100%;
  }
  .layout-logo{
    width:160px;
    height:50px;
    border-radius:3px;
    background:#fff;
    margin:6px auto 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  text-align: right;
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
.dropDown{
  text-align: center;
}
</style>

