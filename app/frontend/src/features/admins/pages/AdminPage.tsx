import { useParams } from 'react-router-dom';
import { useUserByUsername } from '../../../hooks/useUserByUsername';
import UserList from '../../../components/ui/UserList';
import BaseLayout from '../../../components/layout/BaseLayout';

const AdminPage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user } = useUserByUsername(username);

    return (
        <BaseLayout
            user={
                user
                    ? {
                          username: user.username,
                          fullName: user.full_name || user.username,
                          avatarUrl: user.avatar_image_file_path || undefined,
                      }
                    : undefined
            }
        >
            <div className="max-w-3xl mx-auto py-10 px-4 bg-theme text-theme">
                <h1 className="text-2xl font-bold mb-8">ユーザー管理画面（Admin）</h1>
                <div className="mb-4 text-accent text-lg font-semibold">
                    管理者: <span className="font-mono">{username}</span>
                </div>
                <UserList />
            </div>
        </BaseLayout>
    );
};

export default AdminPage;
