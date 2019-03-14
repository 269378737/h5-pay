<template>
    <div class="container">  
        <el-row id="title" class="fixed-layout" style="z-index:2" v-show="isAndroid()">
            <el-col :p="24">
                <div class="nav-bar">
                <i class="el-icon-arrow-left" @click="backUrl"></i>
                <div class="title">云存储服务协议</div>
                </div>
            </el-col>
        </el-row>
        <div class="protocol" :style="{ paddingTop: ($store.getters.getBarHeight + 90) + 'px' }">
            <p>
                <span style="font-size: 14px;">云存储服务协议</span>
            </p>
            <p>
                <span style="font-size: 14px;">本协议系《创智用户注册协议》中一部分由四川创智科技有限公司及其关联公司,以下简称“创智”与创智云服务的使用者(以下简称“您”或“用户”)所订立。创智在此特别提醒您在使用创智云存储服务之前，请您务必审慎阅读、充分理解本《创智云存储服务协议》以下简称“本协议”。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">&nbsp; 一、 服务内容&nbsp; 创智云存储服务是一个向广大创智用户提供数据存储、管理、分享等在线服务的平台</span>
            </p>
            <p>
                <span style="font-size: 14px;">其本身不直接上传或提供内容。</span>
            </p>
            <p>
                <span style="font-size: 14px;">您在注册登录后</span>
            </p>
            <p>
                <span style="font-size: 14px;">可添加您的创智智能设备</span>
            </p>
            <p>
                <span style="font-size: 14px;">即可通过网页界面、PC客户端或移动客户端界面对已添加的设备进行远程操作</span>
            </p>
            <p>
                <span style="font-size: 14px;">具体如下&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1、查看功能&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1)视频预览:&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">您可通过客户端实时预览设备的直播视频&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2)视频回放</span>
            </p>
            <p>
                <span style="font-size: 14px;">您可通过客户端查看存储在创智智能设备或记忆卡中的历史视频，若开通创智云存储服务可回放存储在创智云存储上的历史视频。</span>
            </p>
            <p>
                <span style="font-size: 14px;">3)云图像</span>
            </p>
            <p>
                <span style="font-size: 14px;">若您的设备支持云存储功能购买并开通创智云存储服务后，可在服务周期内查看存储在云存储上的报警录像和图片。</span>
            </p>
            <p>
                <span style="font-size: 14px;">2、互动功能&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1)对讲</span>
            </p>
            <p>
                <span style="font-size: 14px;">若您的设备支持对讲功能可通过客户端与创智智能设备端的家人/朋友行实时对讲&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2)留言</span>
            </p>
            <p>
                <span style="font-size: 14px;">若您的设备支持留言功能可通过客户端与创智智能设备端的家人/朋友进行视频留言互动&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">3)云台</span>
            </p>
            <p>
                <span style="font-size: 14px;">若您的设备支持云台功能您可通过客户端远程操作创智智能设备的云台功</span>
            </p>
            <p>
                <span style="font-size: 14px;">能&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">4)手动录像</span>
            </p>
            <p>
                <span style="font-size: 14px;">在视频预览或回放时均可对视频进行手动录像并保存在本地&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">5)手动截图</span>
            </p>
            <p>
                <span style="font-size: 14px;">在视频预览或回放时可对当前画面进行截图保存。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">3、信息功能&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1信息推送</span>
            </p>
            <p>
                <span style="font-size: 14px;">若您的设备支持活动检测功能</span>
            </p>
            <p>
                <span style="font-size: 14px;">开通“活动检测提醒”后检测到特定活动时会向您的客户端推送事件消息&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2历史信息</span>
            </p>
            <p>
                <span style="font-size: 14px;">您可以通过客户端查看最近7天的活动检测信息、留言信息。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">4、社交功能&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1)好友分享</span>
            </p>
            <p>
                <span style="font-size: 14px;">您可将创智智能设备的视频通过手机号分享给您的好友</span>
            </p>
            <p>
                <span style="font-size: 14px;">还可根据需要自定义分享的时间及好友查看视频的权限&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2)社交软件分享</span>
            </p>
            <p>
                <span style="font-size: 14px;">可将创智智能设备的视频、图片通过手机客户端分享给您的微信好友、微信朋友圈也可根据需要自定义分享的时间您的好友可查看视频、还可再次分享给其他好友&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">3)二维码分享</span>
            </p>
            <p>
                <span style="font-size: 14px;">可给设备生成二维码分享给好友</span>
            </p>
            <p>
                <span style="font-size: 14px;">好友通过手机客户端扫描二维码即可查看视频&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">4)创智智能直播分享</span>
            </p>
            <p>
                <span style="font-size: 14px;">您可将设备中的现场视频或者视频录像分享到创智直播频道其他用户或游客可以实时观看并分享该视频。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">您理解：不同创智智能设备对应的功能有所不同，可能仅包含上述部分功能，具体参见操作手册且创智保留随时新增、删除、调整上述功能之权利。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">二、收费须知&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1.云存储属于收费服务</span>
            </p>
            <p>
                <span style="font-size: 14px;">您需通过购买充值卡、在线支付或其他方式支付服务费用进行充值。创智保留随时调整相关费用的权利。</span>
            </p>
            <p>
                <span style="font-size: 14px;">如您的设备支持云存储，则开通云存储服务后，当设备检测到监测范围内有活动情况时设备会自动开启云存储进行视频录像。&nbsp;&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2.您理解并同意&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1本协议项下所述之服务购买成功后不支持退换货、不支持退款。&nbsp; &nbsp;&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2已购买服务和购买账户绑定，无法转增至其他账户如在原账户下删除已购买。</span>
            </p>
            <p>
                <span style="font-size: 14px;">云存储服务的设备，后添加至新账号，该设备将无法继续享受云存储服务。&nbsp;&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">3.您理解并同意本协议项下服务因任何原因出现暂停情况服务期限将不延长。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">4.创智有权根据您的使用情况从您的账户余额中直接扣除相关费用。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">5.当存在如下情形之一时，创智有权对您的账户余额进行全部或部分冻结&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1国家机关有权要求进行冻结的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2您使用创智云存储服务的行为涉嫌违反国家法律法规的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">3创智基于单方面合理判断，认为您的账户操作或资金流等存在异常时，创智按照前述规定对您的账户余额进行冻结后，将通过邮件、站内信或短信等便捷方式通知您。若您存在异议，可联系创智客服中心。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">6.除上述费用您需自行承担与使用本网站有关的设备</span>
            </p>
            <p>
                <span style="font-size: 14px;">如创智智能设备、个人计算机、移动终端、调制解调器及其他与接入互联网有关的装置等并承担所需的其他费用，如为接入互联网而支付的电话费及宽带费等。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">三、使用须知&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1.使用创智云存储服务，每台创智智能设备至少需要4M带宽购买前请确保您的网络符合要求。同一个局域网中有2台或2台以上设备开启则相应地对您的带宽要求会增加否则可能影响您的单台设备的存储速度。 2. 创智云存储服务仅供非商业使用。未经创智公司事先书面同意，您不得利用创智云存储服务进行任何商业用途，否则创智可立即暂停或终止向您提供创智云存储服务，并保留依法向您追究法律责任的权利。您承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等“七条底线”不得利用创智云存储服务以任何方式制作、复制、发布、传播以下信息&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">a)违反宪法确定的基本原则的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">b)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的</span>
            </p>
            <p>
                <span style="font-size: 14px;">c)损害国家荣誉和利益的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">d)煽动民族仇恨、民族歧视破坏民族团结的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">e)破坏国家宗教政策宣扬邪教和封建迷信的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">f)散布谣言扰乱社会秩序破坏社会稳定的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">g)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">h)侮辱或者诽谤他人侵害他人合法权益的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">i)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">j)以非法民间组织名义活动的&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">k)含有法律、法规、规章或其他规范性文件禁止的其他内容的。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">您若通过创智云存储散布或传播违反上述规定的信息，创智公司有权采取删除信息、中止服务、终止服务、向相关监管部门举报等措施，并有权限制您部分或全部功能。若您因上述行为给创智公司或第三方造成损失您应予以赔偿。另外，您知悉并同意，创智公司有权向政府主管部门、司法机关等有关机构提供必要、合理的系统记录。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2.&nbsp; 创智云存储的某些功能可让您的视频实时共享在视频广场或您的社交圈。您理解即使您删除该视频但仍可能被第三方独立地缓存、复制或存储。若您的视频内容包含您或他人的个人信息，创智公司在此郑重提醒并请您慎重考虑是否有上传、发布、公开之必要。您在公开渠道披露个人信息可能被他人出于不法目的收集并使用您应自行承担因此造成的潜在风险及损失。&nbsp; &nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">四、许可 您同意您将您的视频实时共享在视频广场或您的社交圈则视为您授权创智及其他用户在全球范围内的、免费的、不可撤销的、无固定限期的并且再许可的权利进行使用、展示、散布及推广前述内容并授权对前述内容进行任何形式的复制、修改、出版、发行及以其他方式使用。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">五、责任声明及限制</span>
            </p>
            <p>
                <span style="font-size: 14px;">1.任何经由创智云存储服务以上传、发布、传送或通过其他方式传播的信息无论系公开还是私下传送均由您对上传行为承担责任并保证上传内容的合法性、完整性、真实性。除此以外若您出于信赖使用或传播其他用户上传的信息您也应自行承担潜在责任与风险。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2.如因您利用创智云存储服务提供的网络服务上传、发布、传送或通过其他方式传播的信息存在权利瑕疵或侵犯了第三方的合法权益包括但不限于专利权、商标权、著作权、肖像权、隐私权、名誉权等导致的任何第三方索赔应且仅由您本人承担。若因此引起创智公司及其员工、客户或合作伙伴被第三方索赔的您应承担由此给创智公司及其员工、客户或合作伙伴造成的全部损失包含律师费。 3.创智公司仅按现有技术提供相应的安全措施以防创智云存储上存储的信息不丢失、不被滥用等情况但无法对您的信息绝对安全做出任何明示或默示的保证。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">4.使用创智云存储服务需接入互联网请注意防范网络安全风险。因网络攻击、黑客攻击、病毒感染等原因将导致网站运行异常、信息泄露、数据丢失或其他问题，您在此同意将自行承担风险和损失。</span>
            </p>
            <p>
                <span style="font-size: 14px;">六、其他&nbsp;&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">1.在使用创智云存储服务时，您还需遵守《用户注册协议》、《隐私权政策》等协议。&nbsp;</span>
            </p>
            <p>
                <span style="font-size: 14px;">2.在法律允许的最大范围内创智公司对本条款拥有解释权和修改权。</span>
            </p>
            <p>
                <br/>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    mounted () {
        this.layoutStatuBar(this.$store.getters.getBarHeight)
        document.body.scrollTop = 0
        if(!this.isAndroid()) {
            this.postMessageToIOS({ navTitle: "云存储服务协议" });
        }
    },
    methods: {
        backUrl () {
            this.$router.push('/home')
        },
        /** 设置导航布局 */
        layoutStatuBar (height) {
            document.getElementsByClassName('statu-bar')[0].style.height = height + 'px'

            let title = document.getElementById('title')
            title.style.paddingTop = height + 'px'
        },
    }
}
</script>

<style scoped>
.protocol {
  padding: 7.5rem 10px 10px;
}
p {
  text-indent: 2rem;
}
</style>
