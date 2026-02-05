import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { ChevronRight, Lightbulb, Star, Sparkles, Send, X, Heart, Target, RefreshCw } from 'lucide-react';
import { GAME_DATA } from './GameData';
import SceneBackground from './SceneBackgrounds';
import PuzzleVisualization from './PuzzleVisualization';
import { useAudio } from '../../components/audio/AudioManager';

// ============================================
// AI导师回复函数（小星星）
// ============================================
function getMentorResponse(message, puzzle) {
  const lower = message.toLowerCase();
  
  if (lower.includes('help') || lower.includes('don\'t understand') || lower.includes('confused')) {
    return 'No worries! Let\'s look at this together ✨ Can you tell me what information the problem gives us? Let\'s list them out one by one!';
  }
  if (lower.includes('hint')) {
    return 'Okay! Here\'s a little hint 💡 Try thinking about the quantities in the problem as "parts" - does that make it easier to understand?';
  }
  if (lower.includes('hard') || lower.includes('difficult')) {
    return 'I understand how you feel 🤗 This puzzle is challenging! But finding it hard means you\'re pushing yourself, which is amazing! Shall we take it step by step, starting with the easiest part?';
  }
  if (lower.includes('tired') || lower.includes('break') || lower.includes('rest')) {
    return 'You\'ve been working hard! Learning needs breaks too 🌸 How about getting some water and stretching? We can continue in 5 minutes!';
  }
  if (lower.includes('answer') || lower.includes('tell me')) {
    return 'Hehe, Little Star can\'t give you the answer directly 😊 But I can help you think it through! What numbers does the problem mention? How are they related?';
  }
  if (lower.includes('how')) {
    return 'Great question! Solving a puzzle is like assembling a jigsaw 🧩 Step 1: Find all the information we know. Step 2: Think about how they connect. What do you think is the key information here?';
  }
  if (lower.includes('correct') || lower.includes('right') || lower.includes('got it')) {
    return 'Amazing! 🎉 You did so well! Every success is proof of your hard work. Ready for the next challenge?';
  }
  
  return 'I\'m listening ✨ Can you tell me how you\'re thinking about this? Or what part is confusing you? Let\'s solve it together!';
}

// ============================================
// 错误诊断函数
// ============================================
function diagnoseError(isFirstAttempt) {
  const diagnoses = [
    {
      type: 'reading_error',
      icon: '👀',
      label: 'Reading Mistake',
      analysis: 'You might have missed a detail in the problem~',
      guidance: 'This isn\'t about ability! Everyone misses things sometimes. Just read it one more time.',
      suggestion: 'Try circling all the numbers and conditions to make sure you haven\'t missed anything.',
      encouragement: 'No worries, read it carefully again! 💪'
    },
    {
      type: 'strategy_error',
      icon: '🎯',
      label: 'Try a Different Approach',
      analysis: 'Your strategy might need adjusting~',
      guidance: 'This is about method, not intelligence! Think about it from another angle.',
      suggestion: 'Try drawing a picture, or breaking the big problem into smaller steps.',
      encouragement: 'Try a different approach, you can do this! ✨'
    },
    {
      type: 'calculation_error',
      icon: '✏️',
      label: 'Calculation Slip',
      analysis: 'Your method is right, but there was a small calculation error~',
      guidance: 'Your thinking is correct! Just need to be more careful with calculations.',
      suggestion: 'Take it slow, you can use your fingers or write it out on paper.',
      encouragement: 'Your approach is right! Just calculate again! 🌟'
    }
  ];
  
  return isFirstAttempt 
    ? diagnoses[Math.floor(Math.random() * diagnoses.length)]
    : diagnoses[1];
}

// ============================================
// 小星星聊天组件
// ============================================
function MentorChat({ isOpen, onClose, currentPuzzle }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Little Star ✨ How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // 模拟AI思考延迟
    setTimeout(() => {
      const response = getMentorResponse(userMessage, currentPuzzle);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const quickReplies = ['I don\'t understand this', 'Can I get a hint?', 'This feels hard'];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 w-80 z-50"
    >
      <Card className="overflow-hidden shadow-2xl border-2 border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-white">
              <p className="font-medium text-sm">Little Star</p>
              <p className="text-xs text-white/80">Your Math Buddy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-purple-50 to-white">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                </div>
              )}
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-br-sm'
                  : 'bg-white shadow border border-purple-100 text-gray-700 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                <Sparkles className="w-3 h-3 text-purple-500" />
              </div>
              <div className="bg-white shadow border border-purple-100 rounded-2xl rounded-bl-sm px-3 py-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-purple-300 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-3 py-2 bg-gray-50 border-t overflow-x-auto">
          <div className="flex gap-2">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="flex-shrink-0 px-2 py-1 bg-white rounded-full text-xs text-purple-600 border border-purple-200 hover:bg-purple-50"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat with Little Star..."
            className="flex-1 text-sm rounded-xl border-purple-200"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            size="sm"
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ============================================
// 错误反馈组件
// ============================================
function ErrorFeedback({ diagnosis, onRetry, onAskMentor }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-orange-800">Little Star wants to tell you...</h3>
          <p className="text-sm text-orange-600">Let's look at this together ✨</p>
        </div>
      </div>

      <div className="space-y-3">
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-100 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{diagnosis.icon}</span>
              <span className="font-medium text-blue-700">{diagnosis.label}</span>
            </div>
            <p className="text-sm text-blue-600">{diagnosis.analysis}</p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-100 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-purple-700">Not About Ability</span>
            </div>
            <p className="text-sm text-purple-600">{diagnosis.guidance}</p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-700">Suggestion</span>
            </div>
            <p className="text-sm text-green-600">{diagnosis.suggestion}</p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-2 space-y-2"
          >
            <p className="text-center text-lg text-amber-700 font-medium">{diagnosis.encouragement}</p>
            <div className="flex gap-2">
              <Button onClick={onRetry} className="flex-1 bg-gradient-to-r from-amber-400 to-orange-400">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={onAskMentor} variant="outline" className="flex-1 border-purple-300 text-purple-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Ask Little Star
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// ============================================
// 主游戏引擎
// ============================================
export default function GameEngine({ onComplete }) {
  const [currentSceneId, setCurrentSceneId] = useState('prologue');
  const [eventIndex, setEventIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [picarats, setPicarats] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showMentorChat, setShowMentorChat] = useState(false);
  const [showErrorFeedback, setShowErrorFeedback] = useState(false);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const { playMusic } = useAudio();

  const currentScene = GAME_DATA.scenes[currentSceneId];
  const currentEvent = currentScene?.sequence?.[eventIndex] || currentScene;

  useEffect(() => {
    playMusic('girlish');
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentEvent?.text && currentEvent.animation === 'typewriter') {
      setIsTyping(true);
      setDisplayText('');
      let index = 0;
      const text = currentEvent.text;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    } else if (currentEvent?.text) {
      setDisplayText(currentEvent.text);
      setIsTyping(false);
    }
  }, [currentEvent]);

  const handleNext = () => {
    if (currentScene?.sequence && eventIndex < currentScene.sequence.length - 1) {
      setEventIndex(eventIndex + 1);
    } else {
      if (currentScene?.next_scene) {
        setCurrentSceneId(currentScene.next_scene);
        setEventIndex(0);
        setShowOptions(false);
        setHintsUsed(0);
        setAttemptCount(0);
      } else {
        onComplete?.(picarats);
      }
    }
  };

  const handleOptionClick = (option) => {
    if (option.is_correct) {
      const earnedPicarats = currentScene.puzzle.picarats - (hintsUsed * 10);
      setPicarats(prev => prev + earnedPicarats);
      setCurrentSceneId(option.next_scene);
      setEventIndex(0);
      setShowOptions(false);
      setHintsUsed(0);
      setAttemptCount(0);
      setShowErrorFeedback(false);
    } else {
      // 错误处理 - 显示AI诊断
      setAttemptCount(prev => prev + 1);
      const diagnosis = diagnoseError(attemptCount === 0);
      setCurrentDiagnosis(diagnosis);
      setShowErrorFeedback(true);
      setShowOptions(false);
    }
  };

  const handleRetry = () => {
    setShowErrorFeedback(false);
    setShowOptions(true);
  };

  const handleHint = () => {
    if (hintsUsed < currentScene.puzzle?.hints?.length) {
      alert(currentScene.puzzle.hints[hintsUsed]);
      setHintsUsed(prev => prev + 1);
    }
  };

  const renderCharacter = () => {
    if (!currentEvent?.speaker) return null;
    const character = GAME_DATA.characters[currentEvent.speaker];
    if (!character) return null;

    return (
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
          <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold" style={{ color: character.color_theme }}>{character.name}</div>
          <div className="text-xs text-gray-500">{character.role}</div>
        </div>
      </motion.div>
    );
  };

  const renderEvent = () => {
    if (!currentEvent) return null;

    if (currentEvent.type === 'character_intro') {
      const character = GAME_DATA.characters[currentEvent.character];
      return (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-serif" style={{ color: character.color_theme }}>{character.name}</h3>
              <p className="text-sm text-gray-600">{character.role}</p>
            </div>
          </div>
          <p className="text-gray-700">{currentEvent.text}</p>
        </Card>
      );
    }

    if (currentEvent.type === 'visual') {
      return (
        <Card className="p-6 bg-blue-50">
          <pre className="text-2xl text-center font-mono whitespace-pre-wrap">{currentEvent.content}</pre>
        </Card>
      );
    }

    if (currentEvent.type === 'calculation') {
      return (
        <Card className="p-6 bg-amber-50 border-2 border-amber-200">
          <div className="text-xl font-mono text-center text-amber-800">{currentEvent.text}</div>
        </Card>
      );
    }

    if (currentEvent.type === 'answer') {
      return (
        <Card className="p-6 bg-green-50 border-2 border-green-300">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 mb-2">✓ Correct Answer</div>
            <div className="text-lg">Moon Team: {currentEvent.moon}m | Sun Team: {currentEvent.sun}m</div>
          </div>
        </Card>
      );
    }

    if (currentEvent.type === 'celebration') {
      return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}>
          <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-orange-700">{currentEvent.text}</div>
          </Card>
        </motion.div>
      );
    }

    if (currentEvent.type === 'hint_visual') {
      return (
        <Card className="p-6 bg-purple-50">
          <pre className="text-lg text-center font-mono whitespace-pre-wrap text-purple-800">{currentEvent.content}</pre>
        </Card>
      );
    }

    if (currentEvent.type === 'summary') {
      return (
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
          <h3 className="text-2xl font-serif text-indigo-800 mb-4 text-center">Chapter Summary</h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-amber-600">
              <Star className="inline w-8 h-8 mr-2" />{currentEvent.total_picarats} Picarats
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2">Methods Learned:</p>
            <ul className="list-disc list-inside text-gray-600">
              {currentEvent.lessons_learned?.map((lesson, i) => <li key={i}>{lesson}</li>)}
            </ul>
          </div>
        </Card>
      );
    }

    return (
      <Card className={`p-6 ${currentEvent.type === 'narration' ? 'bg-gray-50' : 'bg-white'}`}>
        {renderCharacter()}
        <p className={`text-lg leading-relaxed ${
          currentEvent.text_style === 'title_emphasis' ? 'text-3xl font-serif text-center text-amber-700' : 'text-gray-800'
        }`}>{displayText}</p>
      </Card>
    );
  };

  useEffect(() => {
    if (currentScene?.type === 'player_challenge' && !showOptions && !showErrorFeedback) {
      setTimeout(() => setShowOptions(true), 500);
    } else if (currentScene?.type === 'demonstration' && currentScene.solution_steps) {
      if (eventIndex < currentScene.solution_steps.length - 1) {
        const timer = setTimeout(() => setEventIndex(prev => prev + 1), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentScene, eventIndex, showOptions, showErrorFeedback]);

  return (
    <SceneBackground sceneId={currentSceneId}>
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-serif text-gray-700">{GAME_DATA.chapter.title_en}</div>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-700">{picarats}</span>
            </div>
          </div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSceneId + eventIndex + (showErrorFeedback ? '-error' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Error Feedback */}
              {showErrorFeedback && currentDiagnosis && (
                <ErrorFeedback
                  diagnosis={currentDiagnosis}
                  onRetry={handleRetry}
                  onAskMentor={() => { setShowMentorChat(true); setShowErrorFeedback(false); setShowOptions(true); }}
                />
              )}

              {/* Demonstration mode */}
              {!showErrorFeedback && currentScene?.type === 'demonstration' && currentScene.solution_steps && (
                <div className="space-y-4">
                  <Card className="p-4 bg-amber-50 border-amber-200">
                    <h3 className="text-xl font-serif text-amber-800 mb-2">{currentScene.puzzle.title}</h3>
                    <p className="text-gray-700">{currentScene.puzzle.problem}</p>
                    <div className="text-sm text-amber-600 mt-2">💎 {currentScene.puzzle.picarats} Picarats</div>
                  </Card>
                  {currentScene.puzzle.visualization && <PuzzleVisualization puzzleType={currentScene.puzzle.visualization} />}
                  {renderEvent()}
                </div>
              )}

              {/* Player challenge */}
              {!showErrorFeedback && currentScene?.type === 'player_challenge' && (
                <div className="space-y-4">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <h3 className="text-2xl font-serif text-indigo-800 mb-4">{currentScene.puzzle.title}</h3>
                    <p className="text-lg text-gray-800 mb-4">{currentScene.puzzle.problem}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-amber-600 font-semibold">💎 {currentScene.puzzle.picarats - (hintsUsed * 10)} Picarats</div>
                      {currentScene.puzzle.hints && (
                        <Button variant="outline" size="sm" onClick={handleHint} disabled={hintsUsed >= currentScene.puzzle.hints.length}>
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Hint ({hintsUsed}/{currentScene.puzzle.hints.length})
                        </Button>
                      )}
                    </div>
                  </Card>

                  {currentScene.puzzle.visualization && <PuzzleVisualization puzzleType={currentScene.puzzle.visualization} />}

                  {showOptions && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      {currentScene.options?.map((option) => (
                        <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left justify-start h-auto p-4 text-base"
                            variant="outline"
                          >
                            {option.text}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Normal/hint scenes */}
              {!showErrorFeedback && !currentScene?.type && renderEvent()}
              {!showErrorFeedback && currentScene?.type === 'hint_support' && renderEvent()}
            </motion.div>
          </AnimatePresence>

          {/* Continue button */}
          {!showOptions && !isTyping && !showErrorFeedback && currentScene?.type !== 'player_challenge' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end mt-6">
              <Button onClick={handleNext} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* AI Mentor Button */}
      <motion.button
        onClick={() => setShowMentorChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 
          text-white rounded-full shadow-lg flex items-center justify-center z-40
          hover:shadow-xl hover:scale-105 transition-all"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Mentor Chat */}
      <AnimatePresence>
        {showMentorChat && (
          <MentorChat
            isOpen={showMentorChat}
            onClose={() => setShowMentorChat(false)}
            currentPuzzle={currentScene?.puzzle}
          />
        )}
      </AnimatePresence>
    </SceneBackground>
  );
}