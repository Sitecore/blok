import Sidebar from "@/components/layout/sidebar"

export default function ComponentLayout ({ 
    children 
} : Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-1 h-full">
            <Sidebar />
            <main className="flex-1 overflow-y-auto scrollbar-hidden">
              {children}
            </main>
        </div>
    )
}