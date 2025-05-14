FROM postgres:17

ENV POSTGRES_USER=navStupro
ENV POSTGRES_PASSWORD=navStupro
ENV POSTGRES_DB=navstupro
ENV PGPASSWORD=navStupro
ENV TZ=Asia/Tokyo

# PostgreSQLの設定ファイルをコピー
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# 起動コマンド（カスタム設定ファイルを使用）
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
