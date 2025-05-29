import UserList from '../../../components/ui/UserList';

const AdminPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-bold mb-8">ユーザー管理画面（Admin）</h1>
                <UserList />
            </div>
        </div>
    );
};

export default AdminPage;
