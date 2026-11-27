# Mobile SVG controls

For new farm production and selling controls, use `renderButtonArt(button, source)`.
It calls the shared cached `setActionArt` loader and embeds SVG markup directly.
Do not use CSS background images for detailed SVG controls: mobile browsers can
rasterize their internal effects at a low resolution before scaling.

Keep artwork in an absolute, pointer-events:none layer; keep live values and
accessible button labels separate. Pass the correct language asset explicitly.
Use the same approach for panels and reward artwork via `setActionArt`.

Before releasing each farm, check production, selling (disabled and ready),
upgrade (disabled and ready), settings and mission rewards at a 402px viewport.
Check actual iPhone Safari separately; desktop viewport checks do not reproduce
all mobile SVG rendering behavior.
