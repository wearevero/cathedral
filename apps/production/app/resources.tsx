"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { useEffect, useState } from "react"

const getRelativeTime = (date: Date, now: Date) => {
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
}

const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    })
}

const systems = [
    {
        id: 1,
        name: "API Gateway",
        description: "Main API routing service",
        status: "operational",
        uptime: "99.9%",
        responseTime: "45ms",
        lastChecked: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    },
    {
        id: 2,
        name: "Database Cluster",
        description: "Primary PostgreSQL cluster",
        status: "operational",
        uptime: "99.8%",
        responseTime: "12ms",
        lastChecked: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    },
    {
        id: 3,
        name: "Authentication Service",
        description: "User authentication & authorization",
        status: "degraded",
        uptime: "98.2%",
        responseTime: "120ms",
        lastChecked: new Date(Date.now() - 30 * 1000), // 30 seconds ago
    },
    {
        id: 4,
        name: "CDN Network",
        description: "Global content delivery network",
        status: "operational",
        uptime: "99.9%",
        responseTime: "8ms",
        lastChecked: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
        id: 5,
        name: "Payment Gateway",
        description: "Payment processing service",
        status: "down",
        uptime: "95.1%",
        responseTime: "N/A",
        lastChecked: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    },
    {
        id: 6,
        name: "Email Service",
        description: "Transactional email delivery",
        status: "maintenance",
        uptime: "99.5%",
        responseTime: "N/A",
        lastChecked: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    },
]

const StatusIndicator = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "operational":
                return {
                    color: "bg-green-500",
                    label: "Operational",
                    variant: "default" as const,
                    pulse: "animate-pulse",
                    dotClass: "bg-green-500 shadow-green-500/50 shadow-sm",
                }
            case "degraded":
                return {
                    color: "bg-yellow-500",
                    label: "Degraded",
                    variant: "secondary" as const,
                    pulse: "animate-pulse",
                    dotClass: "bg-yellow-500 shadow-yellow-500/50 shadow-sm",
                }
            case "down":
                return {
                    color: "bg-red-500",
                    label: "Down",
                    variant: "destructive" as const,
                    pulse: "animate-pulse",
                    dotClass: "bg-red-500 shadow-red-500/50 shadow-sm",
                }
            case "maintenance":
                return {
                    color: "bg-blue-500",
                    label: "Maintenance",
                    variant: "outline" as const,
                    pulse: "",
                    dotClass: "bg-blue-500 shadow-blue-500/50 shadow-sm",
                }
            default:
                return {
                    color: "bg-gray-500",
                    label: "Unknown",
                    variant: "secondary" as const,
                    pulse: "",
                    dotClass: "bg-gray-500",
                }
        }
    }

    const config = getStatusConfig(status)

    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.dotClass} ${config.pulse}`} />
            <Badge variant={config.variant} className="text-xs font-medium px-2 py-0.5 rounded-md">
                {config.label}
            </Badge>
        </div>
    )
}

export default function SystemStatus() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-950 dark:to-black">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <div className="relative max-w-6xl mx-auto px-4 py-16">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">System Status</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                        Real-time monitoring and health status of all our services and infrastructure
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-green-500/50 shadow-sm"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live</span>
                        </div>
                        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{formatDateTime(currentTime)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {systems.map((system) => (
                        <Card
                            key={system.id}
                            className="group hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm hover:border-gray-300/80 dark:hover:border-gray-700/80 hover:-translate-y-1"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                            {system.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm mt-2 text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {system.description}
                                        </CardDescription>
                                    </div>
                                    <StatusIndicator status={system.status} />
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                            Uptime
                                        </p>
                                        <p className="font-bold text-lg text-gray-900 dark:text-white">{system.uptime}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                            Response
                                        </p>
                                        <p className="font-bold text-lg text-gray-900 dark:text-white">{system.responseTime}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Last checked: {getRelativeTime(system.lastChecked, currentTime)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border border-green-200/60 dark:border-green-800/60 bg-green-50/80 dark:bg-green-950/30 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {systems.filter((s) => s.status === "operational").length}
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300 font-semibold">Operational</div>
                        </CardContent>
                    </Card>

                    <Card className="border border-yellow-200/60 dark:border-yellow-800/60 bg-yellow-50/80 dark:bg-yellow-950/30 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                                {systems.filter((s) => s.status === "degraded").length}
                            </div>
                            <div className="text-sm text-yellow-700 dark:text-yellow-300 font-semibold">Degraded</div>
                        </CardContent>
                    </Card>

                    <Card className="border border-red-200/60 dark:border-red-800/60 bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                                {systems.filter((s) => s.status === "down").length}
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-300 font-semibold">Down</div>
                        </CardContent>
                    </Card>

                    <Card className="border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-950/30 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {systems.filter((s) => s.status === "maintenance").length}
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold">Maintenance</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

