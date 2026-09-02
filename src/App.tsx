import { useRef, useState } from 'react';
import type { Dish } from './types';
import { DISHES, MAX_DISHES } from './data/dishes';
import { useTableState } from './hooks/useTableState';
import { TableScene } from './components/TableScene';
import { MenuGrid } from './components/MenuGrid';
import { DishDetailModal } from './components/DishDetailModal';

/**
 * App：整个页面的组装与顶层状态。
 * - 桌面状态来自 useTableState；
 * - 弹窗、提示（toast）属于全局界面状态，放在这里统一管理。
 */
export default function App() {
  const table = useTableState();
  const [activeDish, setActiveDish] = useState<Dish | null>(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | undefined>(undefined);

  // 显示一条会自动消失的提示（例如桌满提醒）
  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  };

  // 上桌：点击当下就用最新状态判断是否坐满，坐满才提示
  const handlePlace = (dish: Dish) => {
    if (table.isFull || table.isPlaced(dish.id)) {
      showToast(`桌上已坐满 ${MAX_DISHES} 款茶点，先下桌一道吧`);
      return;
    }
    table.placeDish(dish.id);
  };

  return (
    <div className="page">
      {/* 页面标题：得闲饮茶 */}
      <header className="page-title">
        <i className="diamond" aria-hidden="true">◆</i>
        <h1>得闲饮茶</h1>
        <i className="diamond" aria-hidden="true">◆</i>
      </header>

      {/* 深木圆桌 + 七席茶点（含转桌提示） */}
      <TableScene dishes={DISHES} placed={table.placed} onRotate={table.rotate} onOpenDish={setActiveDish} />

      {/* 早茶菜单面板 */}
      <MenuGrid
        dishes={DISHES}
        isPlaced={table.isPlaced}
        isFull={table.isFull}
        onPlace={handlePlace}
        onRemove={table.removeDish}
      />

      {/* 介绍卡弹窗 */}
      {activeDish && <DishDetailModal dish={activeDish} onClose={() => setActiveDish(null)} />}

      {/* 全局提示条（桌满等） */}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
