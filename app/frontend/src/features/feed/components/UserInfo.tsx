import React from "react";
import { FeedUser, FeedPost } from "../types";
import { getDisplayName } from "../components/utils";
import TaskList from "./TaskList";

interface UserInfoProps {
    user: FeedUser;
    tasks: FeedPost[];
}

const UserInfo: React.FC<UserInfoProps> = ({ user, tasks }) => (
    <div className="w-full relative" style={{ minHeight: "180px" }}>
        {/* グラデーション背景（ダークモード強調・彩度控えめ） */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-800" />
        {/* ユーザー情報 */}
        <div className="relative z-10 flex flex-row items-center pt-6 pl-8">
            <div className="w-20 h-20 rounded-full border-4 border-gray-900 bg-gray-800 flex items-center justify-center overflow-hidden shadow-lg">
                {user?.avatar_image_id ? (
                    <img
                        src={`/api/images/${user.avatar_image_id}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-3xl text-gray-400 font-bold">
                        {user?.full_name?.[0] || user?.username?.[0] || "?"}
                    </span>
                )}
            </div>
            <div className="ml-4 text-left">
                <div className="text-xl font-bold text-gray-200">
                    {getDisplayName(user)}
                </div>
                <div className="text-gray-500 text-sm">@{user?.username}</div>
            </div>
        </div>
        {/* タスクリスト */}
        <div className="relative z-10 mt-4 w-full flex justify-center">
            <TaskList tasks={tasks} />
        </div>
    </div>
);

export default UserInfo;
