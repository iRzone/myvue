<template>
  <div>
    <div class="top">
      <div class="lineBox"></div>
      <div class="logo">
        <img src="@/assets/images/logo.png">
      </div>
      <div class="lineBox"></div>
    </div>
    <Menu class="menus" mode="horizontal" theme="dark" active-name="home" @on-select="optionLink">
      <MenuItem name="home">
        <Icon type="ios-home" />
        首页
      </MenuItem>
      <MenuItem name="new">
        <Icon type="ios-document" />
        新闻
      </MenuItem>
      <MenuItem name="us">
        <Icon type="ios-people" />
        关于我们
      </MenuItem>
      <!-- <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu> -->
    </Menu>
    <div class="body">
      <router-view></router-view>
    </div>
    <Modal v-model="visible" title="Common Modal dialog box title">
        <p>Surprise Mother Fucker.</p>
    </Modal>
  </div>
</template>

<script>
const Mousetrap = require('mousetrap')
export default {
  data () {
    return{
      visible: false
    }
  },
  mounted () {
    this.bindMousetrap()
  },
  methods: {
    bindMousetrap () {
      Mousetrap.bind('f2', () => {
        this.visible = true
      });
    },
    optionLink (e) {
      this.$router.push({name: e})
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
.top{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .lineBox{
    width:45%;
    height:1px;
    background:#000;
  }
  .logo{
    width:94px;
    height:30px;
    margin:20px 0;
    > img{
      display: block;
      width:100%;
      height:100%;
    }
  }
}

.menus{
  display: flex;
  justify-content: center;
  > li {
    float: right;
  }
}

</style>
