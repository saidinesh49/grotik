# Changelog

All notable changes to the Grotik (LinguaFin) project will be documented in this file.

## [Unreleased]

### Added
- Theme-aware loading components that adapt to dark/light mode
- PageLoading component for consistent page loading states
- DataLoading component with skeleton loading option
- Enhanced auth layout with improved loading experience
- Reusable loading components for consistent UI/UX
- LoadingSpinner component for consistent loading indicators
- LoadingOverlay component with smooth fade transitions
- Enhanced AI Assistant page with improved loading states
- Smooth animations for UI elements
- Better error handling for AI Assistant integration
- Groq API integration for dynamic quiz generation
- Interactive quiz page with animations and voice assistance
- Universal header component for consistent navigation
- Vercel AI speech-to-text service integration
- AI assistant link in dashboard
- Reusable AIAssistant component for both standalone and embedded use
- AI conversation service with Groq integration
- Conversation store for managing AI chat state
- Embedded AI assistant modal in dashboard
- Next.js AI assistant integration via iframe
- Courses directory structure with placeholder pages
- Basic course page with AI assistant integration
- Courses index page with sample course data
- Improved error handling for AI Assistant with retry mechanism
- Magic UI Components
  - NeonGradientCard: A card component with neon gradient effects and hover animations
  - MagicGradientButton: A button component with gradient effects and hover animations
  - FileTree: A component for displaying hierarchical course content
- AI Assistant Integration
  - Integrated Next.js AI assistant via iframe
  - Added loading states and error handling for iframe
  - Maintained platform header and footer consistency
- Course Content
  - Added detailed course structure for Basic Banking
  - Added detailed course structure for Investment Basics
  - Added detailed course structure for Credit Management
  - Implemented interactive file tree navigation
- Theme switcher component with dark/light mode support
- Firebase configuration and authentication setup
- Google authentication integration
- Facebook authentication integration
- Universal header component with navigation and theme toggle
- Vercel AI speech-to-text service implementation
- Interactive quiz page with animations and voice assistance
- Magic UI components (NeonGradientCard, MagicGradientButton)
- Course data moved to JSON file for better maintainability
- Course content JSON structure with detailed sections, examples, and interactive elements
- File tree component for course structure navigation
- AI assistant integration with Next.js iframe
- Course progress tracking and visualization
- New FileTree component with folder/file structure and interactive navigation
- Markdown parsing for course content with proper formatting
- Interactive quiz component with multiple question types and feedback
- Confetti animation for correct quiz answers
- URL-based section navigation for bookmarking and sharing
- Breadcrumb navigation for improved course navigation
- Responsive layout improvements for course page on mobile and desktop
- Previous button in quiz navigation for better user experience
- Quiz progress tracking with answered questions array
- Moved quiz functionality to a dedicated route at `/courses/[courseId]/quiz`
- Added comprehensive console logging for quiz debugging
- Added Previous button to quiz navigation
- Added progress tracking for quiz completion
- Added visual feedback for correct/incorrect answers with confetti animation
- Added detailed explanations for quiz answers
- Added responsive design for quiz interface
- Added accessibility improvements for quiz navigation
- Avatar Circles component from Magic UI to display enrolled users in course cards
- Enrolled user count property to course data

### Changed
- Updated loading components to respect theme settings
- Updated auth layout to use new loading components
- Improved loading experience across the application
- Enhanced user experience with smooth transitions
- Improved AI Assistant iframe integration with loading states
- Updated loading indicators to match project UI/UX
- Updated main layout to use universal header component
- Improved quiz UI with responsive design and animations
- Enhanced dashboard with AI assistant integration
- Refactored AI assistant into reusable component
- Improved AI assistant UI with better mobile responsiveness
- Replaced custom AI assistant implementation with Next.js iframe integration
- Updated dashboard menu to link to courses page
- Enhanced AI Assistant component with better error handling and retry mechanism
- Updated hero section with LinguaFin branding and content
- Modified landing page messaging to reflect financial literacy focus
- Added dual CTA buttons for better user journey
- Updated button styling with gradient background
- Improved accessibility with better alt text for images
- Integrated authentication flow with hero section
- Enhanced UI consistency with Magic UI theme
- Updated AI Assistant button to use MagicGradientButton component
- Changed navigation menu from "Lessons" to "Courses" for consistency
- Updated dashboard buttons and activities to use "Course" terminology
- Improved button styling with gradient effects
- Enhanced UI consistency across the platform
- Improved course page layout with file tree navigation
- Enhanced course content organization with hierarchical structure
- Refactored main layout to use universal header component
- Updated dashboard to include AI assistant link
- Improved course data management with structured JSON
- Enhanced course content display with interactive elements
- Updated course page layout to show file tree before content
- Updated dashboard to include AI assistant link
- Enhanced course content rendering with support for tables, examples, and interactive questions
- Fixed course content rendering by converting JSX to Svelte template syntax
- Improved course page template structure and content rendering
- Enhanced file tree navigation with better visual hierarchy and interactions
- Updated FileTree component to use standard Tailwind CSS classes
- Improved course cards with NeonGradientCard and MagicGradientButton
- Fixed course structure linking with content sections
- Enhanced markdown parsing for course content
- Improved quiz component with better input styling and feedback
- Simplified course cards with elegant hover effects
- Added direct links between course structure and content sections
- Enhanced quiz experience with progress tracking and animations
- Improved mobile responsiveness of course page with better spacing and layout
- Enhanced breadcrumb navigation with responsive positioning
- Fixed quiz navigation and back button functionality
- Improved quiz question progression and feedback display
- Enhanced quiz navigation with Previous/Next buttons and better layout
- Improved quiz progress tracking with visual indicators
- Updated quiz navigation with Previous/Next buttons
- Improved quiz progress bar visualization
- Updated quiz completion feedback with more detailed scoring
- Enhanced quiz UI with better spacing and visual hierarchy
- Improved quiz state management and tracking
- Updated course card layout to move "Already Enrolled" section to the right side for better visual balance
- Adjusted spacing between "Already Enrolled" text and avatar circles for better visual alignment
- Improved UI/UX by moving "Already Enrolled" text above avatar circles for better visual organization
- Fixed course card layout to ensure "Continue" button and "Already Enrolled" section appear side by side
- Fixed mobile view spacing issue between "Already Enrolled" text and avatar circles

### Fixed
- Inconsistent loading states across the application
- Basic text loading in auth layout
- AI Assistant loading experience with proper transitions
- Iframe loading states for better user feedback
- Removed dependency on GROQ_API_KEY environment variable
- Fixed 404 error in AI Assistant with fallback URL and retry mechanism
- Fixed AI Assistant button layout to have horizontal icon and text alignment
- Improved authentication check in courses page to prevent unnecessary redirects
- Fixed race condition in auth state handling
- Fixed button alignment issues across the platform
- Resolved Groq SDK package dependency issues
- Fixed linter errors in various components
- Resolved 404 error on course pages
- Fixed course content loading and display issues
- Addressed authentication flow and session management
- Improved error handling in course content loading
- Enhanced mobile responsiveness of course pages
- Fixed course page rendering errors by properly handling HTML content
- Fixed template structure issues in course page
- Resolved 505 error in course page by fixing content rendering and template structure
- Fixed FileTree component export and implementation
- Fixed CSS class errors in FileTree component by using standard Tailwind classes
- Fixed content parsing in course page to properly display formatted content
- Resolved file tree structure issues with proper Svelte templating
- Fixed quiz back button navigation to properly return to course page
- Fixed quiz question progression to correctly move to next questions
- Resolved issues with quiz answer feedback display
- Fixed quiz navigation with proper Previous/Next button functionality
- Fixed quiz progress bar to correctly show completion percentage
- Resolved issues with quiz question transitions and feedback display
- Fixed Next Question button functionality
- Fixed quiz navigation between questions
- Fixed progress bar calculation
- Fixed quiz completion state handling
- Fixed quiz answer validation
- Fixed quiz route navigation
- Fixed quiz questions loading by adding proper array validation
- Fixed {#each} error in quiz component by ensuring options array is valid
- Fixed quiz error handling for invalid course content
- Fixed quiz navigation when questions array is empty or invalid
- Fixed quiz progress calculation for edge cases
- Fixed course card layout to ensure "Continue" button and "Already Enrolled" section appear side by side

### Enhanced
- Consistent layout structure across all pages
- Dynamic header navigation based on auth state
- Separate loading states for Google and Facebook auth
- Server-side navigation handling
- Footer component with links
- Authentication flow with proper redirection
- User state persistence across pages
- Toast notifications for auth actions
- Error handling for auth operations
- Loading states for better UX
- Added auth page protection to prevent authenticated users from accessing signin/signup pages
- Improved mobile menu with better navigation structure
- Consolidated navigation menu items
- Cleaned up header component by removing duplicate code
- Added proper cleanup for mobile menu overflow state
- Added route-based header visibility control
- Improved authentication pages by removing header for cleaner UI
- Added support for future auth-related routes (reset password)
- Optimized layout structure with conditional header rendering
- Added Grotik logo to header
- Simplified pricing structure with learning paths
- Removed subscription model in favor of educational focus
- Updated navigation menu with relevant links
- Improved header mobile responsiveness
- Improved mobile navigation with proper auth state handling
- Added consistent hamburger menu behavior for all screen sizes
- Enhanced mobile menu with proper auth-based actions
- Optimized header component for better mobile UX
- Improved navigation menu structure with DRY code
- Seamless integration of Next.js AI assistant within Svelte application
- Improved course navigation with consistent UI/UX
- Enhanced course page layout with responsive design for all screen sizes
- Improved quiz experience with better feedback and navigation
- Improved quiz accessibility with ARIA labels
- Added keyboard navigation support
- Improved quiz mobile responsiveness
- Enhanced quiz animations and transitions
- Improved quiz user experience with better feedback
- Improved quiz accessibility with ARIA labels
- Added keyboard navigation support
- Improved quiz mobile responsiveness
- Enhanced quiz animations and transitions
- Enhanced quiz error handling with better user feedback
- Improved quiz data validation for better reliability

### Security
- Implemented secure authentication flow
- Added environment variable validation
- Enhanced API key management
- Improved session handling and token management

### Added
- Global layout component
- Dynamic header navigation
- Footer component
- Dashboard page with user profile and menu grid
- User state management with automatic navigation
- Protected routes for authenticated users
- User profile display with fallback avatar
- Sign out functionality with toast notifications
- Menu items for lessons, progress, goals, and settings
- Dropdown menu component with full keyboard navigation
- Theme switcher component with light/dark/system modes
- Theme persistence using localStorage
- System theme detection and synchronization
- Smooth theme transition animations
- Enhanced Firebase configuration with error handling
- Firebase user state management
- Provider customization for better UX
- Theme store for centralized theme management

### Changed
- Updated Facebook logo to use different SVGs for light/dark modes in sign-in page
- Updated Facebook logo to use different SVGs for light/dark modes in sign-up page
- Replaced GitHub authentication with Google and Facebook in sign-in page
- Replaced GitHub authentication with Google and Facebook in sign-up page
- Updated authentication buttons styling to match existing UI
- Added proper error handling for social authentication
- Maintained consistent UI/UX across authentication flows
- Added loading states for authentication actions
- Enhanced theme store with improved system theme detection and synchronization
- Optimized theme persistence and state management
- Added proper cleanup for theme-related event listeners
- Improved theme transition handling with better performance
- Updated CTA section text to focus on financial literacy journey
- Revised pricing plans to match educational focus
- Changed client section to show financial institutions
- Updated pricing descriptions and features for financial education
- Adjusted marketing copy to emphasize learning in multiple languages
- Replaced monthly/annual pricing with learning path categories
- Updated pricing section to focus on educational journey
- Changed subscription buttons to learning-focused CTAs
- Added waitlist functionality for upcoming features

### Added
- Google authentication integration
- Facebook authentication integration with dark/light mode support
- Toast notifications for authentication feedback
- Error handling for social authentication
- Loading states for authentication buttons

### Added
- Firebase Authentication setup with provided configuration
- Google and Facebook authentication providers
- Authentication store with Svelte
- User state management
- Authentication modal component with Magic UI theme
- Auth card component with social login buttons
- Modal component for authentication flow

### Changed
- Updated hero section with LinguaFin branding and content
- Modified landing page messaging to reflect financial literacy focus
- Added dual CTA buttons for better user journey
- Updated button styling with gradient background
- Improved accessibility with better alt text for images
- Integrated authentication flow with hero section
- Enhanced UI consistency with Magic UI theme

### Added
- Initial project setup
- Installed all project dependencies
- Started development server

### Added
- Theme switcher component for dark/light mode toggle
- Firebase configuration and initialization
- Google authentication integration
- Facebook authentication integration
- User authentication store
- Protected routes implementation
- Loading states for authentication
- Error handling for auth operations
- Responsive navigation components
- Custom button components with variants
- Animated shiny text component
- Universal header component with authentication and theme controls
- Clean layout structure with footer

### Changed
- Updated logo and branding elements
- Improved button styles and hover states
- Refactored header into a reusable component
- Enhanced layout structure for better maintainability
- Optimized authentication flow

### Fixed
- Duplicate header issue by implementing universal header component
- Theme persistence across page reloads
- Authentication state management
- Mobile responsiveness issues
- Navigation consistency across pages

### Added
- AI Assistant feature with voice interaction capabilities
- Interactive quiz page with animations and voice assistance
- Dashboard link to access the AI Assistant
- Vercel AI speech-to-text service integration
- Universal header component for consistent navigation
- Theme switcher with dark/light mode support
- Firebase configuration and authentication setup
- Google and Facebook authentication integration
- Mobile responsive design for all components
- Voice interaction component for accessibility

### Changed
- Updated main layout to use universal header component
- Improved dashboard UI with AI assistant integration
- Enhanced quiz experience with animations and voice commands
- Refactored code structure for better maintainability

### Fixed
- Theme persistence across page reloads
- Mobile responsiveness issues
- Authentication flow improvements

### Added
- LoadingSpinner component for consistent loading indicators
- LoadingOverlay component with smooth fade transitions
- Enhanced AI Assistant page with improved loading states
- Smooth animations for UI elements
- Better error handling for AI Assistant integration

### Changed
- Improved AI Assistant iframe integration with loading states
- Enhanced user experience with smooth transitions
- Updated loading indicators to match project UI/UX

### Fixed
- AI Assistant loading experience with proper transitions
- Iframe loading states for better user feedback

### Dependencies
- Added groq-sdk package for AI-powered quiz generation
- Added @vercel/ai package for speech-to-text capabilities
- Added marked package for markdown parsing
- Added canvas-confetti package for quiz animations 