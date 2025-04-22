# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Fixed Particles component import in page.tsx to use default import instead of named import
- Fixed hydration errors in theme provider by adding client-side mounting check
- Fixed iframe scrolling issues in mobile/tablet views by improving container height handling
- Fixed layout issues in assistant page for better responsive design
- Fixed "static route" text appearing in the bottom left corner by adding CSS to hide it

### Added
- Added theme synchronization between Svelte app and Next.js assistant frontend
- Added ThemeProvider and ThemeSync components for theme management
- Added session storage based theme persistence
- Added AuroraText component in Svelte for animated text effects

### Improved
- Improved UI by centering the "Your Assistant" text in the header 