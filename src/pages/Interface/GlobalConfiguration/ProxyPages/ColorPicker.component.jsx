import { useContext, useState } from "react";
import { ConfigurationContext } from "@contexts/Configuration/Configuration.context";

import {
    Button,
    Popover,
    ColorPicker,
    Stack,
    hsbToRgb,
    rgbString,
    rgbToHsb,
} from "@shopify/polaris";

export const ColorPickerComponent = ({ id, label, description }) => {
    const { data, update } = useContext(ConfigurationContext);
    const value = data?.proxy_pages?.stylesheet?.[id] || "rgba(193, 66, 66, 1)"

    const regExp = /[^\d*.?\d*,]/g;
    const [red, green, blue, alpha] = value
        .replace(regExp, "")
        .split(",")
        .map((e) => Number(e));
    const hsba = { ...rgbToHsb({ red, green, blue }), ...alpha };

    const [color, setColor] = useState(hsba);

    const [popoverActive, setPopoverActive] = useState(false);

    const rgbaColor = rgbString(hsbToRgb(color));

    const handleColorChange = (color) => {
        setColor(color);
        console.log({ id, rgbaColor });
        update(`proxy_pages.stylesheet.${id}`, rgbaColor);
    };

    const handlePopoverClose = () => setPopoverActive(false);
    const handlePopoverOpen = () => setPopoverActive(true);

    const activator = (
        <Button onClick={handlePopoverOpen}>
            <Stack alignment="center" spacing="tight">
                <div
                    style={{
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "0.3rem",
                        background: rgbaColor,
                    }}
                />
                <p>{label}</p>
            </Stack>
        </Button>
    );

    return (
        <Popover
            active={popoverActive}
            activator={activator}
            onClose={handlePopoverClose}
        >
            <Popover.Section>
                <ColorPicker
                    onChange={handleColorChange}
                    color={color}
                    allowAlpha
                />
            </Popover.Section>
        </Popover>
    );
};
