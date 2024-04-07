import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { UseFormReturn } from "react-hook-form";

interface Props {
    form: UseFormReturn<any>;
    label: string;
    options: { value: string; label: string }[];
    name: string;
}

const SelectField = ({ form, label, options, name }: Props) => {
    return (
        <div>
            <FormLabel
                className="flex items-center justify-start mb-1"
                htmlFor={name}
            >
                {label}
            </FormLabel>
            <div className={"mb-4"}>
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <div className={"flex flex-col justify-between"}>
                                <FormControl id={name}>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value: string) => {
                                            field.onChange(value);
                                        }}
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                field.value
                                                    ? "text-primary"
                                                    : "text-placeholder"
                                            }`}
                                        >
                                            <SelectValue
                                                className="text-primary"
                                                placeholder={"choose"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {options.map(
                                                    ({ label, value }) => {
                                                        return (
                                                            <SelectItem
                                                                key={label}
                                                                value={value}
                                                            >
                                                                {label}
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default SelectField;
