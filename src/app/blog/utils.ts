import fs from 'fs'
import path from 'path'

export const baseUrl = 'https://markdownresume.app'

type BlogPostMetadata = {
    title: string
    publishedAt: string
    summary: string
    image?: string
}

type ParsedFrontMatter = {
    metadata: BlogPostMetadata
    content: string
}

export type BlogPost = {
    metadata: BlogPostMetadata
    slug: string
    content: string
}

/**
 * Parses the front matter and content from a Markdown file.
 * @param fileContent - Raw content of the Markdown file
 * @returns Parsed metadata and content
 */

function parseFrontMatter(fileContent: string): ParsedFrontMatter {
    const regex = /^---\s*([\s\S]*?)\s*---/
    const match = regex.exec(fileContent)

    if (!match) {
        throw new Error('Invalid front matter format')
    }

    const frontMatterBlock = match[1]
    const content = fileContent.replace(regex, '').trim()

    const metadata = frontMatterBlock.split('\n').reduce<Partial<BlogPostMetadata>>((acc, line) => {
        const [key, ...valueArr] = line.split(': ')
        if (key && valueArr.length > 0) {
            acc[key.trim() as keyof BlogPostMetadata] = valueArr.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
        }
        return acc
    }, {})

    return {
        metadata: metadata as BlogPostMetadata,
        content,
    }
}

/**
 * Retrieves all Markdown file names from a directory.
 * @param dir - Directory to scan
 * @returns Array of Markdown file names
 */

function getMDXFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`)
    }
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.md')
}

/**
 * Reads and parses a single Markdown file.
 * @param filePath - Path to the Markdown file
 * @returns Parsed metadata and content
 */

function readMDXFile(filePath: string): ParsedFrontMatter {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`)
    }
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontMatter(rawContent)
}

/**
 * Retrieves all parsed Markdown data from a directory.
 * @param dir - Directory containing Markdown files
 * @returns Array of metadata, slug, and content for each file
 */

function getMDXData(dir: string): BlogPost[] {
    return getMDXFiles(dir).map((file) => {
        const filePath = path.join(dir, file)
        const {metadata, content} = readMDXFile(filePath)
        const slug = path.basename(file, path.extname(file))
        return {metadata, slug, content}
    })
}

/**
 * Retrieves all blog posts as MDX data.
 * @returns Array of blog post metadata, slug, and content
 */

export function getBlogPosts(): BlogPost[] {
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog')
    return getMDXData(blogDir)
}

/**
 * Formats a date as a human-readable string with optional relative time.
 * @param date - Date string in ISO format
 * @param includeRelative - Whether to include a relative date (e.g., "2d ago")
 * @returns Formatted date string
 */

export function formatDate(date: string, includeRelative = false): string {
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    const targetDate = new Date(date)
    const currentDate = new Date()

    const diffTime = currentDate.getTime() - targetDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const formattedDate = targetDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return formattedDate
    }

    const relativeDate =
        diffDays > 365
            ? `${Math.floor(diffDays / 365)}y ago`
            : diffDays > 30
                ? `${Math.floor(diffDays / 30)}mo ago`
                : diffDays > 0
                    ? `${diffDays}d ago`
                    : 'Today'

    return `${formattedDate} (${relativeDate})`
}