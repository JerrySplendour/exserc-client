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
export const Dashboardlinks = [
    {
        name: "Dashboard",
        path: '/seeker',
        icon: "dashboard.png"
    },
    {
        name: "Fund wallet",
        path: "/user/wallet",
        icon: "fund_wallet.png"
    },
    {
        name: "My Jobs",
        path: '/user/jobs',
        icon: "my_jobs.png"
    },
    {
        name: "Cards and Receipts",
        path: "/user/cards-receipts",
        icon: "cards_receipts.png"
    },
    {
        name: "Transactions",
        path: "/user/transaction",
        icon: "transactions.png"
    },
    {
        name: "Notifications",
        path: "/user/notification",
        icon: "notifications.png"
    },
    {
        name: "Settings",
        path: "/user/settings",
        icon: "settings.png"
    }
]