import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import MagneticButton from "@/components/ui/MagneticButton";
import ClientAnimations from "./ClientAnimations";
import { PortableText } from "@portabletext/react";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

// Generate static params for all project slugs
export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ id: slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectBySlug(id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} - Aditya Raj`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.heroImage ? [urlForImage(project.heroImage).width(1200).height(630).url()] : [],
        },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectBySlug(id);

    if (!project) {
        notFound();
    }

    // Get next project info
    const nextProjectSlug = project.nextProject?.slug?.current;

    return (
        <main className="bg-matte-black min-h-screen text-off-white selection:bg-white/30">
            <ClientAnimations />
            {/* Navigation / Back */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="font-syne font-bold text-xl uppercase">Aditya Raj</Link>
                <Link href="/" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    ✕
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="relative w-full h-[80vh] flex flex-col justify-end p-8 md:p-20 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />

                {/* Hero Image */}
                {project.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={urlForImage(project.heroImage).width(1920).height(1080).url()}
                            alt={project.title}
                            fill
                            className="object-cover opacity-30"
                            priority
                        />
                    </div>
                )}
                {!project.heroImage && (
                    <div className="absolute inset-0 z-0 bg-neutral-900 opacity-20">
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black" />
                    </div>
                )}

                <div className="relative z-20 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6 animate-in">
                        <span className="font-mono text-xs text-white border border-white/20 px-2 py-1 rounded-full">{project.industry}</span>
                        <span className="font-mono text-xs text-white/40">{project.year}</span>
                    </div>
                    <h1 className="font-syne text-4xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tight mb-8 animate-in">
                        {project.title}
                    </h1>
                    <p className="font-inter text-lg md:text-xl text-white/60 max-w-2xl animate-in">
                        {project.description}
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <section className="max-w-7xl mx-auto px-4 md:px-20 pt-24 pb-0 md:pt-32 md:pb-0 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

                {/* Sidebar / Metadata */}
                <div className="md:col-span-4 flex flex-col gap-12 animate-in">
                    {project.client && (
                        <div>
                            <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Client</h3>
                            <p className="font-syne text-xl text-white">{project.client}</p>
                        </div>
                    )}
                    {project.platform && (
                        <div>
                            <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Platform</h3>
                            <p className="font-syne text-xl text-white">{project.platform}</p>
                        </div>
                    )}
                    {project.deliverables && (
                        <div>
                            <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Deliverables</h3>
                            <ul className="flex flex-col gap-2">
                                {project.deliverables.map((item, i) => (
                                    <li key={i} className="font-syne text-off-white/80">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {project.techStack && (
                        <div>
                            <h3 className="font-inter text-xs text-white/30 uppercase tracking-widest mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* View Project Button */}
                    <div className="pt-4 flex flex-col gap-4">
                        {project.status === "Coming Soon" || (!project.liveLink && !project.repoLink) ? (
                            <div className="inline-flex px-6 py-3 border border-white/10 rounded-full font-inter text-xs text-white/30 uppercase tracking-widest cursor-not-allowed bg-white/5 text-center justify-center">
                                Coming Soon
                            </div>
                        ) : (
                            <>
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        <MagneticButton className="!px-8 !py-3 text-xs bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-full">
                                            View Live Project ↗
                                        </MagneticButton>
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                        <MagneticButton className="!px-8 !py-3 text-xs bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors w-full">
                                            View Code →
                                        </MagneticButton>
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 flex flex-col gap-16 animate-in">
                    {/* Demo Video */}
                    {project.demoVideo && (
                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5">
                            <iframe
                                src={project.demoVideo.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {project.problemStatement && (
                        <div className="prose prose-invert max-w-none">
                            <h3 className="font-syne text-2xl md:text-3xl font-bold mb-6 text-white">The Challenge</h3>
                            <p className="font-inter text-lg leading-relaxed text-off-white/70">{project.problemStatement}</p>
                        </div>
                    )}

                    {project.solution && (
                        <div className="prose prose-invert max-w-none">
                            <h3 className="font-syne text-2xl md:text-3xl font-bold mb-6 text-white">The Solution</h3>
                            <p className="font-inter text-lg leading-relaxed text-off-white/70">{project.solution}</p>
                        </div>
                    )}

                    {/* Key Features */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.keyFeatures.map((feature, i) => (
                                <div key={feature._key} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl mb-4 font-mono text-white/40">0{i + 1}</div>
                                    <h4 className="font-syne text-xl font-bold text-white mb-2">{feature.title}</h4>
                                    <p className="font-inter text-sm text-white/60">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Process - Portable Text */}
                    {project.process && (
                        <div className="prose prose-invert max-w-none">
                            <h3 className="font-syne text-2xl md:text-3xl font-bold mb-6 text-white">The Process</h3>
                            <div className="font-inter text-lg leading-relaxed text-white/70">
                                <PortableText value={project.process} />
                            </div>
                        </div>
                    )}

                    {project.aiArchitecture && (
                        <div className="prose prose-invert max-w-none p-8 bg-white/5 rounded-2xl border border-white/10">
                            <h3 className="font-syne text-xl md:text-2xl font-bold mb-4 text-white">AI Architecture</h3>
                            <p className="font-inter text-base leading-relaxed text-off-white/70">{project.aiArchitecture}</p>
                        </div>
                    )}

                    {/* Design System Assets */}
                    {project.designSystemAssets && (
                        <div className="w-full">
                            <h3 className="font-syne text-2xl md:text-3xl font-bold mb-8 text-white">Design System</h3>
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                                <Image
                                    src={urlForImage(project.designSystemAssets).url()}
                                    alt="Design System"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Mockups Gallery */}
                    {project.mockups && project.mockups.length > 0 && (
                        <div className="flex flex-col gap-12">
                            <h3 className="font-syne text-2xl md:text-3xl font-bold text-white">Interface Gallery</h3>
                            {project.mockups.map((mockup: any, i: number) => (
                                <figure key={i} className="flex flex-col gap-4">
                                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
                                        <Image
                                            src={urlForImage(mockup).url()}
                                            alt={mockup.caption || `Mockup ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {mockup.caption && (
                                        <figcaption className="text-center font-inter text-sm text-white/40 italic">
                                            {mockup.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Metrics */}
            {project.impactStats && project.impactStats.length > 0 && (
                <section className="border-y border-white/5 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-4 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {project.impactStats.map((metric, i) => (
                            <div key={i} className="flex flex-col text-center md:text-left">
                                <span className="font-syne text-5xl md:text-6xl font-bold text-white mb-2">{metric.value}</span>
                                <span className="font-inter text-xs text-white/40 uppercase tracking-widest">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Next Project Footer */}
            {nextProjectSlug && (
                <Link href={`/work/${nextProjectSlug}`} className="group block relative w-full py-24 md:py-32 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                        <div className="w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-105 origin-center">
                            <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60 relative z-10" />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                        <span className="font-inter text-xs text-white/50 uppercase tracking-widest mb-4">Next Project</span>
                        <h2 className="font-syne text-4xl md:text-7xl font-bold text-white group-hover:scale-110 transition-transform duration-700 uppercase tracking-tighter">
                            {project.nextProject?.title || "Next Case Study"}
                        </h2>
                    </div>
                </Link>
            )}
        </main>
    );
}
