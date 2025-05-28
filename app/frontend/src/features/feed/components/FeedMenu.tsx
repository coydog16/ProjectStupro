import { DropdownMenu } from '../../../components/common/DropdownMenu';

interface FeedMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    menuLabel?: React.ReactNode; // 「…」など、トリガーの文言やアイコン
}

export function FeedMenu({
    onEdit,
    onDelete,
    menuLabel = <span className="text-2xl leading-none">…</span>,
}: FeedMenuProps) {
    return (
        <DropdownMenu buttonContent={menuLabel}>
            <button
                className="block w-full px-4 py-2 text-left text-white hover:bg-accent/80 hover:text-layer rounded-t"
                onClick={onEdit}
                type="button"
            >
                編集
            </button>
            <button
                className="block w-full px-4 py-2 text-left text-danger hover:bg-danger/80 hover:text-layer rounded-b"
                onClick={onDelete}
                type="button"
            >
                削除
            </button>
        </DropdownMenu>
    );
}

export default FeedMenu;
