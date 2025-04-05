"use client"
import { FeatureIcon } from "./featureIcon";
import { useRouter } from 'next/navigation'

export function FeatureBlock({ feature, icon, route }: {
    feature: string,
    icon: string,
    route: string,
}) {
    
    const router = useRouter();

    return (
        <div 
            className="text-black flex flex-col items-center"
            onClick={() => {
                router.push(`/${route}`);
            }}
        >
            <div
                className="w-[64px] h-[64px] bg-white/80 rounded-[24px] flex items-center justify-center"
            >
                <FeatureIcon icon={icon} />
            </div>
            <div className="text-xs py-2">
                {feature}
            </div>
        </div>
    )
}