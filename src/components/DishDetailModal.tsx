import { useEffect } from 'react';
import type { Dish } from '../types';

type Props = {
  dish: Dish;
  onClose: () => void;
};

/**
 * 是否运行在小红书小工具容器里：容器注入了 window.xhs.miniTool。
 * 容器内纯离线、禁止打开外链，官方来源降级为纯文字；浏览器里仍是可点链接。
 */
const inMiniTool =
  typeof window !== 'undefined' &&
  !!(window as unknown as { xhs?: { miniTool?: unknown } }).xhs?.miniTool;

/**
 * DishDetailModal：点击桌上茶点弹出的介绍卡。
 * - 米色卡片 + 大标题 + 茶点视觉图 + 介绍 + 官方来源链接；
 * - 视觉图优先用 cardAsset（带手写标注的设计素材），
 *   没有素材的茶点退回普通成品图；
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

        {/* 茶点视觉区：优先使用带标注的设计素材（整幅展示），否则退回透明底成品图 */}
        <div className="modal-figure">
          <img
            src={dish.cardAsset ?? dish.asset}
            className={dish.cardAsset ? 'is-card' : undefined}
            alt={dish.fullName}
            draggable={false}
          />
        </div>

        <div className="modal-divider" aria-hidden="true">
          <i />
          <b>◆</b>
          <i />
        </div>

        <p className="modal-intro">{dish.intro}</p>

        {/* 官方来源：有出处的茶点才显示。容器内禁止外链，降级为纯文字 */}
        {dish.sourceUrl &&
          (inMiniTool ? (
            <span className="modal-source">资料来源 · {dish.sourceName}</span>
          ) : (
            <a className="modal-source" href={dish.sourceUrl} target="_blank" rel="noreferrer">
              查看官方资料 · {dish.sourceName}
            </a>
          ))}
      </article>
    </div>
  );
}
