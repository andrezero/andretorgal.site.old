export const bodyClassSwitch = (prefix: string, className?: string, fallback?: string) => {
  const allClasses = Array.prototype.slice.call(document.body.classList);
  const current = allClasses.find((name: string) => name.indexOf(prefix) === 0);
  if (current) {
    document.body.classList.remove(current);
  }
  if (className || fallback) {
    document.body.classList.add(`${prefix}-${className || fallback}`);
  }
};
