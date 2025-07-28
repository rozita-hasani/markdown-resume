# {{name}}
**{{title}}**  
{{location}} | {{email}} | {{phone}} | [LinkedIn]({{linkedin}}) | [GitHub]({{github}}) | [Website]({{website}})

---

## Summary

{{summary}}

---

## Experience

{{#each experience}}
**{{position}} at {{company}}**  
_{{location}} | {{duration}}_

{{description}}

{{/each}}

---

## Projects

{{#each projects}}
**{{name}}**  
_{{technologies}}_

{{description}}

{{#if url}}
[View Project]({{url}})
{{/if}}

{{/each}}

---

## Skills

{{skills}}

---

## Education

{{#each education}}
**{{degree}}**  
_{{institution}} | {{graduation}}_

{{description}}

{{/each}}

---

## Certifications

{{certifications}}

---

## Languages

{{languages}}

---

## Interests

{{interests}} 