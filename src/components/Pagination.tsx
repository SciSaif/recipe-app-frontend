import React from "react";
import { Button } from "./ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from "lucide-react";
interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
    return (
        <div className="flex flex-row justify-center px-10 ">
            <div className="flex flex-row items-center gap-2 ">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="flex w-8 h-8 p-0 "
                        onClick={() => {
                            setPage(1);
                        }}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeftIcon size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => {
                            setPage((old) => (old === 1 ? old : old - 1));
                        }}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => {
                            setPage((old) =>
                                old === totalPages ? old : old + 1
                            );
                        }}
                        disabled={page === totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        className="flex w-8 h-8 p-0 "
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRightIcon size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
