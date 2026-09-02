import { useCallback, useState } from 'react';
import type { PlacedDish } from '../types';
import { SEAT_RING } from '../data/dishes';

/**
 * useTableState：管理「上桌 / 下桌 / 转桌」的全部状态。
 * 组件只管调用这三个动作，不用关心席位怎么分配。
 */
export function useTableState() {
  // 当前已上桌的茶点列表（茶点 id + 所坐席位 id）
  const [placed, setPlaced] = useState<PlacedDish[]>([
    { dishId: 'tingzaizhou', seatId: 'rear-c' },
    { dishId: 'xiajiao', seatId: 'rear-l' },
    { dishId: 'shaomai', seatId: 'front-c' },
  ]);

  // 桌上是否坐满（固定六席）
  const isFull = placed.length >= 6;

  // 查询某个茶点是否已上桌
  const isPlaced = useCallback(
    (dishId: string) => placed.some((p) => p.dishId === dishId),
    [placed]
  );

  /**
   * 上桌：从空席里挑一个给新茶点。
   * 桌满的拦截判断由界面在点击时完成（这里只做兜底保护）。
   */
  const placeDish = useCallback((dishId: string) => {
    setPlaced((prev) => {
      if (prev.length >= 6 || prev.some((p) => p.dishId === dishId)) {
        return prev; // 已满或已上桌：不做任何改动
      }
      const usedSeats = new Set(prev.map((p) => p.seatId));
      const emptySeat = SEAT_RING.find((id) => !usedSeats.has(id));
      if (!emptySeat) return prev; // 理论上不会发生（长度已判断）
      return [...prev, { dishId, seatId: emptySeat }];
    });
  }, []);

  // 下桌：把茶点从席位上撤走，席位立刻可复用
  const removeDish = useCallback((dishId: string) => {
    setPlaced((prev) => prev.filter((p) => p.dishId !== dishId));
  }, []);

  /**
   * 转桌：所有已上桌茶点沿圆桌移动一个席位。
   * direction 为 'left' 时逆时针轮换、'right' 时顺时针轮换；
   * 茶点图片只平移，不旋转、不缩放。
   */
  const rotate = useCallback((direction: 'left' | 'right') => {
    setPlaced((prev) =>
      prev.map((p) => {
        const index = SEAT_RING.indexOf(p.seatId);
        // +1 是沿圈走一格；取模让首尾相连
        const step = direction === 'left' ? 1 : -1;
        const next = (index + step + SEAT_RING.length) % SEAT_RING.length;
        return { ...p, seatId: SEAT_RING[next] };
      })
    );
  }, []);

  return { placed, isFull, isPlaced, placeDish, removeDish, rotate };
}
