import { ChevronDown } from "lucide-react";

import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../ui/menubar";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterMenuProps {
    title: string;
    icon: React.ReactNode;
    options: FilterOption[];
    selectedValues: string[];
    onSelect: (value: string) => void;
}

const FilterMenu = ({ title, icon, options, onSelect }: FilterMenuProps) => {
    return (
        <MenubarMenu>
            <MenubarTrigger
                className={
                    "py-0.5 cursor-pointer px-3 text-primary flex flex-row gap-2 lg:justify-center items-center"
                }
            >
                {icon}
                <span className={""}>{title}</span>
                <ChevronDown width={16} height={16} />
            </MenubarTrigger>
            <MenubarContent className="max-h-[400px] bg-white">
                {options.map((option) => (
                    <MenubarItem
                        key={option.value}
                        onClick={() => {
                            onSelect(option.value);
                        }}
                    >
                        <div
                            className={
                                "flex flex-row w-full hover:bg-slate-100 gap-2 justify-center items-center py-1 cursor-pointer"
                            }
                        >
                            {option.label}
                        </div>
                    </MenubarItem>
                ))}
            </MenubarContent>
        </MenubarMenu>
    );
};

export default FilterMenu;
