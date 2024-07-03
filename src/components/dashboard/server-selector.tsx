"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/trpc/react";
import type { Guild } from "@/types/guild";
import Image from "next/image";

const Server = ({ guild }: { guild: Guild }) => {
  // #27272a
  const img = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  return (
    <Card className="w-[200px] hover:scale-105 transition-all hover:drop-shadow-2xl hover:border-blue-500 hover:cursor-pointer">
      <CardHeader className="flex flex-row justify-center w-full text-center">
        <span className="truncate w-full">
          {guild.name}
        </span>
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full flex flex-row justify-center">
          {guild.icon ? (
            <Image src={img} alt={guild.name} className="rounded-xl" width={128} height={128} />
          ) : (
            <div className="w-32 h-32 bg-gray-800 rounded-xl flex items-center justify-center">
              <span className="text-white">{guild.name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const ServerSelector = () => {
  const servers = api.guilds.getGuilds.useQuery();
  return (
    <div className="grid grid-rows-4 grid-flow-col gap-4 row-span-4">
      {servers.data?.map(guild => (
        <Server key={guild.id} guild={guild} />
      ))}
    </div>
  );
}
export default ServerSelector;