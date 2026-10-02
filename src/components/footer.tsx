const links = [
  { label: "writing", href: "/blog", external: false },
  { label: "github", href: "https://github.com/Martian-dev", external: true },
  { label: "x / twitter", href: "https://x.com/martian75007", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/vaibhav-p-dev", external: true },
  { label: "youtube", href: "https://www.youtube.com/@_martiandev", external: true },
  { label: "kaggle", href: "https://www.kaggle.com/martian7/code", external: true },
  {
    label: "resume",
    href: "https://drive.google.com/file/d/1w9pB3qPGOD1ds-C0W-ZpgHh6Z07nXlld/view?usp=sharing",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer
      id="links"
      className="scroll-mt-20 border-t border-outline-variant/60 bg-surface-container-lowest px-margin-mobile pb-10 pt-24 md:px-margin-desktop md:pb-12 md:pt-32"
    >
      <div className="mx-auto max-w-container-max">
        <p className="font-technical-sm text-xs lowercase tracking-[0.12em] text-primary">
          links and stuff
        </p>
        <h2 className="mt-3 max-w-4xl font-display-lg text-[clamp(2.65rem,5.5vw,5.1rem)] font-bold lowercase leading-[0.93] tracking-[-0.05em] text-on-background">
          anyway, here&apos;s the internet part.
        </h2>
        <p className="mt-6 text-base text-on-surface-variant">pick your poison.</p>

        <div className="mt-14 grid grid-cols-2 border-t border-outline-variant/60 sm:grid-cols-3 lg:grid-cols-7">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex min-h-24 items-center justify-between gap-3 border-b border-r border-outline-variant/60 px-4 text-base lowercase text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-low hover:text-primary sm:px-5"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-outline-variant/40 pt-5 font-technical-sm text-[10px] lowercase tracking-[0.08em] text-outline sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 vaibhav</p>
          <p>made with too many tabs open.</p>
        </div>
      </div>
    </footer>
  );
}
