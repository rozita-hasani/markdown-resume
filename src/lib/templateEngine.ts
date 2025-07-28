export interface TemplateVariables {
    [key: string]: string | object | Array<Record<string, unknown>>;
}

export interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
}

export interface EducationItem {
    institution: string;
    degree: string;
    graduation: string;
    description: string;
}

export interface ProjectItem {
    name: string;
    description: string;
    technologies: string;
    url?: string;
}

/**
 * Enhanced template engine that supports nested variables and loops
 */
export function renderTemplate(content: string, variables: TemplateVariables): string {
    if (!content || !variables) {
        return content;
    }

    let renderedContent = content;

    // Handle {{#each}} loops first
    renderedContent = renderLoops(renderedContent, variables);

    // Handle {{#if}} conditionals
    renderedContent = renderConditionals(renderedContent, variables);

    // Handle nested variables like {{experience.name}}
    const nestedRegex = /{{\s*([^}]+)\s*}}/g;
    renderedContent = renderedContent.replace(nestedRegex, (match, variablePath) => {
        const path = variablePath.trim();
        const value = getNestedValue(variables, path);
        return value !== undefined ? String(value) : match;
    });

    return renderedContent;
}

/**
 * Render {{#each}} loops in the template
 */
function renderLoops(content: string, variables: TemplateVariables): string {
    const eachRegex = /{{#each\s+([^}]+)}}([\s\S]*?){{\/each}}/g;
    
    return content.replace(eachRegex, (match, arrayPath, template) => {
        const path = arrayPath.trim();
        const array = getNestedValue(variables, path) as Array<Record<string, unknown>>;
        
        if (!Array.isArray(array)) {
            return '';
        }

        if (array.length === 0) {
            return '';
        }

        return array.map(item => {
            let itemContent = template;
            
            // Replace variables within the loop context
            const itemRegex = /{{\s*([^}]+)\s*}}/g;
            itemContent = itemContent.replace(itemRegex, (varMatch: string, varPath: string) => {
                const value = getNestedValue(item, varPath.trim());
                return value !== undefined ? String(value) : varMatch;
            });

            return itemContent;
        }).join('\n\n');
    });
}

/**
 * Render {{#if}} conditionals in the template
 */
function renderConditionals(content: string, variables: TemplateVariables): string {
    const ifRegex = /{{#if\s+([^}]+)}}([\s\S]*?){{\/if}}/g;
    
    return content.replace(ifRegex, (match, conditionPath, template) => {
        const condition = conditionPath.trim();
        const value = getNestedValue(variables, condition);
        
        // Check if the value is truthy
        const isTruthy = value !== undefined && value !== null && value !== '' && value !== false && value !== 0;
        
        if (isTruthy) {
            // Replace variables within the conditional block
            const varRegex = /{{\s*([^}]+)\s*}}/g;
            return template.replace(varRegex, (varMatch: string, varPath: string) => {
                const varValue = getNestedValue(variables, varPath.trim());
                return varValue !== undefined ? String(varValue) : varMatch;
            });
        }
        
        return '';
    });
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: unknown, path: string): unknown {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        if (current === null || current === undefined) {
            return undefined;
        }
        if (typeof current === 'object' && current !== null) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return undefined;
        }
    }

    return current;
}

/**
 * Extract all template variables from content (including nested ones)
 */
export function extractTemplateVariables(content: string): string[] {
    if (!content) {
        return [];
    }

    const variables = new Set<string>();
    
    // Extract simple variables like {{name}}
    const simpleRegex = /{{\s*([^}]+)\s*}}/g;
    let match;
    while ((match = simpleRegex.exec(content)) !== null) {
        const varName = match[1].trim();
        // Skip #each, #if, /each, /if as they're not variables
        if (!varName.startsWith('#') && !varName.startsWith('/')) {
            variables.add(varName);
        }
    }
    
    // Extract array variables from {{#each arrayName}} blocks
    const eachRegex = /{{#each\s+([^}]+)}}/g;
    while ((match = eachRegex.exec(content)) !== null) {
        const arrayName = match[1].trim();
        variables.add(arrayName);
    }

    return Array.from(variables);
}

/**
 * Get default template variables with nested structure
 */
export function getDefaultTemplateVariables(): TemplateVariables {
    return {
        name: 'Le Van Tan',
        title: 'Software Engineer',
        email: 'tanlv@gmail.com',
        phone: '+84 906 123 456',
        location: 'Ho Chi Minh City, Vietnam',
        website: 'yourwebsite.com',
        linkedin: 'linkedin.com/in/yourprofile',
        github: 'github.com/yourusername',
        summary: 'Professional summary goes here...',
        experience: [
            {
                company: 'Company Name',
                position: 'Software Engineer',
                duration: '2020-2023',
                location: 'City, State',
                description: 'Key achievements and responsibilities...'
            },
            {
                company: 'Previous Company',
                position: 'Junior Developer',
                duration: '2018-2020',
                location: 'City, State',
                description: 'Previous role achievements...'
            }
        ],
        education: [
            {
                institution: 'University Name',
                degree: 'Bachelor of Science in Computer Science',
                graduation: '2020',
                description: 'Relevant coursework and achievements...'
            }
        ],
        projects: [
            {
                name: 'Project Name',
                description: 'Description of the project and technologies used...',
                technologies: 'React, Node.js, MongoDB',
                url: 'https://github.com/username/project'
            }
        ],
        skills: 'Skill 1, Skill 2, Skill 3, Skill 4, Skill 5',
        certifications: 'Certification Name - Issuing Organization\nYear: 2023',
        languages: 'English (Native), Spanish (Fluent), French (Intermediate)',
        interests: 'Technology, Reading, Travel, Photography'
    };
} 
