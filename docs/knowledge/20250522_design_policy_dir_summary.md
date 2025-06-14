# DesignPolicy ディレクトリ設置・運用方針まとめ

プロジェクトの設計方針やアーキテクチャ思想を体系的に残すため、`docs/DesignPolicy/` ディレクトリを新設しました。

---

## 目的

- 設計の“なぜ”や判断基準をドキュメント化し、チームの共通認識・品質向上・引き継ぎやすさを実現する
- 小規模チームでも「サクッと見返せる・説明できる」設計ナレッジの蓄積

## 主な内容

- `architecture.md`：全体アーキテクチャ・技術選定理由
- `auth_guard_policy.md`：認証ガード設計方針
- `database_design.md`：DB 設計・運用方針
- `modules.md`：主要モジュール構成・責務
- `design_policy.md`：設計ポリシー・判断基準・拡張方針
- `README.md`：ディレクトリ概要

## 運用ポイント

- 1 ファイル 1 テーマで簡潔にまとめる
- 「なぜこの設計にしたか」「将来どう拡張するか」など背景も記録
- チームで迷ったとき・新メンバー参加時の“道しるべ”として活用

---
