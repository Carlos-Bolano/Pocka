export const colorWithOpacity = (color: string, opacity: number) => {
  const hex = color.replace("#", "");

  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  if (opacity < 0 || opacity > 1) {
    console.warn("La opacidad debe estar entre 0 y 1. Se ajustará el valor.");
    opacity = Math.max(0, Math.min(1, opacity));
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
