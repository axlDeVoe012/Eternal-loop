# Parallax Fix Plan

## Information Gathered:

### Current Implementation:
- **ParallaxProvider.jsx**: Uses `useScroll` and `useSpring` from framer-motion with APPLE_SPRING config
- **ParallaxChapter.jsx**: Section container with `snap-start snap-always` classes
- **StorySection.jsx**: Main scroll container with `overflow-y-scroll snap-y snap-mandatory`
- **StoryChapter.jsx**: Individual chapters using parallax hooks
- **useLabels.js**: Creates parallax transforms for text elements
- **CrossfadeImage.jsx**: Image component with fade transitions
- **CSS**: Basic setup with smooth scroll and font smoothing

### Issues Identified:

#### Mobile Issues:
1. **Missing viewport meta** - Need ensure proper mobile viewport configuration
2. **iOS momentum scroll** - Missing `-webkit-overflow-scrolling: touch`
3. **Touch action** - Need `touch-action: pan-y` for proper touch handling
4. **Haptic feedback** - Already handles gracefully but could improve
5. **Audio autoplay** - Uses touchstart but could add more robust handling

#### Smoothness Issues:
1. **useLabels hook problem** - Returns `useTransform` inside function, violates Rules of Hooks
2. **Missing will-change hints** - CSS optimizations for animations
3. **Missing hardware acceleration** - Need `transform: translateZ(0)`
4. **Image loading** - Should use lazy loading with proper priority
5. **Scroll jank** - Could benefit from `scroll-behavior: smooth` and better snap handling

## Plan:

### Step 1: Fix index.css for mobile and smoothness
- Add iOS momentum scroll support
- Add touch-action for proper mobile handling
- Add hardware acceleration hints
- Improve snap scrolling smoothness

### Step 2: Fix ParallaxProvider for mobile
- Add scroll options for better mobile performance
- Add passive event listeners support

### Step 3: Fix useLabels hook
- Restructure to properly use hooks at top level
- Memoize transforms to prevent re-renders

### Step 4: Improve ParallaxChapter
- Add proper mobile className handling
- Add will-change hints for better performance
- Improve snap behavior for mobile

### Step 5: Enhance CrossfadeImage
- Add proper loading="lazy" support
- Add will-change for smooth animations

## Dependent Files to Edit:
1. src/index.css
2. src/components/parallax/ParallaxProvider.jsx
3. src/components/parallax/useLabels.js
4. src/components/parallax/ParallaxChapter.jsx
5. src/components/parallax/CrossfadeImage.jsx

## Followup Steps:
- Test on mobile device or responsive mode
- Verify smooth scrolling behavior
- Check haptic feedback works on iOS

