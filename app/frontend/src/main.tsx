// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ロケールエラーが出る場合は、以下の環境変数を設定すると解決することが多いです
// コマンドラインで実行する場合：
// export LC_ALL=C.UTF-8
// export LANG=C.UTF-8
// export TZ=Asia/Tokyo

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
