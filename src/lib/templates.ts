export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const templates: Template[] = [
  {
    id: 'readme',
    name: 'README',
    description: 'Project documentation template',
    content: `# Project Name

A brief description of what this project does and who it's for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install your-project
\`\`\`

## Usage

\`\`\`javascript
import { something } from 'your-project';

// Your code here
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
  },
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'Article or blog post template',
    content: `# Article Title

*Published on [Date] by [Author]*

## Introduction

Start with an engaging introduction that hooks the reader and explains what they'll learn.

## Main Content

### Section 1

Your first main point goes here.

### Section 2

Your second main point goes here.

### Section 3

Your third main point goes here.

## Conclusion

Summarize the key takeaways and include a call to action.

---

*Thanks for reading! Feel free to share your thoughts in the comments.*
`,
  },
  {
    id: 'notes',
    name: 'Notes',
    description: 'Quick notes and ideas template',
    content: `# Notes

## Topics

- [ ] Topic 1
- [ ] Topic 2
- [ ] Topic 3

## Key Points

1. First important point
2. Second important point
3. Third important point

## Ideas

> Add your ideas and thoughts here

## References

- Reference 1
- Reference 2

## Action Items

- [ ] Action 1
- [ ] Action 2
`,
  },
  {
    id: 'meeting',
    name: 'Meeting Notes',
    description: 'Meeting documentation template',
    content: `# Meeting Notes

**Date:** [Date]  
**Attendees:** [Names]  
**Duration:** [Time]

## Agenda

1. Item 1
2. Item 2
3. Item 3

## Discussion

### Topic 1

Notes about the first topic discussed.

### Topic 2

Notes about the second topic discussed.

## Decisions Made

- Decision 1
- Decision 2

## Action Items

| Task | Owner | Due Date |
|------|-------|----------|
| Task 1 | Name | Date |
| Task 2 | Name | Date |

## Next Meeting

**Date:** [Date]  
**Focus:** [Topic]
`,
  },
];
