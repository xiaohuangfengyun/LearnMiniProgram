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
    },
    currentType: 'pop'
  },
  onLoad: function (options) {
    // 0.请求测试（汇率）
    wx.request({
      url: 'http://web.juhe.cn:8080/finance/exchange/rmbquot',
      method: 'GET',
      data: {
        // type: 0,
        // bank: 0,
        // key: '8b9a9321e1d86cc6a8c522e7ed967fb4'
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
    this.data.goods[type].page = this.data.goods[type].page + 1;

    // 2.发送网络请求
    getGoodsData(type,page).then(res => {
      console.log(res);
      // 2.1.取出数据
      const list = res.data.data.list;
      // 2.2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);//...语法，如果直接push数组，那oldList就变成2维数组了
      // 2.3.将数据设置到data中的goods中
      // （这一段比较复杂，请看视频https://www.bilibili.com/video/BV1Kt411V7rg?p=60）30min左右的讲解
      const typeKey = `goods.${type}.list`;//ES6字符串拼接
      this.setData({
        [typeKey] : oldList
      });
    });
  },
  // ---------------------- 事件监听函数 ----------------------
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index;
    console.log(index);
    var type = '';
    switch(index){
      case 0: type='pop';break;
      case 1: type='new';break;
      case 2: type='sell';break;
    }
    this.setData({
      currentType: type
    });
  }
});