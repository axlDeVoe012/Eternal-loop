# Mobile-Friendly Fix Plan

## Issues to Fix:

### 1. App.tsx - Hero Section
- Fix audio path (currently `/audio/so-amazing.mp3` doesn't exist)
- Adjust title positioning for mobile (currently uses `mt-[55vh]` which may be too large)

### 2. ParallaxChapter.jsx
- Adjust text sizes for mobile
- Make layout more compact for small screens

### 3. ResolutionsSection.jsx
- Fix timeline layout for mobile (currently uses 42% width which is too wide)
- Make timeline items stack vertically on mobile

### 4. StorySection.jsx  
- Ensure proper scroll behavior on mobile

## Files to Edit:
1. `src/App.tsx` - Fix audio path, adjust hero for mobile
2. `src/components/parallax/ParallaxChapter.jsx` - Mobile responsive
3. `src/components/ResolutionsSection.jsx` - Mobile timeline layout

