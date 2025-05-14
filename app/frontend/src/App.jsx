import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>navStupro</h1>
        <div className="logo">
          <img src="/logo.svg" alt="navStupro logo" />
        </div>
        <p>
          Flask + React + PostgreSQL で構築された<br />
          学習支援アプリケーション
        </p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            カウント: {count}
          </button>
          <p>
            これは開発中のViteベースのReactアプリケーションです。
          </p>
        </div>
        <p className="read-the-docs">
          現在、懸命に開発中です！
        </p>
      </header>
    </div>
  );
}

export default App;
