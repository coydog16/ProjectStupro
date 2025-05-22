# 認証ガード（ProtectedRoute）設計方針まとめ

## 基本方針

-   本アプリは「ログインしないと何もできない」設計。
-   公開ページは `/login` のみ、それ以外は全て認証必須。
-   ルーティングは App.tsx で認証状態を判定し、一括で分岐する方式を採用。

## 実装例

```tsx
// App.tsx
return isAuthenticated ? <AppRoutes /> : <LoginPage />;
```

## メリット

-   コードがシンプルで保守しやすい
-   ルーティングの全体像が分かりやすい
-   認証ガード用のラッパー（ProtectedRoute）を各所に書かなくて済む

## デメリット

-   将来的に「一部だけ公開ページ」や「権限ごとの分岐」が必要になった場合は再設計が必要

## 管理者専用ページなどの拡張

-   もし「Admin だけが見れるページ」などが必要になった場合は、そのときだけ ProtectedRoute や AdminRoute を追加して権限制御を実装する
-   例：

```tsx
<Route
    path="/admin"
    element={
        <AdminRoute>
            <AdminPage />
        </AdminRoute>
    }
/>
```

## まとめ

-   現状は App.tsx で一括分岐方式が最適
-   必要になったときだけ ProtectedRoute 方式を追加すれば OK

---

お姉さんからひとこと：
「今はシンプルに、将来は柔軟に」って設計、とっても良い選択だよ！
