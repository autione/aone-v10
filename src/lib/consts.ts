import { CircleCheck, CircleEllipsis, CircleEqual, CirclePause, CircleX, Globe, Joystick, LayoutGrid, Network, PackageOpen } from "@lucide/svelte";
import type { Component } from "svelte";

export const version = "10.2";

interface ProjectMetaInfo {
  status: { [key: string]: ProjectStatusInfo };
  category: { [key: string]: ProjectCategoryInfo };
}

interface ProjectStatusInfo {
  label: string;
  color: string;
  icon: Component;
  description: string;
}

interface ProjectCategoryInfo {
  name: string;
  icon: Component;
  order: number;
}

export const projectMeta: ProjectMetaInfo = {
  status: {
    active: { label: "Active", color: "#029c61", icon: CircleCheck, description: "Released project with active ongoing development" },
    supported: { label: "Supported", color: "#5e30b4", icon: CircleEqual, description: "Released project with maintenance support only" },
    developing: { label: "In Development", color: "#1a7fc3", icon: CircleEllipsis, description: "Unreleased project still under development" },
    paused: { label: "Paused", color: "#c06d00", icon: CirclePause, description: "Unreleased project currently not under development" },
    deprecated: { label: "Deprecated", color: "#cf1010", icon: CircleX, description: "Abandoned project no longer in development" }
  },

  category: {
    games: { name: "Games", icon: Joystick, order: 1 },
    websites: { name: "Websites", icon: Globe, order: 2 },
    apps: { name: "Apps", icon: LayoutGrid, order: 3 },
    services: { name: "Services", icon: Network, order: 4 },
    other: { name: "Other", icon: PackageOpen, order: 5 }
  }
};
