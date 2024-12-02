import Image from 'next/image';
import Link from 'next/link';
import {svgPaths} from "@/lib/constants";
import Logo from "@/components/Logo";

export default function Home() {
    return (
        <>
        {/* Header Section */}
            <header className="container p-8 mx-auto">
                <div className="flex items-center">
                    <Logo />
                    <span className="ml-3 text-2xl font-bold text-gray-900">Resume Markdown</span>
                </div>
            </header>

        {/* Hero Section */}
            <section className="container mx-auto px-8 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl font-medium text-gray-900 tracking-tight mb-4">Resume Markdown</h1>
                        <p className="text-lg text-gray-600 mb-6">Create a professional resume by writing in Markdown, using our simple editor, and choose from various templates to export your resume easily.</p>
                        <a href="/editor" className="bg-[#1a73e8] text-white text-sm py-3 px-6 rounded-lg shadow-md hover:bg-[#075cca] transition">Create Your Resume</a>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end">
                        <Image src="/screenshots/landing-image.png" alt="Project Image" width={400} height={300}/>
                    </div>
                </div>
            </section>

        {/* Features Section */}
            <section className="bg-white">
                <div className="container grid grid-cols-3 items-center mx-auto gap-8 p-8">
                    <Feature
                        title="Easy Editing"
                        description="Simple and quick resume editing using the built-in editor without needing any technical skills."
                        icon="file-pen-line"
                    />
                    <Feature
                        title="Diverse Templates"
                        description="Access a variety of simple and professional templates with easy customization options."
                        icon="palette"
                    />
                    <Feature
                        title="Save as PDF"
                        description="Save and print your resume as a high-quality PDF effortlessly."
                        icon="file-down"
                    />
                </div>
            </section>

            {/* Templates Section */}
            <section className="container mx-auto px-8 py-16" id="templates">
                <div className="text-center mb-12">
                    <h2 className="text-3xl text-gray-900 tracking-tight font-medium">Resume Templates</h2>
                    <p className="text-gray-600 text-lg mt-2">Choose one of the templates below to get started on your resume.</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {["tehran", "isfahan", "shiraz", "mashhad"].map((template) => (<TemplateCard key={template} template={template}/>))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-white">
                <div className="container mx-auto flex justify-between p-8">
                    <p className="text-gray-500">© 2024 Resume Markdown. All rights reserved.</p>
                    <p className="text-gray-500">Crafted with ❤️ by Rozita Hasani</p>
                </div>
            </footer>
        </>
    );
}

// Feature Component for Features Section

interface FeatureProps {
    title: string;
    description: string;
    icon: string
}

function Feature({title, description, icon}: FeatureProps) {
    return (
        <div className="flex flex-col p-6 border rounded-lg justify-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-${icon}`}>
                    {svgPaths[icon]}
                </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}

// Template Card Component for Templates Section
function TemplateCard({template}: { template: string }) {
    return (
        <div className="p-2 flex flex-col justify-center md:mx-0 rounded-lg hover:shadow-xl transition cursor-pointer">
            <Image src={`/screenshots/${template}-resume.jpg`} alt={`${template} Template`} width={300} height={200} className="mb-1 rounded-lg border" />
            <Link href={`/editor?template=${template}`} className="block text-[#1a73e8] hover:underline font-semibold">
                {template.charAt(0).toUpperCase() + template.slice(1)}
            </Link>
        </div>
    );
}