import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export function FeedMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
    return (
        <Menu>
            <MenuButton className="rounded p-1 hover:bg-layer/10 focus:outline-none">
                <span className="text-2xl leading-none">…</span>
            </MenuButton>
            <MenuItems
                anchor="bottom"
                className="absolute right-0 mt-2 min-w-28 rounded bg-gray-800/95 shadow-lg border border-border/30 z-20"
            >
                <MenuItem>
                    {({ focus }) => (
                        <button
                            className={`block w-full px-4 py-2 text-center text-white ${
                                focus ? 'bg-accent/80 text-layer' : ''
                            }`}
                            onClick={onEdit}
                        >
                            EDIT
                        </button>
                    )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                        <button
                            className={`block w-full px-4 py-2 text-center text-white ${
                                focus ? 'bg-danger/80 text-layer' : 'text-danger'
                            }`}
                            onClick={onDelete}
                        >
                            DELETE
                        </button>
                    )}
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

export default FeedMenu;
