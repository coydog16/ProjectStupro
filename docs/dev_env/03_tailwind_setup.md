# 03 - Tailwind CSS セットアップガイド

このガイドでは、navStuproプロジェクトでTailwind CSSを活用するための設定や基本的な使い方について解説します。

## 1. Tailwind CSSとは

Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。あらかじめ定義された多数のユーティリティクラスを組み合わせることで、CSSを書かずにHTMLだけでスタイリングができます。navStuproプロジェクトでは、Reactコンポーネントのスタイリングにこれを使用します。

## 2. セットアップ方法

### Docker環境での自動セットアップ

プロジェクトのDocker設定では、フロントエンドコンテナの起動時に自動的にTailwind CSSがインストールされるようになっています：

```dockerfile
# docker/frontend/Dockerfile の関連部分
CMD ["sh", "-c", "npm install && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p && npm run dev -- --host"]
```

これにより、コンテナ起動時に以下の処理が自動的に実行されます：
1. プロジェクトの依存関係のインストール
2. Tailwind CSSとその関連パッケージのインストール
3. Tailwind CSSの設定ファイルの生成
4. 開発サーバーの起動

## 3. 基本設定

Docker環境では、Tailwind CSSの設定ファイル（`tailwind.config.js`と`postcss.config.js`）は以下のように自動生成されます：

```dockerfile
# docker/frontend/Dockerfile の関連部分
if [ ! -f tailwind.config.js ] || [ ! -f postcss.config.js ]; then npx tailwindcss init -p; fi
```

これにより、必要な設定ファイルがないときだけ自動的に生成されるので、既存の設定がある場合は上書きされません。

### CSSファイルの設定

プロジェクトを使い始めるときは、`src/index.css`などのメインCSSファイルで、Tailwindのディレクティブをインポートします：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 追加のカスタムCSSはここに記述 */
```

## 4. 便利なプラグイン

navStuproプロジェクトでは、以下の便利なTailwindプラグインを自動的にインストールして設定します：

### @tailwindcss/forms

フォーム要素のスタイリングを改善するプラグインです。すべてのフォーム要素に一貫したリセットスタイルを適用し、カスタマイズしやすくします。

使用例：
```jsx
<input type="text" className="form-input px-4 py-2 rounded-md" />
<select className="form-select px-4 py-2 rounded-md">
  <option>オプション1</option>
  <option>オプション2</option>
</select>
```

### @tailwindcss/typography

マークダウンやリッチテキストコンテンツを美しく表示するためのプラグインです。

使用例：
```jsx
<article className="prose lg:prose-xl">
  {/* マークダウンやHTMLコンテンツ */}
  <h1>見出し</h1>
  <p>段落テキスト...</p>
  <ul>
    <li>リストアイテム1</li>
    <li>リストアイテム2</li>
  </ul>
</article>
```

### @tailwindcss/forms

フォーム要素のスタイリングを改善するプラグイン。

```bash
npm install -D @tailwindcss/forms
```

`tailwind.config.js`に追加：

```javascript
plugins: [
  require('@tailwindcss/forms'),
  // 他のプラグイン...
],
```

## 5. 公式ドキュメント

より詳細な情報やカスタマイズ方法については、Tailwind CSSの公式ドキュメントを参照してください：

[Tailwind CSS 公式ドキュメント](https://tailwindcss.com/docs)

お姉さんからのアドバイス♡：
Tailwind CSS、最初は「クラスが多すぎ！」って思うかもしれないけど、慣れると本当に開発スピードが上がるのよ〜！特に小さなコンポーネントを作るときに便利だから、ぜひ使ってみてね♪ `@apply`ディレクティブを使えば、よく使うクラスの組み合わせをカスタムクラスとして定義することもできるから、コードもすっきり書けるわよ！
