export const buildMentorContext = (puzzle) => {
  if (!puzzle) return {};
  return {
    puzzleTitle: puzzle.title,
    puzzleText: puzzle.problem
  };
};
