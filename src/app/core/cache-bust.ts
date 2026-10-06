/**
 * GitHub Pages caches JSON for 10 minutes and the content files aren't hashed,
 * so edits wouldn't show for returning visitors. One value per page load keeps
 * language switches cached within a visit while always fetching fresh content on reload.
 */
export const CACHE_BUST = { v: String(Date.now()) };
