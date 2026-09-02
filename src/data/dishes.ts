import type { Dish } from '../types';

/**
 * 首发茶点资料：共 8 款，全部基于广州市政府官网原文整理，
 * 每一款都能在介绍卡里点回官方出处。
 * 图片来自 dimsums 目录（png 为透明底成品）。
 */
export const DISHES: Dish[] = [
  {
    id: 'xiajiao',
    name: '虾饺',
    fullName: '薄皮鲜虾饺',
    category: '蒸点',
    asset: '/xiajiao.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/xiajiao.png',
    intro:
      '虾饺是广州传统美点，以澄面制成薄而半透明的外皮，包入鲜虾馅蒸熟。成品清鲜味美、爽滑有汁，隐约可见的虾馅让它形似一梳香蕉，是广式早茶最具代表性的蒸点之一。',
    notes: ['澄面薄皮', '鲜虾馅', '晶莹爽滑'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801848.html',
    sourceName: '广州市政府',
  },
  {
    id: 'shaomai',
    name: '烧卖',
    fullName: '干蒸烧卖仔',
    category: '蒸点',
    asset: '/shaomai.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/shaomai.png',
    intro:
      '干蒸烧卖仔是广州茶楼传统早点，以薄面皮包裹半露肉馅蒸熟，色鲜味美、爽口不腻，与虾饺并称茶点"双璧"。',
    notes: ['薄面皮', '半露肉馅', '爽口不腻'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801849.html',
    sourceName: '广州市政府',
  },
  {
    id: 'changfen',
    name: '肠粉',
    fullName: '布拉肠（广式肠粉）',
    category: '蒸点',
    asset: '/changfen.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/changfen.png',
    intro:
      '布拉肠是广州名气最大的传统小吃之一：米浆倒在铺于蒸笼的布上蒸熟，粉皮薄如蝉翼、晶莹剔透，浇上酱汁口感细腻爽滑而不失韧性；最初由泮塘荷仙馆创制，后加入鲜虾、牛肉等馅料，品种日渐丰富。',
    notes: ['薄如蝉翼', '鲜虾馅料', '酱汁爽滑'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801866.html',
    sourceName: '广州市政府',
  },
  {
    id: 'hongmichang',
    name: '红米肠',
    fullName: '金莎红米肠',
    category: '蒸点',
    asset: '/hongmichang.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/hongmichang.png',
    intro:
      '金莎红米肠寓意鸿运当头：红米外皮软糯，内里网皮酥脆，虾仁 Q 弹，一口能尝到三种口感，是茶楼常年畅销的招牌茶点。',
    notes: ['红米外皮', '酥脆网皮', 'Q弹虾仁'],
    sourceUrl:
      'https://www.gz.gov.cn/zt/jrshts/2026n/nwzgz/nwgz/content/mpost_10689712.html',
    sourceName: '广州市政府',
  },
  {
    id: 'fengzhua',
    name: '凤爪',
    fullName: '豉汁蒸凤爪',
    category: '蒸点',
    asset: '/fengzhua.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/fengzhao.png',
    intro:
      '广州早茶人气茶点，2021 年大数据统计中位列广州茶点前四；先炸后与豉汁同蒸，软烂入味、啖啖皆香，老广谓之"抓财"。',
    notes: ['豉汁浓郁', '软烂入味', '花生垫底'],
    sourceUrl: 'http://sw.gz.gov.cn/xxgk/jyta/content/post_8689347.html',
    sourceName: '广州市商务局',
  },
  {
    id: 'jinqiandu',
    name: '金钱肚',
    fullName: '沙爹金钱肚',
    category: '蒸点',
    asset: '/jinqiandu.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/jinqiandu.png',
    intro:
      '蜂窝状金钱肚沤软入味、沙爹汁香浓四溢，在 2025 年官方票选中以逾 206 万票跻身广州"最受欢迎的十大名点"。',
    notes: ['蜂窝状肚', '沙爹汁香'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/wlzx/content/post_10466310.html',
    sourceName: '广州市政府',
  },
  {
    id: 'paigu',
    name: '排骨',
    fullName: '金银蒜香蒸排骨',
    category: '蒸点',
    asset: '/paigu.png',
    cardAsset: '/guangfu-dim-sum-cards/visual/paigu.png',
    intro:
      '慢火细蒸，锁住排骨的原鲜，金银蒜增加风味，鲜嫩、入味、多汁，是"一盅两件"之外最常加单的茶点。',
    notes: ['金银蒜香', '鲜嫩多汁'],
    sourceUrl:
      'https://www.gz.gov.cn/zt/jrshts/2026n/nwzgz/nwgz/content/mpost_10689712.html',
    sourceName: '广州市政府',
  },
  {
    id: 'tingzaizhou',
    name: '艇仔粥',
    fullName: '荔湾艇仔粥',
    category: '粥粉',
    asset: '/tingzaizhou.png?v=2', // ?v=2 强制刷新缓存（艇仔粥图更新过一版）
    cardAsset: '/guangfu-dim-sum-cards/visual/tingzaizhou.png',
    intro:
      '荔湾艇仔粥源自旧时荔枝湾的粥艇：疍家人摇橹卖粥，以河虾、鱼片等配料现煮滚制，热气腾腾、鲜甜可口，是广州粥品的代表。',
    notes: ['料足鲜甜', '绵滑粥底'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801852.html',
    sourceName: '广州市政府',
  },
  {
    id: 'chasibao',
    name: '叉烧包',
    fullName: '蜜汁叉烧包',
    category: '蒸点',
    asset: '/chasibao.png?v=2', // ?v=2 强制刷新缓存（图更新为无背景版）
    cardAsset: '/guangfu-dim-sum-cards/visual/chashaobao.png',
    intro:
      '叉烧包是广州人最亲切的大众点心：发酵面团蒸得洁白松软，顶部自然开裂露出叉烧芡馅。肥瘦相间的叉烧丝裹着甜咸芡汁，趁热咬开香气四溢，与虾饺、烧卖、蛋挞并称茶点"四大天王"。',
    notes: ['包皮松软', '馅香有汁', '顶上开裂'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801850.html',
    sourceName: '广州市政府',
  },
  {
    id: 'liushabao',
    name: '流沙包',
    fullName: '咸香流沙包',
    category: '蒸点',
    asset: '/liushabao.png?v=2', // ?v=2 强制刷新缓存（图更新为无背景版）
    cardAsset: '/guangfu-dim-sum-cards/visual/liushabao.png',
    intro:
      '流沙包是近年茶楼的人气之选：雪白包子入口松软，轻轻咬开，咸蛋黄与奶油融成的金色"流沙"便缓缓淌出，咸香细腻、甜中带咸，一口就让人明白它为何经久不衰。',
    notes: ['雪白松软', '金沙流心', '咸香细腻'],
  },
  {
    id: 'nuomiji',
    name: '糯米鸡',
    fullName: '荷香糯米鸡',
    category: '粥粉',
    asset: '/nuomiji.png?v=2', // ?v=2 强制刷新缓存（图更新为无背景版）
    cardAsset: '/guangfu-dim-sum-cards/visual/nuomiji.png',
    intro:
      '荷香糯米鸡是茶市饭点的主角：糯米裹入鸡肉、叉烧、咸蛋黄、冬菇等丰富馅料，以荷叶包实蒸熟。揭盖瞬间荷香扑鼻，糯米绵软吸足馅汁，咸鲜油润，一份就能吃得心满意足。',
    notes: ['荷叶清香', '糯米绵软', '馅料丰盈'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801851.html',
    sourceName: '广州市政府',
  },
  {
    id: 'danta',
    name: '蛋挞',
    fullName: '酥皮蛋挞',
    category: '甜点',
    asset: '/danta.png?v=2', // ?v=2 强制刷新缓存（图更新为无背景版）
    cardAsset: '/guangfu-dim-sum-cards/visual/danta.png',
    intro:
      '酥皮蛋挞是广式茶点的甜蜜句号：小圆挞皮盛入蛋浆烘烤，外层层层起酥、金黄松脆，内里蛋浆香甜嫩滑。一盅两件之余来上一件，恰好收尾。',
    notes: ['千层酥皮', '嫩滑蛋馅', '金黄焦香'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801854.html',
    sourceName: '广州市政府',
  },
];

/**
 * 摆盘几何：所有茶点沿一个椭圆环均匀分布。
 * 有几道菜就把 360° 均分成几份（3 道菜互成 120°，8 道菜互成 45°），
 * 坐标用百分比表示，和桌子的显示尺寸解耦。
 */
export const RING = {
  cx: 50,   // 环心横坐标（桌面宽度的百分比）
  cy: 45.5, // 环心纵坐标（桌面高度的百分比）
  rx: 30,   // 横向半径
  ry: 31.5, // 纵向半径
};

// 桌面最多同时上几道菜
export const MAX_DISHES = 8;

/**
 * 根据序号算出均分后的位置：
 * index 为 0 的茶点固定在正上方，其余顺时针依次排开。
 * zIndex 随"越靠下越靠前"变化，前面的茶点自然压住后面的。
 */
export function ringPosition(index: number, count: number) {
  const angle = -90 + (360 / count) * index;
  const rad = (angle * Math.PI) / 180;
  return {
    x: RING.cx + RING.rx * Math.cos(rad),
    y: RING.cy + RING.ry * Math.sin(rad),
    zIndex: Math.round(50 + 50 * Math.sin(rad)),
  };
}

// 菜单顶部的分类筛选（甜点素材待补，先保留入口）
export const FILTERS = ['全部', '蒸点', '粥粉', '甜点'] as const;
