import { FeatureBlock } from "./featureBlock";

export function FeatureList() {

    return (
        <div
            className="w-[330px] flex justify-between"
        >
            <FeatureBlock feature="Send" icon="send" route="send"/>
            <FeatureBlock feature="Receive" icon="receive" route="receive"/>
            <FeatureBlock feature="Swap" icon="swap" route="swap"/>
            <FeatureBlock feature="Earn" icon="earn" route="earn"/>
        </div>
    )
}