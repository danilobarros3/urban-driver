import LeftMenu from "./left-menu";

export default function RouteTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full bg-black">
            <LeftMenu />
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}