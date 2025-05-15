# NavStupro Project Backend

このディレクトリには、NavStuproプロジェクトのバックエンド（Flask API）関連ファイルが格納されています。

## 技術スタック

- Python 3.11
- Flask 2.2.3
- PostgreSQL
- SQLAlchemy

## 開発環境

Docker Composeを使用して開発環境を起動できます。

```bash
docker-compose up
```

Backend APIサーバーは http://localhost:5000 で実行されます。
Nginxリバースプロキシを介して http://localhost/api でアクセスすることもできます。
