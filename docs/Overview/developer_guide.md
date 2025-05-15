# ProjectStupro 開発ガイド

このドキュメントでは、ProjectStuproの開発を始めるための基本的なセットアップ手順と開発ガイドラインを説明します。

## 環境セットアップ

ProjectStuproはDocker Composeを使用して開発環境を構築します。以下の手順に従ってセットアップしてください。

### 前提条件

- Docker と Docker Compose がインストールされていること
- Git クライアントがインストールされていること

### セットアップ手順

1. **リポジトリのクローン**

```bash
git clone [repository-url]
cd ProjectStupro
```

2. **環境設定**

```bash
# バックエンド設定ファイルの準備
cp app/backend/app/config/dev.py.example app/backend/app/config/dev.py
# 必要に応じて設定ファイルを編集
```

3. **Dockerコンテナの起動**

```bash
# 開発環境の起動
docker-compose -f docker-compose.dev.yml up -d
```

4. **マイグレーションの実行**

```bash
# コンテナ内でマイグレーションを実行
docker-compose -f docker-compose.dev.yml exec backend flask db upgrade
```

5. **アプリケーションへのアクセス**

- バックエンドAPI: http://localhost:5000
- フロントエンド: http://localhost:3000

## 開発ガイドライン

### コーディングスタイル

- **Python (Flask)**: PEP 8に準拠
- **TypeScript/React**: ESLintとPrettierの設定に従う
- **コメント**: 複雑なロジックには必ずコメントを追加

### Git ワークフロー

1. **ブランチ命名規則**

```
feature/[機能名]  # 新機能追加
fix/[バグ名]      # バグ修正
refactor/[対象]   # リファクタリング
docs/[対象]       # ドキュメント更新
```

2. **コミットメッセージ**

```
[タイプ] 簡潔な説明

詳細な説明（必要に応じて）
```

タイプの例: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

3. **プルリクエスト**

- レビューを簡単にするため、小さな変更単位でPRを作成する
- PRには変更内容の説明と、関連する課題への参照を含める

### モジュール開発の流れ

1. **要件の理解**
   - 担当モジュールの機能要件を理解する

2. **データモデルの設計**
   - モデル（`models.py`）を最初に設計する

3. **APIエンドポイントの設計**
   - RESTful APIの原則に従ってエンドポイント（`routes.py`）を設計する

4. **ビジネスロジックの実装**
   - サービス層（`services.py`）にビジネスロジックを実装する

5. **バリデーションの実装**
   - スキーマ（`schemas.py`）でリクエスト/レスポンスのバリデーションを実装する

6. **フロントエンドの実装**
   - APIクライアントの作成
   - UIコンポーネントの実装
   - ページの統合

7. **テストの実装**
   - ユニットテスト
   - 統合テスト

## ディレクトリ構造と責務

### バックエンド

```
app/backend/app/modules/[module_name]/
├── __init__.py  # モジュール初期化、ルートの登録
├── models.py    # データモデル定義
├── routes.py    # APIエンドポイント定義
├── schemas.py   # リクエスト/レスポンスのスキーマ
└── services.py  # ビジネスロジック
```

### フロントエンド

```
app/frontend/src/features/[feature_name]/
├── components/  # 機能固有のUIコンポーネント
├── hooks/       # 機能固有のカスタムフック
└── pages/       # ページコンポーネント
```

## 詳細ドキュメント

より詳細な情報は、以下のドキュメントを参照してください：

- [アーキテクチャ概要](./architecture.md)
- [モジュール概要](./modules.md)
- [開発環境セットアップ詳細](../dev_env/00_index.md)

## サポート

開発中に問題が発生した場合は、チームのSlackチャンネルで質問するか、issueを作成してください。先輩エンジニアが喜んでサポートします！
