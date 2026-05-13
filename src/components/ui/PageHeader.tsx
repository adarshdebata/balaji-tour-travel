interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-72"
      >
        <div className="absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-saffron-200 to-crimson-200 opacity-50 blur-3xl" />
      </div>

      <div className="container-padded">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="eyebrow justify-center">{eyebrow}</div>
          )}
          <h1 className="display-text mt-6 text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
