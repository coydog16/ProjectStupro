# navStupro データベース設計書

## 概要

navStupro アプリケーションのデータベース設計です。PostgreSQLを使用し、ユーザー情報、学習トピック、投稿、スキル、画像などの情報を管理します。

## ER図概念

```
User ─────┬───── Topic
   │      │
   │      │
Image     ├───── Post ───── Comment
   │      │        │
   │      │        │
   └──────┴────── Skill
            │
            │
         UserSkill
```

## テーブル定義

### 1. users テーブル

ユーザー情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | ユーザーID |
| username | VARCHAR(50) | NOT NULL, UNIQUE | ユーザー名 |
| email | VARCHAR(120) | NOT NULL, UNIQUE | メールアドレス |
| password_hash | VARCHAR(255) | NOT NULL | ハッシュ化されたパスワード |
| first_name | VARCHAR(50) | | 名前 |
| last_name | VARCHAR(50) | | 姓 |
| bio | TEXT | | 自己紹介 |
| department | VARCHAR(100) | | 部署 |
| position | VARCHAR(100) | | 役職 |
| avatar_id | INTEGER | FOREIGN KEY (images.id) | プロフィール画像ID |
| is_admin | BOOLEAN | DEFAULT FALSE | 管理者フラグ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |
| last_login | TIMESTAMP | | 最終ログイン日時 |

### 2. topics テーブル

学習トピックを管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | トピックID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | 作成者ID |
| title | VARCHAR(200) | NOT NULL | タイトル |
| description | TEXT | | 説明 |
| category | VARCHAR(100) | | カテゴリ |
| estimated_hours | INTEGER | | 想定学習時間 |
| priority | INTEGER | DEFAULT 0 | 優先度（0-5） |
| progress | INTEGER | DEFAULT 0 | 進捗度（0-100） |
| status | VARCHAR(20) | DEFAULT 'not_started' | ステータス（not_started, in_progress, completed, paused） |
| start_date | DATE | | 開始日 |
| end_date | DATE | | 終了予定日 |
| completed_date | DATE | | 完了日 |
| notes | JSONB | | 追加メモ（JSON形式） |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |

### 3. posts テーブル

短文投稿を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | 投稿ID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | 投稿者ID |
| topic_id | INTEGER | FOREIGN KEY (topics.id) | 関連トピックID |
| content | TEXT | NOT NULL | 投稿内容 |
| post_type | VARCHAR(20) | DEFAULT 'status' | 投稿タイプ（status, blog, question） |
| likes_count | INTEGER | DEFAULT 0 | いいね数 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |

### 4. blog_posts テーブル

ブログ形式の長文投稿を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| post_id | INTEGER | PRIMARY KEY, FOREIGN KEY (posts.id) | 関連する投稿ID |
| title | VARCHAR(200) | NOT NULL | ブログタイトル |
| content_markdown | TEXT | NOT NULL | マークダウン形式のコンテンツ |
| content_html | TEXT | | HTMLに変換されたコンテンツ |
| read_time | INTEGER | | 推定読了時間（分） |
| is_published | BOOLEAN | DEFAULT TRUE | 公開フラグ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |

### 5. comments テーブル

投稿へのコメントを管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | コメントID |
| post_id | INTEGER | NOT NULL, FOREIGN KEY (posts.id) | 投稿ID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | コメント投稿者ID |
| parent_comment_id | INTEGER | FOREIGN KEY (comments.id) | 親コメントID（返信の場合） |
| content | TEXT | NOT NULL | コメント内容 |
| likes_count | INTEGER | DEFAULT 0 | いいね数 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |

### 6. skills テーブル

スキル情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | スキルID |
| name | VARCHAR(100) | NOT NULL, UNIQUE | スキル名 |
| category | VARCHAR(50) | | カテゴリ（言語、フレームワークなど） |
| description | TEXT | | 説明 |
| icon_class | VARCHAR(50) | | アイコンのCSSクラス |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

### 7. user_skills テーブル

ユーザーとスキルの関連を管理する中間テーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | ID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | ユーザーID |
| skill_id | INTEGER | NOT NULL, FOREIGN KEY (skills.id) | スキルID |
| proficiency_level | INTEGER | DEFAULT 1 | 習熟度（1-5） |
| years_experience | DECIMAL(4,1) | | 経験年数 |
| is_public | BOOLEAN | DEFAULT TRUE | 公開フラグ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 更新日時 |

### 8. post_skills テーブル

投稿とスキルの関連を管理する中間テーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| post_id | INTEGER | NOT NULL, FOREIGN KEY (posts.id) | 投稿ID |
| skill_id | INTEGER | NOT NULL, FOREIGN KEY (skills.id) | スキルID |
| PRIMARY KEY | (post_id, skill_id) | | 複合主キー |

### 9. images テーブル

画像情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | 画像ID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | アップロードユーザーID |
| file_name | VARCHAR(255) | NOT NULL | ファイル名 |
| file_path | VARCHAR(255) | NOT NULL | 保存パス |
| file_type | VARCHAR(50) | NOT NULL | ファイルタイプ（MIME） |
| file_size | INTEGER | NOT NULL | ファイルサイズ（バイト） |
| width | INTEGER | | 画像幅 |
| height | INTEGER | | 画像高さ |
| alt_text | VARCHAR(255) | | 代替テキスト |
| usage_type | VARCHAR(20) | | 用途（avatar, post_image, etc） |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

### 10. post_images テーブル

投稿と画像の関連を管理する中間テーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| post_id | INTEGER | NOT NULL, FOREIGN KEY (posts.id) | 投稿ID |
| image_id | INTEGER | NOT NULL, FOREIGN KEY (images.id) | 画像ID |
| display_order | INTEGER | DEFAULT 0 | 表示順序 |
| PRIMARY KEY | (post_id, image_id) | | 複合主キー |

### 11. user_follows テーブル

ユーザーのフォロー関係を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| follower_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | フォローするユーザーID |
| followed_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | フォローされるユーザーID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| PRIMARY KEY | (follower_id, followed_id) | | 複合主キー |

### 12. likes テーブル

いいね情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | いいねID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | いいねしたユーザーID |
| content_type | VARCHAR(20) | NOT NULL | 対象タイプ（post, comment） |
| content_id | INTEGER | NOT NULL | 対象ID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

### 13. notifications テーブル

通知情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|----------|----------|------|------|
| id | SERIAL | PRIMARY KEY | 通知ID |
| user_id | INTEGER | NOT NULL, FOREIGN KEY (users.id) | 通知先ユーザーID |
| actor_id | INTEGER | FOREIGN KEY (users.id) | アクションを起こしたユーザーID |
| notification_type | VARCHAR(20) | NOT NULL | 通知タイプ（like, comment, follow, mention） |
| content_type | VARCHAR(20) | | 対象タイプ（post, comment, user） |
| content_id | INTEGER | | 対象ID |
| message | TEXT | | 通知メッセージ |
| is_read | BOOLEAN | DEFAULT FALSE | 既読フラグ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

## インデックス設計

パフォーマンス向上のため、以下のインデックスを作成します：

1. users テーブル
   - username（UNIQUE）
   - email（UNIQUE）

2. topics テーブル
   - user_id
   - category
   - status

3. posts テーブル
   - user_id
   - topic_id
   - created_at

4. comments テーブル
   - post_id
   - user_id
   - parent_comment_id

5. user_skills テーブル
   - user_id
   - skill_id

6. post_skills テーブル
   - post_id
   - skill_id

7. likes テーブル
   - user_id
   - (content_type, content_id)

8. notifications テーブル
   - user_id
   - is_read
   - created_at

## 外部キー制約

主要な外部キー制約は以下の通りです：

1. topics.user_id → users.id
2. posts.user_id → users.id
3. posts.topic_id → topics.id
4. blog_posts.post_id → posts.id
5. comments.post_id → posts.id
6. comments.user_id → users.id
7. comments.parent_comment_id → comments.id
8. user_skills.user_id → users.id
9. user_skills.skill_id → skills.id
10. post_skills.post_id → posts.id
11. post_skills.skill_id → skills.id
12. images.user_id → users.id
13. users.avatar_id → images.id
14. post_images.post_id → posts.id
15. post_images.image_id → images.id

## トリガー・関数

1. 投稿数・コメント数カウント更新トリガー
2. ユーザーアクティビティ記録トリガー
3. 通知作成トリガー（いいね・コメント・フォロー発生時）
4. 更新日時自動更新トリガー

## データ移行とマイグレーション方針

1. Alembic を使用したマイグレーション管理
2. 初期データのシード処理（基本スキル、管理者ユーザーなど）
3. ロールバック戦略
4. バックアップ・リストア手順

## セキュリティ対策

1. パスワードは bcrypt で安全にハッシュ化
2. SQLインジェクション対策としてのパラメータ化クエリの使用
3. XSS対策として入力サニタイズ処理
