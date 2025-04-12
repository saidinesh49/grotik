# Grotik

A language learning platform with integrated financial literacy education using blockchain technology.

## Project Structure

```
src/
├── app/                # Next.js app directory
├── components/         # React components
│   └── common/        # Shared components with CSS modules
├── contexts/          # React contexts
├── services/          # External service integrations
│   ├── groq/         # Groq AI service
│   └── stellar/      # Stellar blockchain service
├── styles/           # Global styles and Tailwind config
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## CSS Architecture

We use a combination of:
1. Minimal Tailwind CSS setup (`src/styles/tailwind.css`)
2. CSS Modules for component-specific styles (`*.module.css`)
3. Utility-first approach with Tailwind classes for one-off styles

### CSS Module Example

```css
/* Button.module.css */
.button {
  @apply inline-flex items-center justify-center rounded-md;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary' }) {
  return (
    <button className={styles[variant]}>
      Click me
    </button>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file:

```env
GROQ_API_KEY=your_api_key
STELLAR_NETWORK=testnet
```

## Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- CSS Modules
- Groq AI
- Stellar SDK
