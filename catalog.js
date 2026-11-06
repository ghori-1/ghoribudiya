(() => {
  const menuData = globalThis.KarakGhoriMenuData;
  const menuImages = globalThis.KarakGhoriMenuImages;

  if (!menuData || !menuImages) {
    throw new Error('Karak Ghori catalog data did not load. Check menu-data.js and menu-image-data.js.');
  }

  const palette = [
    ['#5b3727', '#d18b4e'],
    ['#24464a', '#61a59a'],
    ['#4c3525', '#c99a58'],
    ['#43314d', '#a680b5'],
    ['#3d482b', '#a4b86a'],
  ];
  const categoryEmoji = {
    'karak-hot-beverages': '☕',
    'hibiscus-tea': '🫖',
    'fresh-juices': '🧃',
    'pure-juices': '🍊',
    sarbath: '🥤',
    'fruit-ice-cream': '🍨',
    'milk-shakes': '🥤',
    mojitos: '🍹',
    'ghori-special': '🥭',
    sandwiches: '🥪',
    'club-sandwiches': '🥪',
    malgoum: '🌯',
    'mini-roomi': '🥙',
    plates: '🍽️',
    bakery: '🥟',
  };

  const menuCategories = menuData.categories.map((category) => ({ ...category }));
  const categoryById = new Map(menuCategories.map((category) => [category.id, category]));
  const menuItems = menuData.menuItems.map((item, index) => {
    const category = categoryById.get(item.cat);
    const options = Array.isArray(item.options) ? item.options : [];
    return {
      ...item,
      options,
      price: options[0]?.price ?? 0,
      category: category?.label ?? item.cat,
      categoryArabic: category?.ar ?? category?.label ?? item.cat,
      subtitle: item.desc ?? '',
      colors: palette[index % palette.length],
      emoji: categoryEmoji[item.cat] ?? '🍽️',
      image: menuImages.localImageFor(item),
      video: menuImages.localVideoFor(item),
    };
  });

  const normalized = (value) => String(value ?? '').trim().toLocaleLowerCase();
  function searchItems(query) {
    const needle = normalized(query);
    if (!needle) return menuItems;
    return menuItems.filter((item) => [
      item.name,
      item.ar,
      item.subtitle,
      item.desc,
      item.category,
      item.categoryArabic,
      ...item.options.map((option) => option.label),
    ].filter(Boolean).join(' ').toLocaleLowerCase().includes(needle));
  }

  function addCartItem(cart, item) {
    const optionIndex = Math.max(0, Math.min(item.options.length - 1, Number(item.optionIndex) || 0));
    const option = item.options[optionIndex] || item.options[0] || { label: '', price: 0 };
    const existing = cart.find((entry) => entry.id === item.id && entry.optionIndex === optionIndex);
    if (existing) {
      return cart.map((entry) => entry === existing
        ? { ...entry, quantity: Math.max(1, Math.floor(Number(entry.quantity) || 1) + 1) }
        : entry);
    }
    return [...cart, {
      ...item,
      price: option.price,
      optionIndex,
      optionLabel: option.label,
      quantity: 1,
    }];
  }

  function setCartQuantity(cart, id, quantity, optionIndex) {
    const nextQuantity = Math.floor(Number(quantity) || 0);
    return cart.flatMap((entry) => {
      const matches = entry.id === id && (optionIndex === undefined || entry.optionIndex === optionIndex);
      if (!matches) return [entry];
      return nextQuantity > 0 ? [{ ...entry, quantity: nextQuantity }] : [];
    });
  }

  function cartTotal(cart) {
    return cart.reduce((total, item) => {
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
      return total + (Number(item.price) || 0) * quantity;
    }, 0);
  }

  const catalog = Object.freeze({ menuItems, menuCategories, searchItems, addCartItem, setCartQuantity, cartTotal });
  globalThis.KarakGhoriCatalog = catalog;
})();
