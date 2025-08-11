// 'use client'

// import CommandSnippet from '@/components/ui/commandSnippet';
// import SandboxDemo from '@/components/ui/shadcn-io/sandboxDemo/sandboxDemo';

// import dynamic from 'next/dynamic';

// const ComponentSandbox = dynamic(() => import('@/components/ui/shadcn-io/componentSandbox'), {
//   ssr: false,
// });

// const commands = [
//     {
//         label: 'npm',
//         code: 'npx next-forge@latest init',
//     },
//     {
//         label: 'yarn',
//         code: 'yarn dlx next-forge@latest init',
//     },
//     {
//         label: 'pnpm',
//         code: 'pnpx next-forge@latest init',
//     },
//     {
//         label: 'bun',
//         code: 'bunx next-forge@latest init',
//     },
// ];

// const ComponentsPage = () => {

//     return (
//         <div className="flex w-full flex-row bg-secondary min-h-screen">

//             <div className='flex flex-col w-[70%] gap-4 p-4'>
//                 <h1 className='text-5xl font-semibold text-foreground'>Button</h1>
//                 <p className='text-lg text-muted-foreground'>Displays a button or a component that looks like a button.</p>
//                 <h2 className='text-3xl text-foreground font-semibold'>Installation</h2>

//                 <CommandSnippet commands={commands} />

//                 <div><ComponentSandbox /></div>
//                 <SandboxDemo/>

//             </div>

//         </div>


//     )
// }

// export default ComponentsPage




import { HeroSection } from "@/components/heroSection";
import ComponentsBox from "@/components/ui/componentsBox";
import componentsData from "lib/componentsData.json";

export default function Page() {
  // Convert object to array
  const dataArray = Object.values(componentsData);

  // Step 1: Sort alphabetically
  const sortedData = [...dataArray].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Step 2: Group by first letter
  const groupedData: Record<string, typeof sortedData> = {};
  sortedData.forEach((component) => {
    const firstLetter = component.name[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(component);
  });

  return (
    <div>
      <HeroSection
        title="Components"
        description="Here you can find all the components available in the library. The library contains a series of components from Blok v1, and new developments we have added from Shadcn, and some new components of our own. We strive to continue to update our library."
      />

      <div className="mt-15 min-h-screen w-full bg-secondary md:mt-10">
        <div className="mx-6 md:mx-12 lg:mx-60 pt-4 md:pt-8 lg:pt-15">
          <div className="space-y-10">
            {Object.entries(groupedData).map(([letter, components]) => (
              <div key={letter}>
                <h2 className="text-3xl md:text-4xl font-semibold pb-4 text-foreground">
                  {letter}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
                  {components.map((component) => (
                    <ComponentsBox
                      key={component.name}
                      name={component.name}
                      imageSrc={component.imageSrc || "/default.png"}
                      href={`/components/${component.name}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
