import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const links = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "About",
        path: "#"
    },
    {
        name: "Service List",
        path: '#'
    },
    {
        name: "Blog",
        path: "#"
    },
    {
        name: "Contact",
        path: "#"
    }
]