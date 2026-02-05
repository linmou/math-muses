import { getCharacterPlaceholder } from '../../lib/placeholder-images';

// Vera Wang Game Data - English Version
export const GAME_DATA = {
  game_info: {
    title: "Vera Wang's Bridal Quest",
    title_en: "Vera Wang's Bridal Quest",
    version: "1.0",
    target_age: "7-15",
    language: ["zh-CN", "en-US"]
  },
  chapter: {
    id: "chapter_1",
    title: "The Crystal Mystery",
    title_en: "The Crystal Mystery",
    total_picarats: 200,
    missions: 5
  },
  characters: {
    vera: {
      name: "Vera Wang",
      name_cn: "王薇薇",
      role: "Master Designer",
      color_theme: "#2C2C2C",
      emoji: "👗",
      image: getCharacterPlaceholder('vera'),
      voice_style: "elegant_mature"
    },
    luna: {
      name: "Luna",
      name_cn: "露娜",
      role: "Color Specialist",
      color_theme: "#9B59B6",
      emoji: "🎨",
      image: getCharacterPlaceholder('luna'),
      trait: "creative_dreamer",
      voice_style: "youthful_curious"
    },
    stella: {
      name: "Stella",
      name_cn: "斯黛拉",
      role: "Data Manager",
      color_theme: "#3498DB",
      emoji: "📊",
      image: getCharacterPlaceholder('stella'),
      trait: "analytical_precise",
      voice_style: "clear_confident"
    },
    rose: {
      name: "Rose",
      name_cn: "罗丝",
      role: "Client Relations",
      color_theme: "#E91E63",
      emoji: "🌹",
      image: getCharacterPlaceholder('rose'),
      trait: "warm_energetic",
      voice_style: "warm_cheerful"
    }
  },
  scenes: {
    prologue: {
      id: "prologue",
      bgm: "main_theme",
      next_scene: "mission_1_intro",
      sequence: [
        {
          id: "p1",
          type: "narration",
          text: "Morning sunlight streams through the floor-to-ceiling windows of New York's Fifth Avenue's most famous bridal shop—",
          animation: "typewriter"
        },
        {
          id: "p2",
          type: "narration",
          text: "Vera Wang Atelier",
          animation: "fade_in",
          text_style: "title_emphasis"
        },
        {
          id: "p3",
          type: "dialogue",
          speaker: "vera",
          text: "Girls, gather around!"
        },
        {
          id: "p4",
          type: "narration",
          text: "Three young design assistants gathered closer:"
        },
        {
          id: "p5",
          type: "character_intro",
          character: "luna",
          text: "Luna—a girl with purple-highlighted hair, in charge of color coordination."
        },
        {
          id: "p6",
          type: "character_intro",
          character: "stella",
          text: "Stella—a girl with a neat ponytail, the team's data manager."
        },
        {
          id: "p7",
          type: "character_intro",
          character: "rose",
          text: "Rose—an energetic girl with curly hair, responsible for client communication."
        },
        {
          id: "p8",
          type: "dialogue",
          speaker: "vera",
          text: "We have a royal commission. Princess Ingrid of Norway's wedding is in three weeks, and she chose us."
        },
        {
          id: "p9",
          type: "dialogue",
          speaker: "vera",
          text: "But the royal family requires us to complete a series of design challenges. The first challenge starts today."
        }
      ]
    },
    mission_1_intro: {
      id: "mission_1_intro",
      next_scene: "mission_1_puzzle",
      sequence: [
        {
          type: "narration",
          text: "🎯 Mission One: Smart Fabric Allocation"
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "We have 360 meters of smart fabric that needs to be divided between Sun Team and Moon Team."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Sun Team's fabric length must be twice that of Moon Team."
        },
        {
          type: "dialogue",
          speaker: "luna",
          text: "Let me demonstrate how to solve this problem!"
        }
      ]
    },
    mission_1_puzzle: {
      id: "mission_1_puzzle",
      type: "demonstration",
      next_scene: "mission_2_intro",
      puzzle: {
        title: "Smart Fabric Allocation",
        problem: "360 meters of fabric. Sun Team gets twice as much as Moon Team. How much does each get?",
        picarats: 40,
        visualization: "fabric_division"
      },
      solution_steps: [
        {
          type: "dialogue",
          speaker: "luna",
          text: "First, I imagine Moon Team as 1 box, then Sun Team would be 2 boxes."
        },
        {
          type: "visual",
          content: "📦 Moon: 1 box | 📦📦 Sun: 2 boxes"
        },
        {
          type: "dialogue",
          speaker: "luna",
          text: "Together that's 3 boxes, representing 360 meters."
        },
        {
          type: "calculation",
          text: "360 ÷ 3 = 120 (per box)"
        },
        {
          type: "dialogue",
          speaker: "luna",
          text: "So Moon Team gets 120 meters, and Sun Team gets 240 meters!"
        },
        {
          type: "answer",
          moon: 120,
          sun: 240
        }
      ]
    },
    mission_2_intro: {
      id: "mission_2_intro",
      next_scene: "mission_2_puzzle",
      sequence: [
        {
          type: "narration",
          text: "🎯 Mission Two: Crystal Button Inventory"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "Now it's your turn! Here's a similar problem."
        }
      ]
    },
    mission_2_puzzle: {
      id: "mission_2_puzzle",
      type: "player_challenge",
      puzzle: {
        title: "Crystal Button Allocation",
        problem: "There are 600 crystal buttons. Yellow is 3 times purple. How many of each?",
        picarats: 50,
        visualization: "crystal_buttons",
        hints: [
          "If purple is 1 box, how many boxes is yellow?",
          "How many boxes total? What is 600 divided by the total number of boxes?",
          "Purple = 1 box, Yellow = 3 boxes, calculate each box's quantity!"
        ]
      },
      options: [
        {
          id: "a",
          text: "Purple 150, Yellow 450",
          is_correct: true,
          feedback: "Excellent! You've mastered the unit thinking method!",
          next_scene: "mission_2_success"
        },
        {
          id: "b",
          text: "Purple 200, Yellow 400",
          is_correct: false,
          feedback: "Be careful! You forgot to count purple in the total number of boxes.",
          next_scene: "hint_scene"
        },
        {
          id: "c",
          text: "Purple 300, Yellow 300",
          is_correct: false,
          feedback: "The problem requires yellow to be 3 times purple, not equal!",
          next_scene: "hint_scene"
        }
      ]
    },
    hint_scene: {
      id: "hint_scene",
      type: "hint_support",
      next_scene: "rose_practice",
      sequence: [
        {
          type: "dialogue",
          speaker: "luna",
          text: "Wait, I think I calculated wrong... Let's do a simpler practice problem!"
        },
        {
          type: "narration",
          text: "🌹 Rose's Dress Problem"
        },
        {
          type: "dialogue",
          speaker: "rose",
          text: "I have 6 dresses hanging in my closet. I love yellow and purple!"
        },
        {
          type: "dialogue",
          speaker: "rose",
          text: "I have twice as many yellow dresses as purple ones. Can you figure out how many of each I have?"
        }
      ]
    },
    rose_practice: {
      id: "rose_practice",
      type: "player_challenge",
      puzzle: {
        title: "Rose's Dresses",
        problem: "Total of 6 dresses. Yellow is twice purple. How many of each?",
        picarats: 20,
        visualization: "rose_dresses",
        hints: [
          "Purple = 1 part, Yellow = 2 parts, how many parts total?",
          "Total 3 parts = 6 dresses, 1 part = ?",
          "Purple = 1 part, Yellow = 2 parts"
        ]
      },
      options: [
        {
          id: "a",
          text: "Purple 2, Yellow 4",
          is_correct: true,
          feedback: "Great! Now you understand!",
          next_scene: "back_to_crystal"
        },
        {
          id: "b",
          text: "Purple 3, Yellow 3",
          is_correct: false,
          feedback: "The problem says yellow is twice purple, not equal!",
          next_scene: "rose_practice"
        }
      ]
    },
    back_to_crystal: {
      id: "back_to_crystal",
      next_scene: "mission_2_puzzle",
      sequence: [
        {
          type: "hint_visual",
          content: "Purple = 1 box 📦\nYellow = 3 boxes 📦📦📦\nTotal = 4 boxes"
        },
        {
          type: "dialogue",
          speaker: "luna",
          text: "Now let's go back and try the crystal button problem again! Remember: yellow crystals are 3 times purple, so that's 4 parts total!"
        }
      ]
    },
    mission_2_success: {
      id: "mission_2_success",
      sequence: [
        {
          type: "celebration",
          text: "🎉 Congratulations! Earned 50 Picarats!",
          animation: "star_explosion"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "450 yellow crystals, 150 purple crystals!"
        },
        {
          type: "narration",
          text: "Mrs. Chen quickly verified: 150 × 3 = 450, 450 + 150 = 600. Perfect!"
        }
      ],
      next_scene: "grandma_intro"
    },
    grandma_intro: {
      id: "grandma_intro",
      next_scene: "mission_4_intro",
      sequence: [
        {
          type: "narration",
          text: "Just as the girls were cheering, the studio door was pushed open."
        },
        {
          type: "narration",
          text: "An elderly lady with silver hair walked in slowly, wearing an elegant qipao, holding an ornate walking stick."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Grandma! What brings you here?"
        },
        {
          type: "narration",
          text: "The old lady—Grandma Wang—snorted lightly, but her eyes were full of smiles."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "I heard about the royal commission. I came to see if you young ladies can handle it."
        },
        {
          type: "narration",
          text: "Grandma Wang looked over the three young assistants, her gaze lingering on Stella."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Do you remember the problem I tested you with? That 'master-apprentice age problem'—I spent an entire evening solving it."
        }
      ]
    },
    mission_4_intro: {
      id: "mission_4_intro",
      next_scene: "mission_4_puzzle",
      sequence: [
        {
          type: "narration",
          text: "🎯 Challenge Four: Master-Apprentice Ages"
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Many years ago, Grandma told me: Little one, your age in 18 years will equal my age from 10 years ago."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Now, Grandma is 54 years old. How old am I now?"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "Let me demonstrate how to solve this problem!"
        }
      ]
    },
    mission_4_puzzle: {
      id: "mission_4_puzzle",
      type: "demonstration",
      next_scene: "mission_5_intro",
      puzzle: {
        title: "Master-Apprentice Age Mystery",
        problem: "Apprentice's age in 18 years = Master's age 10 years ago. Master is now 54. How old is apprentice now?",
        picarats: 60,
        visualization: "age_difference"
      },
      solution_steps: [
        {
          type: "dialogue",
          speaker: "stella",
          text: "First, '18 years later' and '10 years ago' means their age difference is constant."
        },
        {
          type: "visual",
          content: "Apprentice: [now] ——→ [+18 years]\n                  ↕ equal\nMaster:    [-10 years ago] ←—— [now]"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "If apprentice in 18 years = master 10 years ago, then:"
        },
        {
          type: "calculation",
          text: "Apprentice age + 18 = Master age - 10"
        },
        {
          type: "calculation",
          text: "Master age - Apprentice age = 18 + 10 = 28 years"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "So the age difference between master and apprentice is 28 years!"
        },
        {
          type: "calculation",
          text: "Apprentice age = 54 - 28 = 26 years"
        },
        {
          type: "answer",
          text: "Ms. Vera is 26 years old now!"
        }
      ]
    },
    mission_5_intro: {
      id: "mission_5_intro",
      next_scene: "mission_5_puzzle",
      sequence: [
        {
          type: "narration",
          text: "🎯 Final Challenge: The Equation of Time"
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Grandma will tell another story. This is a problem her master tested her with."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "The apprentice's age 18 years from now will be equal to the master's age 10 years ago. When the sum of their ages is 80, how old is the apprentice?"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "Now it's your turn! Let's see if you can solve this problem."
        }
      ]
    },
    mission_5_puzzle: {
      id: "mission_5_puzzle",
      type: "player_challenge",
      puzzle: {
        title: "The Equation of Time",
        problem: "The apprentice's age 18 years from now will be equal to the master's age 10 years ago. When the sum of their ages is 80, how old is the apprentice?",
        picarats: 80,
        visualization: "age_difference",
        hints: [
          "First calculate age difference: age difference = 18 + 10 = ?",
          "Now you know the sum (80) and difference (28), how to find the smaller number?",
          "Sum-difference formula: smaller number = (sum - difference) ÷ 2"
        ]
      },
      options: [
        {
          id: "a",
          text: "Apprentice is 26 years old",
          is_correct: true,
          feedback: "Perfect! You've mastered the essence of sum-difference problems!",
          next_scene: "mission_5_success"
        },
        {
          id: "b",
          text: "Apprentice is 22 years old",
          is_correct: false,
          feedback: "Watch out! The age difference is 18+10=28 years, not 36 years.",
          next_scene: "mission_5_hint"
        },
        {
          id: "c",
          text: "Apprentice is 20 years old",
          is_correct: false,
          feedback: "Careful with the calculation! Remember to use the sum-difference formula correctly.",
          next_scene: "mission_5_hint"
        }
      ]
    },
    mission_5_hint: {
      id: "mission_5_hint",
      type: "hint_support",
      sequence: [
        {
          type: "dialogue",
          speaker: "luna",
          text: "Don't rush! Let's go step by step."
        },
        {
          type: "hint_visual",
          content: "Step 1: Find age difference\nApprentice + 18 = Master - 10\nDifference = 18 + 10 = 28 years"
        },
        {
          type: "hint_visual",
          content: "Step 2: Use sum-difference formula\nSum = 80 years, Difference = 28 years\nApprentice = (80 - 28) ÷ 2 = ?"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "Ready? Try again!"
        }
      ],
      next_scene: "mission_5_puzzle"
    },
    mission_5_success: {
      id: "mission_5_success",
      sequence: [
        {
          type: "celebration",
          text: "🎉 Congratulations! Earned 80 Picarats!",
          animation: "star_explosion"
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "26 years old!"
        },
        {
          type: "narration",
          text: "Grandma Wang was silent for a moment, then slowly began to clap."
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Good children, when I was 26 years old, my master passed her sewing machine to me. That year, she was 54 years old, and our ages added up to exactly 80 years..."
        },
        {
          type: "narration",
          text: "It turns out this problem wasn't just mathematics, but a memory of heritage."
        }
      ],
      next_scene: "epilogue"
    },
    epilogue: {
      id: "epilogue",
      sequence: [
        {
          type: "narration",
          text: "Outside the window, New York's sunset painted the sky gold and purple."
        },
        {
          type: "dialogue",
          speaker: "luna",
          text: "Hey, gold and purple... just like today's yellow and purple crystals!"
        },
        {
          type: "dialogue",
          speaker: "rose",
          text: "Maybe it's a good omen?"
        },
        {
          type: "dialogue",
          speaker: "vera",
          text: "Girls, this is only the first day. We still have many challenges ahead."
        },
        {
          type: "dialogue",
          speaker: "stella",
          text: "I'm ready."
        },
        {
          type: "narration",
          text: "Luna and Rose exchanged smiles: So are we!"
        },
        {
          type: "summary",
          total_picarats: 230,
          lessons_learned: ["Unit Thinking Method (Parts Method)", "Ratio Allocation", "Age Difference Problems", "Sum-Difference Problems"]
        }
      ]
    }
  }
};
