import { useRef, useState } from 'react';
import type { Dish, PlacedDish } from '../types';
import { ringPosition } from '../data/dishes';

type Props = {
  dishes: Dish[];
  placed: PlacedDish[];
  onRotate: (direction: 'left' | 'right') => void;
  onOpenDish: (dish: Dish) => void;
  onRemove: (dishId: string) => void;
  onClearAll: () => void;
};

// 长按判定时长（毫秒）：按住这么久不动，茶点进入"拿起"状态
const LONG_PRESS_MS = 420;
// 上滑移除的触发距离（px）：拿起后往上拖超过这个距离才算撤走
const SWIPE_UP_PX = 60;
// 取消长按的位移（px）：拿起前手指乱动/转桌，就取消本次长按
const CANCEL_PX = 12;

/**
 * TableScene：桌面场景。
 * - 深木圆桌 + 均分圆环摆盘，左右拖动（超过 42px）转桌，小位移点击开介绍卡；
 * - 长按茶点 0.4 秒"拿起"，再往上滑出一段距离即撤下这道菜（菜单按钮同步变回"上菜"）；
 * - 桌下右侧有"清桌"按钮，一键撤走全部茶点。
 */
export function TableScene({ dishes, placed, onRotate, onOpenDish, onRemove, onClearAll }: Props) {
  // 记录拖动过程的小账本：
  // originX = 本轮按下时的起点（算总位移，用于区分点击）；
  // anchorX = 转桌锚点（每转一格就重设，实现连续转桌）；
  // total   = 手指离起点的总位移；
  // lifted  = 桌上某道茶点正处于"拿起（长按成功）"状态，此时转桌要让位。
  const drag = useRef({ originX: 0, anchorX: 0, total: 0, pressing: false });
  const lifted = useRef(false);
  // 刚结束"拿起"状态（长按后没上滑直接松手）：这一次点击不要打开介绍卡
  const justLifted = useRef(false);

  // 长按手势的小账本：
  // dishId = 正在按的茶点；timer = 长按定时器；
  // startX/startY = 按下起点（算上滑距离用）；removed = 本次手势已撤菜。
  const press = useRef({ dishId: '', timer: 0, startX: 0, startY: 0, removed: false });

  // 当前处于"拿起"状态的茶点 id（用来给图片加放大高亮样式）
  const [liftedId, setLiftedId] = useState('');
  // 拿起后茶点跟着手指移动的偏移量（负值 = 向上/向左），松手归零弹回
  const [liftOffset, setLiftOffset] = useState({ x: 0, y: 0 });

  // 结束长按手势：清掉定时器和状态（拿起前的普通移动/松手都走这里）
  const endPress = () => {
    window.clearTimeout(press.current.timer);
    press.current.dishId = '';
    press.current.removed = false;
    justLifted.current = lifted.current; // 记下"刚拿起过"，用来拦住紧跟着的误触点击
    lifted.current = false;
    setLiftedId('');
    setLiftOffset({ x: 0, y: 0 });
  };

  // 手指/鼠标按下：记住起点，重置本轮拖动记录
  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current = { originX: e.clientX, anchorX: e.clientX, total: 0, pressing: true };
    justLifted.current = false;
  };

  // 拖动中：每累计满 42px 就转一格并重设锚点，长拖可以连续转。
  // 若有茶点正被"拿起"，转桌让位，避免上滑撤菜时桌子跟着转。
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.pressing) return;
    drag.current.total = e.clientX - drag.current.originX;
    if (lifted.current) return;
    const dx = e.clientX - drag.current.anchorX;
    if (Math.abs(dx) > 42) {
      onRotate(dx < 0 ? 'left' : 'right');
      drag.current.anchorX = e.clientX;
    }
  };

  // 抬起：结束本轮拖动与长按手势（点击逻辑交给茶点自身的 onClick 判断）
  const handlePointerUp = () => {
    drag.current.pressing = false;
    endPress();
  };

  // 点击茶点：只有几乎没拖动（<10px）才算点击，避免转桌时误开弹窗；
  // 长按拿起后直接松手的那一下也不算
  const handleDishClick = (dish: Dish) => {
    if (justLifted.current) {
      justLifted.current = false;
      return;
    }
    if (Math.abs(drag.current.total) < 10) onOpenDish(dish);
  };

  // 按住茶点：启动长按倒计时，到点还没乱动就进入"拿起"状态
  const handleDishPointerDown = (dishId: string, e: React.PointerEvent) => {
    press.current = {
      dishId,
      timer: 0,
      startX: e.clientX,
      startY: e.clientY,
      removed: false,
    };
    press.current.timer = window.setTimeout(() => {
      lifted.current = true; // 告诉转桌逻辑：这段时间别转桌
      setLiftedId(dishId); // 给茶点加"拿起"高亮样式
    }, LONG_PRESS_MS);
  };

  // 按着茶点移动：
  // - 还没拿起前，手指移动超过CANCEL_PX 就取消长按（那是在转桌/滑动）；
  // - 拿起后，整个茶点完全跟着手指走（上下左右都跟），
  //   往上拖离起点超过 SWIPE_UP_PX 就把这道菜撤下桌。
  const handleDishPointerMove = (e: React.PointerEvent) => {
    if (!press.current.dishId) return;
    if (!lifted.current) {
      const moved = Math.hypot(e.clientX - press.current.startX, e.clientY - press.current.startY);
      if (moved > CANCEL_PX) endPress();
      return;
    }
    const dx = e.clientX - press.current.startX;
    const dy = e.clientY - press.current.startY;
    setLiftOffset({ x: dx, y: dy });
    if (dy < -SWIPE_UP_PX && !press.current.removed) {
      press.current.removed = true;
      onRemove(press.current.dishId); // 撤菜：菜单按钮会自动变回"上菜"
      endPress();
    }
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
              className={liftedId === dishId ? 'table-dish lifted' : 'table-dish'}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: liftedId === dishId ? 99 : pos.zIndex,
                // 拿起后整个茶点跟手移动：内联样式叠加偏移，松手自动弹回
                ...(liftedId === dishId
                  ? {
                      transform: `translate(-50%, -50%) translate(${liftOffset.x}px, ${liftOffset.y}px) scale(1.12)`,
                    }
                  : null),
              }}
              onPointerDown={(e) => handleDishPointerDown(dishId, e)}
              onPointerMove={handleDishPointerMove}
              onPointerUp={endPress}
              onPointerCancel={endPress}
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

      {/* 桌下操作行：转桌提示始终居中，清桌按钮固定在最右侧 */}
      <div className="table-footer">
        <p className="drag-hint" aria-hidden="true">
          <i>←</i>左右拖动转桌<i>→</i>
        </p>
        <button
          type="button"
          className="clear-btn"
          onClick={onClearAll}
          disabled={count === 0}
          aria-label="清空桌上全部茶点"
        >
          清桌
        </button>
      </div>
    </div>
  );
}
