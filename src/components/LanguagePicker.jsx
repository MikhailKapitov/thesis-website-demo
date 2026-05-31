import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "kz", label: "KZ", flag: "🇰🇿" },
];

const LanguagePicker = () => {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "8px",
          padding: "4px 10px",
          fontSize: "14px",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        {current.flag} {current.label}
      </button>
      {open && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 99,
            }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "100%",
              marginTop: 4,
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 100,
              minWidth: "80px",
              overflow: "hidden",
            }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  background: locale === lang.code ? "#e0f2fe" : "transparent",
                  border: "none",
                  padding: "8px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {lang.flag} {lang.label} {locale === lang.code ? "✓" : ""}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguagePicker;
