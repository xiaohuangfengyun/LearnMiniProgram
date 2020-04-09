// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleTabClick(event){
    console.log(event.detail);
  },
  handleIncrementCpn(event){
    // 最终目的：修改my-sel中的counter

    // 1.通过id获取组件对象(还可以通过class获取)
    const my_sel = this.selectComponent('#sel-id');
    // 2.组件对象.setData() 通过setData修改组件中的数据不合理，不符合规范
    // my_sel.setData({
    //   counter:my_sel.data.counter+1
    // })

    // 3.通过方法对数据进行修改
    my_sel.incrementCounter(10)
  }
})