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
    content: `# Modern Web App (MWA) Project

An innovative solution for real-time data visualization and team collaboration.

---

## Features

- **Real-time Collaboration**: see changes as they happen.
- **Interactive Dashboards**: Draggable and resizable widgets.
- **Role-Based Access Control**: Secure management of user permissions.

---

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name.git

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

---

## Usage

\`\`\`javascript
import { Dashboard } from 'project-name';

// Initialize a new dashboard
const myDashboard = new Dashboard({
  theme: 'dark',
  refreshRate: 5000 // ms
});

myDashboard.render('#app');
\`\`\`

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See \`LICENSE\` for more information.
`,
  },
  {
    id: 'blog',
    name: 'Blog Post',
    description: 'Article or blog post template',
    content: `# The Future of Web Development

*Published on October 12, 2024 by Jane Doe*

---

## Introduction

As we approach the end of the year, the landscape of web development continues to evolve at a breakneck pace. From the rise of AI-assisted coding to the maturation of serverless architectures, developers have more tools than ever effectively.

---

## Key Trends

### 1. AI-Driven Development

Artificial Intelligence is no longer just a buzzword; it's a daily tool. Github Copilot and ChatGPT are changing how we write, debug, and optimize code.

### 2. The Return of Server-Side Rendering

Frameworks like Next.js and Remix are pushing SSR back into the spotlight, offering better performance and SEO capabilities compared to traditional SPAs.

### 3. WebAssembly (Wasm) Growth

Wasm is enabling high-performance applications (like video editing and 3D rendering) to run natively in the browser, opening new possibilities for web apps.

---

## Conclusion

The tools available to us are more powerful than ever. Staying updated is key, but the fundamentals of good user experience and performant code remain unchanged.

*What are your predictions? Let me know in the comments below!*
`,
  },
  {
    id: 'notes',
    name: 'Notes',
    description: 'Quick notes and ideas template',
    content: `# Daily Standup Notes

## Topics for Today

- [x] Review Q3 Performance Metrics
- [ ] Discuss API Migration timeline
- [ ] Brainstorm UI for 'Dark Mode'

---

## Key Points from Synthesis

1. **User Retention**: up by 15% after the new onboarding flow.
2. **Server Load**: Spikes observed at 9 AM UTC; need to investigate auto-scaling policies.
3. **Mobile App**: Beta release scheduled for next Friday.

---

## Ideas for Next Sprint

> "What if we added a 'Quick Share' button to the dashboard widgets?"

- Implement drag-and-drop for file uploads.
- Add keyboard shortcuts for power users.

---

## References & Action Items

- [API V2 Documentation](https://api.example.com/v2)
- [Design System Figma Board](https://figma.com/file/xyz)

**Action Items:**
- [ ] Email the design team about assets.
- [ ] Fix the bug in the login retry logic.
`,
  },
  {
    id: 'meeting',
    name: 'Meeting Notes',
    description: 'Meeting documentation template',
    content: `# Q4 Strategy Planning

**Date:** October 15, 2024
**Attendees:** Sarah (PM), Mike (Eng Lead), Jessica (Design)

---

## Agenda

1. Review Q3 Goals vs Actuals
2. Define Q4 Objectives
3. Resource Allocation

---

## Discussion & Decisions

### Q3 Review
- We hit the user growth target (10k MAU).
- Missed the deadline for the "Reporting Module".

### Decisions Made
- **Green light** to start the hiring process immediately.
- The "Reporting Module" will be prioritized for the first sprint of Q4.

---

## Action Items

| Task | Owner | Due Date |
|------|-------|----------|
| Draft Job Descriptions | Mike | Oct 18 |
| Create Mockups for Ent. UI | Jessica | Oct 25 |
| Update Roadmap | Sarah | Oct 16 |

---

## Next Meeting

**Date:** Oct 22, 2024
**Focus:** Budget Approval
`,
  },
  {
    id: 'projection',
    name: 'Projection',
    description: 'Project financial or timeline projection',
    content: `# Q4 Financial Projection

**Department:** Engineering
**Prepared By:** John Smith

---

## Overview

This projection outlines the expected costs and resource needs for Q4, focusing on the infrastructure scale-up and new hiring initiatives.

---

## Budget Breakdown

| Category | October | November | December | Q4 Total |
| :--- | :--- | :--- | :--- | :--- |
| **Cloud Services** | $12,000 | $13,500 | $15,000 | **$40,500** |
| **SaaS Tools** | $3,000 | $3,000 | $3,500 | **$9,500** |
| **Hardware** | $0 | $10,000 | $0 | **$10,000** |
| **Contractors** | $5,000 | $5,000 | $2,000 | **$12,000** |
| **Total** | **$20,000** | **$31,500** | **$20,500** | **$72,000** |

---

## Risks & Assumptions

### Risks
- AWS costs may spike if the user base grows faster than 20% MoM.
- Hardware supply chain delays could push the laptop refresh to Q1 2025.

### Assumptions
- Two new senior engineers will start in November.
- Contractor work concludes by mid-December.

---

## Timeline Projection

\`\`\`mermaid
gantt
    title Q4 Engineering Timeline
    dateFormat  YYYY-MM-DD
    section Hiring
    Post Jobs           :active, 2024-10-01, 14d
    Interviews          :2024-10-15, 20d
    Onboarding          :2024-11-05, 14d
    section Infrastructure
    Migration to V2     :2024-10-01, 30d
    Security Audit      :2024-11-01, 14d
\`\`\`
`,
  },
  {
    id: 'mindmap',
    name: 'Mindmap',
    description: 'Structured for Mindmap Mode',
    content: `# Product Launch Strategy

---

## Marketing
- **Social Media**
  - Twitter Campaign
  - LinkedIn Posts
- **Email**
  - Newsletter Blast
  - Drip Campaign
- **Partnerships**
  - Influencer Outreach

---

## Product
- **Features**
  - Advanced Analytics
  - Priority Support
  - White-labelling
- **Testing**
  - Beta Group
  - Load Testing

---

## Sales
- **Training**
  - Demo Scripts
- **Pricing**
  - Monthly vs Annual
  - Early Bird Discount

---

## Operations
- **Support**
  - Update FAQs
  - Hire Support Agents
- **Legal**
  - Update ToS
  - Privacy Policy
`,
  },
];
