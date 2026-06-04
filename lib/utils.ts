/** Join truthy class names. Tiny dependency-free clsx replacement. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
