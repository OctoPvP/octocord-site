import { get, set } from "@/lib/redis";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import type { Guild } from "@/types/guild";
import { TRPCError } from "@trpc/server";
import { waitUntil } from "@vercel/functions";

export const guildsRouter = createTRPCRouter({
  getGuilds: protectedProcedure.query(async ({ ctx, input }) => {
    // TODO: cache this!
    const { accessToken, id } = ctx.session.user.discord;
    type GuildRecord =  Record<string, Guild>;
    const cached = await get<GuildRecord>(`guilds:${id}`);
    if (cached) {
      return cached;
    }
    const resp = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!resp.ok) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch guilds"});
    }
    const guilds = await resp.json() as Guild[];
    const hasPermission: Guild[] = [];
    // (permissions & 0x20) === 0x20 // manage server
    // 0x08 // administrator
    guilds.forEach(guild => {
      // permissions_new is 64 bits
      // https://discord.com/developers/docs/topics/permissions
      const permissions = BigInt(guild.permissions_new);
      const hasManageServer = (permissions & BigInt(0x08)) === BigInt(0x08);
      if (hasManageServer) {
        hasPermission.push(guild);
      }
    });
    // show owner guilds first
    hasPermission.sort((a, b) => {
      if (a.owner) return -1;
      if (b.owner) return 1;
      return a.name.localeCompare(b.name);
    });
    const map: GuildRecord = {};
    hasPermission.forEach(guild => {
      map[guild.id] = guild;
    });
    waitUntil(set(`guilds:${id}`, map, { ttl: 128 }))
    return map;
  }),
});