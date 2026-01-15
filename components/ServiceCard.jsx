// components/ServiceCard.jsx
import { 
  Calculator, 
  FileText, 
  Search, 
  TrendingUp, 
  Rocket, 
  BookOpen 
} from 'lucide-react';

const iconMap = {
  calculator: Calculator,
  'file-text': FileText,
  search: Search,
  'trending-up': TrendingUp,
  rocket: Rocket,
  'book-open': BookOpen,
};

export default function ServiceCard({ service, variant = 'default' }) {
  const Icon = iconMap[service.icon] || Calculator;

  if (variant === 'detailed') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-900 rounded-lg flex items-center justify-center mb-6">
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
        {service.features && (
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">✓</span>
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-900 rounded-lg flex items-center justify-center mb-4">
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}
