import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sitecoreContent = [
  {
    title: "Sitecore: A Legacy of Innovation",
    content: `Since its founding in 2001, Sitecore has been at the forefront of digital experience management. What started as a CMS has evolved into a powerful composable DXP, enabling brands to deliver personalized, omnichannel experiences at scale.`,
  },
  {
    title: "Our Vision",
    content: `Sitecore's mission is simple: empower marketers and developers to create connected experiences that inspire loyalty and drive growth. With a focus on flexibility, scalability, and AI-driven personalization, we help businesses stay ahead in a rapidly changing digital landscape.`,
  },
  {
    title: "Marketing Meets Technology",
    content: `Modern marketing is about more than campaigns—it's about creating journeys. Sitecore combines content, commerce, and data into a unified platform, giving brands the tools to engage customers with relevance and precision.`,
  },
  {
    title: "Why It Matters",
    content: `Personalization isn't a trend—it's an expectation. Sitecore enables marketers to deliver the right message at the right time, turning interactions into lasting relationships.`,
  },
  {
    title: "Continuous Innovation",
    content: `From headless architecture to AI-powered content delivery, Sitecore continues to push boundaries. Our vision is to make digital experiences smarter, faster, and more human.`,
  },
  {
    title: "Future-Ready Experiences",
    content: `The future of marketing is composable. Sitecore's cloud-native solutions allow businesses to adapt quickly, integrate seamlessly, and innovate without limits. This flexibility ensures brands can respond to market changes and customer needs in real time.`,
  },
  {
    title: "AI and Automation at Scale",
    content: `Artificial intelligence is transforming marketing. Sitecore leverages AI to automate personalization, predict customer behavior, and optimize content delivery—helping brands achieve efficiency without sacrificing creativity.`,
  },
  {
    title: "Global Community and Support",
    content: `With thousands of partners and developers worldwide, Sitecore fosters a vibrant ecosystem. Our community drives innovation, shares best practices, and ensures customers have the resources they need to succeed.`,
  },
];

export function SheetDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Sheet</h2>
    <div className="flex w-full max-w-full gap-4">
      <div id="sheet-default">
        <div className="flex flex-col gap-6 md:flex-row">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default">Open</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-name">Name</Label>
                  <Input id="sheet-demo-name" defaultValue="Liz" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="sheet-demo-username">Username</Label>
                  <Input id="sheet-demo-username" defaultValue="@liz" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" colorScheme="neutral">Close</Button>
                </SheetClose>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>  

      {/* Top Sheet */}
      <div id="sheet-top">
        <Sheet key="top">
          <SheetTrigger asChild>
            <Button variant="default" className="capitalize">
              top
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Empowering Brands Through Digital Experience</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-4 text-sm">
              {sitecoreContent.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 text-sm leading-none font-medium">
                    {item.title}
                  </h4>
                  <p className="mb-4 leading-normal">{item.content}</p>
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Sheet */}
      <div id="sheet-bottom">
        <Sheet key="bottom">
          <SheetTrigger asChild>
            <Button variant="default" className="capitalize">
              bottom
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Empowering Brands Through Digital Experience</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-4 text-sm">
              {sitecoreContent.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 text-sm leading-none font-medium">
                    {item.title}
                  </h4>
                  <p className="mb-4 leading-normal">{item.content}</p>
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Left Sheet */}
      <div id="sheet-left">
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant="default" className="capitalize">
              left
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Empowering Brands Through Digital Experience</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-4 text-sm">
              {sitecoreContent.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 text-sm leading-none font-medium">
                    {item.title}
                  </h4>
                  <p className="mb-4 leading-normal">{item.content}</p>
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right Sheet */}
      <div id="sheet-right">
        <Sheet key="right">
          <SheetTrigger asChild>
            <Button variant="default" className="capitalize">
              right
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Empowering Brands Through Digital Experience</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-4 text-sm">
              {sitecoreContent.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 text-sm leading-none font-medium">
                    {item.title}
                  </h4>
                  <p className="mb-4 leading-normal">{item.content}</p>
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
    </div>
  );
}