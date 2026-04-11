export const scrollTo = (id: string) => {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
};
