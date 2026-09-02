import { useEffect } from 'react';
import type { Dish } from '../types';

/**
 * 三个标注的固定机位：文字固定在左上 / 右中 / 左下三个角落，
 * rot 是虚线指向茶点中心的倾斜角（正值 = 线的远端向下弯，负值 = 向上弯）。
 */
const CALLOUT_SPOTS = [
  { x: '0%', y: '12%', rot: 26, side: 'left' }, // 左上：线往右下指向茶点
  { x: '100%', y: '42%', rot: -26, side: 'right' }, // 右中：线往左下指向茶点
  { x: '0%', y: '82%', rot: -26, side: 'left' }, // 左下：线往右上指向茶点
] as const;

type Props = {
  dish: Dish;
  onClose: () => void;
};

/**
 * DishDetailModal：点击桌上茶点弹出的介绍卡。
 * - 米色卡片 + 大标题 + 带标注的茶点图 + 介绍 + 官方来源链接；
 * - 点击遮罩 / 关闭按钮 / 按 ESC 均可关闭。
 */
export function DishDetailModal({ dish, onClose }: Props) {
  // 按 ESC 关闭弹窗（桌面端友好）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* 卡片本体：阻止冒泡，避免点卡片内部误关 */}
      <article className="modal-card" role="dialog" aria-modal="true" aria-label={dish.fullName} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="关闭介绍卡" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">{dish.fullName}</h2>

        {/* 茶点大图 + 手写标注（最多取 3 个） */}
        <div className="modal-figure">
          <img src={dish.asset} alt={dish.fullName} draggable={false} />
          {dish.notes.slice(0, 3).map((text, i) => {
            const spot = CALLOUT_SPOTS[i];
            return (
              <span
                key={text}
                className={`callout callout-${spot.side}`}
                style={{ left: spot.x, top: spot.y }}
              >
                <i className="callout-line" style={{ transform: `rotate(${spot.rot}deg)` }} aria-hidden="true" />
                {text}
              </span>
            );
          })}
        </div>

        <div className="modal-divider" aria-hidden="true">
          <i />
          <b>◆</b>
          <i />
        </div>

        <p className="modal-intro">{dish.intro}</p>

        {/* 官方来源：保证每一款茶点都有据可查 */}
        <a className="modal-source" href={dish.sourceUrl} target="_blank" rel="noreferrer">
          查看官方资料 · {dish.sourceName}
        </a>
      </article>
    </div>
  );
}
