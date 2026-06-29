const generateSlug = (text) => {
  return text
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export default generateSlug;

// export default function generateSlug(text) {}
