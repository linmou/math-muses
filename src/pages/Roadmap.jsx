import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Rocket, CheckCircle, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to={createPageUrl('Home')}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Rocket className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-serif text-gray-800">Implementation Roadmap</h1>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <Card className="p-6 border-green-200 bg-green-50/50">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Phase 1: Prototype (Current)</h2>
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Q4 2025 - Q1 2026</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Core puzzle-solving gameplay with Chapter 1</li>
                    <li>AI-powered error diagnosis and feedback</li>
                    <li>Growth mindset attribution system</li>
                    <li>AI mentor chatbot ("Little Star")</li>
                    <li>Comprehensive accessibility features</li>
                    <li>Garden visualization and progress tracking</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Phase 2 */}
            <Card className="p-6 border-blue-200 bg-blue-50/50">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Phase 2: Beta Testing & Refinement</h2>
                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                      Q2-Q3 2026
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Partner with 5-10 schools for pilot testing (200+ students)</li>
                    <li>Collect user feedback and iterate on UX</li>
                    <li>Add Chapters 2-5 (total 25 puzzles)</li>
                    <li>Implement parent dashboard with progress reports</li>
                    <li>Develop teacher tools for classroom integration</li>
                    <li>Conduct efficacy study with educational researchers</li>
                  </ul>
                  <p className="text-gray-700 mt-3 font-semibold">Target Partnerships:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Penn State College of Education</li>
                    <li>Local school districts in Pennsylvania</li>
                    <li>After-school STEM programs</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Phase 3 */}
            <Card className="p-6 border-purple-200 bg-purple-50/50">
              <div className="flex items-start gap-4">
                <Star className="w-6 h-6 text-purple-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Phase 3: Scale & Commercialization</h2>
                    <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                      Q4 2026 - 2027
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Launch freemium model (free core content, premium features)</li>
                    <li>Expand to 100+ schools nationwide</li>
                    <li>Multi-language support (Spanish, Chinese, French)</li>
                    <li>Mobile app versions (iOS & Android)</li>
                    <li>Advanced analytics and adaptive learning paths</li>
                    <li>Community features (peer challenges, teacher forums)</li>
                    <li>Seek Series A funding ($2-3M) for national expansion</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Phase 4 */}
            <Card className="p-6 border-amber-200 bg-amber-50/50">
              <div className="flex items-start gap-4">
                <Rocket className="w-6 h-6 text-amber-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Phase 4: Global Impact</h2>
                    <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                      2028+
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Reach 1 million+ students worldwide</li>
                    <li>Partnerships with international NGOs (UNICEF, Save the Children)</li>
                    <li>Free access for underserved communities</li>
                    <li>Expand to other subjects (science, reading, coding)</li>
                    <li>AI research lab for educational technology innovation</li>
                    <li>B-Corp certification for social impact</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="bg-purple-50 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Economic Considerations</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Revenue Model:</strong> Freemium (B2C) + School Licenses (B2B)</li>
                <li><strong>Pricing:</strong> $9.99/month individual, $500-1000/classroom/year</li>
                <li><strong>Cost Structure:</strong> AI API costs, cloud hosting, content development</li>
                <li><strong>Sustainability:</strong> 30% margins projected by Year 3</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Regulatory Compliance</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>COPPA (Children's Online Privacy Protection Act)</li>
                <li>FERPA (Family Educational Rights and Privacy Act)</li>
                <li>GDPR for EU expansion</li>
                <li>Accessibility standards (WCAG 2.1 AA, Section 508)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}