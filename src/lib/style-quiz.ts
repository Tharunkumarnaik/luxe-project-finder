import { projects, styles } from '@/lib/studio-data';

type Option = { id: string; label: string; detail: string; weights: Record<string, number>; advice: string };
type Question = { id: string; title: string; options: Option[] };
export const quizQuestions: Question[] = [
  { id: 'colors', title: 'Which palette feels most like you?', options: [
    { id: 'light', label: 'Light & calm', detail: 'Soft whites, pale wood, gentle greys', weights: { 'Scandinavian': 5, 'Modern Minimalist': 4 }, advice: 'Build a calm palette with light neutrals and natural wood.' },
    { id: 'earth', label: 'Warm & earthy', detail: 'Terracotta, olive, wood and natural textures', weights: { 'Bohemian & Earthy': 5, 'Contemporary Indian': 3, 'Traditional Indian': 2 }, advice: 'Layer warm wood, earthy accents and natural textures.' },
    { id: 'rich', label: 'Deep & elegant', detail: 'Jewel tones, dark wood, metallic accents', weights: { 'Contemporary Luxury': 5, 'Hotel-Inspired Luxury': 4, 'Traditional Indian': 2 }, advice: 'Use deep accents and considered lighting for richness without overwhelming the room.' },
    { id: 'contrast', label: 'Bold & contrasting', detail: 'Charcoal, concrete and graphic accents', weights: { 'Industrial': 5, 'Modern Minimalist': 2, 'Contemporary Luxury': 1 }, advice: 'Balance strong contrasts with a few restrained statement pieces.' },
  ] },
  { id: 'lifestyle', title: 'How do you like to live in your space?', options: [
    { id: 'quiet', label: 'A quiet retreat', detail: 'Uncluttered spaces and room to unwind', weights: { 'Modern Minimalist': 5, 'Scandinavian': 3, 'Hotel-Inspired Luxury': 2 }, advice: 'Prioritise clear circulation, concealed storage and a relaxed layout.' },
    { id: 'family', label: 'Family comes first', detail: 'Comfortable, practical and welcoming', weights: { 'Contemporary Indian': 5, 'Scandinavian': 3, 'Traditional Indian': 2 }, advice: 'Choose comfortable seating, flexible storage and durable everyday surfaces.' },
    { id: 'hosting', label: 'Made for entertaining', detail: 'Gatherings, conversation and a little occasion', weights: { 'Contemporary Luxury': 5, 'Hotel-Inspired Luxury': 3, 'Industrial': 2 }, advice: 'Plan sociable seating and layered lighting that adapts to gatherings.' },
    { id: 'expressive', label: 'Collected & personal', detail: 'Art, travel finds and meaningful details', weights: { 'Bohemian & Earthy': 5, 'Traditional Indian': 4, 'Industrial': 2 }, advice: 'Leave room for art, meaningful objects and a curated mix of textures.' },
  ] },
  { id: 'room', title: 'Which space are you thinking about?', options: [
    { id: 'living', label: 'Living room', detail: 'Your everyday gathering space', weights: { 'Contemporary Indian': 2, 'Contemporary Luxury': 1 }, advice: 'Anchor your living room with comfortable seating and a balanced focal point.' },
    { id: 'bedroom', label: 'Bedroom', detail: 'A restful, personal sanctuary', weights: { 'Hotel-Inspired Luxury': 4, 'Scandinavian': 2 }, advice: 'Use soft lighting, comfortable textiles and bedside storage in your bedroom.' },
    { id: 'kitchen', label: 'Kitchen', detail: 'Storage, cooking and daily routines', weights: { 'Modern Minimalist': 3, 'Industrial': 1 }, advice: 'Start your kitchen with an efficient layout, accessible storage and easy-clean worktops.' },
    { id: 'home', label: 'Complete home', detail: 'A cohesive direction across rooms', weights: { 'Contemporary Indian': 2, 'Traditional Indian': 1 }, advice: 'Repeat a considered palette across your home while giving each room its own character.' },
  ] },
  { id: 'maintenance', title: 'How much upkeep suits your routine?', options: [
    { id: 'easy', label: 'Keep it easy', detail: 'Simple surfaces and minimal upkeep', weights: { 'Modern Minimalist': 4, 'Scandinavian': 3 }, advice: 'Favour closed storage, wipeable finishes and fewer dust-catching details; confirm care requirements before choosing materials.' },
    { id: 'balanced', label: 'A little care is fine', detail: 'Practical finishes with a few special details', weights: { 'Contemporary Indian': 2, 'Industrial': 2, 'Scandinavian': 1 }, advice: 'Combine practical everyday finishes with a small number of decorative accents.' },
    { id: 'detailed', label: 'Details are worth the care', detail: 'Layered fabrics, decorative finishes and styling', weights: { 'Traditional Indian': 4, 'Contemporary Luxury': 3, 'Bohemian & Earthy': 3, 'Hotel-Inspired Luxury': 2 }, advice: 'Allow for regular care of layered textiles and decorative finishes.' },
  ] },
  { id: 'budget', title: 'Where would you like to focus your budget?', options: [
    { id: 'essential', label: 'Thoughtful essentials', detail: 'Value-led choices and practical priorities', weights: { 'Modern Minimalist': 3, 'Scandinavian': 3, 'Industrial': 1 }, advice: 'Prioritise layout, storage and essential furniture; add decorative layers gradually.' },
    { id: 'balanced', label: 'A considered balance', detail: 'Everyday quality with selected upgrades', weights: { 'Contemporary Indian': 3, 'Bohemian & Earthy': 2 }, advice: 'Invest in high-use pieces and choose a few focal upgrades rather than upgrading every finish.' },
    { id: 'premium', label: 'Premium detailing', detail: 'Bespoke furniture and refined finishes', weights: { 'Contemporary Luxury': 4, 'Hotel-Inspired Luxury': 4, 'Traditional Indian': 2 }, advice: 'Explore bespoke joinery and refined finishes, with scope and costs confirmed in consultation.' },
    { id: 'unsure', label: 'Still exploring', detail: 'I would like guidance on priorities', weights: {}, advice: 'Discuss your priorities and an indicative budget with the studio before selecting finishes.' },
  ] },
];

export type QuizAnswers = Record<string, string>;
export function recommendStyle(answers: QuizAnswers) {
  const chosen = quizQuestions.map(question => {
    const option = question.options.find(item => item.id === answers[question.id]);
    if (!option) throw new Error('Please answer all five questions.');
    return { question, option };
  });
  const ranked = styles.map((style, index) => ({ style, index, score: chosen.reduce((sum, { option }) => sum + (option.weights[style.name] ?? 0), 0) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const primary = ranked[0]?.style;
  const alternative = ranked[1]?.style;
  if (!primary || !alternative) throw new Error('No style directions available.');
  const roomCategories: Record<string, string> = { living: 'Residential', bedroom: 'Bedrooms', kitchen: 'Kitchens', home: 'Residential' };
  const category = roomCategories[answers.room];
  const matches = projects.map(project => ({ project, score: (project.category === category ? 4 : 0) + (project.style === primary.name ? 3 : project.style === alternative.name ? 2 : 0) }))
    .filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).map(item => item.project);
  return { primary, alternative, matches, chosen };
}