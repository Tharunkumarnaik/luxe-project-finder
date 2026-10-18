import { describe, expect, it } from 'vitest';
import { quizQuestions, recommendStyle } from '@/lib/style-quiz';
const base = { colors: 'light', lifestyle: 'quiet', room: 'kitchen', maintenance: 'easy', budget: 'essential' };
describe('Interior style recommendations', () => {
  it('requires colors, lifestyle, room, maintenance and budget', () => {
    for (const question of quizQuestions) expect(() => recommendStyle({ ...base, [question.id]: '' })).toThrow();
  });
  it('recommends minimalism for calm, practical kitchen preferences', () => {
    expect(recommendStyle(base).primary.name).toBe('Modern Minimalist');
  });
  it('uses color preferences in the direction', () => {
    expect(recommendStyle({ ...base, colors: 'light', lifestyle: 'family', room: 'home', maintenance: 'balanced', budget: 'unsure' }).primary.name).toBe('Scandinavian');
    expect(recommendStyle({ ...base, colors: 'earth', lifestyle: 'family', room: 'home', maintenance: 'balanced', budget: 'unsure' }).primary.name).toBe('Contemporary Indian');
  });
  it('uses lifestyle to distinguish a retreat from entertaining', () => {
    const answers = { ...base, colors: 'rich', room: 'home', maintenance: 'balanced', budget: 'unsure' };
    expect(recommendStyle({ ...answers, lifestyle: 'quiet' }).primary.name).toBe('Hotel-Inspired Luxury');
    expect(recommendStyle({ ...answers, lifestyle: 'hosting' }).primary.name).toBe('Contemporary Luxury');
  });
  it('matches the selected room with available portfolio inspiration', () => {
    expect(recommendStyle(base).matches[0]?.category).toBe('Kitchens');
    expect(recommendStyle({ ...base, room: 'bedroom' }).matches[0]?.category).toBe('Bedrooms');
  });
  it('uses upkeep needs to distinguish practical and detailed styles', () => {
    const answers = { colors: 'rich', lifestyle: 'quiet', room: 'home', budget: 'unsure' };
    expect(recommendStyle({ ...answers, maintenance: 'easy' }).primary.name).toBe('Modern Minimalist');
    expect(recommendStyle({ ...answers, maintenance: 'detailed' }).primary.name).toBe('Contemporary Luxury');
  });
  it('uses budget priorities without treating a style as a price quote', () => {
    const answers = { colors: 'light', lifestyle: 'hosting', room: 'living', maintenance: 'balanced' };
    expect(recommendStyle({ ...answers, budget: 'essential' }).primary.name).toBe('Scandinavian');
    expect(recommendStyle({ ...answers, budget: 'premium' }).primary.name).toBe('Contemporary Luxury');
  });
});