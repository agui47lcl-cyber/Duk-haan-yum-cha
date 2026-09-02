/**
 * 数据类型定义：把「茶点资料 / 桌面席位 / 上桌状态」三件事分开管理，
 * 好处是改资料不用动桌子逻辑，改桌子布局也不用动资料。
 */

// 茶点：一份介绍卡的完整资料（对应菜单里的一个卡片）
export type DishCategory = '蒸点' | '粥粉' | '甜点';

export type Dish = {
  id: string;          // 唯一标识，例如 "xiajiao"
  name: string;        // 菜单/桌上显示的短名，例如 "虾饺"
  fullName: string;    // 弹窗标题用的官方全名，例如 "薄皮鲜虾饺"
  category: DishCategory;
  asset: string;       // 图片路径（dimsums 目录已映射为站点根目录）
  intro: string;       // 介绍卡文案（基于官方原文整理）
  notes: string[];     // 弹窗图片旁的 2~3 个标注短语
  sourceUrl: string;   // 官方资料链接（政府网站）
  sourceName: string;  // 来源名称，展示在链接旁
};

// 上桌状态：哪个茶点坐在第几个位置（order 从 0 开始）。
// 席位不再固定：摆盘位置由「当前桌上菜的数量」把圆周均分算出来，
// 例如 3 道菜互成 120°、8 道菜互成 45°，下桌后剩下的菜自动重新均分。
export type PlacedDish = {
  dishId: string;
  order: number;
};
