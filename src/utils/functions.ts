const validateStrings = (value: string) => {
  if (value && value.trim().length > 0) {
    return true;
  }
  return false;
};

const validateProduct = (
  value: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ]
) => {
  if (!value) {
    return false;
  }

  value.forEach((element) => {
    if (!validateStrings(element.name) || !element.quantity || !element.price) {
      return false;
    }
  });
  return true;
};

export { validateStrings, validateProduct };
