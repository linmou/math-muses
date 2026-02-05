import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function Privacy() {
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
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-serif text-gray-800">Privacy Policy</h1>
          </div>

          <p className="text-gray-600 mb-8">Last updated: January 2026</p>

          <div className="space-y-8">
            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Collection</h2>
                  <p className="text-gray-600 mb-3">We collect minimal information to provide personalized learning:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Display name and avatar choice</li>
                    <li>Learning preferences (theme, font, accessibility settings)</li>
                    <li>Puzzle attempts and progress data</li>
                    <li>Chat conversations with AI mentor (for learning improvement)</li>
                  </ul>
                  <p className="text-gray-600 mt-3">We do NOT collect: real names, addresses, or any personally identifiable information.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Data</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Personalize learning experience and track progress</li>
                    <li>Provide AI-powered feedback and mentoring</li>
                    <li>Improve our educational content and AI models</li>
                    <li>Generate anonymized analytics to enhance the platform</li>
                  </ul>
                  <p className="text-gray-600 mt-3 font-semibold">Your data is NEVER sold to third parties.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">COPPA Compliance (Children's Privacy)</h2>
                  <p className="text-gray-600 mb-3">We comply with the Children's Online Privacy Protection Act (COPPA):</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Parental consent required for users under 13</li>
                    <li>Parents can review and delete their child's data anytime</li>
                    <li>No advertising or tracking cookies</li>
                    <li>All AI interactions are monitored for safety</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Security</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>All data encrypted in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Access limited to authorized personnel only</li>
                    <li>Data stored on secure cloud infrastructure</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Rights</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Access your data anytime through your profile</li>
                  <li>Request data deletion (we'll comply within 30 days)</li>
                  <li>Export your learning progress and data</li>
                  <li>Opt-out of non-essential data collection</li>
                </ul>
              </div>
            </Card>

            <div className="bg-purple-50 rounded-2xl p-6 mt-8">
              <p className="text-gray-700">
                Questions about privacy? Contact us at{' '}
                <a href="mailto:privacy@auntvera.app" className="text-purple-600 font-semibold">
                  privacy@auntvera.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}