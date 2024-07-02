"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useTheme } from "next-themes";
import * as React from "react";
import { FaCheck, FaMoon, FaSun } from "react-icons/fa";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-9 px-0">
            <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="gap-2">
              {theme == "light" && <FaCheck />} Light
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <DropdownMenuItem className="gap-2" onClick={() => setTheme("dark")}>
            {theme == "dark" && <FaCheck />} Dark
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2" onClick={() => setTheme("system")}>
            {theme == "system" && <FaCheck />} System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogTitle>Enable flashbang mode?</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-1">
          <span className="">We are not responsible for any damage to your eyes.</span>
          <span className="font-bold">You have been warned.</span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setTheme("light")}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}