// src/App.tsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<{status?: string, message?: string, error?: string}>({})
  const [loading, setLoading] = useState(false)

  // APIヘルスチェック関数
  const checkApiHealth = async () => {
    setLoading(true)
    try {
      // 開発環境では、直接バックエンドにアクセス
      const response = await fetch('http://localhost/api/health')
      if (response.ok) {
        const data = await response.json()
        setApiStatus(data)
      } else {
        setApiStatus({ error: `エラー: ${response.status} ${response.statusText}` })
      }
    } catch (error) {
      setApiStatus({ error: `接続エラー: ${error instanceof Error ? error.message : String(error)}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">NavStupro Project</h1>
          <p className="text-lg text-indigo-600">ようこそ！フロントエンド開発環境へ</p>
        </header>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
          <div className="p-8">
            <div className="text-center">
              <button
                onClick={() => setCount((count) => count + 1)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors"
              >
                カウント: {count}
              </button>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">開発環境情報</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>React + TypeScript</li>
                <li>Tailwind CSS v4</li>
                <li>Vite - 高速な開発体験</li>
              </ul>
              
              <div className="mt-6">
                <button 
                  onClick={checkApiHealth}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors disabled:opacity-50"
                >
                  {loading ? 'チェック中...' : 'API接続チェック'}
                </button>
                
                {apiStatus.status && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p><strong>ステータス:</strong> {apiStatus.status}</p>
                    {apiStatus.version && <p><strong>バージョン:</strong> {apiStatus.version}</p>}
                  </div>
                )}
                
                {apiStatus.error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {apiStatus.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          <p>フロントエンド環境が正常に動作しています！</p>
        </div>
      </div>
    </div>
  )
}

export default App
