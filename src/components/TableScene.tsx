import { useRef } from 'react';
import type { Dish, PlacedDish } from '../types';
import { SEATS } from '../data/dishes';

type Props = {
  dishes: Dish[];
  placed: PlacedDish[];
  onRotate: (direction: 'left' | 'right') => void;
  onOpenDish: (dish: Dish) => void;
};

/**
 * TableScene：桌面场景。
 * - 深木圆桌 + 六个固定席位，茶点按席位坐标摆放；
 * - 左右拖动（超过 42px）触发转桌，席位轮换、CSS 过渡吸附；
 * - 位移小于 10px 视为点击茶点，打开介绍卡。
 */
export function TableScene({ dishes, placed, onRotate, onOpenDish }: Props) {
  // 记录拖动过程的小账本：起点、位移量、是否已经触发过转桌
  const drag = useRef({ startX: 0, distance: 0, rotated: false, pressing: false });

  // 手指/鼠标按下：记住起点，重置本轮拖动记录
  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, distance: 0, rotated: false, pressing: true };
  };

  // 拖动中：一旦左右位移超过 42px 就转桌一次（每次按下最多转一格）
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.pressing) return;
    drag.current.distance = e.clientX - drag.current.startX;
    if (!drag.current.rotated && Math.abs(drag.current.distance) > 42) {
      onRotate(drag.current.distance < 0 ? 'left' : 'right');
      drag.current.rotated = true;
    }
  };

  // 抬起：结束本轮拖动（点击逻辑交给茶点自身的 onClick 判断）
  const handlePointerUp = () => {
    drag.current.pressing = false;
  };

  // 点击茶点：只有几乎没拖动（<10px）才算点击，避免转桌时误开弹窗
  const handleDishClick = (dish: Dish) => {
    if (Math.abs(drag.current.distance) < 10) onOpenDish(dish);
  };

  // 席位 id → 坐标信息，用来摆放每个茶点
  const seatMap = new Map(SEATS.map((s) => [s.id, s]));

  return (
    <div
      className="table-scene"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 桌面本体：圆木桌，带一圈转桌轨道装饰线 */}
      <div className="table-surface">
        <div className="table-track" aria-hidden="true" />
        {placed.map(({ dishId, seatId }) => {
          const dish = dishes.find((d) => d.id === dishId);
          const seat = seatMap.get(seatId);
          if (!dish || !seat) return null;
          return (
            <div
              key={dishId}
              className="table-dish"
              style={{ left: seat.x, top: seat.y, zIndex: seat.zIndex }}
            >
              <img
                src={dish.asset}
                alt={dish.fullName}
                draggable={false}
                onClick={() => handleDishClick(dish)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
