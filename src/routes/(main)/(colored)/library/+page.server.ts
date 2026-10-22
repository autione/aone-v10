import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

interface LastFmAPITopAlbum {
  url: string;
  mbid: string;

  name: string;
  artist: { url: string; mbid: string; name: string };

  image: { size: "small" | "medium" | "large" | "extralarge"; "#text": string }[];
  playcount: string;
  "@attr"?: { rank?: string };
}

interface SteamAPIRecentGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

type LastFmResponse =
  | { error: string }
  | {
      topalbums: {
        album: LastFmAPITopAlbum[];
      };
    };

type SteamResponse = {
  response: {
    total_count: number;
    games: SteamAPIRecentGame[];
  };
};

async function getTopAlbums() {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=AutiOne&api_key=${env.LASTFM_API_KEY}&format=json&limit=9&period=7day`
  );
  const data: LastFmResponse = await res.json();
  if ("error" in data) return { error: true };

  return data.topalbums.album.map((album) => {
    const imageOf = album.image.find((i) => i.size === "large") || album.image.at(-1);

    return {
      url: album.url,
      mbid: album.mbid,

      title: album.name,
      artist: album.artist.name,
      cover: imageOf?.["#text"] || ""
    };
  });
}

async function getRecentGames() {
  const res = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_WEBAPI_KEY}&steamid=76561198367757754&count=6`
  );
  if (res.status !== 200) return { error: true };

  const data: SteamResponse = await res.json();

  return data.response.games.map((game) => {
    const imageOf = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

    return {
      icon: imageOf,
      appId: game.appid,
      name: game.name,
      playtime: {
        recent: game.playtime_2weeks,
        total: game.playtime_forever
      }
    };
  });
}

export const load: PageServerLoad = async () => {
  return {
    topAlbums: getTopAlbums(),
    recentGames: getRecentGames()
  };
};
