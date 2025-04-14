# Changelog

All notable changes to the Grotik (LinguaFin) project will be documented in this file.

## [Unreleased]

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

### Fixed
- Server-side navigation error in auth store
- Duplicate header in dashboard page
- Inconsistent layout structure
- Fixed class name conflict in dropdown menu item component
- Added missing favicon to prevent 404 errors
- Dropdown menu builder prop handling
- Theme switcher slot management
- Dropdown menu item styling with proper class merging
- Theme persistence and state management
- Theme switcher functionality with proper context management
- Dropdown menu accessibility and keyboard navigation
- Theme persistence across page reloads
- System theme synchronization
- Dark mode color consistency in auth pages
- Removed duplicate header component by consolidating into single location x2
- Fixed theme switcher integration in header
- Improved mobile responsiveness in header with proper hamburger menu
- Enhanced header layout with proper authentication state handling
- Optimized header component structure for better maintainability

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