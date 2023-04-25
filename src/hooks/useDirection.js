import React from "react";
import { useTranslation } from "react-i18next";
export default function useDirection() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const themeDirection = language === "ar" ? "rtl" : "ltr";
  return themeDirection;
}
