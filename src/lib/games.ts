export interface GameEntry {
  id: string;
  title: string;
  quote: string;
  link: {
    label: string;
    path: string;
  };
}

const games: GameEntry[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    quote: "By far, my favorite game. It has gotten me many friends, creations and knowledge!",
    link: { label: "View website", path: "https://minecraft.net/" }
  },

  {
    id: "overwatch",
    title: "Overwatch",
    quote: "A hero shooter that urgently needs an animated TV show & more Venture skins.",
    link: { label: "View website", path: "https://overwatch.blizzard.com/" }
  },

  {
    id: "fortnite",
    title: "Fortnite",
    quote: "Got back to playing because of Miku, now addicted to Festival!",
    link: { label: "View website", path: "https://fornite.com" }
  },

  {
    id: "deltarune",
    title: "DELTARUNE",
    quote: "Toby Fox made me sob, yell, laugh & everything else in between.",
    link: { label: "View website", path: "https://deltarune.com/" }
  },

  {
    id: "doors",
    title: "DOORS",
    quote: "It summoned my inner lore-seeking theorizer. Starlight my beloved.",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/6516141723/DOORS" }
  },

  {
    id: "project-afternight",
    title: "Project: Afternight",
    quote: "Cured my hatred for Roblox rhythm games, now I work on it with other lovely people!",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/13042495892/Project-Afternight" }
  },

  {
    id: "rivals",
    title: "RIVALS",
    quote: "Can't believe they went from Super Golf to this. Definitely worth it!",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/17625359962/RIVALS" }
  },

  {
    id: "nicos-nextbots",
    title: "nico's nextbots",
    quote: "Funny jumping game, with some cool stuff sprinkled in between.",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/10118559731/nicos-nextbots" }
  },

  {
    id: "marathon",
    title: "Marathon",
    quote: "Dystopian factioned robots hunting each other for trinkets!",
    link: { label: "View website", path: "https://www.marathonthegame.com/" }
  },

  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    quote: "A mature game from the franchise that was part of many childhoods.",
    link: { label: "View on Steam", path: "https://store.steampowered.com/app/3240220" }
  },

  {
    id: "vrchat",
    title: "VRChat",
    quote: "The cover image I put here should be on official marketing material.",
    link: { label: "View website", path: "https://hello.vrchat.com" }
  },

  {
    id: "party-animals",
    title: "Party Animals",
    quote: "Genuinely the best thing to play on the TV when you have friends over.",
    link: { label: "View on Steam", path: "https://store.steampowered.com/app/1260320" }
  },

  {
    id: "regretevator",
    title: "REGRETEVATOR",
    quote: "10-year-old me would've had their mind blown by the next-gen elevator'ing.",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/4972273297/Regretevator" }
  },

  {
    id: "untitled-tag-game",
    title: "Untitled Tag Game",
    quote: "Retroslop with awesome gameplay, soundtrack and story.",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/14044547200/untitled-tag-game" }
  },

  {
    id: "block-tales",
    title: "Block Tales",
    quote: "Couldn't win me with an FPS, so they went for my love of RPGs & reading!",
    link: { label: "View on Roblox", path: "https://www.roblox.com/games/16483433878/Block-Tales" }
  }
];

export default games;
