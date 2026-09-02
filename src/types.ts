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

// 席位：桌面上一个固定的"座位"，用百分比坐标定位，与茶点无关
export type Seat = {
  id: string;
  x: string;      // 距桌左侧的百分比，例如 "50%"
  y: string;      // 距桌顶部的百分比
  zIndex: number; // 层级：越靠前（越靠下）越高，前面的茶点压住后面的
};

// 上桌状态：哪个茶点坐在哪个席位，只是一个小小的对应关系
export type PlacedDish = {
  dishId: string;
  seatId: string;
};
