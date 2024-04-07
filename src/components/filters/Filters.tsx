import { Cherry, Command, Ruler, X } from "lucide-react";
import { Menubar } from "../ui/menubar";

import { Badge } from "../ui/badge";

import FilterMenu from "./FilterMenu";
import {
    CUISINE_OPTIONS,
    DIFFICULTY_OPTIONS,
    MEAL_TYPE_OPTIONS,
    TAGS_OPTIONS,
} from "@/lib/options";

export interface Filters {
    mealType: string[];
    cuisine: string[];
    difficulty: string[];
    tags: string[];
}
interface Props {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

const Filters = ({ filters, setFilters }: Props) => {
    const toggleFilter = (category: keyof Filters, value: string) => {
        setFilters({
            ...filters,
            [category]: filters[category].includes(value)
                ? filters[category].filter((item) => item !== value)
                : [value],
        });
    };

    return (
        <div className="mb-5">
            <Menubar className="flex flex-col items-start w-full gap-4 p-0 mt-4 bg-white border-none divide-x sm:flex-row">
                <FilterMenu
                    title="Difficulty"
                    icon={<Ruler width={16} height={16} />}
                    options={DIFFICULTY_OPTIONS}
                    selectedValues={filters.difficulty}
                    onSelect={(value) => toggleFilter("difficulty", value)}
                />
                <FilterMenu
                    title="Meal Type"
                    icon={<Cherry width={16} height={16} />}
                    options={MEAL_TYPE_OPTIONS}
                    selectedValues={filters.mealType}
                    onSelect={(value) => toggleFilter("mealType", value)}
                />
                <FilterMenu
                    title="Cuisine"
                    icon={<Cherry width={16} height={16} />}
                    options={CUISINE_OPTIONS}
                    selectedValues={filters.cuisine}
                    onSelect={(value) => toggleFilter("cuisine", value)}
                />
                <FilterMenu
                    title="Tags"
                    icon={<Command width={16} height={16} />}
                    options={TAGS_OPTIONS}
                    selectedValues={filters.tags}
                    onSelect={(value) => toggleFilter("tags", value)}
                />
            </Menubar>

            {/* active filters  */}
            <div className="flex flex-row gap-4">
                {Object.entries(filters).map(([category, values]) => (
                    <div className="flex flex-row gap-2 mt-4" key={category}>
                        {values.map((value: string) => (
                            <Badge
                                className="relative pl-2 pr-4 rounded-full shadow bg-slate-100"
                                key={value}
                            >
                                {value}
                                <div
                                    className="absolute p-1 transition duration-300 ease-in-out bg-white rounded-full cursor-pointer -top-2 -right-2 hover:bg-primary-600"
                                    onClick={() =>
                                        toggleFilter(
                                            category as keyof Filters,
                                            value
                                        )
                                    }
                                >
                                    <X width={12} height={12} />
                                </div>
                            </Badge>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;
