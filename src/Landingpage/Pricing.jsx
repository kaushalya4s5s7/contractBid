import { Check } from "lucide-react";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out DecentraBid",
    features: [
      "Up to 3 bids per month",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
    gradient: "from-sky-400 to-blue-400",
  },
  {
    name: "Professional",
    price: "$49",
    description: "Ideal for growing businesses",
    features: [
      "Unlimited bids",
      "Advanced analytics",
      "Priority support",
      "Custom contract templates",
      "API access",
      "Dedicated account manager",
    ],
    gradient: "from-sky-500 to-blue-600",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Custom integration",
      "24/7 phone support",
      "Advanced security features",
      "Custom reporting",
      "SLA guarantees",
    ],
    gradient: "from-sky-600 to-blue-700",
  },
];

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="pricing"
      className="py-32 bg-gradient-to-b from-black to-purple-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border border-purple-800/50 bg-gray-900/50 backdrop-blur-xl hover:border-violet-500/50 transition-all duration-500 transform ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } hover:shadow-2xl hover:shadow-violet-500/10`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-sm font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8 space-y-4">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div
                  className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}
                >
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-gray-400">/month</span>
                  )}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 group">
                    <span
                      className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 hover:scale-105`
                    : "bg-purple text-white hover:bg-purple-800/50"
                } shadow-lg hover:shadow-xl`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
