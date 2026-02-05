import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Brain, Sparkles, Target, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function About() {
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
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-serif text-gray-800">How Our AI Works</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We combine AI technology with growth mindset psychology to help children develop 
                confidence in mathematics. Our goal is to make every child feel capable, supported, 
                and excited about learning.
              </p>
            </div>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Error Diagnosis</h3>
                  <p className="text-gray-600 mb-3">When a student makes a mistake, our AI analyzes:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li><strong>Reading errors:</strong> Did they misunderstand the problem?</li>
                    <li><strong>Formula errors:</strong> Did they use the wrong mathematical approach?</li>
                    <li><strong>Calculation errors:</strong> Was it a simple arithmetic mistake?</li>
                    <li><strong>Strategy errors:</strong> Did they choose an ineffective method?</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    This diagnosis happens in real-time using natural language processing to understand 
                    the student's answer pattern and compare it with common misconceptions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Growth Mindset Attribution</h3>
                  <p className="text-gray-600 mb-3">
                    Based on Carol Dweck's research, we provide feedback that:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Attributes errors to <strong>controllable factors</strong> (strategy, effort) not intelligence</li>
                    <li>Normalizes mistakes as part of learning</li>
                    <li>Provides specific, actionable next steps</li>
                    <li>Celebrates progress, not just correctness</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Mentor ("Little Star")</h3>
                  <p className="text-gray-600 mb-3">
                    Our conversational AI tutor uses:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li><strong>Contextual understanding:</strong> Knows which puzzle the student is working on</li>
                    <li><strong>Socratic method:</strong> Guides with questions rather than giving answers</li>
                    <li><strong>Emotional support:</strong> Detects frustration and provides encouragement</li>
                    <li><strong>Adaptive hints:</strong> Adjusts difficulty based on student's current understanding</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    The AI is powered by large language models fine-tuned for educational psychology 
                    and mathematics pedagogy.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-100">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-amber-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Transparency & Limitations</h3>
                  <p className="text-gray-600 mb-3">We believe in honest AI:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>AI feedback may not always be perfect—we're continuously improving</li>
                    <li>Human teachers remain essential; AI is a supplement, not a replacement</li>
                    <li>All AI interactions are logged for quality assurance and safety</li>
                    <li>Parents can review AI conversations anytime</li>
                    <li>AI cannot access external resources or browse the internet during chats</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="bg-purple-50 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Measures</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Content filtering to ensure age-appropriate responses</li>
                <li>No personal information shared with AI models</li>
                <li>Regular audits for bias and fairness</li>
                <li>Human oversight of AI-generated content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}