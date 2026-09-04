export interface GameEntry {
  id: string;
  title: string;
  link: {
    label: string;
    path: string;
  };
}

const games: GameEntry[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    link: { label: "View website", path: "https://minecraft.net/" }
  },

  {
    id: "overwatch",
    title: "Overwatch",
    link: { label: "View website", path: "https://overwatch.blizzard.com/" }
  },

  {
    id: "marathon",
    title: "Marathon",
    link: { label: "View website", path: "https://www.marathonthegame.com/" }
  },

  {
    id: "deltarune",
    title: "DELTARUNE",
    link: { label: "View website", path: "https://deltarune.com/" }
  },

  {
    id: "doors",
    title: "DOORS",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/6516141723/DOORS" }
  },

  {
    id: "project-afternight",
    title: "Project: Afternight",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/13042495892/Project-Afternight" }
  },

  {
    id: "rivals",
    title: "RIVALS",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/17625359962/RIVALS" }
  },

  {
    id: "nicos-nextbots",
    title: "nico's nextbots",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/10118559731/nicos-nextbots" }
  },

  {
    id: "untitled-tag-game",
    title: "Untitled Tag Game",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/14044547200/untitled-tag-game" }
  },

  {
    id: "block-tales",
    title: "Block Tales",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/16483433878/Block-Tales" }
  },

  {
    id: "regretevator",
    title: "REGRETEVATOR",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/4972273297/Regretevator" }
  }
];

export default games;
