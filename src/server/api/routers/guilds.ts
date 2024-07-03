import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import type { Guild } from "@/types/guild";
import { TRPCError } from "@trpc/server";

export const guildsRouter = createTRPCRouter({
  getGuilds: protectedProcedure.query(async ({ ctx, input }) => {
    const { accessToken, refreshToken } = ctx.session.user.discord;
    console.log(ctx.session);
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
    guilds.forEach(guild => {
      // permissions_new is 64 bits
      // https://discord.com/developers/docs/topics/permissions
      const permissions = BigInt(guild.permissions_new);
      const hasManageServer = (permissions & BigInt(0x20)) === BigInt(0x20);
      if (hasManageServer) {
        hasPermission.push(guild);
      }
    });
    // sort by owner first then name
    hasPermission.sort((a, b) => {
      if (a.owner && !b.owner) {
        return -1;
      }
      if (!a.owner && b.owner) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    return hasPermission;
  }),
});