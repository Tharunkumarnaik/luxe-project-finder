import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/studio-data';
import { quizQuestions, recommendStyle, type QuizAnswers } from '@/lib/style-quiz';
import { usePreferences } from '@/components/studio/preferences';

export function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const { selected, toggle } = usePreferences();
  const question = quizQuestions[step];
  const result = complete ? recommendStyle(answers) : null;
  useEffect(() => { if (step > 0 || complete) heading.current?.focus({ preventScroll: true }); }, [step, complete]);
  const save = () => { if (result && !selected.includes(result.primary.name)) toggle(result.primary.name); };
  const restart = () => { setAnswers({}); setStep(0); setComplete(false); };
  if (!question) return null;

  return <section className="section style-quiz-section" id="style-quiz" aria-label="Find Your Interior Style">
    <div className="container">
      <div className="quiz-intro"><span className="eyebrow">YOUR SPACE. YOUR PERSPECTIVE.</span><h2>Find Your <em>Interior Style</em></h2></div>
      {result ? <div className="quiz-result" key="result">
        <div className="quiz-result-layout">
          <div className="quiz-profile">
            <span className="eyebrow">YOUR PERSONAL STYLE PROFILE</span>
            <h3 ref={heading} tabIndex={-1}>{result.primary.name}</h3>
            <p>{result.primary.description}</p>
            <p className="quiz-alternative">A complementary direction: <strong>{result.alternative.name}</strong></p>
            <dl className="quiz-summary">{result.chosen.map(({ question: item, option }) => <div key={item.id}><dt>{({ colors: 'Palette', lifestyle: 'Lifestyle', room: 'Space', maintenance: 'Upkeep', budget: 'Budget focus' } as Record<string, string>)[item.id]}</dt><dd>{option.label}</dd></div>)}</dl>
            <div className="quiz-result-actions">
              <Button variant="studio" asChild size="lg"><Link to="/contact" onClick={save}>Discuss My Style <ArrowUpRight /></Link></Button>
              <Button variant="outline" onClick={save} disabled={selected.includes(result.primary.name)}><Check />{selected.includes(result.primary.name) ? 'Saved to Preferences' : 'Save My Style'}</Button>
              <Button variant="ghost" onClick={restart}><RotateCcw />Retake Quiz</Button>
            </div>
          </div>
          <div className="quiz-result-image"><img src={result.primary.image} alt={`${result.primary.name} illustrative design inspiration`} width={1536} height={1024} /><span className="image-note">DESIGN INSPIRATION</span></div>
        </div>
        <div className="quiz-plan"><h3>A direction for your space</h3><ul>{result.chosen.map(({ question: item, option }) => <li key={item.id}>{option.advice}</li>)}</ul><p className="quiz-disclaimer">A starting point based on your preferences, not a design specification or cost estimate. Final materials, scope and budget are agreed in consultation.</p></div>
        <div className="quiz-matches"><span className="eyebrow">MATCHING DESIGN INSPIRATION</span><h3>Ideas for your next chapter</h3><p>Illustrative concepts from our gallery, not completed client projects.</p><div className="project-grid">{result.matches.map(project => <article className="project-card" key={project.slug}><div className="image-frame"><Link to="/projects/$slug" params={{ slug: project.slug }}><img src={project.image} alt={`${project.title} — generated design inspiration`} width={1536} height={1024} loading="lazy" /></Link><span className="image-note">DESIGN INSPIRATION</span></div><Link className="project-info" to="/projects/$slug" params={{ slug: project.slug }}><div><span className="eyebrow">{project.category} · {project.style}</span><h3>{project.title}</h3></div><ArrowUpRight /></Link></article>)}</div></div>
      </div> : <div className="quiz-layout">
        <div className="quiz-questions">
          <div className="quiz-progress" aria-label={`Question ${step + 1} of ${quizQuestions.length}`}><span className="eyebrow">0{step + 1} / 0{quizQuestions.length}</span><div className="quiz-progress-marks" aria-hidden="true">{quizQuestions.map((item, index) => <span key={item.id} className={index <= step ? 'is-complete' : ''} />)}</div></div>
          <div className="quiz-step" key={question.id}><h3 ref={heading} tabIndex={-1}>{question.title}</h3><div className="quiz-options" role="group" aria-label={question.title}>{question.options.map(option => <Button variant="outline" key={option.id} aria-pressed={answers[question.id] === option.id} className={`quiz-option ${answers[question.id] === option.id ? 'is-selected' : ''}`} onClick={() => setAnswers(previous => ({ ...previous, [question.id]: option.id }))}><span><strong>{option.label}</strong><small>{option.detail}</small></span><span className="quiz-option-marker" aria-hidden="true">{answers[question.id] === option.id && <Check size={14} />}</span></Button>)}</div></div>
          <div className="quiz-navigation"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(previous => previous - 1)}><ArrowLeft />Back</Button><Button variant="studio" size="lg" disabled={!answers[question.id]} onClick={() => step === quizQuestions.length - 1 ? setComplete(true) : setStep(previous => previous + 1)}>{step === quizQuestions.length - 1 ? 'Reveal My Style' : 'Continue'}<ArrowRight /></Button></div>
        </div>
        <div className="quiz-visual"><img src={images.living} alt="Natural wood and soft neutral tones in an illustrative living room" width={1536} height={1024} loading="lazy" /><span className="image-note">DESIGN INSPIRATION</span></div>
      </div>}
    </div>
  </section>;
}