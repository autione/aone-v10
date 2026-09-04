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

type LastFmResponse =
  | { error: string }
  | {
      topalbums: {
        album: LastFmAPITopAlbum[];
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

export const load: PageServerLoad = async () => {
  return {
    topAlbums: getTopAlbums()
  };
};
