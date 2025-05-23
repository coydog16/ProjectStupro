import React from "react";
import { FeedPost } from "../types";

interface TaskListProps {
    tasks: FeedPost[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
    <div className="w-full max-w-xl">
        <div className=" text-gray-300 mb-2 text-left pl-1 tracking-widest text-xs uppercase">
            <span className="font-mono">TASK</span>
        </div>
        {tasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-4">
                No Tasks
            </div>
        ) : (
            <ul className="flex flex-col gap-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="w-full relative flex flex-row items-center px-4 py-1 rounded-lg border border-white/10 shadow-lg bg-white/10 backdrop-blur-md overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-black/10 before:opacity-40 before:pointer-events-none"
                    >
                        <span className="font-semibold text-white truncate max-w-[180px] text-xs drop-shadow">
                            {task.content.length > 16
                                ? `${task.content.slice(0, 16)}…`
                                : task.content}
                        </span>
                        <span className="absolute bottom-1 right-3 text-xs text-gray-200 px-2 ">
                            {task.task_due_date
                                ? new Date(
                                      task.task_due_date
                                  ).toLocaleDateString()
                                : "未設定"}
                        </span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default TaskList;
