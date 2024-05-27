export function interviewTemplateMapping(content, map) {
  Object.keys(map).forEach((key) => {
    const regex = new RegExp(
      key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "g"
    );
    if (map[key]?.()) {
      content = content.replace(regex, map[key]?.());
    }
  });
  return content;
}
