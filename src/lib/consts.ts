import { CircleCheck, CircleEllipsis, CirclePause, CircleX, Globe, Joystick, LayoutGrid, Network, PackageOpen } from "@lucide/svelte";
import type { Component } from "svelte";

interface ProjectMetaInfo {
  status: {
    active: ProjectStatusInfo;
    developing: ProjectStatusInfo;
    paused: ProjectStatusInfo;
    deprecated: ProjectStatusInfo;
  };
  category: {
    games: ProjectCategoryInfo;
    websites: ProjectCategoryInfo;
    apps: ProjectCategoryInfo;
    services: ProjectCategoryInfo;
    other: ProjectCategoryInfo;
  };
}

interface ProjectStatusInfo {
  label: string;
  color: string;
  icon: Component;
}

interface ProjectCategoryInfo {
  name: string;
  icon: Component;
}

export const projectMeta: ProjectMetaInfo = {
  status: {
    active: { label: "Active", color: "#07AC7D", icon: CircleCheck },
    developing: { label: "In Development", color: "#1A96C3", icon: CircleEllipsis },
    paused: { label: "Paused", color: "#DD9700", icon: CirclePause },
    deprecated: { label: "Deprecated", color: "#CF1010", icon: CircleX }
  },

  category: {
    games: { name: "Games", icon: Joystick },
    websites: { name: "Websites", icon: Globe },
    apps: { name: "Apps", icon: LayoutGrid },
    services: { name: "Services", icon: Network },
    other: { name: "Other", icon: PackageOpen }
  }
};
