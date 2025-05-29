import UserList from '../../../components/ui/UserList';
import ThemeToggleLayout from '../../../components/layout/ThemeToggleLayout';

const AdminPage: React.FC = () => {
    return (
        <ThemeToggleLayout>
            <div className="max-w-3xl mx-auto py-10 px-4 bg-theme text-theme">
                <h1 className="text-2xl font-bold mb-8">ユーザー管理画面（Admin）</h1>
                <UserList />
            </div>
        </ThemeToggleLayout>
    );
};

export default AdminPage;
