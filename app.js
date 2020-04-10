//app.js
const TOKEN = 'token'

App({
  globalData: {
    token: ''
  },
  // 登录操作
  onLaunch: function () {
    // 1.先从缓存中取出token
    const token = wx.getStorageSync(TOKEN);
    // 2.判断token是否有值
    if(token && token.length !== 0) {
      //有token，验证token是否过期
      this.check_token(token);
    } else {
      // 有token，进行登录操作
      this.login();
    }
  },
  check_token(token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: res => {
        if(!res.data.errCode) {
          console.log('token有效');
          this.globalData.token=token;
        } else {
          this.login();
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  login() {
    wx.login({
      // code只有5分钟的有效期
      success: res => {
        // 1.获取code
        const code = res.code;
        // 2.将code发送给我们的服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: res => {
            // 1.取出token
            const token = res.data.token;
            // 2.将token保存在globalData中(存储在对象中，小程序关闭，存储的token也就不在了，所以还需要进行本地存储)
            this.globalData.token=token;
            // 3.进行本地存储
            wx.setStorageSync(TOKEN,token);//同步的
          }
        })
      }
    })
  }
})