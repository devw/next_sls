import { useContext, useState, useCallback } from "react";
import { ConfigurationContext } from "@contexts/Configuration/Configuration.context";

import { RangeSlider } from "@shopify/polaris";

export const RangeSliderComponent = ({ id, label, description }) => {
    const { data, update } = useContext(ConfigurationContext);
    const { stylesheet } = data?.proxy_pages || {};

    const [rangeValue, setRangeValue] = useState(stylesheet?.[id]);

    const handleRangeSliderChange = useCallback((value) => {
        setRangeValue(value);
        update(`proxy_pages.stylesheet.${id}`, value);
    }, []);
    return (
        <div style={{ width: "30%" }}>
            <RangeSlider
                label={label}
                value={rangeValue}
                min={0.1}
                max={2}
                step={0.1}
                onChange={handleRangeSliderChange}
                output
            />
        </div>
    );
};
