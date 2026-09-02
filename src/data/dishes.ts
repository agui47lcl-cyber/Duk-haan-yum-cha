import type { Dish, Seat } from '../types';

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
    intro:
      '荔湾艇仔粥源自旧时荔枝湾的粥艇：疍家人摇橹卖粥，以河虾、鱼片等配料现煮滚制，热气腾腾、鲜甜可口，是广州粥品的代表。',
    notes: ['料足鲜甜', '绵滑粥底'],
    sourceUrl: 'https://www.gz.gov.cn/zlgz/gzly/msgz/dxxc/content/post_7801852.html',
    sourceName: '广州市政府',
  },
];

/**
 * 桌面固定七席：7 个茶点沿椭圆圆周均分（每格约 51.4°），
 * 坐标按几何计算量取，保证相邻茶点互不重叠。
 * 顺序沿圆周顺时针：顶 → 右上 → 右中 → 右下 → 左下 → 左中 → 左上。
 */
export const SEATS: Seat[] = [
  { id: 'top', x: '50%', y: '14%', zIndex: 1 }, // 顶部正中
  { id: 'upper-r', x: '73%', y: '27%', zIndex: 2 }, // 右上
  { id: 'mid-r', x: '79%', y: '53%', zIndex: 3 }, // 右中
  { id: 'bottom-r', x: '63%', y: '74%', zIndex: 4 }, // 右下
  { id: 'bottom-l', x: '37%', y: '74%', zIndex: 4 }, // 左下
  { id: 'mid-l', x: '21%', y: '53%', zIndex: 3 }, // 左中
  { id: 'upper-l', x: '27%', y: '27%', zIndex: 2 }, // 左上
];

/**
 * 转桌轮换顺序：把七个席位按圆桌的环状排成一个圈，
 * 转桌时每个茶点移动到圈里的相邻席位，实现"2D 转桌"。
 * 顺序与 SEATS 的顺时针排列一致，首尾相连。
 */
export const SEAT_RING: string[] = [
  'top',
  'upper-r',
  'mid-r',
  'bottom-r',
  'bottom-l',
  'mid-l',
  'upper-l',
];

// 桌面最大席位数量（与 SEATS / SEAT_RING 保持一致）
export const SEAT_COUNT = SEAT_RING.length;

// 菜单顶部的分类筛选（甜点素材待补，先保留入口）
export const FILTERS = ['全部', '蒸点', '粥粉', '甜点'] as const;
