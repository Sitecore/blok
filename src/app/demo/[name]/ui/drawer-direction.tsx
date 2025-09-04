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

const directions = ["top", "right", "bottom", "left"] as const;

export function DrawerDirections() {
    return (
        <div className="flex gap-4">
            {directions.map((direction) => (
                <Drawer key={direction} direction={direction}>
                    <DrawerTrigger asChild>
                        <Button variant="outline" colorScheme="neutral" className="capitalize">
                            {direction}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Move Goal</DrawerTitle>
                            <DrawerDescription>
                                Set your daily activity goal.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="overflow-y-auto px-4 text-sm">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <p key={index} className="mb-4 leading-normal">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </p>
                            ))}
                        </div>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" colorScheme="neutral">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            ))}
        </div>
    );
}