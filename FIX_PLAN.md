# Fix Plan

## Issues Identified

### 1. Password.jsx - Particle Letter Sequence
- **Problem**: Using `i % 3` for particle type and `i % 4` for letter index causes wrong letter sequence
- **Current**: `type: i % 3 === 0 ? "letter" : "heart"` and `letter: letterSequence[i % 4]`
- **Fix**: Separate the letter particles into their own cycle so W,A,M,E displays in order

### 2. useLabels.js - Rules of Hooks Violation
- **Problem**: `useTransform` is called inside the `at` callback, which violates React's Rules of Hooks
- **Location**: Inside the `at` function at line 41-42
- **Fix**: Pre-create transforms with custom "from" values or use a different approach

## Files to Edit
1. `src/components/Password.jsx` - Fix letter sequence logic
2. `src/components/parallax/useLabels.js` - Fix hooks violation

