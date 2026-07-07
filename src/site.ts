// Single source of truth for identity + links. Edit here, it propagates.
export const site = {
  name: 'Dumindu Kumarapeli',
  role: 'Data Science undergraduate',
  // The "operates above their year" claim is never written down; it's left for
  // the visitor to conclude from the artifacts. (design report §3)
  blurb:
    'LLM / RAG & agentic systems, applied ML & modeling, and computer vision.',
  affiliation: 'BSc (Hons) Data Science, NSBM Green University, Sri Lanka',
  org: 'Assistant Secretary, NSBM AI Association (NAIA)',
  // One real channel, no form theatre. (§9)
  email: 'duminduku.25@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dumindu-kumarapeli-7a4636309',
  github: 'https://github.com/Dumee-25',
  // Drop your PDF at public/Dumindu-Kumarapeli-CV.pdf and this link resolves.
  cv: '/Dumindu-Kumarapeli-CV.pdf',
} as const;

// What I work with — grouped by where each tool fits.
export const stack = [
  {
    group: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'R'],
  },
  {
    group: 'ML / Data Science',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'Polars', 'NumPy', 'SciPy', 'YOLOv8', 'OpenCV'],
  },
  {
    group: 'LLM / RAG',
    items: ['Gemini', 'ChromaDB', 'Ollama', 'MCP'],
  },
  {
    group: 'Backend / Infra',
    items: ['FastAPI', 'Spring Boot', 'PostgreSQL', 'SQLite', 'Docker', 'Git'],
  },
  {
    group: 'Frontend / Viz',
    items: ['React', 'Next.js', 'Node.js', 'Streamlit', 'Plotly', 'Power BI'],
  },
] as const;

export const nav = [
  { href: '/systems', label: 'Systems' },
  { href: '/inquiry', label: 'Inquiry' },
  { href: '/notes', label: 'Notes' },
  { href: '/colophon', label: 'Colophon' },
] as const;
