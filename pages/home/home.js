// pages/home/home.js
import { getMultiData, getGoodsData } from '../../service/home.js';

Page({

  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精品'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
	    'sell': {page: 0, list: []}
    }
  },
  onLoad: function (options) {
    // 0.请求测试（汇率）
    wx.request({
      url: 'http://web.juhe.cn:8080/finance/exchange/rmbquot',
      method: 'GET',
      data: {
        // type: 0,
        //bank: 0,
        key: '8b9a9321e1d86cc6a8c522e7ed967fb4'
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })
    // 1.请求轮播图以及推荐数据
    this._getMultiData();
    // 2.请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  // ---------------------- 网络请求函数 ----------------------
  _getMultiData() {
    getMultiData().then(res => {
      // console.log(res);
      // 取出轮播图和推荐的数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 将banners和recommends放到data中
      this.setData({
        banners: banners,
        recommends: recommends
      });
    });
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;
    //this.data.goods[type].page = this.data.goods[type].page + 1;
    // 2.发送网络请求
    getGoodsData(type,page).then(res => {
      console.log(res);
    });
  },
  // ---------------------- 事件监听函数 ----------------------
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index;
    console.log(index);
  }
});