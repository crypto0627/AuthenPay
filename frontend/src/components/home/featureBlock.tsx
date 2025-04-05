export function FeatureBlock({ feature }: {
    feature: string
}) {

    return (
        <div className="text-black flex flex-col items-center">
            <div
                className="w-[64px] h-[64px] bg-white/80 rounded-[24px]"
            >

            </div>
            <div className="text-xs py-2">
                {feature}
            </div>
        </div>
    )
}