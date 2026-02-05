import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, RefreshCw } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Import components to test
import CharacterSelect from '../components/studio/CharacterSelect';
import ThemeSelector from '../components/ui/ThemeSelector';
import PowerGarden from '../components/garden/PowerGarden';
import StoryDialogue from '../components/story/StoryDialogue';
import PuzzleCard from '../components/puzzle/PuzzleCard';
import AIFeedback from '../components/puzzle/AIFeedback';
import AccessibilityConfig from '../components/config/AccessibilityConfig';

// Test configurations for each component
const TEST_CONFIGS = {
  CharacterSelect: {
    name: 'Character Select',
    component: CharacterSelect,
    defaultProps: {
      onSelect: (id) => console.log('Selected:', id),
      selectedCharacter: null
    },
    propsEditor: `{
  "selectedCharacter": null
}`
  },
  ThemeSelector: {
    name: 'Theme Selector',
    component: ThemeSelector,
    defaultProps: {
      currentTheme: 'lavender',
      onThemeChange: (theme) => console.log('Theme changed:', theme)
    },
    propsEditor: `{
  "currentTheme": "lavender"
}`
  },
  PowerGarden: {
    name: 'Power Garden',
    component: PowerGarden,
    defaultProps: {
      flowers: [
        { flower_type: 'rose', growth_stage: 4, earned_date: '2026-01-15' },
        { flower_type: 'tulip', growth_stage: 3, earned_date: '2026-01-14' }
      ],
      totalPicarats: 120,
      themeColor: 'lavender'
    },
    propsEditor: `{
  "flowers": [
    { "flower_type": "rose", "growth_stage": 4, "earned_date": "2026-01-15" },
    { "flower_type": "tulip", "growth_stage": 3, "earned_date": "2026-01-14" }
  ],
  "totalPicarats": 120,
  "themeColor": "lavender"
}`
  },
  StoryDialogue: {
    name: 'Story Dialogue',
    component: StoryDialogue,
    defaultProps: {
      dialogues: [
        { character: 'vera', text: 'Welcome to my studio.' },
        { character: 'dodo', text: 'Wow! This place is amazing!' }
      ],
      onComplete: () => console.log('Story complete'),
      location: 'rainbow_hall'
    },
    propsEditor: `{
  "dialogues": [
    { "character": "vera", "text": "Welcome to my studio." },
    { "character": "dodo", "text": "Wow! This place is amazing!" }
  ],
  "location": "rainbow_hall"
}`
  },
  PuzzleCard: {
    name: 'Puzzle Card',
    component: PuzzleCard,
    defaultProps: {
      puzzle: {
        title: 'Test Puzzle',
        chapter: 1,
        mission: 1,
        story_context: 'This is a test puzzle context.',
        problem_text: 'What is 2 + 2?',
        hints: ['Think about addition', 'The answer is between 3 and 5'],
        picarat_value: 40
      },
      onSubmit: (answer) => console.log('Submitted:', answer),
      onPause: () => console.log('Paused'),
      onHint: (index) => console.log('Hint requested:', index),
      hintsUsed: 0,
      isProcessing: false
    },
    propsEditor: `{
  "puzzle": {
    "title": "Test Puzzle",
    "chapter": 1,
    "mission": 1,
    "story_context": "This is a test puzzle context.",
    "problem_text": "What is 2 + 2?",
    "hints": ["Think about addition", "The answer is between 3 and 5"],
    "picarat_value": 40
  },
  "hintsUsed": 0,
  "isProcessing": false
}`
  },
  AIFeedback: {
    name: 'AI Feedback',
    component: AIFeedback,
    defaultProps: {
      isCorrect: true,
      errorType: 'none',
      attributionGuidance: '',
      strategySuggestion: '',
      picaratsEarned: 40,
      flowerReward: 'Rose',
      onRetry: () => console.log('Retry'),
      onContinue: () => console.log('Continue')
    },
    propsEditor: `{
  "isCorrect": true,
  "errorType": "none",
  "picaratsEarned": 40,
  "flowerReward": "Rose"
}`
  },
  AccessibilityConfig: {
    name: 'Accessibility Config',
    component: AccessibilityConfig,
    defaultProps: {
      config: {
        language: 'en',
        font_family: 'inter',
        text_size: 'medium',
        high_contrast: false,
        reduced_motion: false
      },
      onConfigChange: (config) => console.log('Config changed:', config),
      onBack: () => console.log('Back clicked'),
      onContinue: () => console.log('Continue clicked')
    },
    propsEditor: `{
  "config": {
    "language": "en",
    "font_family": "inter",
    "text_size": "medium",
    "high_contrast": false,
    "reduced_motion": false
  }
}`
  }
};

export default function DevSandbox() {
  const [selectedComponent, setSelectedComponent] = useState('CharacterSelect');
  const [propsJson, setPropsJson] = useState(TEST_CONFIGS.CharacterSelect.propsEditor);
  const [currentProps, setCurrentProps] = useState(TEST_CONFIGS.CharacterSelect.defaultProps);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  const handleComponentChange = (componentKey) => {
    setSelectedComponent(componentKey);
    setPropsJson(TEST_CONFIGS[componentKey].propsEditor);
    setCurrentProps(TEST_CONFIGS[componentKey].defaultProps);
    setError(null);
    setKey(prev => prev + 1);
  };

  const handleApplyProps = () => {
    try {
      const parsed = JSON.parse(propsJson);
      const config = TEST_CONFIGS[selectedComponent];
      
      // Merge with default callbacks
      const mergedProps = {
        ...config.defaultProps,
        ...parsed
      };
      
      setCurrentProps(mergedProps);
      setError(null);
      setKey(prev => prev + 1); // Force re-render
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  const handleReset = () => {
    const config = TEST_CONFIGS[selectedComponent];
    setPropsJson(config.propsEditor);
    setCurrentProps(config.defaultProps);
    setError(null);
    setKey(prev => prev + 1);
  };

  const ComponentToTest = TEST_CONFIGS[selectedComponent].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Developer Sandbox</h1>
          </div>
          <p className="text-slate-500">Interactive component testing with custom props</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">Component Selection</h2>
              
              <Select value={selectedComponent} onValueChange={handleComponentChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TEST_CONFIGS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-700">Props Editor</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-slate-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <Textarea
                value={propsJson}
                onChange={(e) => setPropsJson(e.target.value)}
                className="font-mono text-sm min-h-[300px] mb-4"
                placeholder="Enter JSON props..."
              />

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleApplyProps}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Apply & Render
              </Button>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                <p className="font-medium mb-1">💡 Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Edit the JSON to change component props</li>
                  <li>Callbacks will log to browser console</li>
                  <li>Use "Apply & Render" to update the preview</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card className="p-6 bg-white/80 backdrop-blur-sm min-h-[600px]">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">
                Preview: {TEST_CONFIGS[selectedComponent].name}
              </h2>
              
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ComponentToTest {...currentProps} />
                </motion.div>
              </div>
            </Card>
          </div>
        </div>

        {/* Console Log Info */}
        <Card className="mt-6 p-4 bg-slate-800 text-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4" />
            <span className="font-mono text-sm">Console Output</span>
          </div>
          <p className="text-xs text-slate-400">
            Open browser DevTools (F12) to see callback outputs from component interactions
          </p>
        </Card>
      </div>
    </div>
  );
}