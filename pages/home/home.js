// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"World",
    age:18,
    students:[
      {id:110, name:'kobe', age:28},
      {id:111,name:'laosi',age:18},
      {id:112,name:'zhangsan',age:38},
      {id:113,name:'lili',age:32}
    ],
    counter:0
  },
  handleBtnClick(){
    // 错误做法，数据是不会刷新的
    // this.data.counter += 1

    this.setData({
      counter:this.data.counter+1
    })
  },
  handleSubtraction(){
    this.setData({
      counter:this.data.counter-1
    })
  }
})