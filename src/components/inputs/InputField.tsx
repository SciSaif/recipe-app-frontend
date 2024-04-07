import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
interface Props {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
}

const InputField = ({
    form,
    name,
    label,
    placeholder,
    type = "text",
}: Props) => {
    return (
        <div>
            <FormLabel
                htmlFor={name}
                className="flex items-center justify-start mb-1"
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
                                    <Input
                                        type={type}
                                        {...field}
                                        placeholder={placeholder}
                                        onChange={(event: any) => {
                                            if (type === "number") {
                                                field.onChange(
                                                    Number(event.target.value)
                                                );
                                            } else field.onChange(event);
                                        }}
                                    />
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

export default InputField;
