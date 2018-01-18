/**
 * User Buttons for DFRobot gamer:bit Players.
 */
//%
enum GamerBitPin {
    //% block="P1 (X button)"
    P1 = <number>DAL.MICROBIT_ID_IO_P1,
    //% block="P2 (Y button)"
    P2 = <number>DAL.MICROBIT_ID_IO_P2,
    //% block="P8 (D-PAD up)"
    P8 = <number>DAL.MICROBIT_ID_IO_P8,
    //% block="P13 (D-PAD down)"
    P13 = <number>DAL.MICROBIT_ID_IO_P13,
    //% block="P14 (D-PAD left)"
    P14 = <number>DAL.MICROBIT_ID_IO_P14,
    //% block="P15 (D-PAD right)"
    P15 = <number>DAL.MICROBIT_ID_IO_P15,
}

/**
 * Trigger Events Proposed by DFRobot gamer:bit Players.
 */
//%
enum GamerBitEvent {
    //% block="down"
    Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
    //% block="up"
    Up = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="click"
    Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
}

/**
 * Functions for DFRobot gamer:bit Players.
 */
//% weight=10 color=#DF6721 icon="\uf286" block="gamePad"
namespace gamePad {
    let PIN_INIT = 0;
    
    export enum Vibrator { 
        //% blockId="V0" block="stop"
        V0 = 0,
        //% blockId="V1" block="Vibration"
        V1 = 255,     
    }

    export enum Intensity { 
        //% blockId="I0" block="stop"
        I0 = 0,
        //% blockId="I1" block="weak"
        I1 = 100,
        //% blockId="I2" block="medium"
        I2 = 180,
        //% blockId="I3" block="strong"
        I3 = 225
    }

    export enum Led {
        //% blockId="OFF" block="off"
        OFF = 0,
        //% blockId="ON" block="on"
        ON = 1
    }


    //% shim=gamerpad::init
    function init(): void {
        return;
    }

    function PinInit(): void {
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P0, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
        PIN_INIT = 1;
        return;
    }

    /**
     * To scan a button whether be triggered : return '1' if pressed; return'0' if not.
     */
    //% weight=70
    //% blockId=gamePad_keyState block="gamerpad:bit|%button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function keyState(button: GamerBitPin): boolean {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = false;
        if (0 == pins.digitalReadPin(<number>button)) {
            num = true;
        }
        return num;
    }

    /**
     * Registers code to run when a DFRobot gamer:bit event is detected.
     */
    //% weight=60
    //% blockGap=50
    //% blockId=gamePad_onEvent block="gamerpad:bit on %button|%event"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=3
    export function onEvent(button: GamerBitPin, event: GamerBitEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        control.onEvent(<number>button, <number>event, handler); // register handler
    }

    /**
     * Vibrating motor switch.
     */
    //% weight=50
    //% blockId=gamePad_vibratorMotor block="Vibrator motor switch|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor strength setting, weak, medium, strong, stop four options.
     */
    //% weight=40
    //% blockId=gamePad_vibratorMotorIntensity block="Vibrator motor intensity|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function vibratorMotorIntensity(index: Intensity): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor speed setting, adjustable range 0~255.
     */
    //% weight=30
    //% blockGap=50
    //% blockId=gamePad_vibratorMotorSpeed block="Vibrator motor speed|%degree"
    //% degree.min=0 degree.max=255
    export function vibratorMotorSpeed(degree: number): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = degree * 4;
        pins.analogWritePin(AnalogPin.P12, <number>num);
        return;
    }

    /**
     * LED indicator light switch.
     */
    //% weight=20
    //% blockId=gamePad_led block="LED switch|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function led(index: Led): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        pins.digitalWritePin(DigitalPin.P16, <number>index);
    }
}