export const validateDate = (date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return { valid: false, message: "La fecha no es válida." };
  }

  const now = new Date();

  if (parsedDate > now) {
    return { valid: false, message: "La fecha no puede estar en el futuro." };
  }

  const minDate = new Date("2000-01-01");
  if (parsedDate < minDate) {
    return {
      valid: false,
      message: "La fecha no puede ser anterior al año 2000.",
    };
  }

  return { valid: true, message: "Fecha válida." };
};
