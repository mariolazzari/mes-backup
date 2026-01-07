import Link from "next/link";
import { Home } from "lucide-react";
import { BiMath } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/public/logo-icc.png";

// Menu items.
const items = [
  {
    title: "Produzione",
    url: "/mes",
    icon: Home,
  },
  {
    title: "Causali scarto",
    url: "/mes/scraps",
    icon: FaRegTrashCan,
  },
  {
    title: "Centri lavoro",
    url: "/mes/wc",
    icon: GrUserWorker,
  },
  {
    title: "Unità di misura",
    url: "/mes/um",
    icon: BiMath,
  },
];

export function SideBar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex justify-center py-8">
          <Image className="h-auto w-auto" src={Logo} alt="ICC logo" priority />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>MES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
