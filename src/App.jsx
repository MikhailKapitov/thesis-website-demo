import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// Matches 9:19.5.
const VIRTUAL_WIDTH = 390;
const VIRTUAL_HEIGHT = 844;

function App() {
  const screenRef = useRef(null);
  const [scale, setScale] = useState(1);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
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
              {/* iframe with virtual size, scaled to fit. */}
              <iframe
                src="/map/viewer.html"
                className="border-0"
                style={{
                  width: `${VIRTUAL_WIDTH}px`,
                  height: `${VIRTUAL_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                title="Map application"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Monitor noise pollution with
            <span className="block text-emerald-600">NoiseWatch</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            NoiseWatch is an app made as a thesis project, where you can both
            view data and help collect it.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition inline-block"
            >
              Get the app
            </a>
            <Link
              to="/learn-more"
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition inline-block"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
