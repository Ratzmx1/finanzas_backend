const validateStrings = (value: string) => {
  if (value && value.trim().length > 0) {
    return true;
  }
  return false;
};

export { validateStrings };
