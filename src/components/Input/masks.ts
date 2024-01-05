import React from "react";

export const currencyMask = (e: React.FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
};

export const formatToCurrency = (e: string) => {
  let value = e;
  if (!value.includes(".")) {
    value = value + "00";
  }
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e = value;
  return e;
};
