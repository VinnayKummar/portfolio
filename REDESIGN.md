# Portfolio redesign

## Resume content update, November 3, 2026

Updated from the user's supplied SR_SDE.pdf while keeping the established design. Added Meta, ANTERM, and Starlite Infotech experience; Quinnipiac University education; both certifications; and the resume's six skill categories. Updated AI Job Application Agent and Polish project results. Polish now names React, PostgreSQL, 200+ users, and 45+ tests; retained older debugging details are explicitly labeled as earlier implementation notes.

All resume buttons now serve the supplied PDF from Vinay_Kumar_Resume.pdf. The deployed file is byte-identical to the user's PDF. LinkedIn and Polish repository destinations follow the PDF's embedded links. Existing additional projects and case-study routes remain.

This update passed Hallmark's static and Chrome checks with 0 failures, 0 unresolved reflex findings, and 0 warnings across 20 desktop/mobile captures. The original redo-render limit below describes the earlier design deployment, not this content update.

Full Hallmark redesign of cvinaykumar.com across the homepage and ApplyPilot, Polish, and Web Scraper Pipeline case studies.

Preserved the existing dark/cyan brand, Space Grotesk and Inter, portrait, project screenshots, résumé and contact destinations, project facts, case-study routes, external scripts, and Google Analytics configuration. All 23 distinct original link destinations remain. Long technical content remains available rather than being cut to a marketing-page word limit.

Changed the visual hierarchy, layouts, spacing, and navigation. Project tiles became open editorial rows. Case studies now share restrained surfaces and typography. Removed gradient text, emoji icons, decorative browser furniture, repeated eyebrow labels, and scroll-dependent visibility. Homepage content and skills are now present in HTML, so they work without JavaScript or remote animation libraries.

## Validation

- Hallmark static checks on the final source: 0 FAIL, 0 unresolved REFLEX.
- Last completed Chrome sweep: 20 captures, including desktop folds at 1280, 1440 and 1920 pixels and full pages at 1440 and 375 pixels. It reported 0 FAIL and 0 unresolved REFLEX, with 1 documented technical-layout waiver.
- Independent visual review found outline icons being filled by shared styling; corrected the shared SVG rule.
- Final HTML structural checks: all four pages pass, with no missing local assets, duplicate IDs, missing original link destinations, or missing external script references.
- Git whitespace check passes.
- Two final section closing tags were corrected after the last browser sweep. The repeat Chrome run was declined, so those final semantic corrections were verified structurally but not re-rendered.

The remaining bookkeeping warning in a static-only comparison reflects rendered pages not being compared during that static-only run. The old decorative `noise` ID was removed along with its visual effect; no functional script still queries it.

## Copy and material

The homepage headline changed from “Hello, Vinay here!” to “Vinay Kumar.” Its original introduction remains in Selected work. Repeated section eyebrows and numbered heading decorations were removed while the associated subjects and technical narrative remain. Case-study hero descriptions were shortened; their fuller descriptions remain in the body. Polish's unsupported infinity/zero promotional figures became Shared/Separate; the underlying listening and app-switching concepts remain.

Existing project claims, including 48 Workday portals, 30-second matching, six weeks, and the original testing and bug counts, are retained as the portfolio author's material. No new testimonials, metrics, or experience claims were added.

All images are the existing portfolio's files. There are no stock or placeholder image slots. The existing portrait is 800 by 1000 in its markup and rendered as a responsive crop; existing Polish screenshots retain their source proportions.

## Preview and deployment

This is a static site. Serve the repository with a static HTTP server. The existing Vercel integration deploys the repository; no new hosting account or application is required.

Shared design tokens live in tokens.css, structural defaults in base.css, and shared/homepage styles in portfolio.css. Case-study-specific layouts remain in each HTML file. design.md records the common system.
