import type { ReactNode, FC } from 'react';

/**
 * テーマに応じた背景色・文字色を自動で適用する共通ラッパー
 * 例: <Theme><main>...</main></Theme>
 */
export const Theme: FC<{ className?: string; children: ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-theme text-theme min-h-screen ${className}`.trim()}>
    {children}
  </div>
);
