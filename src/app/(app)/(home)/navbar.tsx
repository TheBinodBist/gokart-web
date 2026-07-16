"use client";
import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black  text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/", children: "Use Mobile App" },
  { href: "/", children: "help & Support" },
];

export const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="pl-3 flex items-center">
        <span className={cn("text-4xl font-semibold", poppins.className)}>
          E-Bazar
        </span>
      </Link>
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          variant="secondary"
          className="
    relative overflow-hidden group
    border-l border-t-0 border-b-0 border-r-0
    px-12 h-full rounded-none
    bg-black text-white
    transition-all duration-500
  "
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-pink-500">
            Login
          </span>
        </Button>

        <Button
          className="
    relative overflow-hidden group
    border-l border-t-0 border-b-0 border-r-0
    px-12 h-full rounded-none
    bg-white text-pink-500
    transition-all duration-500
    hover:bg-pink-800 hover:text-black
  "
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
            Become Seller
          </span>
        </Button>
      </div>
      <NavbarSidebar
        open={isSidebarOpen}
        items={navbarItems}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}

          className="size-16 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
