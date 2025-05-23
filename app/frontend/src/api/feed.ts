// 投稿一覧取得API
export async function fetchFeed() {
  const res = await fetch("/api/feed/");
  if (!res.ok) throw new Error("Feed取得に失敗しました");
  return res.json();
}
