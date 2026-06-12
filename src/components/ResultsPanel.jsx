import ScoreBar from './ScoreBar.jsx';
import RewriteCard from './RewriteCard.jsx';

const sectionToSeverity = (data, path) => {
  const candidate = data?.[path];
  if (!candidate || typeof candidate !== 'object') return null;
  return candidate.severity || null;
};

export default function ResultsPanel({ data, onReset }) {
  if (!data) return null;

  const { parseError, rawText } = data;

  if (parseError) {
    return (
      <div className="min-h-screen px-4 pb-6 pt-6 bg-surface-base">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="font-accent text-xl text-accent">Candor</h1>
            <button
              type="button"
              onClick={onReset}
              className="rounded-md border border-accent px-4 py-2 font-primary text-xs text-accent transition hover:bg-accent/10"
            >
              Start Over
            </button>
          </header>

          <div className="rounded-lg bg-surface-raised p-6">
            <p className="text-sm text-text-muted mb-3">The critique could not be parsed. Here is the raw response:</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-surface-overlay p-4 text-sm text-text-primary">
              {rawText}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  const severityHigh = sectionToSeverity(data, 'first_impression');
  const severityMedium = sectionToSeverity(data, 'experience_quality');
  const severityTech = sectionToSeverity(data, 'technical_credibility');
  const severityProjects = sectionToSeverity(data, 'project_section');
  const severityRedFlags = data.red_flags?.severity;

  return (
    <div className="min-h-screen px-4 pb-6 pt-6 bg-surface-base">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="font-accent text-xl text-accent">Candor</h1>
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-accent px-4 py-2 font-primary text-xs text-accent transition hover:bg-accent/10"
          >
            Start Over
          </button>
        </header>

        <section className="rounded-xl bg-surface-raised p-6 border-l-[3px] border-accent">
          <p className="text-xs font-accent uppercase tracking-widest text-text-muted mb-3">Verdict</p>
          <p className="font-accent text-base md:text-lg leading-relaxed text-text-primary">{data.overall_verdict}</p>
        </section>

        {data.first_impression ? (
          <section className="rounded-lg bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">First Impression</h2>
              {severityHigh ? <ScoreBar severity={severityHigh} /> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">{data.first_impression.verdict}</p>
          </section>
        ) : null}

        {data.red_flags?.items?.length ? (
          <section className="rounded-lg bg-surface-raised p-6 border-l-[3px] border-accent">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">Red Flags</h2>
              {severityRedFlags ? <ScoreBar severity={severityRedFlags} /> : null}
            </div>
            <ul className="mt-4 divide-y divide-surface-border">
              {data.red_flags.items.map((item, index) => (
                <li key={item + index} className="flex gap-3 py-3 first:pt-0 last:border-b-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
                  <span className="text-sm leading-relaxed text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {data.priority_rewrites?.length ? (
          <section className="space-y-5">
            <h2 className="text-xs font-primary uppercase tracking-widest text-text-muted">Priority Rewrites</h2>
            {data.priority_rewrites.map((item, index) => (
              <RewriteCard key={item.section + index} {...item} />
            ))}
          </section>
        ) : null}

        {data.experience_quality ? (
          <section className="rounded-lg bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">Experience Quality</h2>
              {severityMedium ? <ScoreBar severity={severityMedium} /> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">{data.experience_quality.verdict}</p>
            {data.experience_quality.examples?.length ? (
              <div className="mt-4 space-y-2">
                {data.experience_quality.examples.map((item, index) => (
                  <blockquote key={item + index} className="border-l-2 border-text-faint bg-surface-overlay px-3 py-2 text-sm text-text-muted italic">
                    {item}
                  </blockquote>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {data.technical_credibility ? (
          <section className="rounded-lg bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">Technical Credibility</h2>
              {severityTech ? <ScoreBar severity={severityTech} /> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">{data.technical_credibility.verdict}</p>
          </section>
        ) : null}

        {data.project_section ? (
          <section className="rounded-lg bg-surface-raised p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">Projects</h2>
              {severityProjects ? <ScoreBar severity={severityProjects} /> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">{data.project_section.verdict}</p>
            {data.project_section.examples?.length ? (
              <div className="mt-4 space-y-2">
                {data.project_section.examples.map((item, index) => (
                  <blockquote key={item + index} className="border-l-2 border-text-faint bg-surface-overlay px-3 py-2 text-sm text-text-muted italic">
                    {item}
                  </blockquote>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {data.missing_elements?.items?.length ? (
          <section className="rounded-lg bg-surface-raised p-6">
            <h2 className="text-sm font-primary uppercase tracking-wider text-text-muted">Missing Elements</h2>
            <ul className="mt-4 space-y-2">
              {data.missing_elements.items.map((item, index) => (
                <li key={item + index} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full border border-text-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
