import { useCallback, useState } from 'react';
import type { PlacedDish } from '../types';
import { MAX_DISHES } from '../data/dishes';

/**
 * useTableState：管理「上桌 / 下桌 / 转桌」的全部状态。
 * 席位不固定：每道菜只记一个序号（order），摆盘角度由当前菜数均分圆周得出。
 * 组件只管调用这三个动作，不用关心位置怎么算。
 */
export function useTableState() {
  // 当前已上桌的茶点列表（茶点 id + 摆盘序号）
  // 默认三款：粥在正上方，虾饺、烧卖分居两侧，三者在圆周上互成 120°
  const [placed, setPlaced] = useState<PlacedDish[]>([
    { dishId: 'tingzaizhou', order: 0 },
    { dishId: 'xiajiao', order: 1 },
    { dishId: 'shaomai', order: 2 },
  ]);

  // 桌上是否坐满（最多同时上 MAX_DISHES 道菜）
  const isFull = placed.length >= MAX_DISHES;

  // 查询某个茶点是否已上桌
  const isPlaced = useCallback(
    (dishId: string) => placed.some((p) => p.dishId === dishId),
    [placed]
  );

  /**
   * 上桌：新菜排到队尾拿到一个新序号。
   * 界面上的位置由「菜数均分圆周」算出，所以原有菜品会平滑滑到新的均分位置。
   * 桌满的拦截判断由界面在点击时完成（这里只做兜底保护）。
   */
  const placeDish = useCallback((dishId: string) => {
    setPlaced((prev) => {
      if (prev.length >= MAX_DISHES || prev.some((p) => p.dishId === dishId)) {
        return prev; // 已满或已上桌：不做任何改动
      }
      return [...prev, { dishId, order: prev.length }];
    });
  }, []);

  /**
   * 下桌：把菜撤走，剩下的菜按相对顺序重新编号（0..n-1），
   * 于是它们会自动滑动、重新均分整个圆周。
   */
  const removeDish = useCallback((dishId: string) => {
    setPlaced((prev) =>
      prev
        .filter((p) => p.dishId !== dishId)
        .map((p, i) => ({ ...p, order: i }))
    );
  }, []);

  /**
   * 转桌：所有菜沿圆桌挪一格（角度步长 = 360°/当前菜数）。
   * direction 为 'left' 时顺时针轮换、'right' 时逆时针轮换；
   * 茶点图片只平移，不旋转、不缩放。
   */
  const rotate = useCallback((direction: 'left' | 'right') => {
    setPlaced((prev) => {
      const n = prev.length;
      if (n === 0) return prev; // 空桌不用转
      const step = direction === 'left' ? 1 : -1;
      return prev.map((p) => ({
        ...p,
        order: (p.order + step + n) % n, // 取模让首尾相连
      }));
    });
  }, []);

  return { placed, isFull, isPlaced, placeDish, removeDish, rotate };
}
