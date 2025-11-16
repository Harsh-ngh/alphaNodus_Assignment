
export function isValidName(name) {
  if (typeof name !== "string") return false;
  const n = name.trim();
  return n.length >= 2 && n.length <= 32;
}

export function isValidPhone(phone) {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
