<style lang="less" scoped>
/* pages/wx-cropper/index.wxss */
// Page {
//   /* 点的颜色 */
//   --primary-color: #69f;
//   /* 边框颜色 */
//   --primary-color-outline: rgba(102, 153, 255, .75);
//   /* 虚线颜色 */
//   --primary-color-dashed: rgba(255,255,255,0.46);
//   /* 裁剪区域背景色 */
//   --box-bg: rgba(255,255,255,0.3);
// }
.wx-content-info{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  align-items: center;
  flex-direction: column;
  background: #000;
}

.cropper-config{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,.12);
}

.cropper-config .cropper-cancle, .cropper-config .cropper-save{
  color: #fff;
  font-size: 26rpx;
  padding: 15rpx 25px;
}

.cropper-content{
  min-height: calc(100% - 80rpx);
  width: 720rpx;
  margin: 0 auto;
  margin-top: 8rpx;
  display: flex;
  align-items: center;
}

.wx-corpper{
  position: relative;
  overflow: visible;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}

.wx-corpper-content{
  position: relative;
}

.wx-corpper-content img {
  display: block;
  width: 100%;
  min-width: 0 !important;
  max-width: none !important;
  height: 100%;
  min-height: 0 !important;
  max-height: none !important;
  image-orientation: 0deg !important;
  margin: 0 auto;
}

/* 移动图片效果 */
.wx-cropper-drag-box{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: move;
  background: rgba(0,0,0,0.6);
  z-index: 1;
}

/* 内部的信息 */
.wx-corpper-crop-box{
  position: absolute;
  background: var(--box-bg);
  z-index: 2;
}

.wx-corpper-crop-box .wx-cropper-view-box {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  outline: 1px solid rgba(102, 153, 255, .75);
}

/* 横向虚线 */
.wx-cropper-dashed-h{
  position: absolute;
  top: 33.33333333%;
  left: 0;
  width: 100%;
  height: 33.33333333%;
  border-top: 1px dashed rgba(255,255,255,0.46);
  border-bottom: 1px dashed rgba(255,255,255,0.46);
}

/* 纵向虚线 */
.wx-cropper-dashed-v{
  position: absolute;
  left: 33.33333333%;
  top: 0;
  width: 33.33333333%;
  height: 100%;
  border-left: 1px dashed rgba(255,255,255,0.46);
  border-right: 1px dashed rgba(255,255,255,0.46);
}

/* 四个方向的线  为了之后的拖动事件*/
.wx-cropper-line-t{
  position: absolute;
  display: block;
  width: 100%;
  background-color: #69f;
  top: 0;
  left: 0;
  height: 1px;
  opacity: 0.1;
  cursor: n-resize;
}

.wx-cropper-line-t::before{
  content: '';
  position: absolute;
  top: 50%;
  right: 0rpx;
  width: 100%;
  -webkit-transform: translate3d(0,-50%,0);
  transform: translate3d(0,-50%,0);
  bottom: 0;
  height: 41rpx;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-r{
  position: absolute;
  display: block;
  background-color: #69f;
  top: 0;
  right: 0px;
  width: 1px;
  opacity: 0.1;
  height: 100%;
  cursor: e-resize;
}
.wx-cropper-line-r::before{
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 41rpx;
  -webkit-transform: translate3d(-50%,0,0);
  transform: translate3d(-50%,0,0);
  bottom: 0;
  height: 100%;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-b{
  position: absolute;
  display: block;
  width: 100%;
  background-color: #69f;
  bottom: 0;
  left: 0;
  height: 1px;
  opacity: 0.1;
  cursor: s-resize;
}

.wx-cropper-line-b::before{
  content: '';
  position: absolute;
  top: 50%;
  right: 0rpx;
  width: 100%;
  -webkit-transform: translate3d(0,-50%,0);
  transform: translate3d(0,-50%,0);
  bottom: 0;
  height: 41rpx;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-l{
  position: absolute;
  display: block;
  background-color: #69f;
  top: 0;
  left: 0;
  width: 1px;
  opacity: 0.1;
  height: 100%;
  cursor: w-resize;
}
.wx-cropper-line-l::before{
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 41rpx;
  -webkit-transform: translate3d(-50%,0,0);
  transform: translate3d(-50%,0,0);
  bottom: 0;
  height: 100%;
  background: transparent;
  z-index: 11;
}

.wx-cropper-point{
  width: 5px;
  height: 5px;
  /* background-color: var(--primary-color); */
  opacity: .75;
  position: absolute;
  z-index: 3;
}

.point-t{
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.point-r{
  top: 50%;
  left:100%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-tr, .point-rb, .point-bl, .point-lt{
  cursor: n-resize;
  width: 29rpx;
  height: 29rpx;
  position: absolute;
  z-index: 1112;
  opacity: 1;
}

.point-rb{
  right: 0;
  bottom: 0;
  -webkit-transform: translate3d(50%,50%,0);
}

.point-tr{
  right: 0;
  top: 0;
  -webkit-transform: translate3d(50%,-50%,0);
}

.point-bl{
  left: 0;
  bottom: 0;
  -webkit-transform: translate3d(-50%,50%,0);
}

.point-lt{
  top: 0;
  left: 0;
  -webkit-transform: translate3d(-50%,-50%,0);
}

.point-rb::before, .point-rb::after,
.point-tr::before, .point-tr::after,
.point-bl::before, .point-bl::after,
.point-lt::before, .point-lt::after{
  content: '';
  position: absolute;
  background-color: #69f;
}

/* 右下 */
.point-rb::before{
  width: 6rpx;
  height: 30rpx;
  right: calc(50% - 6rpx);
  bottom: calc(50% - 6rpx);
}

.point-rb::after{
  height: 6rpx;
  width: 30rpx;
  right: calc(50% - 6rpx);
  bottom: calc(50% - 6rpx);
}

/* 右上 */
.point-tr::before{
  width: 6rpx;
  height: 30rpx;
  right: calc(50% - 6rpx);
  top: calc(50% - 6rpx);
}

.point-tr::after{
  height: 6rpx;
  width: 30rpx;
  right: calc(50% - 6rpx);
  top: calc(50% - 6rpx);
}

/* 左下 */
.point-bl::before{
  width: 6rpx;
  height: 30rpx;
  left: calc(50% - 6rpx);
  bottom: calc(50% - 6rpx);
}

.point-bl::after{
  height: 6rpx;
  width: 30rpx;
  left: calc(50% - 6rpx);
  bottom: calc(50% - 6rpx);
}

/* 左上 */
.point-lt::before{
  width: 6rpx;
  height: 30rpx;
  left: calc(50% - 6rpx);
  top: calc(50% - 6rpx);
}

.point-lt::after{
  height: 6rpx;
  width: 30rpx;
  left: calc(50% - 6rpx);
  top: calc(50% - 6rpx);
}

.point-b{
  left:50%;
  top: 100%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-l{
  left:0%;
  top: 50%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

/* 裁剪框预览内容 */
.wx-cropper-viewer{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wx-cropper-viewer img{
  position: absolute;
  z-index: 2;
}
</style>

<template>
  <div class="wx-content-info">
    <div class='cropper-content'>
      <div v-if="isShowImg" class="wx-corpper" style="background:#000;">
        <div class="wx-corpper-content" :style="{width:cropperW + 'rpx',height:cropperH + 'rpx',left:cropperL + 'rpx',top:cropperT + 'rpx'}">
        <img :src="imageSrc" :style="{width:cropperW + 'rpx',height:cropperH + 'rpx'}" />
          <div class="wx-corpper-crop-box" @touchstart.stop="contentStartMove" @touchmove.stop="contentMoveing" @touchend.stop="contentTouchEnd" :style="{left:cutL + 'rpx',top:cutT + 'rpx',right:cutR + 'rpx',bottom:cutB + 'rpx'}">
            <div class="wx-cropper-view-box">
              <div class="wx-cropper-dashed-h"></div>
              <div class="wx-cropper-dashed-v"></div>
              <div class="wx-cropper-line-t" data-drag="top" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-line-r" data-drag="right" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-line-b" data-drag="bottom" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-line-l" data-drag="left" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-point point-t" data-drag="top" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-point point-tr" data-drag="topTight"></div>
              <div class="wx-cropper-point point-r" data-drag="right" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-point point-rb" data-drag="rightBottom" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-point point-b" data-drag="bottom" @touchstart.stop="dragStart" @touchmove.stop="dragMove" @touchend.stop="dragEnd"></div>
              <div class="wx-cropper-point point-bl" data-drag="bottomLeft"></div>
              <div class="wx-cropper-point point-l" data-drag="left" @touchstart.stop="dragStart" @touchmove.stop="dragMove"></div>
              <div class="wx-cropper-point point-lt" data-drag="leftTop"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='cropper-config'>
      <span class="cropper-cancle" @click="close">取消</span>
      <!-- <span class="cropper-cancle" @click="getImage">选择图片</span> -->
      <span class="cropper-save" @click="getImageInfo">使用</span>
    </div>
    <canvas
      canvas-id="myCanvas"
      style="position:absolute;border: 1px solid red;top:-9999px;left:-9999px;"
      :style="{width:qualityWidth + 'px',height:qualityWidth/innerAspectRadio + 'px'}"></canvas>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

// 裁剪图片的宽度设置
const CROPPER_WIDTH = 720

// 裁剪显示的最大比例，如果裁剪的图片过长，则做限制，默认最大宽高比例为 宽640 / 高960 (宽高比例)
const CROPPER_RATIO = 0.7

/**
 * 初始化裁剪的比例 如果是正方形则是 1
 * 比例为宽高比 建议区间为 0.25 - 4
 * 设置为0的时候则是不固定宽高
 */
// const CROPPER_AREA_RATIO = 1
const CROPPER_AREA_RATIO = 0.75

// 裁剪的位置
let CUT_L,  // 初始化拖拽元素的left值
    CUT_T,  // 初始化拖拽元素的top值
    CUT_R,  // 初始化拖拽元素的
    CUT_B,  // 初始化拖拽元素的

// 裁剪的宽度
    CUT_W,  // 初始化拖拽元素的宽度
    CUT_H,  //  初始化拖拽元素的高度

// 拖拽相关
    PAGE_X, // 手按下的x位置
    PAGE_Y, // 手按下y的位置
    T_PAGE_X, // 手移动的时候x的位置
    T_PAGE_Y, // 手移动的时候Y的位置x

// 图片比例
    IMG_RATIO,

// 图片实际宽高
    IMG_REAL_W,  // 图片实际的宽度
    IMG_REAL_H,   // 图片实际的高度

// 裁剪图片区域的信息
    CROPPER_IMG_W,
    CROPPER_IMG_H,

// 移动的比例
    DRAFG_MOVE_RATIO = 750 / wx.getSystemInfoSync().windowWidth,  //移动时候的比例,


    INIT_DRAG_POSITION = 0,   // 初始化屏幕宽度和裁剪区域的宽度之差，用于设置初始化裁剪的宽度

    DRAW_IMAGE_W, // 设置生成的图片宽度

// 最大可显示得图片宽度，需要设定最大值，否则安卓部分机器会闪退, 控制qualityWidth的最大值
    maxQW = 2550

/**
 * 最小裁剪宽度  由于设置了裁剪的UI样式，裁剪的宽高必须要有最小宽度，这个宽度是裁剪长或者宽的最短一方的宽度
 * 如 400 200
 * 那么如果只能设置为100的时候
 * 那么最小缩放到200 100的效果，之后只能放大不能缩小
 */
 const MIN_CROPPER_DIS = 100
 export default {
   data() {
     return {
        // 之后可以动态替换
        // imageSrc: 'http://www.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_1920x1080.jpg',
        imageSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548138965392&di=8d000139a867a92e7552f6d70ab88c09&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F22%2F20180922160044_lxqwl.thumb.700_0.jpg',
        // imageSrc: 'http://pic.shejiben.com/mall/2013/10/25/20131025235159-933db4b4_m.jpg',
        // 是否显示图片(在图片加载完成之后设置为true)
        isShowImg: false,

        // 初始化的宽高
        cropperInitW: CROPPER_WIDTH,
        cropperInitH: CROPPER_WIDTH,

        // 动态的宽高
        cropperW: CROPPER_WIDTH,
        cropperH: CROPPER_WIDTH,

        // 动态的left top值
        cropperL: 0,
        cropperT: 0,

        // 图片缩放值
        scaleP: 0,

        // 裁剪框 宽高
        cutL: 0,
        cutT: 0,
        cutB: 0,
        cutR: 0,

        qualityWidth: DRAW_IMAGE_W,

        innerAspectRadio: DRAFG_MOVE_RATIO
     }
   },
   methods: {
      ...mapMutations(['setNewCropUrl']),

      /**
       * 选择本地图片
       * 基于底部中间的按钮的点击事件
       */
      getImage: function () {
        var _this = this
        wx.chooseImage({
          success: function (res) {
            _this.isShowImg = false
            _this.imageSrc = res.tempFilePaths[0]
            _this.loadImage();
          },
        })
      },

      /**
       * 初始化图片信息
       * 获取图片内容，并初始化裁剪框
       */
      loadImage: function () {
        var _this = this
        wx.showLoading({
          title: '图片加载中...',
        })

        wx.getImageInfo({
          src: _this.imageSrc,
          success: function success(res) {
            DRAW_IMAGE_W = IMG_REAL_W = res.width
            IMG_REAL_H = res.height
            IMG_RATIO = IMG_REAL_W / IMG_REAL_H

            let MIN_RANGE = IMG_REAL_W > IMG_REAL_H ? IMG_REAL_W : IMG_REAL_H

            // 用于设置图片的比例(以设置裁剪的比例，方便定位裁剪的left right top bottom)
            INIT_DRAG_POSITION = MIN_RANGE > INIT_DRAG_POSITION ? INIT_DRAG_POSITION : MIN_RANGE

            // 拿到裁剪位置
            let cropperPosition = _this.initCropperPosition(IMG_RATIO, CROPPER_WIDTH)

            // 根据图片的宽高显示不同的效果   保证图片可以正常显示
            if (IMG_RATIO >= 1) {
                _this.cropperW = CROPPER_WIDTH
                _this.cropperH = CROPPER_WIDTH / IMG_RATIO
                // 初始化left right
                _this.cropperL = Math.ceil((CROPPER_WIDTH - CROPPER_WIDTH) / 2)
                _this.cropperT = 0
                _this.cutL = cropperPosition.left
                _this.cutT = cropperPosition.top
                _this.cutR = cropperPosition.right
                _this.cutB = cropperPosition.bottom
                // 图片缩放值
                _this.scaleP = IMG_REAL_W / CROPPER_WIDTH
                _this.qualityWidth = DRAW_IMAGE_W > maxQW ? maxQW : DRAW_IMAGE_W
                _this.innerAspectRadio = IMG_RATIO
            } else {
              // 此时需要判断图片的比例以设定显示裁剪区域的比例
              // let cropper_real_ratio = CROPPER_RATIO > IMG_RATIO ? CROPPER_RATIO : IMG_RATIO

              if (CROPPER_RATIO > IMG_RATIO) {
                CROPPER_IMG_W = CROPPER_WIDTH / CROPPER_RATIO * IMG_RATIO
                CROPPER_IMG_H = CROPPER_WIDTH / CROPPER_RATIO
              } else {
                CROPPER_IMG_W = CROPPER_WIDTH
                CROPPER_IMG_H = CROPPER_IMG_W / IMG_RATIO
              }

              // 动态生成新的CROPPER的真实宽度 高度
              // CROPPER_IMG_W = CROPPER_WIDTH * cropper_real_ratio
              // CROPPER_IMG_H = CROPPER_WIDTH / cropper_real_ratio / IMG_RATIO
              // console.log(cropper_real_ratio)
              // console.log(CROPPER_IMG_W)
              // console.log(CROPPER_IMG_H)
              // console.log(CROPPER_IMG_W / CROPPER_IMG_H)

                _this.cropperW = CROPPER_IMG_W
                _this.cropperH = CROPPER_IMG_H
                // 初始化left right
                _this.cropperL = Math.ceil((CROPPER_WIDTH - CROPPER_IMG_W) / 2)
                _this.cropperT = 0

                _this.cutL = cropperPosition.left
                _this.cutT = cropperPosition.top
                _this.cutR = cropperPosition.right
                _this.cutB = cropperPosition.bottom
                // 图片缩放值
                _this.scaleP = IMG_REAL_W / CROPPER_IMG_W
                _this.qualityWidth = DRAW_IMAGE_W > maxQW ? maxQW : DRAW_IMAGE_W
                _this.innerAspectRadio = IMG_RATIO
            }
              _this.isShowImg = true
            wx.hideLoading()
          }
        })
      },

      /**
       * 初始化裁剪区域的
       * left right top bottom
       * 需要 CROPPER_AREA_RATIO 来判断
       * @return 返回裁剪的left, right, top bottom的值
       */
      initCropperPosition (radio) {
        let left = 0,
            right = 0,
            top = 0,
            bottom = 0,
            cropperW,
            cropperH
        // 如果 CROPPER_AREA_RATIO = 0 则不限制固定宽高
        if (CROPPER_AREA_RATIO === 0) return { left, right, top,bottom }

        // 宽大于等于高
        if (radio >= 1) {
          cropperW = CROPPER_WIDTH
          cropperH = CROPPER_WIDTH / IMG_RATIO
          if (radio > CROPPER_AREA_RATIO) {
            return {
              left: Math.ceil((cropperW - cropperH * CROPPER_AREA_RATIO) / 2),
              right: Math.ceil((cropperW - cropperH * CROPPER_AREA_RATIO) / 2),
              top: 0,
              bottom: 0
            }
          }
          return {
            left: 0,
            right: 0,
            top: Math.ceil((cropperH - cropperW / CROPPER_AREA_RATIO) / 2),
            bottom: Math.ceil((cropperH - cropperW / CROPPER_AREA_RATIO) / 2)
          }
        }

        // 此时需要判断图片的比例以设定显示裁剪区域的比例
        let cropper_real_ratio = CROPPER_RATIO > IMG_RATIO ? CROPPER_RATIO : IMG_RATIO
        // 高大于宽
        cropperW = CROPPER_WIDTH / cropper_real_ratio * IMG_RATIO
        cropperH = CROPPER_WIDTH / cropper_real_ratio
        if (radio < CROPPER_AREA_RATIO) {
          return {
            left: 0,
            right: 0,
            top: Math.ceil((cropperH - cropperW / CROPPER_AREA_RATIO) / 2),
            bottom: Math.ceil((cropperH - cropperW / CROPPER_AREA_RATIO) / 2)
          }
        }
        return {
          left: Math.ceil((cropperW - cropperH * CROPPER_AREA_RATIO) / 2),
          right: Math.ceil((cropperW - cropperH * CROPPER_AREA_RATIO) / 2),
          top: 0,
          bottom: 0
        }
      },

      /**
       * 拖动时候触发的touchStart事件
       */
      contentStartMove(e) {
        PAGE_X = e.touches[0].pageX
        PAGE_Y = e.touches[0].pageY
      },

      /**
       * 拖动时候触发的touchMove事件
       */
      contentMoveing(e) {
        var _this = this
        var dragLengthX = (PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
        var dragLengthY = (PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO * DRAFG_MOVE_RATIO

        // 左移右移
        if (dragLengthX > 0) {
          if (this.cutL - dragLengthX < 0) dragLengthX = this.cutL
        } else {
          if (this.cutR + dragLengthX < 0) dragLengthX = -this.cutR
        }


        // 上移下移
        if (dragLengthY > 0) {
          if (this.cutT - dragLengthY < 0) dragLengthY = this.cutT
        } else {
          if (this.cutB + dragLengthY < 0) dragLengthY = -this.cutB
        }

        this.cutL = this.cutL - dragLengthX
        this.cutT = this.cutT - dragLengthY
        this.cutR = this.cutR + dragLengthX
        this.cutB = this.cutB + dragLengthY


        PAGE_X = e.touches[0].pageX
        PAGE_Y = e.touches[0].pageY
      },

      contentTouchEnd() {},

      /**
       * 点击取消关闭裁剪页面
       */
      close() {
        // wx.redirectTo()
        this.$router.go(-1)
      },

      /**
       * 点击完成之后
       * 生成图片信息
       */
      getImageInfo() {
        var _this = this
        wx.showLoading({
          title: '图片生成中...',
        })
        // 将图片写入画布
        const ctx = wx.createCanvasContext('myCanvas')
        let w = this.qualityWidth
        let h = this.qualityWidth / IMG_RATIO
        ctx.drawImage(_this.imageSrc, 0, 0, w, h);
        ctx.draw(true, () => {
          // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题
          var canvasW = ((_this.cropperW - _this.cutL - _this.cutR) / _this.cropperW) * w
          var canvasH = ((_this.cropperH - _this.cutT - _this.cutB) / _this.cropperH) * h
          var canvasL = (_this.cutL / _this.cropperW) * w
          var canvasT = (_this.cutT / _this.cropperH) * h

          // 生成图片
          wx.canvasToTempFilePath({
            x: canvasL,
            y: canvasT,
            width: canvasW,
            height: canvasH,
            destWidth: canvasW,
            destHeight: canvasH,
            quality: 0.5,
            canvasId: 'myCanvas',
            success: function (res) {
              wx.hideLoading()
              // 成功获得地址的地方
              wx.uploadFile({
                url: _this.$store.state.httpUrl+"/shop4/uploadImgs/upload",
                filePath: res.tempFilePath,
                name: "file",
                formData: {
                  user: "test"
                },
                success(res) {
                  console.log(res);
                  let data = JSON.parse(res.data)
                  if (data.code == 1) {
                    _this.setNewCropUrl(data.data)
                    _this.$router.go(-1)
                  }
                }
              })
              // wx.previewImage({
              //   current: '', // 当前显示图片的http链接
              //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
              // })
            }
          })
        })
      },

      /**
       * 设置大小的时候触发的touchStart事件
       * 存数据
       */
      dragStart(e) {
        T_PAGE_X = e.touches[0].pageX
        T_PAGE_Y = e.touches[0].pageY
        CUT_L = this.cutL
        CUT_R = this.cutR
        CUT_B = this.cutB
        CUT_T = this.cutT
      },

      /**
       * 设置大小的时候触发的touchMove事件
       * 根据dragType判断类型
       * 4个方向的边线拖拽效果
       * 右下角按钮的拖拽效果
       */
      dragMove(e) {
        var _this = this
        var dragType = e.target.dataset.drag
        switch (dragType) {
          case 'right':
            var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            if (CUT_R + dragLength < 0) dragLength = - CUT_R
            if (CUT_R + dragLength + MIN_CROPPER_DIS > this.cropperW - this.cutL) dragLength = (this.cropperW - this.cutL) - MIN_CROPPER_DIS - CUT_R

            if (CROPPER_AREA_RATIO) {
              // 底部线的限制 不允许超出
              // dragLength 最大不能超过CUT_B
              if (CUT_B + dragLength / CROPPER_AREA_RATIO <= 0) {
                this.cutB = 0
                return
              }
                this.cutR = CUT_R + dragLength,
                this.cutB = CUT_B + dragLength / CROPPER_AREA_RATIO
            } else {
                this.cutR = CUT_R + dragLength
            }

            break;
          case 'left':
            var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            if (CUT_L - dragLength < 0) dragLength = CUT_L
            if ((CUT_L - dragLength + MIN_CROPPER_DIS) > (this.cropperW - this.cutR)) dragLength = CUT_L - (this.cropperW - this.cutR) + MIN_CROPPER_DIS

            if (CROPPER_AREA_RATIO) {
              // 顶部线的限制 不允许超出
              // dragLength 最大不能超过CUT_T
              if (CUT_T - dragLength / CROPPER_AREA_RATIO < 0) {
                  this.cutT = 0
                return
              }
                this.cutL = CUT_L - dragLength,
                this.cutT = CUT_T - dragLength / CROPPER_AREA_RATIO
            } else {
                this.cutL = CUT_L - dragLength
            }
            break;
          case 'top':
            var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
            if (CUT_T - dragLength < 0) dragLength = CUT_T
            if ((CUT_T - dragLength + MIN_CROPPER_DIS) > this.cropperH - this.cutB) dragLength = CUT_T - (this.cropperH - this.cutB) + MIN_CROPPER_DIS

            if (CROPPER_AREA_RATIO) {
              // left 线的限制 不允许超出
              // dragLength 最大不能超过CUT_L
              if (CUT_L - dragLength * CROPPER_AREA_RATIO < 0) {
                  this.cutL = 0
                return
              }
                this.cutL = CUT_L - dragLength * CROPPER_AREA_RATIO,
                this.cutT = CUT_T - dragLength
            } else {
                this.cutT = CUT_T - dragLength
            }
            break;
          case 'bottom':
            var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
            if (CUT_B + dragLength < 0) dragLength = - CUT_B
            if (CUT_B + dragLength + MIN_CROPPER_DIS > this.cropperH - this.cutT) dragLength = (this.cropperH - this.cutT) - MIN_CROPPER_DIS - CUT_B

            if (CROPPER_AREA_RATIO) {
              // right 线的限制 不允许超出
              // dragLength 最大不能超过 CUT_R
              if (CUT_R + dragLength * CROPPER_AREA_RATIO < 0) {
                  this.cutR = 0
                return
              }
                this.cutR = CUT_R + dragLength * CROPPER_AREA_RATIO,
                this.cutB = CUT_B + dragLength
            } else {
                this.cutB = CUT_B + dragLength
            }
            break;
          case 'rightBottom':
            var dragType = e.target.dataset.drag
            var dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO
            var dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO
            if (CUT_B + dragLengthY < 0) dragLengthY = - CUT_B
            if (CUT_B + dragLengthY + MIN_CROPPER_DIS > this.cropperH - this.cutT) dragLengthY = (this.cropperH - this.cutT) - MIN_CROPPER_DIS - CUT_B
            if (CUT_R + dragLengthX < 0) dragLengthX = - CUT_R
            if (CUT_R + dragLengthX + MIN_CROPPER_DIS > this.cropperW - this.cutL) dragLengthX = (this.cropperW - this.cutL) - MIN_CROPPER_DIS - CUT_R

            if (CROPPER_AREA_RATIO) {
              // right 线的限制 不允许超出
              // dragLength 最大不能超过 CUT_R
              if (CUT_R + dragLengthY * CROPPER_AREA_RATIO < 0) {
                  this.cutR = 0
                return
              }
                this.cutR = CUT_R + dragLengthY * CROPPER_AREA_RATIO,
                this.cutB = CUT_B + dragLengthY
            } else {
                this.cutB = CUT_B + dragLengthY,
                this.cutR = CUT_R + dragLengthX
            }
            break;
          default:
            break;
        }
      }
   },
   onLoad() {
     console.log('on load')
     this.imageSrc = this.$route.query.url
   },
   onReady() {
     console.log('on ready')
     this.loadImage();
   },
   onShow() {
     console.log('on show')
   }
 }
</script>
