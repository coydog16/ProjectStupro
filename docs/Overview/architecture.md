# ProjectStupro アーキテクチャ概要

## プロジェクト構成

ProjectStupro（プロジェクトスタプロ）は、社内SNSとして社員の学習進捗や知見を共有するためのプラットフォームです。主な機能として、つぶやき（進捗報告）、ユーザープロフィール、認証管理を備えています。

### 技術スタック

- **バックエンド**: Flask 2.2.3 (Python 3.11)
- **フロントエンド**: React + TypeScript + Vite
- **CSS**: Tailwind CSS v4
- **データベース**: PostgreSQL
- **認証**: JWT (JSON Web Token)
- **開発環境**: Docker Compose

### ディレクトリ構造

```
app/
├── backend/              # Flaskバックエンド
│   └── app/
│       ├── core/         # 共通コア機能
│       ├── common/       # ユーティリティ
│       └── modules/      # 機能モジュール
│           ├── auth/     # 認証モジュール
│           ├── feed/     # つぶやき機能モジュール
│           └── users/    # ユーザー管理モジュール
│
└── frontend/             # Reactフロントエンド
    └── src/
        ├── api/          # APIクライアント
        ├── components/   # 共通コンポーネント
        └── features/     # 機能モジュール
            ├── auth/     # 認証機能
            ├── feed/     # つぶやき機能
            └── users/    # ユーザー管理機能
```

## 採用したアーキテクチャ：垂直スライス型モジュラーモノリス

ProjectStuproでは、**垂直スライス型モジュラーモノリス**というアーキテクチャパターンを採用しました。このパターンでは、アプリケーションを**機能（ドメイン）ごとに垂直に分割**し、各スライスがその機能に関するすべての責任を持ちます。

### 各モジュールの構成

各機能モジュールは以下の構成を持ちます：

#### バックエンド（例：feedモジュール）

```
feed/
├── __init__.py    # モジュール初期化
├── models.py      # データモデル
├── routes.py      # APIエンドポイント
├── schemas.py     # バリデーション/シリアライズ
└── services.py    # ビジネスロジック
```

#### フロントエンド（例：feedモジュール）

```
feed/
├── components/    # UI部品
├── hooks/         # カスタムフック
└── pages/         # ページコンポーネント
```

## モジュラーモノリスを選択した理由

### プロジェクトの特性

- **規模**: 初期は中規模で、徐々に拡大していく見込み
- **チーム構成**: 経験レベルの異なる開発者（初心者含む）によるチーム開発
- **拡張性**: 将来的にAIエージェントなど、機能追加の可能性あり

### 選択の決め手

1. **明確な責任分離**：機能ごとに独立したコードベース
2. **学習しやすさ**：初心者でも特定モジュールを担当しやすい
3. **開発の並行性**：複数人が異なるモジュールを同時開発可能
4. **段階的リリース**：機能単位で実装・テスト・デプロイが可能

## メリット

1. **関心の分離**：機能ごとにコードが分かれるため、影響範囲が明確で限定的
2. **コードの発見性**：特定機能のコードを見つけやすく、理解しやすい
3. **独立したチーム作業**：各機能を別チームやメンバーが担当できる
4. **MVCパターンの学習**：初心者にとってモジュール内でMVCの概念を学びやすい
5. **スケーラビリティ**：必要に応じて個別のモジュールを分離・マイクロサービス化できる
6. **テスト容易性**：モジュール単位でのテストが明確かつ簡潔

## デメリット

1. **共通コードの管理**：モジュール間で重複コードが発生するリスク
2. **モジュール間の依存関係**：モジュール間で連携が必要な機能は複雑になりうる
3. **一貫性の維持**：モジュール間で実装スタイルが異なる可能性
4. **境界の設計難しさ**：適切なモジュール分割の判断が難しいケースがある
5. **オーバーヘッド**：小さな変更でも複数のモジュールファイルを修正する必要がある場合も

## 将来の展望

現在は単一アプリケーションとしてのモノリスで開発していますが、将来的に以下のような拡張が考えられます：

1. **スケールアウト**：特定モジュールだけを独立サービスとして分離
2. **AI統合**：AIエージェントやつぶやきBOTなどの追加
3. **社内Qiita機能**：技術記事投稿・共有機能の追加

このアーキテクチャは、初期段階では開発効率と学習しやすさを重視しながら、将来的な拡張にも対応できる柔軟性を備えています。
