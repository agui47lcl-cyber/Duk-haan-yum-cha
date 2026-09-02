import { useState } from 'react';
import type { Dish, DishCategory } from '../types';
import { FILTERS } from '../data/dishes';

type Props = {
  dishes: Dish[];
  isPlaced: (dishId: string) => boolean;
  isFull: boolean;
  onPlace: (dish: Dish) => void;
  onRemove: (dishId: string) => void;
};

/**
 * MenuGrid：底部「早茶菜单」面板。
 * - 顶部四个筛选 chips：全部 / 蒸点 / 粥粉 / 甜点；
 * - 两列茶点卡片：已上桌显示"执碟"，未上桌显示"上菜"；
 * - 桌满后"上菜"按钮变灰（仍可点击，用于弹出提示）。
 */
export function MenuGrid({ dishes, isPlaced, isFull, onPlace, onRemove }: Props) {
  // 当前选中的筛选分类，'全部' 时显示所有茶点
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('全部');
  const visible =
    filter === '全部' ? dishes : dishes.filter((d) => d.category === (filter as DishCategory));

  return (
    <section className="menu-panel">
      {/* 面板头部：左边标题、右边分类 chips，横向排列；chips 超宽时自身左右滑动 */}
      <div className="menu-head">
        <h2 className="menu-title">早茶菜单</h2>

        <div className="filter-row" role="tablist" aria-label="茶点分类筛选">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter-chip${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 可滚动区域：只有卡片列表在滚动 */}
      <div className="menu-scroll">
        {visible.length === 0 ? (
        <p className="menu-empty">这个分类还没有茶点，敬请期待~</p>
      ) : (
        <div className="menu-grid">
          {visible.map((dish) => {
            const onTable = isPlaced(dish.id);
            return (
              <div key={dish.id} className="menu-card">
                <img className="menu-card-img" src={dish.asset} alt={dish.fullName} loading="lazy" />
                <div className="menu-card-info">
                  <h3 className="menu-card-name">{dish.name}</h3>
                  <button
                    className={`serve-btn${onTable ? ' leave' : ' join'}${!onTable && isFull ? ' blocked' : ''}`}
                    aria-disabled={!onTable && isFull}
                    onClick={() => (onTable ? onRemove(dish.id) : onPlace(dish))}
                  >
                    {onTable ? '执碟' : '上菜'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </section>
  );
}
