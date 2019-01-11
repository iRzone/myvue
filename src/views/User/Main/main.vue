<template>
  <!-- <div>
    <div class="top">
      <div class="lineBox"></div>
      <div class="logo">
        <img src="@/assets/images/logo.png">
      </div>
      <div class="lineBox"></div>
    </div>
    <Menu class="menus" mode="horizontal" theme="dark" active-name="home" @on-select="optionLink">
      <MenuItem name="user_home">
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
    </Menu>
    <div class="body">
      <router-view></router-view>
    </div>
    
  </div> -->
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
            </div>
          </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
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
const Mousetrap = require('mousetrap')
export default {
  data () {
    return{
      visible: false,
      thisYear: ''
    }
  },
  mounted () {
    this.getThisYear()
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
  width: 420px;
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
