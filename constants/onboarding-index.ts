export const EXIT_NORMAL_ALL = {
  initial: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100vw", transition: { duration: 0.5 } },
  transition: { duration: 0.9, ease: "easeInOut" },
};

export const ENTRY_SPEACIAL_FIRST = {
  initial: { opacity: 0, y: "100vw" },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
  },
};

export const STAGGER_PARENT_ANIMATION = {
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

export const STAGGER_CHILD_ANIMATION = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, type: "spring", delay: 0.1 },
  },
};
