import React from "react";

export default function PageFooter() {
    return (
        <footer>
            <div className="container mx-auto flex flex-col-reverse gap-2 md:flex-row justify-between md:px-16 py-4 px-8">
                <p className="text-gray-500">© 2024 Markdown Resume. All rights reserved.</p>
                <p className="text-gray-500">Crafted with ❤️ by Rozita Hasani</p>
            </div>
        </footer>
    )
}