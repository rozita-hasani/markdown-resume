import {baseUrl, formatDate, getBlogPosts} from "@/app/blog/utils";
import {notFound} from "next/navigation";
import {CustomMDX} from "@/components/Mdx";
import '@/styles/blog.css';
import Image from "next/image";

type Params = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({params}: Params) {
    const {slug} = await params
    const post = getBlogPosts().find((post) => post.slug === slug)
    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const {title, publishedAt: publishedTime, summary: description, image,} = post.metadata
    const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/blog/${slug}`,
            images: [{url: ogImage,},],
        }
    }
}

export default async function Blog({params}: Params) {
    const {slug} = await params;
    const post = getBlogPosts().find((post) => post.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className='bg-white'>
            <section className="container mx-auto md:p-16 p-8">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.metadata.title,
                            datePublished: post.metadata.publishedAt,
                            dateModified: post.metadata.publishedAt,
                            description: post.metadata.summary,
                            image: post.metadata.image
                                ? `${baseUrl}${post.metadata.image}`
                                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                            url: `${baseUrl}/blog/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: "Rozita Hasani",
                            },
                        }),
                    }}
                />
                {/* Blog Title */}
                <h1 className="text-4xl font-semibold text-gray-900 mb-4">{post.metadata.title}</h1>

                {/* Author Details */}
                <div className="flex items-center mb-6">
                    <Image src="/author.jpg" alt="Author" width={50} height={50} className="rounded-full"/>
                    <div className="ml-4">
                        <p className="text-gray-700 font-semibold">Rozita Hasani</p>
                        <p className="text-gray-500 text-sm">{formatDate(post.metadata.publishedAt)}</p>
                    </div>
                </div>

                {/* Blog Image */}
                {post.metadata.image && (
                    <div className="mb-8">
                        <Image src={post.metadata.image} alt={post.metadata.title} width={400} height={400} className="rounded-lg"/>
                    </div>
                )}

                {/* Blog Content */}
                <article className="markdown-body">
                    <CustomMDX source={post.content}/>
                </article>
            </section>
        </div>)
}