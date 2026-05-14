import { Link } from "react-router-dom";

const features = [
  {
    title: "Monitor Noise Pollution",
    desc: "See noise levels around you on a map.",
    icon: "🔊",
  },
  {
    title: "Predict Noise Pollution",
    desc: "Know what noise to expect in the next hours, days or weeks.",
    icon: "🔮",
  },
  {
    title: "Contribute by Adding Datapoints",
    desc: "Help the community by measuring and sharing noise levels wherever you are. Every reading makes the map smarter.",
    icon: "🌱",
  },
  {
    title: "Get Achievements and Land on the Leaderboard",
    desc: "Earn badges for your contributions and see how you stack up against other noise fighters.",
    icon: "🏆",
  },
];

function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to the demo
        </Link>

        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            NoiseWatch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl md:mx-0 mx-auto">
            NoiseWatch is an app made as a thesis project, where you can both
            view data and help collect it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-3 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-emerald-600/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to try it?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            {/* TODO? */}
          </p>
          <a
            href="https://github.com/MikhailKapitov/thesis-app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition inline-block"
          >
            Get the app
          </a>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;
