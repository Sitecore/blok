"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const marketingContent = [
  {
    title: "Marketing in Motion",
    content: `Today’s customers expect more than ads—they want experiences. Successful brands create journeys that feel personal, relevant, and memorable. Marketing is no longer about broadcasting; it’s about building trust and delivering value at every interaction.`,
  },
  {
    title: "From Awareness to Advocacy",
    content: `Every campaign should guide customers through a seamless path—from discovery to loyalty. By combining creativity with data-driven insights, marketers can turn casual browsers into passionate brand advocates.`,
  },
  {
    title: "The Role of Technology",
    content: `Modern marketing thrives on innovation. Tools like automation, personalization engines, and AI-driven analytics empower teams to deliver smarter campaigns faster. Technology isn’t replacing creativity—it’s amplifying it.`,
  },
  {
    title: "Why It Matters",
    content: `In a crowded digital space, relevance wins. Brands that understand their audience and adapt quickly will lead the conversation. Marketing is a continuous cycle of learning, optimizing, and innovating.`,
  },
  {
    title: "Future Trends",
    content: `Expect more immersive experiences, predictive personalization, and AI-powered content strategies. The future belongs to brands that embrace change and put the customer at the center of every decision.`,
  },
  {
    title: "Content That Connects",
    content: `Great marketing starts with great content. From engaging videos to interactive experiences, every piece should educate, entertain, and inspire action. Quality content builds trust and drives conversions.`,
  },
  {
    title: "Data as Your Compass",
    content: `Analytics isn’t just numbers—it’s insight. Understanding customer behavior helps marketers craft campaigns that resonate and deliver measurable results. Data-driven decisions turn guesswork into growth.`,
  },
  {
    title: "Humanizing Digital",
    content: `Technology is powerful, but human connection is irreplaceable. Brands that combine automation with empathy will create experiences that feel authentic and meaningful.`,
  },
];

const directions = ["top", "right", "bottom", "left"] as const;

export function DrawerDirections() {
  return (
    <div className="flex gap-4">
      {directions.map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button
              variant="default"
              className="capitalize"
            >
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Unlock the Power of Digital Marketing</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 text-sm">
              {marketingContent.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-2 text-sm leading-none font-medium">
                    {item.title}
                  </h4>
                  <p className="mb-4 leading-normal">{item.content}</p>
                </div>
              ))}
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline" colorScheme="neutral">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
