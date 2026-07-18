import SideMenu from "@/components/logedComponents/sideMenu";

export default function HomePage() {
    return (
        <main className="flex items-center justify-center">
            <div>
                <SideMenu />
            </div>
            <h1 className="flex items-center justify-center text-5xl">Welcome!</h1>
        </main>
    )
}