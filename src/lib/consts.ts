import { CircleCheck, CircleEllipsis, CirclePause, CircleX, Globe, Joystick, LayoutGrid, Network, PackageOpen } from "@lucide/svelte";
import type { Component } from "svelte";

interface ProjectMetaInfo {
  status: { [key: string]: ProjectStatusInfo };
  category: { [key: string]: ProjectCategoryInfo };
}

interface ProjectStatusInfo {
  label: string;
  color: string;
  icon: Component;
}

interface ProjectCategoryInfo {
  name: string;
  icon: Component;
  order: number;
}

export const projectMeta: ProjectMetaInfo = {
  status: {
    active: { label: "Active", color: "#07AC7D", icon: CircleCheck },
    developing: { label: "In Development", color: "#1A96C3", icon: CircleEllipsis },
    paused: { label: "Paused", color: "#DD9700", icon: CirclePause },
    deprecated: { label: "Deprecated", color: "#CF1010", icon: CircleX }
  },

  category: {
    games: { name: "Games", icon: Joystick, order: 1 },
    websites: { name: "Websites", icon: Globe, order: 2 },
    apps: { name: "Apps", icon: LayoutGrid, order: 3 },
    services: { name: "Services", icon: Network, order: 4 },
    other: { name: "Other", icon: PackageOpen, order: 5 }
  }
};
