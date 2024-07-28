export const updateWxShareMessage = async () => {
  const wx = (window as any).wx
  if (wx) {
    const res = await fetch(`https://www.orzzone.com/api/wechat/signature?url=${encodeURIComponent(location.href)}`)
    const json = await res.json()
    if (json.code === 200) {
      const data = json.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          // 'onMenuShareTimeline',
          // 'onMenuShareAppMessage',
          // 'onMenuShareQQ',
          // 'onMenuShareWeibo',
          // 'onMenuShareQZone',
        ] // 必填，需要使用的JS接口列表
      })
      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        // wx.updateAppMessageShareData({
        //   title: document.title, // 分享标题
        //   desc: document.title, // 分享描述
        //   link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function () {
        //     // 设置成功
        //   }
        // })

        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        // wx.updateTimelineShareData({
        //   title: document.title, // 分享标题
        //   link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function () {
        //     // 设置成功
        //   }
        // })

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareTimeline({
          title: document.title, // 分享标题
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareAppMessage({
          title: document.title, // 分享标题
          desc: document.title, // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        });
      });
    }
  }
}
