//导入js  
var util = require('../../utils/util.js')
Page({
  data: {
    latitude: 23.10229,
    longitude: 113.3345211,
    slider: [],
    swiperCurrent: 0,
    markers: [{
      iconPath: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4020175205,1433465883&fm=117&gp=0.jpg", 
      id: 0,
      latitude: 23.10229,
      longitude: 113.3345211,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#1a2b3c",
      width: 5,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: "/resources/捕获.png",
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  onLoad: function () {

    var that = this

    wx.getLocation({
      type: 'gcj02',

      success: function (res) {
        that.setData({
         latitude : res.latitude,
         longitude : res.longitude
        })

        let marker = that.data.markers;

       marker[0].latitude = res.latitude

       marker[0].longitude = res.longitude

       that.setData({
         markers: marker
       })
    
      }
    })
    var that = this;
    var data = { "code": 0, "data": { "slider": [{ "linkUrl": "https://y.qq.com/m/act/GoldenMelody/v2/index.html?ADTAG=jiaodiantu", "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M0000010Zj242Km8cK.jpg", "id": 10169 }, { "linkUrl": "http://y.qq.com/w/album.html?albummid=002cX7Zx4YCAhp", "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000001tTnrl3NBGPT.jpg", "id": 10232 }, { "linkUrl": "http://share.y.qq.com/l?g=2804&id=2094880&g_f=shoujijiaodian", "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000001kCgeA0BzXXY.jpg", "id": 10212 }, { "linkUrl": "https://y.qq.com/msa/226/0_3569.html?ADTAG=JDT", "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000004IZpsN1BQRrp.jpg", "id": 10179 }, { "linkUrl": "https://y.qq.com/live/zhibo/0603higherbrothers.html", "picUrl": "http://y.gtimg.cn/music/photo_new/T003R720x288M000004Ri6yC3tqwnl.jpg", "id": 10208 }], "radioList": [{ "picUrl": "http://qzonestyle.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg", "Ftitle": "一人一首招牌歌", "radioid": 307 }, { "picUrl": "http://qzonestyle.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg", "Ftitle": "热歌", "radioid": 199 }], "songList": [] } };

    that.setData({
      slider: data.data.slider
    })
    //网络访问，获取轮播图的图片
    /*  
    util.getRecommend(function (data) {
      that.setData({
        slider: data.data.slider
      })
    });
    */
  },
  goVideo(){
    wx.navigateTo({
      url: '../video/video',
    })
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    wx.showToast({
      title: '点击了',
      icon: 'success',
      duration: 2000
    });
    console.log(e.markerId)
  },
  controltap(e) {
    //console.log(e.controlId)

  }
}) 