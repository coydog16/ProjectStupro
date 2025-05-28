import { FeedPost } from '../types';

interface TaskListProps {
    tasks: FeedPost[];
}

// タスク進捗率を計算（0〜100）
function calcProgressPercent(createdAt?: string, dueDate?: string): number {
    if (!createdAt || !dueDate) return 0;
    const start = new Date(createdAt).getTime();
    const end = new Date(dueDate).getTime();
    const now = Date.now();
    if (end <= start) return 100;
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
    <div className="w-full max-w-xl">
        {/* タスクラベル */}
        <div className="text-gray-300 mb-2 text-left pl-1 tracking-widest text-xs uppercase">
            <span className="font-mono">TASK</span>
        </div>
        {tasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-4">No Tasks</div>
        ) : (
            <ul className="flex flex-col gap-0">
                {tasks.map((task) => {
                    const percent = calcProgressPercent(task.created_at ?? undefined, task.task_due_date ?? undefined);
                    // 進捗率に応じて色を変化
                    let meterColor = '#38bdf8'; // 青
                    if (percent > 90) meterColor = '#ef4444'; // 赤
                    else if (percent > 70) meterColor = '#f59e42'; // オレンジ
                    else if (percent > 40) meterColor = '#facc15'; // 黄
                    return (
                        <li
                            key={task.id}
                            className="w-full relative flex flex-row items-center px-4 py-1 border border-white/10 shadow-lg overflow-hidden bg-transparent"
                        >
                            {/* 進捗メーター（下部バー） */}
                            <div
                                className="absolute left-0 bottom-0 h-[4px] transition-all duration-300 rounded-br-lg rounded-bl-lg"
                                style={{
                                    width: percent + '%',
                                    background: meterColor,
                                    zIndex: 20,
                                }}
                            />
                            {/* タスク内容（16文字以上は省略） */}
                            <span className="font-semibold text-white truncate max-w-[180px] text-xs drop-shadow z-20">
                                {task.content.length > 16 ? `${task.content.slice(0, 16)}…` : task.content}
                            </span>
                            {/* 期限 */}
                            <span className="absolute bottom-1 right-3 text-xs text-gray-200 px-2 z-20">
                                {task.task_due_date ? new Date(task.task_due_date).toLocaleDateString() : '未設定'}
                            </span>
                        </li>
                    );
                })}
            </ul>
        )}
    </div>
);

export default TaskList;
