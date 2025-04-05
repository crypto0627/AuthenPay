import { FeatureBlock } from "./featureBlock";

export function FeatureList() {

    return (
        <div
            className="w-[330px] flex justify-between"
        >
            <FeatureBlock feature="Send"/>
            <FeatureBlock feature="Receive"/>
            <FeatureBlock feature="Swap"/>
            <FeatureBlock feature="Earn"/>
        </div>
    )
}