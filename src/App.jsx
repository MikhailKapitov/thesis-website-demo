import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import LanguagePicker from "./components/LanguagePicker";
import "./App.css";

// Matches 9:19.5.
const VIRTUAL_WIDTH = 390;
const VIRTUAL_HEIGHT = 844;

function App() {
  const screenRef = useRef(null);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef(null);
  const { t, locale } = useLanguage();

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setScale(width / VIRTUAL_WIDTH);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4 relative">
      {/* Language picker at the top right. */}
      <div className="absolute top-4 right-4 z-50">
        <LanguagePicker />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl w-full">
        {/* Phone frame. */}
        <div className="relative flex-shrink-0 w-full max-w-[280px] sm:max-w-sm mx-auto md:mx-0">
          <div className="relative bg-gray-800 rounded-[2.5rem] p-2 shadow-2xl shadow-gray-800/30">
            <div
              ref={screenRef}
              className="aspect-[9/19.5] rounded-[2rem] overflow-hidden relative bg-black"
            >
              {/* Notch! */}
              <div className="phone-notch" />
              {/* Fullscreen button. */}
              <button
                onClick={() => iframeRef.current?.requestFullscreen()}
                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
                aria-label="Fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V2h3.5a.5.5 0 0 0 0-1h-4zm9 0a.5.5 0 0 0 0 1H14v3.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5h-4zM1.5 15a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0V14h3.5a.5.5 0 0 1 0 1h-4zm9 0a.5.5 0 0 1 0-1H14v-3.5a.5.5 0 0 1 1 0v4a.5.5 0 0 1-.5.5h-4z" />
                </svg>
              </button>
              {/* iframe with virtual size, scaled to fit. */}
              <iframe
                src={`/map/viewer.html?lang=${locale}`}
                className="border-0"
                style={{
                  width: `${VIRTUAL_WIDTH}px`,
                  height: `${VIRTUAL_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                title="Map application"
                ref={iframeRef}
                allow="fullscreen"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {t("landing.titlePart1")}
            <span className="block text-emerald-600">
              {t("landing.titlePart2")}
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            {t("landing.description")}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <a
              href="https://github.com/MikhailKapitov/thesis-app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition inline-block"
            >
              {t("landing.getApp")}
            </a>
            <Link
              to="/learn-more"
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition inline-block"
            >
              {t("landing.learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
