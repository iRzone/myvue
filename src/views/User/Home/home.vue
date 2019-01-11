<template>
  <div>
    <Carousel v-model="poster" loop>
      <CarouselItem>
        <div class="demo-carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">4</div>
      </CarouselItem>
    </Carousel>
    <br>
    <Card>
      home
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      poster: 0
    }
  }
}
</script>

<style lang="less" scoped>
.demo-carousel {
  height: 400px;
  line-height: 400px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>
