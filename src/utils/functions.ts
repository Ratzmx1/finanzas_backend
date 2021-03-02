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

function getNumberOfWeek(today: Date) {
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear - firstDayOfYear.getDay() + 1) / 7);
}

export { validateStrings, validateProduct, getNumberOfWeek };
