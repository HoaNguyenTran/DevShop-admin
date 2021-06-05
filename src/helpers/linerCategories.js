const linerCategories = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        linerCategories(category.children, options);
      }
    }
    return options.sort((a, b) => a.name.localeCompare(b.name));
  };

  export default linerCategories;