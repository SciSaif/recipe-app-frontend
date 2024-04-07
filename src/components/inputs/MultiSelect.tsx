import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "../ui/button";
import { limitCharacters } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
interface Props {
    form: UseFormReturn<any>;
    value: string;
    label: string;
    options: { value: string; label: string }[];
}

const MultiSelect = ({ form, value, label, options }: Props) => {
    return (
        <div className="w-full">
            <FormLabel
                htmlFor={value}
                className="flex items-center justify-start col-span-1 mb-1"
            >
                {label}
            </FormLabel>
            <FormField
                control={form.control}
                name={value}
                render={() => (
                    <FormItem className="space-y-0">
                        <div className="flex flex-row items-center justify-center gap-4">
                            <FormControl id={value}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex justify-start w-full px-4 font-normal text-left"
                                        >
                                            {form.watch(value).length > 0 ? (
                                                <span className="text-sm text-primary">
                                                    {limitCharacters(
                                                        form
                                                            .watch(value)

                                                            .join(", "),

                                                        40
                                                    )}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-placeholder">
                                                    Select {label}
                                                </span>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        onCloseAutoFocus={(e: Event) => {
                                            e.preventDefault();
                                        }}
                                        className="w-56 bg-white"
                                    >
                                        <DropdownMenuLabel>
                                            {label}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        {
                                            <div className="flex flex-col gap-2 max-h-[200px] overflow-auto">
                                                {/* should be able to select multiple cuisine max 3 */}
                                                {options.map(
                                                    (option, index) => (
                                                        <DropdownMenuCheckboxItem
                                                            onSelect={(
                                                                e: Event
                                                            ) => {
                                                                e.preventDefault();
                                                            }}
                                                            key={
                                                                option.value +
                                                                index
                                                            }
                                                            checked={form
                                                                .watch(value)
                                                                .includes(
                                                                    option.value
                                                                )}
                                                            onCheckedChange={() => {
                                                                const values =
                                                                    form.watch(
                                                                        value
                                                                    );
                                                                if (
                                                                    values.includes(
                                                                        option.value
                                                                    )
                                                                ) {
                                                                    // if major size is more than 1 then remove clear error
                                                                    if (
                                                                        values.length >
                                                                        1
                                                                    ) {
                                                                        form.clearErrors(
                                                                            value
                                                                        );
                                                                    }

                                                                    form.setValue(
                                                                        value,
                                                                        values.filter(
                                                                            (
                                                                                m: string
                                                                            ) =>
                                                                                m !==
                                                                                option.value
                                                                        )
                                                                    );
                                                                } else {
                                                                    form.clearErrors(
                                                                        value
                                                                    );

                                                                    form.setValue(
                                                                        value,
                                                                        [
                                                                            ...values,
                                                                            option.value,
                                                                        ]
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            {option.label}
                                                        </DropdownMenuCheckboxItem>
                                                    )
                                                )}
                                            </div>
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default MultiSelect;
