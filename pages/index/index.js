//index.js
//获取应用实例
var app = getApp()
Page({
  //
  //data定义页面数据
  data: {
    motto: 'Welcome To RoyApp!',
    userInfo: {},
    showModalStatus: false,
    title: '注册页面',
    isLogin: false
  },
  //事件处理函数
  bindViewTap: function () {
    //调用微信API导航到指定页面
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  changeAvatar() {

    var that = this

    wx.showActionSheet({
      itemList: ["从相册选择", "拍照"],
      //点击选项按钮触发的事件
      success: function (res) {
        //console.log(res.tapIndex)

        that.myChooseImg(res.tapIndex)
        .then((tempFilePaths)=>{
          let info = that.data.userInfo
          
          info.avatarUrl = tempFilePaths

          //调用setData()给变量赋新值，因为这样才能让页面刷新，渲染新数据
          that.setData({
            userInfo: info
          })

        })
        .catch(()=>{

        })


      },

      //点击取消
      fail: function (res) {
        console.log('xxxxxxx')
      }
    })
  },

  //选取照片
  myChooseImg(index) {

    let that = this

    let sourceType = null

    if (index == 0) {
      //相册
      sourceType = ['album']
    }
    else {
      //拍照
      sourceType = ['camera']
    }

    return new Promise((resolve, reject) => {
      wx.chooseImage({
        // 默认9
        count: 1,

        // 可以指定是原图还是压缩图，默认二者都有
        sizeType: ['original', 'compressed'],

        // 可以指定来源是相册还是相机，默认二者都有
        sourceType: sourceType,

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        success: function (res) {

          //获取到的图片路径DataURL
          var tempFilePaths = res.tempFilePaths

          if(tempFilePaths){

            resolve(tempFilePaths)
          }
          else{
            reject()
          }


        }
      })
    })
  },

  //注册点击
  goRegister(e){
    this.setData({
      isLogin: false
    })

    this.powerDrawer(e);

   

  },
  
  //登录点击
  goLogin(e){
    this.setData({
      isLogin: true
    })

    this.powerDrawer(e);
  },
  
  //确定按钮点击
  okClick(){
    wx.showLoading({
      title: '正在加载内容...',
    })

    setTimeout(()=>{
      wx.hideToast()

      wx.navigateTo({
        url: '../swiper_map/swiper_map',
      })
    },1000)
  },
  powerDrawer: function (e) {
    console.log("我曹")
    var currentStatu = e.currentTarget.dataset.statu;

    this.util(currentStatu)
  },
  util: function (currentStatu) {


    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).scale(0.5).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).scale(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {

        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 400)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },


  //页面加载完成事件
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
