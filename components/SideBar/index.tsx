import Link from "next/link";
import { Home } from "lucide-react";
import { BiMath } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
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
    title: "Unità di misura",
    url: "/mes/um",
    icon: BiMath,
  },
];

export function SideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex justify-center p-8">
          <Image
            src="/logo-icc.png"
            width={100}
            height={100}
            alt="ICC logo"
            priority
          />
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
