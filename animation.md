Design the animation system for the [COMPANY NAME] single-page solar website, using Framer Motion (primary) and GSAP ScrollTrigger (for complex scroll scenes). Everything should reinforce the solar theme.

DELIVER A SPEC AND CODE SNIPPETS FOR:
1. Hero: a sun that slowly rises and pulses with a glow; light rays rotating subtly; solar panel tiles that assemble and tilt toward the sun; headline words reveal with a stagger
2. Scroll-driven "sun path" background: the sun moves across the sky as the user scrolls, shifting the background gradient from sunrise to noon to sunset
3. Stats strip: count-up numbers triggered on viewport entry
4. Product cards: fade-up stagger on entry; on hover, a 3D tilt, a light-sweep shine, and the image zooming gently
5. How It Works: a timeline line that draws as the user scrolls, with each step icon popping in
6. Savings Calculator: animated number transitions and a charging-bar/battery fill effect
7. Gallery and testimonials: smooth lightbox transition and carousel with drag/swipe
8. Contact/Map: the form fields slide in; the map pin drops with a bounce
9. Micro-interactions: button ripple, navbar shrink-on-scroll, active link highlighting, scroll progress bar, and a back-to-top button

RULES
- Animate only transform and opacity (GPU-friendly)
- Respect prefers-reduced-motion (provide a fallback for each animation)
- Use IntersectionObserver or whileInView so animations run once, lazily
- Reusable variants and hooks (useScrollReveal, useCountUp) in a shared /animations folder
- Define a motion token set: durations, easings, and stagger values
- Target 60fps and no layout shift (CLS < 0.1)

OUTPUT: motion token table, reusable variants file, an implementation snippet for each of the 9 items, and a performance checklist.