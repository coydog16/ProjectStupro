const DashboardPage: React.FC = () => {
    return (
        <div className="w-full max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-8 text-gray-100">管理者ダッシュボード</h1>
            <div className="bg-gray-800 rounded-xl p-8 shadow flex flex-col gap-6">
                <p className="text-gray-200 text-lg">ようこそ、管理者ダッシュボードへ！</p>
                {/* ここに統計や管理機能のウィジェットを追加していこうね */}
                <div className="text-gray-400">（今後、ユーザー管理・統計・権限管理などをここに追加予定だよ〜）</div>
            </div>
        </div>
    );
};

export default DashboardPage;
