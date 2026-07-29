import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

interface LastFmAPITrack {
  url: string;
  mbid: string;
  streamable: string;

  name: string;
  album: { mbid: string; "#text": string };
  artist: { mbid: string; "#text": string };

  image: { size: "small" | "medium" | "large" | "extralarge"; "#text": string }[];
  date?: { uts: string; "#text": string };
  "@attr"?: { nowplaying?: "true" };
}

type LastFmResponse =
  | { error: string }
  | {
      recenttracks: {
        track: LastFmAPITrack[];
      };
    };

async function getLastFm() {
  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=AutiOne&api_key=${env.LASTFM_API_KEY}&format=json&limited=1`);
  const data: LastFmResponse = await res.json();
  if ("error" in data) return { error: true };

  const track = data.recenttracks.track[0];
  const imageOf = track.image.find((i) => i.size === "medium") || track.image.at(-1);

  return {
    url: track.url,

    title: track.name,
    artist: track.artist["#text"],
    album: track.album["#text"],
    cover: imageOf?.["#text"] || "",

    nowPlaying: track["@attr"]?.nowplaying != undefined,
    timestamp: track.date ? Number(track.date.uts) : undefined
  };
}

interface DiscordWidgetResponse {
  id: string;
  name: string;
  channels: { id: string; name: string; position: number }[];
  members: { id: string; username: string; status: "online" | "idle" | "dnd"; avatar_url: string }[];
  presence_count: number;
}

async function getDiscord() {
  const res = await fetch("https://discord.com/api/guilds/1032370273099460648/widget.json");
  const data: DiscordWidgetResponse = await res.json();

  if (data.members.length <= 0) return { status: "offline" };
  const member = data.members[0];

  return {
    name: member.username,
    avatar: member.avatar_url,
    status: member.status
  };
}

interface SteamAPIPlayer {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  gameextrainfo?: string;
  gameid?: string;
  loccountrycode: string;
  locstatecode: string;
}

interface SteamSummaryResponse {
  response: {
    players: SteamAPIPlayer[];
  };
}

async function getSteam() {
  const res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_WEBAPI_KEY}&steamids=76561198367757754`);
  const data: SteamSummaryResponse = await res.json();

  const player = data.response.players[0];
  let status = ["offline", "steamOnline", "steamBusy", "steamIdle"][player.personastate] || "offline";

  const inGame = player.gameid && player.gameextrainfo;
  if (inGame) status = "steamPlaying";

  return {
    name: player.personaname,
    avatar: player.avatarmedium,

    status,
    lastSeen: status === "offline" ? player.lastlogoff : undefined,

    game: inGame
      ? {
          appId: player.gameid,
          name: player.gameextrainfo
        }
      : undefined
  };
}

interface RobloxPresenceResponse {
  userPresences: {
    userPresenceType: 0 | 1 | 2 | 3;
    lastLocation: string;
    placeId: number | null;
    rootPlaceId: number | null;
    gameId: string | null;
    universeId: number | null;
    userId: number;
  }[];
}

interface RobloxThumbnailResponse {
  data: {
    targetId: number;
    state: string;
    imageUrl?: string;
    version?: string;
  }[];
}

async function getRoblox() {
  const res = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    headers: [
      ["content-type", "application/json"],
      ["accept", "application/json"]
    ],
    body: JSON.stringify({ userIds: [158742431] })
  });

  const data: RobloxPresenceResponse = await res.json();
  const presence = data.userPresences[0];

  const status = ["offline", "robloxOnline", "robloxPlaying", "robloxStudio"][presence.userPresenceType];

  let launchUri: string | undefined = undefined;
  if (status === "robloxPlaying") {
    launchUri = `roblox://experiences/start?placeId=${presence.placeId}`;
    if (presence.gameId) launchUri += `&gameInstanceId=${presence.gameId}`;
  }

  const picRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${presence.userId}&format=Png&size=60x60`);
  const picData: RobloxThumbnailResponse = await picRes.json();

  return {
    status,
    launchUri,
    avatar: picData?.data?.[0].imageUrl,
    lastLocation: presence.lastLocation
  };
}

export const load: PageServerLoad = async () => {
  await new Promise((r) => setTimeout(r, 1000));

  return {
    lastfm: await getLastFm(),
    discord: await getDiscord(),
    steam: await getSteam(),
    roblox: await getRoblox()
  };
};
