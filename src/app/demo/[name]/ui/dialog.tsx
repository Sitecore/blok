import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const marketingInspirationContent = [
  {
    title: "Marketing That Inspires Action",
    content: `Marketing is more than promotion—it’s about creating meaningful connections. Every campaign should tell a story that resonates with your audience and builds trust.`,
  },
  {
    title: "Engage, Convert, Retain",
    content: `From social media to email outreach, success comes from delivering value at every touchpoint. Personalization and consistency turn prospects into loyal customers.`,
  },
  {
    title: "Data-Driven Decisions",
    content: `Analytics unlock insights that fuel smarter strategies. Understand customer behavior, optimize campaigns, and measure impact to stay ahead in a competitive market.`,
  },
  {
    title: "Innovation Is Key",
    content: `Embrace new technologies and trends to keep your brand relevant. Marketing is a journey of continuous improvement—adapt, evolve, and lead the conversation.`,
  },
  {
    title: "Build Emotional Connections",
    content: `Great marketing speaks to emotions, not just logic. Brands that inspire feelings of trust, excitement, and belonging create loyal advocates who share their experiences.`,
  },
  {
    title: "Content That Converts",
    content: `Quality content is the backbone of modern marketing. From engaging blog posts to interactive videos, every piece should educate, entertain, and drive measurable results.`,
  },
];

export const dialog = {
  name: "dialog",
  components: {
    Default: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Liz" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="name-1" name="username" defaultValue="@liz" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" colorScheme="neutral">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    Scrollable: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Scrollable Content</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Drive Growth Through Smart Marketing</DialogTitle>
          </DialogHeader>
          <div className="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
            {marketingInspirationContent.map((item, index) => (
              <div key={index}>
                <h4 className="mb-2 text-sm leading-none font-medium">
                  {item.title}
                </h4>
                <p className="mb-4 leading-normal">{item.content}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    ),
    StickyFooter: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Sticky Footer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Drive Growth Through Smart Marketing</DialogTitle>
          </DialogHeader>
          <div className="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
            {marketingInspirationContent.map((item, index) => (
              <div key={index}>
                <h4 className="mb-2 text-sm leading-none font-medium">
                  {item.title}
                </h4>
                <p className="mb-4 leading-normal">{item.content}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" colorScheme="neutral">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
};