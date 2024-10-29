export const scrollToTarget = (id) => {
  return () => {
    // Get the target element by its ID and scroll into view
    const targetElement = document.getElementById(id);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
};
