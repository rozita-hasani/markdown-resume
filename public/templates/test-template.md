# Test Template

## Projects

{{#each projects}}
**{{name}}**
_{{technologies}}_

{{description}}

{{#if url}}
[View Project]({{url}})
{{/if}}

{{/each}}

## Experience

{{#each experience}}
**{{position}}** at {{company}}
_{{duration}} | {{location}}_

{{description}}

{{/each}} 