<template>
  <div class="page-badminton">
    <SiteHeader v-if="false" />

    <div class="page-content">
      <div class="global-warning">活动非盈利性质，请注意安全，如生意外，与组织者无关</div>

      <MarkdownRender />

      <el-table v-if="activityInfo.length > 0" :data="activityInfo" border style="width: 100%;" size="default">
        <el-table-column prop="label" label="活动信息" align="center" width="100" />
        <el-table-column prop="value" label="具体说明" align="left">
          <template #default="scope">
            <div v-html="scope.row.value" />
          </template>
        </el-table-column>
      </el-table>

      <div class="members-wrapper">
        <div class="title">报名情况（已报{{ memberList.length }}人）</div>

        <el-table v-loading="!isInitialized" :data="memberList" border style="width: 100%;" size="default">
          <template #empty>就等你了，快来</template>
          <template #default>
            <el-table-column prop="nickName" label="报名者" align="center">
              <template #default="scope">
                <div class="user-name">{{ scope.row.nickName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="payTime" label="报名时间" align="center">
              <template #default="scope">
                {{ scope.row.payTime.slice(5, 16) }}
              </template>
            </el-table-column>
            <el-table-column prop="fee" label="费用" align="center" width="60">
              <template #default="scope">{{ Number(scope.row.fee) }}</template>
            </el-table-column>
            <el-table-column prop="numPigeons" label="养鸽数" align="center" width="90">
              <template #header>
                <div class="pigeon-header">
                  养鸽数
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="可以用来放鸽子"
                    placement="top-start"
                  >
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>

        <div v-if="!!nickName" class="login-user-info">
          <div class="tip">你好, {{ nickName }}</div>
          <el-button type="info" @click="toLogout">退出登录</el-button>
        </div>

        <div class="buttons-wrapper">
          <el-button type="primary" @click="toJoin">参与报名</el-button>
          <el-button type="danger" @click="toRefund">取消报名</el-button>
          <el-button type="success" @click="toRename">修改昵称</el-button>
        </div>
      </div>

      <RefundFee />

      <div class="global-note">以下为通用模版内容，若与上文冲突，以上文为准</div>

      <div class="cards-wrapper">
        <SimpleCard
          v-for="(item, idx) in cardList"
          :key="idx"
          :title="item.title"
          :notes="item.notes"
          :image-url="item.imageUrl"
        />
      </div>
    </div>

    <SiteFooter v-if="false" />

    <el-dialog
      v-model="dialogVisibleRefund"
      title="退款说明"
      width="90%"
      :before-close="handleCloseDialogVisibleRefund"
    >
      <RefundFee />
      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="doRefund(true)">取消报名（用鸽子）</el-button>
          <el-button type="danger" @click="doRefund(false)">取消报名（不用鸽子）</el-button>
          <el-button type="primary" @click="handleCloseDialogVisibleRefund">不取消报名</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import SiteHeader from "../components/SiteHeader.vue";
import MarkdownRender from '../components/MarkdownRender.vue'
import SimpleCard from '../components/SimpleCard.vue'
import SiteFooter from "../components/SiteFooter.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import RefundFee from "../components/badminton/RefundFee.vue";

const { frontmatter } = useData()

const activityInfo = [
  {
    label: '时间',
    value: frontmatter.value.time,
  },
  {
    label: '地点',
    value: frontmatter.value.location,
  },
  {
    label: '人数',
    value: frontmatter.value.people,
  },
  {
    label: '费用',
    value: frontmatter.value.fee
  }
]

const cardList = [
  {
    title: '免责声明和注意事项',
    notes: [
      '活动非盈利性质，打球时请注意安全，如发生意外，与组织者无关。',
      '位于前场的同学在接球过程中不要做回头动作，杀球时请不要对着前场同学上身杀球。',
      '遇到新手时，请少杀球，多打容易接的球。每个人都是从新手开始的，多点耐心。',
      '群主组织活动本意是让大家尽量打有运动量的娱乐局（又出汗又养生但是不容易受伤）。',
      '新手不用担心打不了，可以和群主组队。'
    ],
    imageUrl: '',
  },
  {
    title: '本群关于娱乐局的定义',
    notes: [
      '运动不激烈不容易受伤，但有一定运动量，不是养生局。',
      '举例1：如果发现某种打法对方基本上接不到就减少这种打法出现的次数。比如你发现对方发球质量不高每次发球你都直接扣杀掉，你虽然得分了，但实际上对方和你都没有啥运动量，大概率打得也不尽兴。',
      '举例2：如果你水平比较差，但是打完球一点不出汗，那你就要看下是不是自己在球场上运动不够积极了。新手跑动不到位有些球接不到是正常的，但是一点都不愿意跑动就站在原地接球是肯定不行的。',
      '举例3：对面2个人如果一个水平一般，一个水平较好，你的水平较好，那你可以有选择性地打容易接的球给水平一般的，打正常的球给水平较好的。',
      '举例4：对面水平都比你好，那你就正常打，不要不好意思还放水打。',
      '举例5：如果组队时两边的水平差异过大打不起来，在你大概知道大家水平的情况下，请主动调整两边队伍的人员重新组队。',
      '举例6：如果两边水平差不多，请尽情打。'
    ],
    imageUrl: '',
  },
  {
    title: '本群级别自评（非中羽等级）',
    notes: [
      '一级：可以将球打到对面。',
      '二级：会正确的握拍姿势发球，或者不会发球但耐力较好或手劲较大。',
      '三级：能打出高远球（男生）、或者有一定球场意识（会看对方场地空位等）。',
      '四级：轻松打高远球、步伐/空位意识较好，杀球质量一般。',
      '四级以上：非娱乐打法（参考本文中关于娱乐局的定义）的不建议来打娱乐局，不然大家都打不爽。',
    ],
    imageUrl: '',
  },
  {
    title: '费用说明',
    notes: [
      '订场前的预收款是按一个场地6个人来算的最低费用，不是最终费用。',
      '订场前可随时退款。订场后钱已经到球馆了，不支持随意退款。',
      '场地数根据实际交款人次确定：① 如不足8人次，则只定1个场，前6位付款的同学参与活动；② 如达到8人次，则定2个场，前12位付款的同学参与活动。',
      '由于人数限制导致未能参与活动但已付款的同学，钱会退给你。',
      '打完球后会根据实际情况，在群里发群收款补差额。'
    ],
    imageUrl: '',
  },
  {
    title: '对群的补充说明',
    notes: [
      '未进群的朋友请先加群主微信（OrzZone）进群参与活动。',
      '欢迎在群里自行拉人约时间组队。如发起接龙，请注明时间、地点等信息，发起后可@群主帮忙置顶。时间请注明具体日期或者星期几，不要只用“今天”、“明天”这类词汇。',
      '为减少对大家的打扰，群主只帮忙置顶，不进行@所有人操作。',
      '大家平时建议屏蔽群消息，想打球时进群看置顶消息即可。',
      '本群只用于打球，不含社交属性，请勿长时间水群。'
    ],
    imageUrl: '',
  },
  {
    title: '周浦各羽毛球球馆简介',
    notes: [
      '周浦体育中心：上海市浦东新区小沥港路365号（羽毛球馆在3楼）。没有换衣间。停车免费。球馆价格实惠，但是光线差。',
      '周浦星辰羽毛球馆：上海市浦东新区沪南公路3758号D栋1层（18号线繁荣路地铁站附近）。停车免费。有免费开水供应。有换衣间。',
    ],
    imageUrl: '',
  },
]

const activityId = ref<string>('')
const storageKeyForToken = 'token:pageBadminton'
const token = ref<string>('')

const dialogVisibleRefund = ref<boolean>(false)
const handleCloseDialogVisibleRefund = () => {
  dialogVisibleRefund.value = false
}

interface IMember {
  id: number
  userId: number
  openid: string
  nickName: string
  fee: string
  payTime: string
}
const isInitialized = ref<boolean>(false)
const memberList = ref<IMember[]>([])

const openid = ref<string>('')
const userId = ref<number>(0)
const nickName = ref<string>('')
const apiPrefix = 'https://api.verysites.com/api/orzzone/'

// 用openid换取用户token
const queryTokenByOpenid = async (openidFromUrl) => {
  const res = await fetch(`${apiPrefix}user/login-by-openid`, {
    method: 'POST',
    body: JSON.stringify({
      openid: openidFromUrl,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const json = await res.json()
  // token过期或异常，让用户重新登录
  if (json.code !== 200) {
    token.value = ''
    localStorage.removeItem(storageKeyForToken)
    location.reload()
    return
  }
  token.value = json.data || ''
  localStorage.setItem(storageKeyForToken, token.value)
}
const queryUserInfo = async () => {
  const res = await fetch(`${apiPrefix}user/login-user`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
  const json = await res.json()
  // token过期或异常，让用户重新登录
  if (json.code !== 200) {
    token.value = ''
    localStorage.removeItem(storageKeyForToken)
    location.reload()
    return
  }
  openid.value = json.data.openid || ''
  userId.value = json.data.id || 0
  nickName.value = json.data.nickName || ''
}

const isMobileWechat = () => {
  const ua = navigator.userAgent.toLowerCase()

  const isWXWork = ua.toLowerCase().includes('wxwork')

  const isPCWechat = ua.toLowerCase().includes('windowswechat')

  return !isWXWork && !isPCWechat && ua.toLowerCase().includes('micromessenger')
}

const jumpWechatAuthorizationLink = async (attach) => {
  const res = await fetch(`${apiPrefix}wechat/authorization-link`, {
    method: 'POST',
    body: JSON.stringify({
      redirect_url: location.href,
      attach,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  if (json.code !== 200) {
    await ElMessageBox.alert(json.message)
    return
  }
  const link = json.data.data
  if (!link) {
    await ElMessageBox.alert('获取授权链接失败')
    return
  }
  // await ElMessageBox.confirm(`需要获取你的openid信息以确认身份，是否允许（不会涉及到你的微信昵称、性别、手机号等个人信息）`, '注意', {
  //   confirmButtonText: '好的',
  //   cancelButtonText: '暂不跳转',
  // })
  location.replace(link)
}

// 获取支付参数并发起支付动作
const fetchPayDataAndStartPay = async () => {
  const res = await fetch(`${apiPrefix}order/pay`, {
    method: 'POST',
    body: JSON.stringify({
      activityId: activityId.value,
      note: `羽毛球活动-${activityId.value}`,
      returnUrl: location.origin + location.pathname
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${token.value}`
    }
  })
  const json = await res.json()
  if (json.code !== 200) {
    await ElMessageBox.alert(json.message)
    return
  }
  const data = json.data
  const win = window as any
  function onBridgeReady() {
    win.WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        // 以下6个支付参数通过蓝兔支付的jsapi接口获取
        // **************************
        appId: data.appId, //公众号appid
        timeStamp: data.timeStamp, //时间戳
        nonceStr: data.nonceStr, //随机字符串
        package: data.package, //订单详情扩展字符串
        signType: data.signType, //签名方式
        paySign: data.paySign //签名
        // **************************
      },
      function (res) {
        // document.write('<p style="text-align:center;">返回的信息：' + JSON.stringify(res) + "</p>");
        // 支付成功
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          loopQueryOrderList()
        }
        // 支付过程中用户取消
        if (res.err_msg == "get_brand_wcpay_request:cancel") {
          //WeixinJSBridge.call('closeWindow');//关闭网页
        }
        // 支付失败
        if (res.err_msg == "get_brand_wcpay_request:fail") {
        }
        /**
         * 其它
         * 1、请检查预支付会话标识prepay_id是否已失效
         * 2、请求的appid与下单接口的appid是否一致
         * */
        if (res.err_msg == "调用支付JSAPI缺少参数：total_fee") {
        }
      }
    );
  }

  // 检测支付环境中的 WeixinJSBridge
  if (typeof win.WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener(
        "WeixinJSBridgeReady",
        onBridgeReady,
        false
      );
    } else if ((document as any).attachEvent) {
      (document as any).attachEvent("WeixinJSBridgeReady", onBridgeReady);
      (document as any).attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}

const doQueryOrderList = async () => {
  const res = await fetch(`${apiPrefix}order/orders?activityId=${activityId.value}`)
  const json = await res.json()
  memberList.value = json.data.map((item) => {
    return {
      id: item.id,
      userId: item.userId,
      nickName: item.user.nickName,
      fee: item.totalFee,
      payTime: item.successTime,
      numPigeons: item.user.numPigeons
    }
  })
  if (!isInitialized.value) {
    isInitialized.value = true
  }
}

const timerLoop = ref<number>(0)
const clearTimerLoop = () => {
  if (timerLoop.value) {
    clearInterval(timerLoop.value)
    timerLoop.value = 0
  }
}
const loopQueryOrderList = async () => {
  await doQueryOrderList()
  let num = 0
  timerLoop.value = window.setInterval(() => {
    num++
    doQueryOrderList()
    if (num >= 8) {
      clearTimerLoop()
    }
  }, 1000)
}

// 修改昵称
const toRename = async () => {
  if (!isMobileWechat()) {
    await ElMessageBox.alert('请在手机端微信中打开该页面')
    return
  }
  // 未登录用户，跳转授权链接获取openid
  if (!token.value) {
    await jumpWechatAuthorizationLink('rename')
    return
  }
  const { value } = await ElMessageBox.prompt('请输入昵称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /.+/,
    inputErrorMessage: '昵称不可为空',
  })
  const nickName = value
    .replace(/^\s+/g, '')
    .replace(/\s+$/g, '')
  if (!nickName) {
    await ElMessageBox.alert('昵称不可为空')
    return
  }
  const res = await fetch(`${apiPrefix}user/nick-name`, {
    method: 'PUT',
    body: JSON.stringify({
      nickName
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${token.value}`
    }
  })
  const json = await res.json()
  if (json.code !== 200) {
    await ElMessageBox.alert(json.message)
    return
  }
  ElMessageBox.alert(json.message)
  await loopQueryOrderList()
}

// 取消报名
const toRefund = async () => {
  if (!isMobileWechat()) {
    await ElMessageBox.alert('请在手机端微信中打开该页面')
    return
  }
  // 未登录用户，跳转授权链接获取openid
  if (!token.value) {
    await jumpWechatAuthorizationLink('refund')
    return
  }
  dialogVisibleRefund.value = true
}
const doRefund = async (usePigeon: boolean) => {
  // @ts-ignore
  await ElMessageBox.confirm('确定要取消报名吗？', '提醒', {
    confirmButtonText: '取消报名',
    cancelButtonText: '不取消报名',
    type: 'warning',
  })
  const res = await fetch(`${apiPrefix}order/refund`, {
    method: 'POST',
    body: JSON.stringify({
      activityId: activityId.value,
      usePigeon: usePigeon ? 1 : 0
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${token.value}`
    }
  })
  const json = await res.json()
  if (json.code !== 200) {
    await ElMessageBox.alert(json.message)
    return
  }
  const { totalFee, refundFee } = json.data
  handleCloseDialogVisibleRefund()
  ElMessageBox.alert(`您已取消活动，正在退款中。当前订单总额${totalFee}元，待退款金额${refundFee}元。一般来说零钱支付的退款5分钟内到账，银行卡支付的退款1-3个工作日到账。如长时间未收到退款请联系群主。`)
  await loopQueryOrderList()
}

// 退出登录
const toLogout = async () => {
  localStorage.clear()
  location.search = ''
}

// 去报名
const toJoin = async () => {
  if (!isMobileWechat()) {
    await ElMessageBox.alert('请在手机端微信中打开该页面')
    return
  }
  // 未登录用户，跳转授权链接获取openid
  if (!token.value) {
    await jumpWechatAuthorizationLink('join')
    return
  }
  // 已登录用户，直接尝试跳转付款界面，付款成功就算报名成功
  const message = [
    '请仔细阅读本页内容，尤其是退款说明和免责声明，付款报名即视为已阅读并同意本页所述内容。',
    '报名需预付15元，付费成功即报名成功。15元并非最终费用，活动结束后会按照AA原则计算每个人的费用，多退少补。'
  ].join('')
  await ElMessageBox.confirm(message, '注意', {
    confirmButtonText: '我知道了，去付款',
    cancelButtonText: '暂不报名',
  })
  await fetchPayDataAndStartPay()
}

onBeforeUnmount(() => {
  clearTimerLoop()
})
onMounted(async () => {
  // 取url上的6位日期数字作为活动id
  activityId.value = location.pathname.match(/[0-9]{6}/)[0]
  token.value = localStorage.getItem(storageKeyForToken) || ''
  const url = new URL(location.href)
  const params = new URLSearchParams(url.search)
  const openidFromUrl = params.get('openid')
  const attach = params.get('attach')

  // 查询订单列表（报名人员列表）
  loopQueryOrderList()

  if (!token.value) {
    if (openidFromUrl) {
      await queryTokenByOpenid(openidFromUrl)
    }
  }

  if (token.value) {
    await queryUserInfo()
    if (attach === 'join') {
      await toJoin()
      return
    }
    if (attach === 'refund') {
      await toRefund()
      return
    }
    if (attach === 'rename') {
      await toRename()
    }
  }
})
</script>

<style lang="scss">
.page-wrapper.badminton-sport {
  background-color: var(--color-gray);
}
</style>

<style lang="scss" scoped>
.page-badminton {
  display: block;
  font-size: 14px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px 0;
  background-color: var(--color-gray);

  .page-content {
    max-width: var(--site-width);
    min-height: calc(100% - 240px);
    background-color: var(--color-light);
    margin: 0 auto;
    padding: 0 30px;
    border-radius: 6px;
  }

  .markdown-render {
    display: block;
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 30px 0;
    :deep(h1) {
      text-align: center;
    }
  }

  .members-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin: 35px 0 0;
    .title {
      font-size: 14px;
      font-weight: bold;
      color: #ff0000;
    }
    .user-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pigeon-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
    }
    .login-user-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .buttons-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }

  .global-warning {
    display: block;
    text-align: center;
    line-height: 32px;
    color: #ff0000;
    font-size: 14px;
    font-weight: 600;
    background-color: var(--color-light);
    padding-top: 15px;
  }

  .global-note {
    display: block;
    text-align: center;
    line-height: 32px;
    color: #ff0000;
    font-size: 16px;
    font-weight: 600;
    background-color: var(--color-light);
    padding-top: 30px;
  }

  .cards-wrapper {
    display: block;
    background-color: var(--color-light);
    padding: 0;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 15px;
  }
}

@media screen and (max-width: 800px) {
  .page-badminton {
    .page-content {
      padding: 0 10px;
    }
  }
}
</style>
