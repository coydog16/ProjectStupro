# ドメイン駆動設計（DDD）型アーキテクチャ

## 基本概念

ドメイン駆動設計（Domain-Driven Design）は、複雑なビジネスロジックを持つシステムを構築するためのアプローチです。DDDでは「ドメイン」（業務知識）にフォーカスし、ユビキタス言語（共通言語）を通じてドメインエキスパートと開発者が協力します。技術的な実装よりもビジネスロジックの正確な表現を重視します。

## ディレクトリ構造

### バックエンド (Flask)

```
app/backend/
  ├── app.py                 # アプリケーションのエントリーポイント
  ├── requirements.txt       # 依存パッケージリスト
  └── app/
      ├── app.py             # Flaskアプリ設定
      ├── config/            # 環境別の設定ファイル
      │
      ├── api/               # API層（インターフェース層）
      │   ├── __init__.py
      │   ├── auth.py        # 認証API
      │   ├── posts.py       # 投稿API
      │   ├── users.py       # ユーザーAPI
      │   └── ...
      │
      ├── application/       # アプリケーション層
      │   ├── __init__.py
      │   ├── commands/      # コマンド（ユースケース）
      │   │   ├── __init__.py
      │   │   ├── auth_commands.py
      │   │   ├── post_commands.py
      │   │   └── ...
      │   │
      │   ├── queries/       # クエリ（読み取り操作）
      │   │   ├── __init__.py
      │   │   ├── post_queries.py
      │   │   ├── user_queries.py
      │   │   └── ...
      │   │
      │   └── dtos/          # データ転送オブジェクト
      │       ├── __init__.py
      │       ├── auth_dto.py
      │       ├── post_dto.py
      │       └── ...
      │
      ├── domain/            # ドメイン層（中心的なビジネスロジック）
      │   ├── __init__.py
      │   │
      │   ├── auth/          # 認証ドメイン
      │   │   ├── __init__.py
      │   │   ├── entities.py # エンティティ
      │   │   ├── value_objects.py # 値オブジェクト
      │   │   └── services.py # ドメインサービス
      │   │
      │   ├── posts/         # 投稿ドメイン
      │   │   ├── __init__.py
      │   │   ├── entities.py
      │   │   ├── value_objects.py
      │   │   ├── services.py
      │   │   └── events.py   # ドメインイベント
      │   │
      │   ├── users/         # ユーザードメイン
      │   │   ├── __init__.py
      │   │   ├── entities.py
      │   │   ├── value_objects.py
      │   │   └── services.py
      │   │
      │   └── common/        # 共通ドメインオブジェクト
      │       ├── __init__.py
      │       └── value_objects.py
      │
      └── infrastructure/    # インフラストラクチャ層
          ├── __init__.py
          ├── database.py    # データベース接続
          │
          ├── repositories/  # リポジトリ実装
          │   ├── __init__.py
          │   ├── post_repository.py
          │   ├── user_repository.py
          │   └── ...
          │
          ├── auth/          # 認証インフラ
          │   ├── __init__.py
          │   └── jwt_service.py
          │
          └── external/      # 外部サービス連携
              ├── __init__.py
              ├── email_service.py
              └── ...
```

### フロントエンド (React + TypeScript)

```
app/frontend/
  └── src/
      ├── main.tsx          # アプリケーションのエントリーポイント
      ├── App.tsx           # ルートコンポーネント
      │
      ├── application/      # アプリケーション層
      │   ├── store/        # 状態管理
      │   │   ├── auth/     # 認証状態
      │   │   ├── posts/    # 投稿状態
      │   │   └── ...
      │   │
      │   ├── services/     # アプリケーションサービス
      │   │   ├── auth.ts
      │   │   ├── posts.ts
      │   │   └── ...
      │   │
      │   └── dtos/         # データ転送オブジェクト
      │       ├── auth.ts
      │       ├── posts.ts
      │       └── ...
      │
      ├── domain/           # ドメインオブジェクト（フロントエンド側）
      │   ├── models/       # モデル
      │   │   ├── user.ts
      │   │   ├── post.ts
      │   │   └── ...
      │   │
      │   └── valueObjects/ # 値オブジェクト
      │       ├── email.ts
      │       ├── postStatus.ts
      │       └── ...
      │
      ├── infrastructure/   # インフラストラクチャ層
      │   ├── api/          # API通信
      │   │   ├── client.ts # HTTPクライアント
      │   │   ├── auth.ts
      │   │   ├── posts.ts
      │   │   └── ...
      │   │
      │   └── storage/      # ローカルストレージなど
      │       └── token.ts
      │
      └── presentation/     # プレゼンテーション層
          ├── pages/        # ページコンポーネント
          │   ├── auth/     # 認証ページ
          │   ├── posts/    # 投稿ページ
          │   └── ...
          │
          ├── components/   # 共通コンポーネント
          │   ├── ui/       # 基本UI部品
          │   └── ...
          │
          └── hooks/        # カスタムフック
              ├── useAuth.ts
              ├── usePosts.ts
              └── ...
```

## メリット

1. **ビジネスロジックの明確な表現**: ドメインモデルがビジネスルールを忠実に表現する
2. **長期的なメンテナンス性**: 複雑なビジネスロジックも理解しやすく維持できる
3. **ドメインエキスパートとの協力**: 共通言語を通じてコミュニケーションが円滑になる
4. **テスト容易性**: ドメイン層が外部依存から隔離されているためテストしやすい
5. **変更への耐性**: ドメインの核が安定しているため、技術的変更の影響を受けにくい

## デメリット

1. **初期学習コスト**: DDDの概念理解とパターン適用に時間がかかる
2. **オーバーヘッド**: シンプルなCRUD操作に対して過剰な設計になりうる
3. **ボイラープレートコードの増加**: 多くの層とクラスを作成する必要がある
4. **チームの熟練度要求**: 全メンバーがDDDを理解している必要がある

## 適した状況

- 複雑なビジネスロジックを持つエンタープライズアプリケーション
- 長期的に維持・進化させる必要があるシステム
- ドメインエキスパートとの緊密な協力が可能な環境
- ビジネスルールが頻繁に変更される環境
