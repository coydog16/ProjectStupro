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
        {/* ユーザー情報エリア */}
        <div className="relative z-10 flex flex-row items-center pt-6 pl-8">
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shadow-lg"
                style={{ background: "#556a8b" }}
            >
                {user?.avatar_image_id ? (
                    <img
                        src={`/api/images/${user.avatar_image_id}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span
                        className="text-3xl font-bold"
                        style={{ color: "#fffde7" }}
                    >
                        {user?.full_name?.[0] || user?.username?.[0] || "?"}
                    </span>
                )}
            </div>
            <div className="ml-4 text-left relative">
                {/* 名前の背景にうっすら黒い放射状グラデーション */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)",
                        zIndex: 0,
                        filter: "blur(1.5px)",
                    }}
                />
                <div
                    className="text-xl font-bold relative z-10"
                    style={{ color: "#fffde7" }}
                >
                    {getDisplayName(user)}
                </div>
                <div className="text-gray-200 text-sm relative z-10">
                    @{user?.username}
                </div>
            </div>
        </div>
        {/* タスクリストエリア */}
        <div className="relative z-10 mt-4 w-full flex justify-center">
            <TaskList tasks={tasks} />
        </div>
    </div>
);

export default UserInfo;
