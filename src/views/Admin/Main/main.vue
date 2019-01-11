<template>
<div class="layout">
  <Layout class="ds-layout">
    <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
      <template>
        <div class="layout-logo">
          <img src="@/assets/images/logo.png">
        </div>
      </template>
      <Menu active-name="admin_home" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="admin_home">
          <Icon type="ios-home"></Icon>
          <span>首页</span>
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-search"></Icon>
          <span>Option 2</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-settings"></Icon>
          <span>Option 3</span>
        </MenuItem>
      </Menu>
      <div slot="trigger"></div>
    </Sider>
    <Layout>
      <Header class="layout-header-bar">
        <Avatar src="https://i.loli.net/2019/01/11/5c384fc809967.jpg" />&nbsp;
        管理员：{{ admin }}
      </Header>
      <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</div>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false,
      admin: JSON.parse(localStorage.getItem('UesrMsg')).UserName
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    // this.admin = JSON.parse(localStorage.getItem('UesrMsg')).UserName
    // console.log(this.admin)
  },
  methods: {

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
</style>

