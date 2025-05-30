import { UserType, PostType } from '../../../types';
import { getDisplayName } from '../../../utils/userUtils';
import TaskList from './TaskList';
import UserAvatar from '../../../components/common/UserAvatar';

interface UserInfoProps {
    user: UserType;
    tasks: PostType[];
}

const UserInfo: React.FC<UserInfoProps> = ({ user, tasks }) => {
    const avatarUrl = user.avatar_image_file_path || undefined;

    return (
        <div className="w-full relative" style={{ minHeight: '180px' }}>
            {/* ユーザー情報エリア */}
            <div className="relative z-10 flex flex-row items-center pt-6 pl-8">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden shadow-lg bg-accent/10">
                    <UserAvatar
                        src={avatarUrl}
                        name={user.full_name || user.username}
                        size={80}
                        className="shadow-lg"
                    />
                </div>
                <div className="ml-4 text-left relative">
                    {/* 名前の背景にうっすら黒い放射状グラデーション */}
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0) 100%)',
                            zIndex: 0,
                            filter: 'blur(1.5px)',
                        }}
                    />
                    <div className="text-xl font-bold relative z-10 text-theme">{getDisplayName(user)}</div>
                    <div className="text-accent/70 text-sm relative z-10">@{user?.username}</div>
                </div>
            </div>
            {/* タスクリストエリア */}
            <div className="relative z-10 mt-4 w-full flex justify-center">
                <TaskList tasks={tasks} />
            </div>
        </div>
    );
};

export default UserInfo;
