import { Button, Card } from '@/components/common';

const features = [
  {
    title: 'Interactive Language Learning',
    description: 'Master new languages through AI-powered adaptive lessons tailored to your skill level.',
    href: '/lessons',
    icon: '📚',
  },
  {
    title: 'Financial Literacy',
    description: 'Learn essential financial concepts from budgeting to international remittances.',
    href: '/practice',
    icon: '💡',
  },
  {
    title: 'Blockchain Simulation',
    description: 'Practice financial operations in a safe, simulated blockchain environment.',
    href: '/simulation',
    icon: '🔗',
  },
];

export default function Home() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learn Language & Finance Together
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Grotik combines language learning with practical financial education,
          making both skills accessible and engaging through interactive lessons
          and real-world simulations.
        </p>
        <Button size="lg" href="/lessons">
          Start Learning
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <Card
            key={feature.title}
            hover
            className="flex flex-col items-center text-center p-6"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <Button 
              variant="outline" 
              href={feature.href}
              className="mt-auto"
            >
              Learn More
            </Button>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to enhance your skills?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community of learners and start your journey towards language
          mastery and financial literacy today.
        </p>
        <div className="space-x-4">
          <Button variant="primary" href="/lessons">
            Browse Lessons
          </Button>
          <Button variant="outline" href="/simulation">
            Try Simulation
          </Button>
        </div>
      </div>
    </div>
  );
}
