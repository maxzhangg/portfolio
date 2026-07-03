Create a single horizontal sprite strip for the Codex app digital pet `haiyue` in the state `running-right`.

Use the attached reference image(s) for pet identity and the attached base pet image as the canonical design. Use the attached layout guide image only for frame count, slot spacing, centering, and safe padding. Simplify any high-resolution reference details into the Codex digital pet sprite style. Do not simply copy the still reference pose. Generate distinct animation poses that create a readable cycle.

Identity lock:
- Do not redesign the pet. Only change pose/action for the `running-right` animation.
- Preserve the exact head shape, ear/horn/limb shape, face design, markings, palette, outline weight, body proportions, prop design, and overall silhouette from the canonical base pet.
- Keep every frame recognizably the same individual pet, not a related variant.
- If the pet has a prop or accessory, preserve its size, side, palette, and attachment style unless the row action requires a small pose-only adjustment.
- Prefer a subtler animation over any change that mutates the pet identity.

Output exactly 8 separate animation frames arranged left-to-right in one single row. Each frame must show the same pet: HaiYue is a compact chibi ocean-moon sorceress pet based mainly on the poster: deep violet hair, pale face, white shell-like one-shoulder top, pale aqua draped skirt, tiny silver-blue shoes, bracelets, two distinct moon details on the head, and a three-layer translucent blue-lavender moon-shell structure behind her silhouette. Required front-to-back layering: HaiYue's body and hair are the foreground; a pale thin rear crescent moon sits immediately behind the back of her head; the large three-layer moon-shell sits behind both of them as the farthest-back element. Head details: the rear crescent rises from behind the crown/back of the head rather than centered on top of the forehead. It is larger than her head but very thin and slender, clearly smaller than the back moon-shell, and separated from the back moon-shell by outline/spacing so the two moons do not merge. A separate silver crescent hair ornament sits on HaiYue's right side of the forehead/side bang, which appears on the viewer's left in a front-facing sprite. Neither head moon is an ahoge or hair tuft. Back detail: the rear moon-shell is made of three visible layers, an outer translucent crescent rim, a middle pale blue moon/disk, and an inner smaller crescent or oval layer, all attached behind the body at about character-height scale instead of becoming oversized..

Style contract: Codex digital pet sprite style: pixel-art-adjacent low-resolution mascot sprite, compact chibi proportions, chunky whole-body silhouette, thick dark 1-2 px outline, visible stepped/pixel edges, limited palette, flat cel shading with at most one small highlight and one shadow step, simple readable face, tiny limbs, and no detail that disappears at 192x208. Avoid polished illustration, painterly rendering, anime key art, 3D render, vector app-icon polish, glossy lighting, soft gradients, realistic fur or material texture, anti-aliased high-detail edges, and complex tiny accessories. Additional user style notes: Codex digital pet pixel-art-adjacent mascot: small chibi proportions, thick dark 1-2 px outline, chunky readable silhouette, flat cel shading, limited palette, crisp stepped edges, no realism, no scenery, no text, no shadows, no detached sparkles..

Use this prompt as an authoritative sprite-production spec. Do not expand it into a polished illustration, painterly character image, anime key art, 3D render, vector mascot, glossy app icon, realistic animal portrait, or marketing artwork.

Animation action: rightward locomotion loop.


State-specific requirements:
- Show locomotion through body, limb, and prop movement only.
- Do not draw speed lines, dust clouds, floor shadows, motion trails, or detached motion effects.

Transparency and artifact rules:
- Prefer pose, expression, and silhouette changes over decorative effects.
- Effects are allowed only when they are state-relevant, opaque, hard-edged, pixel-style, fully inside the same frame slot, and physically touching or overlapping the pet silhouette.
- Allowed attached effects can include a tear touching the face, a small smoke puff touching the pet or prop, or tiny stars overlapping the pet during a failed/dizzy reaction.
- Do not draw detached effects: floating stars, loose sparkles, floating punctuation, floating icons, falling tear drops, separated smoke clouds, loose dust, disconnected outline bits, or stray pixels.
- Do not draw wave marks, motion arcs, speed lines, action streaks, afterimages, blur, smears, halos, glows, auras, floor patches, cast shadows, contact shadows, drop shadows, oval floor shadows, landing marks, or impact bursts.
- Do not include text, labels, frame numbers, visible grids, guide marks, speech bubbles, thought bubbles, UI panels, code snippets, scenery, checkerboard transparency, white backgrounds, or black backgrounds.
- Do not use the chroma-key color or chroma-key-adjacent colors in the pet, prop, effects, highlights, shadows, or outlines.
- Reject any pose that is cropped, overlaps another pose, crosses into a neighboring frame slot, or creates a separate disconnected component that is not attached to the pet.

Layout requirements:
- Exactly 8 full-body frames, left to right, in one horizontal row.
- The attached layout guide shows the 8 frame boxes and inner safe area for this row. Follow its slot count, spacing, centering, and padding.
- Do not reproduce the layout guide itself: no visible boxes, guide lines, center marks, labels, guide colors, or guide background may appear in the output.
- Treat the image as 8 equal-width invisible frame slots. Fill every slot: each requested slot must contain exactly one complete full-body pose.
- Spread the 8 poses evenly across the whole image width. Do not leave any requested slot blank or create large empty gaps between poses.
- Center one complete pose in each slot. No pose may cross into the neighboring slot.
- Use a perfectly flat pure yellow #FFFF00 chroma-key background across the whole image.
- Do not draw visible grid lines, borders, labels, numbers, text, watermarks, or checkerboard transparency.
- Do not include scenery or a background environment.
- Keep the rendering sprite-like: chunky silhouette, dark pixel-style outline, limited palette, flat shading, minimal tiny detail.
- Do not use #FFFF00, pure yellow, or colors close to that chroma key in the pet, props, highlights, shadows, motion marks, dust, landing marks, or effects.
- Do not draw shadows, glows, smears, dust, or landing marks using darker/lighter versions of the chroma-key color.
- Keep every frame self-contained with safe padding. No pet body part should be clipped by the frame slot.
- Avoid motion blur. Use clear pose changes readable at 192x208.
- Preserve the same silhouette, face, proportions, palette, material, and props across every frame.
