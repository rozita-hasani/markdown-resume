import {Coffee, Download} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface ButtonsProps {
    handlePrint: () => void;
}

export const SidebarButtons = ({handlePrint}: ButtonsProps) => {
    return (
        <div className='px-4 flex gap-3 border-t p-4'>
            <Button onClick={handlePrint} variant="outline" size="sm"   className="w-1/2" >
                <Download className="h-4 w-4 mr-2"/>
                Export PDF
            </Button>
            <Button size="sm" asChild   className="w-1/2">
                <Link href="https://www.buymeacoffee.com/rozitahasani" target="_blank">
                    <Coffee className="h-4 w-4 mr-2"/>
                    Support
                </Link>
            </Button>
        </div>
    )
}