export interface FriendEntry {
  id: string;

  name: string;
  pronouns: string;
  description: string;

  tags: string[];
  links: FriendLink[];

  year: number;
}

interface FriendLink {
  label?: string;
  icon: string;
  path: string;
}

const fellows: FriendEntry[] = [
  {
    id: "atlasoceanico",

    name: "Atlas Oceânico",
    pronouns: "he/him",
    description: "Voice actor & DELTARUNE enjoyer.",

    tags: ["dubbing", "philosophy", `<span style="color: #FF94A1">mai</span><span style="color: #FFD055">oral</span>`],
    links: [{ icon: "tiktok", path: "https://tiktok.com/@atlas.oceanico" }],

    year: 2025
  },

  {
    id: "birbohex",

    name: "birbohex",
    pronouns: "they/she",
    description: "doom gloom & dysphoria r my friends.",

    tags: ["music", "writing", "art"],
    links: [{ icon: "globe", path: "https://birbohex.com/" }],

    year: 2024
  },

  {
    id: "clovereta",

    name: "Clovereta",
    pronouns: "she/they",
    description: "Silly kitty from space, meowwwwwwwwwww!!",

    tags: ["v-tuber", "singer", "dubbing"],
    links: [
      { icon: "youtube", path: "https://www.youtube.com/@Clovereta" },
      { icon: "tiktok", path: "https://www.tiktok.com/@clovereta" },
      { icon: "twitter", path: "https://twitter.com/CloverDreemurr" }
    ],

    year: 2026
  },

  {
    id: "djrobot",

    name: "Dj",
    pronouns: "she/they",
    description: "Dumbass robot. Will always answer the call. Always.",

    tags: ["games", "music", "streams"],
    links: [
      { icon: "bluesky", path: "https://bsky.app/profile/djrobot.bsky.social" },
      { icon: "twitch", path: "https://www.twitch.tv/djrobot76" },
      { icon: "youtube", path: "https://www.youtube.com/@djrobot76" }
    ],

    year: 2024
  },

  {
    id: "gabsawa",

    name: "Gabs",
    pronouns: "he/him",
    description: "cat who likes to draw handsome guys & play video games!",

    tags: ["cookiecat", "lee", "chocolate"],
    links: [{ icon: "discord", path: "https://discord.com/users/629439037370925057" }],

    year: 2022
  },

  {
    id: "hakone",

    name: "Hakone",
    pronouns: "he/him",
    description: "I enjoy using logic, playing games and working with IT.",

    tags: ["code", "games", "IT"],
    links: [{ icon: "discord", path: "https://discord.com/users/424324357914099763" }],

    year: 2023
  },

  {
    id: "hazel",

    name: "HazelRoseraie",
    pronouns: "he/him",
    description: "TRANS RIGHTS OR DEATH ⚧",

    tags: ["plant", "artist", "anti-AI"],
    links: [
      { icon: "bluesky", path: "https://bsky.app/profile/hazelroseraie.bsky.social" },
      { icon: "globe", path: "https://artfight.net/~HazelsRoseraie" }
    ],

    year: 2024
  },

  {
    id: "kaiju",

    name: "Kaiju/Pigeon",
    pronouns: "she/it",
    description: "Making queer furry music since 2017!",

    tags: ["music", "photography"],
    links: [
      { icon: "bandcamp", path: "https://kaijuthecat.bandcamp.com/", label: "1" },
      { icon: "bandcamp", path: "https://pigeonscratch.bandcamp.com/", label: "2" }
    ],

    year: 2024
  },

  {
    id: "leoroyx",

    name: "LeoroyX",
    pronouns: "he/him",
    description: "I'm an artist and animator. Check out my work!",

    tags: ["art", "code", "green"],
    links: [
      { icon: "pixiv", path: "https://www.pixiv.net/en/users/71125829" },
      { icon: "discord", path: "https://discord.com/users/393756184794103823" },
      { icon: "twitter", path: "https://twitter.com/leoroy63" }
    ],

    year: 2022
  },

  {
    id: "luzinu",

    name: "Luzinu",
    pronouns: "he/him",
    description: "Stupid ferret that knows nothing but gachas.",

    tags: ["🧦", "art", "⭐"],
    links: [
      { icon: "globe", path: "https://luzinu.carrd.co/" },
      { icon: "twitter", path: "https://twitter.com/leoroy63" },
      { icon: "telegram", path: "https://t.me/luzinu" }
    ],

    year: 2021
  },

  {
    id: "maevekaori",

    name: "Maeve Kaori",
    pronouns: "she/her",
    description: "Boo! I'm Maeve, I draw, game and live life.",

    tags: ["art", "gamedev", "music"],
    links: [
      { icon: "twitter", path: "https://twitter.com/Maeve_Raeve_Kip" },
      { icon: "discord", path: "https://discord.com/users/340581114928168963" }
    ],

    year: 2022
  },

  {
    id: "nyahstic",

    name: "Minty Nyahstic",
    pronouns: "he/him",
    description: "i like computers, programming and source games!",

    tags: ["furry", "programmer"],
    links: [
      { icon: "globe", path: "https://nyahstic.neocities.org/" },
      { icon: "github", path: "https://github.com/Nyahstic" }
    ],

    year: 2021
  },

  {
    id: "nickyeleven",

    name: "Nicolly Eleven",
    pronouns: "she/her",
    description: "I love singing, modelling, and 3D printing (and I love yung li).",

    tags: ["3D modeller", "IT", "music"],
    links: [
      { icon: "twitch", path: "https://twitch.tv/nicollyeleven" },
      { icon: "youtube", path: "https://www.youtube.com/@Nicky_Eleven" }
    ],

    year: 2024
  },

  {
    id: "pjals",

    name: "pjals",
    pronouns: "he/any",
    description: "Professional accidental Rust ragebaiter.",

    tags: ["code"],
    links: [{ icon: "steam", path: "https://steamcommunity.com/profiles/76561198587633130/" }],

    year: 2020
  },

  {
    id: "tuturaines",

    name: "Tutu Raines",
    pronouns: "she/her",
    description: "Hyperfixated in producing forms of art.",

    tags: ["music", `<a href="/tutu" style="text-decoration: none; color: inherit;" class="raw">code</a>`, "art"],
    links: [
      { icon: "youtube", path: "https://www.youtube.com/@TutuRaines", label: "1" },
      { icon: "youtube", path: "https://www.youtube.com/@TutuMegadety", label: "2" },
      { icon: "tiktok", path: "https://www.tiktok.com/@tuturaines" }
    ],

    year: 2026
  },

  {
    id: "void",

    name: "Void",
    pronouns: "he/him",
    description: "Play VoiceBlox.",

    tags: ["gamedev", "awesome", "ugly"],
    links: [
      { icon: "roblox", path: "https://www.roblox.com/users/387140311/profile" },
      { icon: "discord", path: "https://discord.com/users/977944951885275177" }
    ],

    year: 2020
  },

  {
    id: "yancds",

    name: "Yancds",
    pronouns: "he/him",
    description: "Homem gosta PC tem xeon e quer rodar games, não só jogos.",

    tags: ["games", "jogos", "anime"],
    links: [{ icon: "twitter", path: "https://twitter.com/cds_yan" }],

    year: 2016
  },

  {
    id: "znepb",

    name: "znepb",
    pronouns: "he/they",
    description: "Roller coaster obsesse and occassional programmer.",

    tags: ["code", "awesome", "cool"],
    links: [{ icon: "globe", path: "https://znepb.me/" }],

    year: 2020
  }
];

export default fellows;
