import { useRef } from 'react';
import type { Dish, PlacedDish } from '../types';
import { ringPosition } from '../data/dishes';

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
  // 记录拖动过程的小账本：
  // originX = 本轮按下时的起点（算总位移，用于区分点击）；
  // anchorX = 转桌锚点（每转一格就重设，实现连续转桌）；
  // total   = 手指离起点的总位移。
  const drag = useRef({ originX: 0, anchorX: 0, total: 0, pressing: false });

  // 手指/鼠标按下：记住起点，重置本轮拖动记录
  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current = { originX: e.clientX, anchorX: e.clientX, total: 0, pressing: true };
  };

  // 拖动中：每累计满 42px 就转一格并重设锚点，长拖可以连续转
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.pressing) return;
    drag.current.total = e.clientX - drag.current.originX;
    const dx = e.clientX - drag.current.anchorX;
    if (Math.abs(dx) > 42) {
      onRotate(dx < 0 ? 'left' : 'right');
      drag.current.anchorX = e.clientX;
    }
  };

  // 抬起：结束本轮拖动（点击逻辑交给茶点自身的 onClick 判断）
  const handlePointerUp = () => {
    drag.current.pressing = false;
  };

  // 点击茶点：只有几乎没拖动（<10px）才算点击，避免转桌时误开弹窗
  const handleDishClick = (dish: Dish) => {
    if (Math.abs(drag.current.total) < 10) onOpenDish(dish);
  };

  // 摆盘位置实时计算：当前有 count 道菜，就把圆周均分成 count 份，
  // 每道菜按自己的序号坐进对应角度（上菜/下桌后所有人自动重新均分）
  const count = placed.length;

  return (
    <div
      className="table-scene"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 桌面本体：深木圆桌图（桌沿与转桌轨道圈都画在图里） */}
      <div className="table-surface">
        {/* ?v=2 用于强制刷新浏览器缓存（圆桌图更新过一版） */}
        <img className="table-img" src="/圆桌.png?v=2" alt="" draggable={false} aria-hidden="true" />
        {placed.map(({ dishId, order }) => {
          const dish = dishes.find((d) => d.id === dishId);
          if (!dish) return null;
          const pos = ringPosition(order, count);
          return (
            <div
              key={dishId}
              className="table-dish"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: pos.zIndex,
              }}
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

      {/* 转桌提示：叠在桌面下沿，与参考图一致 */}
      <p className="drag-hint" aria-hidden="true">
        <i>←</i> 左右拖动转桌 <i>→</i>
      </p>
    </div>
  );
}
