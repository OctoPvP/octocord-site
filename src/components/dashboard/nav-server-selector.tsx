"use client";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn, truncate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk";
import { api } from "@/trpc/react";
import { type Guild } from "@/types/guild";
import { ScrollArea } from "@/components/ui/scroll-area";

const NavServerSelector = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const servers = api.guilds.getGuilds.useQuery();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value && servers.data
            ? truncate(servers.data?.[value]?.name ?? value, 20)
            : "Select server..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const name = servers.data?.[value]?.name ?? value
            console.log(name, search)
            return name.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}>
          <CommandInput placeholder="Search servers..." />
          <CommandEmpty>No servers found.</CommandEmpty>
          <CommandList className="bg-transparent">
            <ScrollArea className="h-[30vh] w-[350px] rounded-md border">
              {servers.data && Object.values(servers.data).map((server: Guild) => (
                <CommandItem
                  key={server.id}
                  value={server.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="hover:cursor-pointer truncate"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === server.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {truncate(server.name, 20)}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default NavServerSelector;
