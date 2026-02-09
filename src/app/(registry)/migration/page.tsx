import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const MIGRATION_AREAS = [
  {
    title: 'Components',
    items: [
      'Chakra components must be replaced with their Blok (shadcn-based) equivalents.',
      'Custom Chakra components often require full rewrites.',
      'Interaction patterns may need adjustments due to differences in event handling and accessibility primitives.',
    ]
  },
  {
    title: 'Styling & Layout',
    items: [
      'All Chakra props must be translated into Tailwind classes.',
      'Layout primitives (Stack, Flex, Grid) require structural changes.',
      'Global spacing, border radius, typography, and color decisions must be re‑evaluated.',
    ]
  },
  {
    title: 'Theming',
    items: [
      'Chakra’s theme configuration does NOT map 1:1 to Tailwind.',
      'Theming must be recreated using Tailwind tokens and CSS variables.',
      'Any custom theme tokens must be reviewed and re‑implemented.',
    ]
  },
  {
    title: 'Design Tokens',
    items: [
      'Chakra token names differ from Blok’s token architecture.',
      'Teams must align tokens with Blok’s official scales.',
    ]
  },
  {
    title: 'Component Distribution',
    items: [
      'Instead of importing packages, components are installed from Blok’s registry.',
      'Teams must adjust to owning their component source code.',
    ]
  },
  {
    title: 'Accessibility',
    items: [
      'shadcn/ui provides primitives closer to native behavior.',
      'Teams must validate focus states, keyboard flows, and ARIA rules.',
    ]
  }
]

const MIGRATION_PATHS = [
  {
    title: 'Step 1 — Component Inventory',
    description: 'Identify:',
    steps: [
      'all Chakra components used',
      'custom Chakra components',
      'theme extensions',
      'design system overrides',
    ]
  },
  {
    title: 'Step 2 — Map to Blok Equivalents',
    description: 'Use Blok docs to find:',
    steps: [
      'matching components',
      'gaps requiring new component creation',
    ]
  },
  {
    title: 'Step 3 — Introduce Tailwind',
    steps: [
      'Add Tailwind config and Blok base styles',
      'Install required components via the registry',
    ]
  },
  {
    title: 'Step 4 — Rebuild Components & Screens',
    description: 'Rebuild feature by feature:',
    steps: [
      'replace Chakra components',
      'rewrite custom components using shadcn patterns',
      'apply Tailwind classes',
    ]
  },
  {
    title: 'Step 5 — Recreate Theme & Tokens',
    steps: [
      'Convert Chakra theme tokens into Tailwind equivalents',
      'Remove Chakra-specific theme logic',
    ]
  },
  {
    title: 'Step 6 — Validate & Test Thoroughly',
    steps: [
      'accessibility',
      'responsive behavior',
      'component interactions',
      'visual consistency',
    ]
  }
]

const FAQ = [
  {
    question: 'Can we migrate gradually?',
    answer: 'Yes, but only short‑term. Chakra + Tailwind together increase complexity and risk inconsistencies.',
  },
  {
    question: 'Are Chakra components compatible with Blok?',
    answer: 'No. They must be replaced with Tailwind/shadcn equivalents.',
  },
  {
    question: 'Can we reuse our Chakra theme?',
    answer: 'Not directly. Tokens and theming approaches differ fundamentally.',
  },
  {
    question: 'Is shadcn/ui harder to maintain?',
    answer: 'No. You fully own the component source, making long‑term extension easier.',
  },
  {
    question: 'How do we get Blok components now?',
    answer: 'All components are sourced via the Blok registry (JSON endpoints).',
  },
  {
    question: 'Will the FAQ expand over time?',
    answer: 'Yes. New questions will be added based on internal and external feedback, including teams who complete early migrations.',
  }
]

export default function MigrationPage() {
  return (
    <main className="w-full">
      <div className="px-4 sm:px-8 md:px-32 max-w-[1250px] mx-auto">
        <div className="flex flex-col space-y-5 p-5 md:p-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources">Resources</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Migrations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-semibold text-4xl md:text-4xl mt-10">
            Migration Guide: From Chakra-based Blok to Tailwind + shadcn Blok
          </h1>

          <p className="d w-full ">
            This guide provides a <span className="font-medium">comprehensive, end‑to‑end explanation </span>
            of how to migrate from the legacy Chakra‑based Blok Design System to the new
            <span className="font-medium"> Tailwind CSS + shadcn/ui–based Blok</span>. Because the
            underlying technologies, patterns, and component architecture have fundamentally changed, this
            document outlines everything teams need to understand before and during migration.
          </p>
          <p className="mt-2">
            This page is meant to serve as the authoritative migration reference for Sitecore teams,
            partners, and external developers.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-32 max-w-[1250px] mx-auto">
        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Understanding the Technology Shift
          </h2>

          <h3 className="mt-4 font-semibold text-2xl md:text-3xl">
            Why the Migration Matters
          </h3>

          <p>
            The new Blok introduces major foundational changes:
          </p>
          <ul className="list-disc list-inside space-y-2 ">
            <li>Chakra UI → shadcn/ui (source‑owned components instead of library abstraction)</li>
            <li>Style props → Tailwind utility classes</li>
            <li>Old theming system → CSS variables + Tailwind tokens</li>
            <li>Package-based components → registry-based component sourcing</li>
          </ul>
          <p className="mt-2">
            These changes impact how components are written, extended, themed, tested, and maintained.
          </p>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl  md:text-4xl">Migration Areas You Must Address</h2>
          <p>
            A successful migration requires work in several areas:
          </p>

          {MIGRATION_AREAS.map((area) => (
            <div className="mt-4" key={area.title}>
              <h3 className="font-semibold text-2xl md:text-3xl">{area.title}</h3>
              <ul className="mt-3 list-disc list-inside space-y-2 ">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <h3 className="mt-4 font-semibold text-2xl md:text-3xl">
            Coexistence Strategy (If Needed)
          </h3>
          <p>Chakra and Tailwind can temporarily coexist but cause complexity:</p>
          <ul className="list-disc list-inside space-y-2 ml-6">
            <li>conflicting resets</li>
            <li>duplicated components</li>
            <li>mixed styling patterns</li>
          </ul>

          <p className="mt-2">Full migration is recommended.</p>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl  md:text-4xl">Recommended Migration Path</h2>

          {MIGRATION_PATHS.map((path) => (
            <div key={path.title}>
              <h3 className="mt-4 font-semibold text-2xl md:text-3xl">
                {path.title}
              </h3>
              <p className="mt-3">{path.description}</p>
              <ul className="mt-3 list-disc list-inside space-y-2 ml-6">
                {path.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl  md:text-4xl">Best Practices for Teams</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not try to recreate the Chakra look and feel.</li>
            <li>Follow Blok’s updated design language and spacing system.</li>
            <li>Align everything with official tokens.</li>
            <li>Use the registry for consistent component sourcing.</li>
            <li>Document internal patterns (e.g., modifiers, variants).</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl  md:text-4xl">FAQ (Initial Version)</h2>
          <Accordion type="single" collapsible>
            {FAQ.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-10 md:px-10">
          <h2 className="font-semibold text-3xl  md:text-4xl">Future Additions</h2>
          <p>This page will evolve with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>deeper migration examples</li>
            <li>team-specific migration playbooks</li>
            <li>troubleshooting guides</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
