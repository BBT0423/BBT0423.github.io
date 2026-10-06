/** True when the visitor asked the OS for reduced motion — all animations are skipped. */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Project cover gradients, cycled by project index. */
export const COVERS = [
  'linear-gradient(135deg, #1e2338 0%, #3a43a8 60%, #4f5bd5 100%)',
  'linear-gradient(135deg, #2b3270 0%, #4f5bd5 55%, #f0714a 130%)',
  'linear-gradient(135deg, #1e2338 0%, #8a3d33 70%, #f0714a 120%)',
  'linear-gradient(135deg, #252b4a 0%, #5d67d9 70%, #8590f4 100%)',
];

export const coverFor = (index: number) => COVERS[index % COVERS.length];

export const pad2 = (n: number) => String(n).padStart(2, '0');
