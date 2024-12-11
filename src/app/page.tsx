import Image from 'next/image';
import {ThemeList} from "@/lib/constants";
import Link from "next/link";
import {baseUrl, BlogPost, getBlogPosts} from "@/app/blog/utils";
import PageFooter from "@/components/PageFooter";
import PageHeader from "@/components/PageHeader";
import {Metadata} from "next";
import {FileDown, FilePenLine, SearchCheck} from "lucide-react";
import {ReactNode} from "react";

export const metadata: Metadata = {
    // Basic Metadata
    title: "Markdown Resume - Create Professional Resumes with Markdown",
    description: "Create a professional resume by writing in Markdown, using our simple editor, and choosing from various templates to export your resume easily.",
    keywords: [
        "Resume Builder",
        "Markdown Resume",
        "Export Resume as PDF",
        "Professional Resume Templates",
        "Next.js Resume App",
    ].join(", "),
    openGraph: {
        title: "Markdown Resume - Create Professional Resumes with Markdown",
        description: "Write your resume in Markdown, edit it easily, choose a professional template, and export it as a PDF. Try our Resume Builder today!",
        type: "website",
        url: `${baseUrl}`,
        images: `${baseUrl}/screenshots/landing-image.png`,
        locale: "en_US",
    },
};

export default function Home() {
    return (
        <>
            <PageHeader/>
            {/* Hero Section */}
            <section className="container mx-auto md:p-16 p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl font-medium text-gray-900 tracking-tight mb-4">Markdown Resumes Made Easy</h1>
                        <p className="text-lg text-gray-600 mb-6">Create a professional, ATS-friendly resume by writing in Markdown. Use our intuitive editor and export effortlessly with customizable templates designed for developers and tech professionals.</p>
                        <a href="/editor" className="bg-[#1a73e8] text-white font-bold text-sm py-3 px-6 rounded-lg shadow-md hover:bg-[#075cca] transition">Create Your Resume</a>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end">
                        <Image src="/screenshots/landing-image.png" alt="Project Image" width={600} height={300}/>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white">
                <div className="container lg:grid lg:grid-cols-3 items-center mx-auto gap-8 md:p-16 p-8">
                    <Feature
                        title="Easy Editing"
                        description="Simple and quick resume editing using the built-in editor without needing any technical skills."
                        icon={<FilePenLine/>}
                    />
                    <Feature
                        title="ATS Friendly"
                        description="Markdown resumes use a simple, single-column layout, making them easier for ATS to parse, even as PDFs."
                        icon={<SearchCheck/>}
                    />
                    <Feature
                        title="Export as PDF"
                        description="Export and print your resume as a high-quality PDF effortlessly."
                        icon={<FileDown/>}
                    />
                </div>
            </section>

            {/* Templates Section */}
            <section className="container mx-auto md:p-16 p-8" id="templates">
                <div className="mb-12">
                    <h2 className="text-3xl text-gray-900 tracking-tight font-medium">Resume Templates</h2>
                    <p className="text-gray-600 text-lg mt-2">Choose one of the templates below to get started on your resume.</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    {Object.keys(ThemeList).map((template) => (<TemplateCard key={template} template={template}/>))}
                </div>
            </section>

            {/* Blog Section */}
            <section className="bg-white">
                <div className="container mx-auto md:p-16 p-8" id="blog-posts">
                    <div className="mb-12">
                        <h2 className="text-3xl text-gray-900 tracking-tight font-medium">Blog Posts</h2>
                        <p className="text-gray-600 text-lg mt-2">Explore articles on writing resumes, finding jobs, and everything you need to successfully apply for your next opportunity.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {getBlogPosts().map((post) => (<BlogCard key={post.slug} post={post}/>))}
                    </div>
                </div>
            </section>

            <PageFooter/>
        </>
    );
}

// Feature Component for Features Section
interface FeatureProps {
    title: string;
    description: string;
    icon: ReactNode
}

function Feature({title, description, icon}: FeatureProps) {
    return (
        <div className="flex flex-col p-6 border rounded-lg justify-between h-full mb-8 lg:mb-0">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}

// Template Card Component for Templates Section
function TemplateCard({template, key}: { template: string, key?: string }) {
    return (
        <a key={key} href={`/editor?template=${template}`}>
            <div className="p-2 flex flex-col justify-center md:mx-0 rounded-lg hover:shadow-xl transition cursor-pointer w-fit right-0 left-0 mx-auto">
                <Image src={`/screenshots/${template}-resume.png`} alt={`${template} Template`} width={300} height={200} className="mb-1 rounded-lg border"/>
                <span className="block text-[#1a73e8] font-semibold">{ThemeList[template as keyof typeof ThemeList]}</span>
            </div>
        </a>
    );
}

// BlogPostCard Component for Blog Posts Section
interface BlogCardProps {
    post: BlogPost,
}

const BlogCard = ({post}: BlogCardProps) => {
    return (
        <Link href={`/blog/${post.slug}`}
              className="flex flex-col border rounded-lg overflow-hidden hover:shadow-xl transition">
            {post.metadata.image && (
                <Image src={post.metadata.image} alt={post.metadata.title} layout="responsive" width={16} height={9}
                       className="rounded-lg"/>)}
            <div className="p-6 flex flex-col justify-between flex-grow">
                <h3 className="font-semibold text-gray-900 mb-2">{post.metadata.title}</h3>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{post.metadata.summary}</p>
                <p className="text-blue-500 hover:underline mt-auto">Read More</p>
            </div>
        </Link>
    );
};