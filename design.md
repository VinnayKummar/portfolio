# Portfolio design system

Hallmark full redesign of cvinaykumar.com. Preserve all factual content, routes, links, IDs, analytics, and functional interactions. No files or component trees are deleted.

Brand: Space Grotesk display, Inter body, DM Mono for code only. Dark graphite background and cyan #00d9ff accent from existing source. Console's restrained surfaces are inspiration, but the existing brand wins over the dealt theme. No gradients, glows, floating ornament, emoji icons, faux browser chrome, or scroll-dependent visibility.

Shared files: tokens.css, base.css, portfolio.css. Every page links portfolio.css after its inline styles. Parent owns these shared files and index.html. Each case-study worker owns only its assigned HTML file. Page-specific CSS may remain inline with a Hallmark stamp as its first nonempty line. All literal colors and font families belong in :root tokens. Reuse existing token aliases. Use !important sparingly only to defeat retained inline presentation.

Canvas: max width 1280px, 48px desktop gutters, 24px phone gutters. One 32px column gap. Section space 96/120/144px. H1 clamp(48px, 7vw, 96px), H2 clamp(36px,4vw,56px), H3 24px. Roman single-color heads, sentence case, no eyebrow labels or numeric ornaments above headings. Body >=16px. Labels >=14px, no tracking or all caps. Text line height 1.65. Prose measure 65ch. Existing long case-study content is preserved; the 450-word budget is waived for technical case studies.

Controls: cyan fill/dark ink primary and neutral outline secondary, 48px target, 6px radius, visible immediate focus outlines, hover background or underline only. No parallax or reveal needed. Content visible with no JavaScript and without CDN dependencies. Reduced-motion fallback mandatory. Header uses a wordmark and clear links, solid background, capped content width. Case-study headers retain home/back link, title and GitHub link.

Case studies: replace decorative hero/background/browser chrome with a large left-aligned title, concise existing description and actions. Preserve original diagrams as factual process compositions with plain typographic stages instead of emoji. Polish uses the existing real project screenshots without fake browser framing. Technical body: flexible 2-column editorial section layout, ample code blocks with horizontal overflow scoped to pre, tables with readable labels, quiet divided feature lists rather than nested cards. All content and project facts stay, including limitations and future improvements. Contact and résumé links retained.

All SVGs need aria-hidden or an accessible label. html/body use overflow-x:clip. Image-bearing grid tracks minmax(0,1fr). Heads overflow-wrap:break-word; min-width:0. [hidden] stays display:none!important. Add meta descriptions and useful page titles. Never claim a verification pass that has not run.
