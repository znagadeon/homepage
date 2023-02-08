import { createRoot } from 'react-dom/client';
import { App } from './App';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.css';

const app = document.getElementById('app') as HTMLDivElement;

const root = createRoot(app);
root.render(<App />);
