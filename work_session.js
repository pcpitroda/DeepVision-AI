const fs = require('fs');
const path = require('path');

const FILE_NAME = path.join(__dirname, 'developer_notes_session.txt');
const DURATION = 3600; // 1 hour

const TOPICS = [
    "Programming notes", "Code snippets", "Explanations", "Algorithms",
    "DSA concepts", "JavaScript examples", "React examples", "API examples",
    "Debugging notes", "CSS/Tailwind examples", "Project structure ideas",
    "Optimization tips", "Developer documentation", "Random utility functions",
    "Interview preparation notes", "Database concepts", "Backend architecture notes",
    "System design basics"
];

const CONTENT_TEMPLATES = [
    `### DSA: Merge Sort\n\`\`\`javascript\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  let res = [], i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) res.push(left[i++]);\n    else res.push(right[j++]);\n  }\n  return [...res, ...left.slice(i), ...right.slice(j)];\n}\n\`\`\`\n// Just reviewing standard algorithms for performance optimizations. O(N log N) time complexity.\n`,
    
    `### DSA: Graph Traversal - BFS\n\`\`\`javascript\nfunction bfs(graph, start) {\n  let queue = [start];\n  let visited = new Set([start]);\n  while (queue.length > 0) {\n    let node = queue.shift();\n    console.log(node);\n    for (let neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}\n\`\`\`\n// Remember to use a queue for BFS and a stack (or recursion) for DFS.\n`,

    `### React: Memoization example\n\`\`\`tsx\nimport { useMemo, useCallback } from 'react';\n\nconst ComplexComponent = ({ data, onAction }) => {\n  const processedData = useMemo(() => {\n    // expensive computation\n    return data.map(item => ({ ...item, value: item.value * 2 }));\n  }, [data]);\n\n  const handleAction = useCallback(() => {\n    onAction(processedData);\n  }, [processedData, onAction]);\n\n  return <div onClick={handleAction}>...</div>;\n};\n\`\`\`\n// TODO: Profile this to see if useMemo actually saves time here. Overusing it can be worse.\n`,

    `### React: Context Setup\n\`\`\`tsx\nimport React, { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext<'light'|'dark'>('light');\n\nexport const ThemeProvider = ({ children }) => {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nexport const useTheme = () => useContext(ThemeContext);\n\`\`\`\n// Simple and clean theme context. Might want to persist to localStorage later.\n`,

    `### Tailwind: Responsive Grid\n\`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">...</div>\`\n// Good standard for dashboard widget layouts.\n`,

    `### CSS: Custom Scrollbar\n\`\`\`css\n::-webkit-scrollbar {\n  width: 8px;\n}\n::-webkit-scrollbar-track {\n  background: #f1f1f1; \n}\n::-webkit-scrollbar-thumb {\n  background: #888; \n  border-radius: 4px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #555; \n}\n\`\`\`\n// Cross-browser scrollbars are always a pain. Need to check Firefox compatibility (scrollbar-width property).\n`,

    `### Express API Route\n\`\`\`javascript\napp.post('/api/users', async (req, res) => {\n  try {\n    const { email, name } = req.body;\n    if (!email) return res.status(400).json({ error: "Email is required" });\n    const user = await db.users.create({ email, name });\n    res.status(201).json(user);\n  } catch (error) {\n    console.error("Error creating user:", error);\n    res.status(500).json({ error: "Internal server error" });\n  }\n});\n\`\`\`\n// TODO: Add input validation middleware (zod or Joi).\n`,

    `### API: Retry Logic Utility\n\`\`\`javascript\nasync function fetchWithRetry(url, options = {}, retries = 3) {\n  try {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error(\`Status: \${response.status}\`);\n    return await response.json();\n  } catch (err) {\n    if (retries > 0) {\n      console.log(\`Retrying... (\${retries} left)\`);\n      await new Promise(res => setTimeout(res, 1000));\n      return fetchWithRetry(url, options, retries - 1);\n    }\n    throw err;\n  }\n}\n\`\`\`\n// Useful for flaky external services.\n`,

    `### System Design: Load Balancing\nNotes on Load Balancing algorithms:\n1. Round Robin: Sequential distribution.\n2. Least Connections: Sends traffic to the server with fewest active connections.\n3. IP Hash: Routes based on client IP, useful for session persistence.\n// We should probably stick to Round Robin for the stateless microservices.\n`,

    `### Architecture: Event-Driven\nUsing Redis Pub/Sub vs Kafka.\n- Redis: lightweight, in-memory, fast, but messages can be lost if a subscriber is offline.\n- Kafka: durable, persistent log, replays possible, but complex to set up.\n// Decision: Start with Redis for real-time notifications. Move to Kafka if we need event sourcing later.\n`,

    `### Debugging: \n- Issue: React hydration error on the landing page.\n- Cause: Date formatting mismatch between server (UTC) and client (local time).\n- Fix: Use a standard UTC format during SSR and only format to local time in a useEffect (client-side only).\n// This is a common Next.js/SSR gotcha. Need to document this in the team wiki.\n`,

    `### Util: Deep Clone\n\`\`\`javascript\nconst deepClone = (obj) => JSON.parse(JSON.stringify(obj));\n// Note: This loses functions, Dates, and undefined values. \n// For production, maybe use lodash/cloneDeep or structuredClone (modern browsers).\n\`\`\`\n`,

    `### Util: Format Currency\n\`\`\`javascript\nconst formatCurrency = (amount, currency = 'USD') => {\n  return new Intl.NumberFormat('en-US', {\n    style: 'currency',\n    currency: currency,\n  }).format(amount);\n};\n\`\`\`\n// Much better than manually adding '$' and commas!\n`,
    
    `### Developer Notes: Code Quality\n- Avoid deep nesting in loops (arrow-anti-pattern).\n- Early returns make code much more readable.\n- Write tests for core business logic, skip tests for purely presentational components if time is short.\n`,
    
    `### Explanation: React useEffect vs useLayoutEffect\n- \`useEffect\` runs asynchronously after render and paint.\n- \`useLayoutEffect\` runs synchronously after render but before paint.\n// Only use useLayoutEffect if you need to mutate the DOM and read layout (like scroll position) to avoid flicker.\n`,
    
    `### Code Snippet: Debounce hook in React\n\`\`\`tsx\nexport function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debouncedValue;\n}\n\`\`\`\n// Essential for search input fields to avoid thrashing the backend.\n`
];

const THOUGHTS = [
    "Hmm, I should probably break that down into smaller functions.",
    "Taking a short break to stretch...",
    "This algorithm feels a bit slow. Is there a way to do it in O(N)?",
    "// NOTE TO SELF: Write unit tests for this tomorrow.",
    "I wonder if using a Set here would be faster than an Array.includes()...",
    "Need to check if the new API endpoints are documented in Swagger.",
    "Why is the linter complaining about this? Oh, trailing comma.",
    "Refactoring the database schema to normalize the tables...",
    "Just read an article about new CSS features. Container queries look awesome.",
    "Okay, that bug is finally fixed. Moving on to the next task.",
    "Wait, what if the user inputs a negative number here? Let's add a check.",
    "I need to drink more water, focusing on this code for too long.",
    "The component is getting too large. Time to split it.",
    "Let's review the pull request comments before deploying this.",
    "Writing documentation is tedious but saves so much time later."
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateEntry() {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const rand = Math.random();
    
    let entryType = "content";
    if (rand < 0.2) entryType = "thought";
    else if (rand < 0.5) entryType = "combo";
    else if (rand < 0.6) entryType = "rewrite";
    
    let out = \`\\n[\${timeStr}] \`;
    
    if (entryType === "content") {
        out += \`Topic: \${getRandomItem(TOPICS)}\\n\`;
        out += getRandomItem(CONTENT_TEMPLATES);
    } else if (entryType === "thought") {
        out += \`\${getRandomItem(THOUGHTS)}\\n\`;
    } else if (entryType === "rewrite") {
        out += "Revisiting earlier code. I think I can write this better:\\n";
        out += getRandomItem(CONTENT_TEMPLATES).replace("TODO", "FIXED");
    } else {
        out += \`\${getRandomItem(THOUGHTS)}\\n\`;
        out += getRandomItem(CONTENT_TEMPLATES);
    }
    
    return out;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const startTime = Date.now();
    const endTime = startTime + (DURATION * 1000);
    
    const startStr = new Date().toLocaleString();
    fs.writeFileSync(FILE_NAME, \`# ==========================================\\n# CONTINUOUS DEVELOPER WORK SESSION\\n# Started at \${startStr}\\n# ==========================================\\n\\n\`);
    
    console.log(\`Writing to \${FILE_NAME} continuously for \${DURATION} seconds...\`);
    
    while (Date.now() < endTime) {
        const entry = generateEntry();
        fs.appendFileSync(FILE_NAME, entry + "\\n---\\n");
        
        // Random sleep between 5 to 20 seconds to simulate pacing
        const delayMs = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
        await sleep(delayMs);
    }
    
    const endStr = new Date().toLocaleString();
    fs.appendFileSync(FILE_NAME, \`\\n\\n# Session ended at \${endStr}\\n\`);
    console.log("Session complete.");
}

main().catch(console.error);
