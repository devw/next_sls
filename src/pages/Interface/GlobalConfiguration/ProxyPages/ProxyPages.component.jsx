import { ColorPickerComponent } from "./ColorPicker.component";
import { RangeSliderComponent } from "./RangeSlider.component";
// import styles from './EmailNotifications.module.css'

export default function EmailNotifications() {
    return (
        <div
            style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                alignContent: "space-between",
                margin: "10px 0px",
            }}
        >
            <ColorPickerComponent
                id="color-primary"
                label="Primary Color"
                description="Primary Color"
            />
            <ColorPickerComponent
                id="color-secondary"
                label="Secondary Color"
                description="Primary Color"
            />
            <ColorPickerComponent
                id="bg-action"
                label="Button Background"
                description="Primary Color"
            />
            <RangeSliderComponent
                id="font-size-primary"
                label="Primary Font-Size"
                description=""
            />
            <RangeSliderComponent
                id="font-size-secondary"
                label="Secondary Font-Size"
                description=""
            />
            <RangeSliderComponent
                id="font-size-button"
                label="Button Font-Size"
                description=""
            />
        </div>
    );
}
