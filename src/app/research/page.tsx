import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { researchData } from "@/data/content";

export default function ResearchPage() {
  // This route is intentionally private while the research section is in progress.
  // Remove this guard to restore the preserved implementation below.
  notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-primary font-technical-sm text-technical-sm mb-4">
            <span className="material-symbols-outlined text-[18px]">folder_open</span>
            <span className="tracking-widest uppercase">Root / Archive / Deep-Dive_Reports</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight mb-6">
            The <span className="text-primary italic">Archive</span> of AI & <br className="hidden md:block" />Systems Research
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A high-precision documentation of AI-driven ecosystems. These reports detail the evolution of our proprietary architectures.
          </p>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Left Column */}
          <div className="md:col-span-8 space-y-12">
            {researchData.map((dossier) => (
              <article key={dossier.id} className="frosted-leaf p-8 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-technical-sm text-technical-sm text-on-surface-variant">{dossier.id}</div>
                
                {dossier.image ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden border border-white/5 relative">
                      <Image 
                        src={dossier.image} 
                        alt={dossier.title}
                        fill
                        unoptimized
                        className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-2 py-1 rounded font-technical-sm text-technical-sm border ${dossier.statusColorClass}`}>{dossier.status}</span>
                        <span className="font-technical-sm text-technical-sm text-on-surface-variant">{dossier.date}</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md mb-3 text-secondary">{dossier.title}</h3>
                      <div className="dossier-line mb-4"></div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        {dossier.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {dossier.tags.map(tag => (
                          <span key={tag} className="bg-surface-container-highest px-3 py-1 rounded-full border border-outline-variant/30 text-secondary font-label-caps text-label-caps">{tag}</span>
                        ))}
                      </div>
                      <button className="inline-flex items-center gap-2 text-primary font-label-caps text-label-caps hover:text-secondary transition-colors bioluminescent-btn">
                        {dossier.actionText || "ACCESS FULL DOSSIER"}
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-2 py-1 rounded font-technical-sm text-technical-sm border ${dossier.statusColorClass}`}>{dossier.status}</span>
                      <span className="font-technical-sm text-technical-sm text-on-surface-variant">{dossier.date}</span>
                    </div>
                    
                    <h3 className="font-headline-md text-headline-md mb-3">{dossier.title}</h3>
                    
                    <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                      {dossier.description}
                    </p>
                    
                    {dossier.stats && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {dossier.stats.map(stat => (
                          <div key={stat.label} className="bg-surface-container p-4 rounded-lg border border-white/5">
                            <div className="font-technical-sm text-technical-sm text-on-surface-variant mb-1">{stat.label}</div>
                            <div className={`font-headline-md text-headline-md ${stat.colorClass}`}>{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="h-32 bg-surface-container-lowest rounded-lg border border-outline-variant/30 relative flex items-end p-4 overflow-hidden">
                      <div className="absolute inset-0 bg-mesh opacity-20"></div>
                      <div className="flex items-end justify-between w-full h-12 gap-1 relative z-10">
                        {[40, 65, 45, 80, 60, 90, 50, 70, 45, 85].map((height, i) => (
                          <div key={i} className="bg-primary w-full transition-all duration-500 group-hover:scale-y-110 origin-bottom" style={{ height: `${height}%` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Analyst Widget */}
            <div className="frosted-leaf p-6 rounded-xl border-t-4 border-t-primary">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest">ARCHIVE ANALYST</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYU1gpKshomdsAxJFuRq7_b1AV-YtM_EXTPbYF_OCDWHcyK1_J-d0jA0XHSJBDxq4lxVtpaaEViXgZaX2lnCqR8LH_-SKX3W7V77jZ9yR1M3Hd1KJLN8ufwrv0Lzm57NXcORzPwdouC6Rc2OHEI1cF6e2E66wuZTtWFbCkt-Zk9sNngSCRAj4PoRhzxun-PEvSR7CvRpmIvJ1Ty5ugjPFjnGNKbwNfFW9auTPHZVXiHSCEH1FkwomdAVX1vyhZE7ZmhMYev5g6NAVV" 
                    alt="Dr. Elias Thorne"
                    fill
                    unoptimized
                    className="object-cover grayscale"
                  />
                  <div className="absolute bottom-1 right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <div className="font-headline-md text-headline-md">Dr. Elias Thorne</div>
                  <div className="font-technical-sm text-technical-sm text-on-surface-variant">Lead Bio-Architect</div>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic border-l-2 border-primary/30 pl-4 mb-6">
                &quot;The boundary between silicon logic and biological growth is no longer a line, but a gradient. These archives document our descent into that gradient.&quot;
              </p>
              <div className="space-y-2 font-technical-sm text-technical-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Active Sensors:</span>
                  <span>1,402</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Uptime:</span>
                  <span>12y 4m 2d</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Threat Level:</span>
                  <span className="text-error">Minimal</span>
                </div>
              </div>
            </div>

            {/* Classification Filter */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4 tracking-widest">FILTER BY CLASSIFICATION</h4>
              <ul className="space-y-3 font-technical-sm text-technical-sm">
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-on-surface group-hover:text-primary transition-colors">Bioluminescence</span>
                  <span className="text-on-surface-variant">(24)</span>
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-on-surface group-hover:text-primary transition-colors">Neural Plasticity</span>
                  <span className="text-on-surface-variant">(18)</span>
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-on-surface group-hover:text-primary transition-colors">Hardware Fusion</span>
                  <span className="text-on-surface-variant">(12)</span>
                </li>
                <li className="flex items-center justify-between group cursor-pointer">
                  <span className="text-on-surface group-hover:text-primary transition-colors">Eco-Algorithms</span>
                  <span className="text-on-surface-variant">(07)</span>
                </li>
              </ul>
            </div>

            {/* Verified Status */}
            <div className="p-6 border border-primary/20 rounded-xl bg-primary/5">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <span className="material-symbols-outlined">verified</span>
                <span className="font-label-caps text-label-caps font-bold">VERIFIED STATUS</span>
              </div>
              <p className="font-technical-sm text-technical-sm text-on-surface-variant">
                All records contained within this archive have been cryptographically signed by the Bio-Sys core. Unauthorized replication is monitored.
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
