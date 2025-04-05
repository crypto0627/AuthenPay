import { FeatureBlock } from "./featureBlock";

export function FeatureList() {

    return (
        <div
            className="w-[330px] flex justify-between"
        >
            <FeatureBlock feature="Send" icon="send" />
            <FeatureBlock feature="Receive" icon="receive" />
            <FeatureBlock feature="Swap" icon="swap" />
            <FeatureBlock feature="Earn" icon="earn" />
        </div>
    )
}