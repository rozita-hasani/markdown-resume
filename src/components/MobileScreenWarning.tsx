import {TriangleAlert} from "lucide-react";
import Link from "next/link";

export default function MobileScreenWarning() {
    return (
        <div className="block md:hidden fixed inset-0 bg-gray-100 flex-col items-center text-center p-6 mt-20">
            <TriangleAlert size={48} className='text-yellow-500 mx-auto mb-4'/>
            <p className="text-center text-lg text-gray-800 mb-6">This app is designed for medium-sized screens and larger. Please use a device with a wider screen for the best experience.</p>
            <Link href='/' className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">Back to Main Page</Link>
        </div>
    )
}