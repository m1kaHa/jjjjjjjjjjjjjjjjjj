let Ultrasonic_distance = 0
let water_temperature = 0
let water_level = 0
let humidity = 0
let temperature = 0
let soil_humidity = 0
OLED.init(128, 64)
led.enable(false)
let strip = neopixel.create(DigitalPin.P4, 1, NeoPixelMode.RGB)
basic.forever(function () {
    soil_humidity = Environment.ReadSoilHumidity(AnalogPin.P1)
    temperature = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P3)
    humidity = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P3)
    water_level = Environment.ReadWaterLevel(AnalogPin.P10)
    water_temperature = Environment.Ds18b20Temp(DigitalPin.P13, Environment.ValType.DS18B20_temperature_C)
    Ultrasonic_distance = Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P15)
    OLED.clear()
    OLED.writeStringNewLine("soil_humidity:" + soil_humidity)
    OLED.writeStringNewLine("humidity:" + humidity)
    OLED.writeStringNewLine("temperature:" + temperature)
    OLED.writeStringNewLine("water_level:" + water_level)
    OLED.writeStringNewLine("water_temperature:" + water_temperature)
    if (soil_humidity < 50) {
        servos.P2.setAngle(0)
    } else {
        servos.P2.setAngle(180)
    }
    if (Ultrasonic_distance > 4 && Ultrasonic_distance < 100) {
        if (Environment.PIR(DigitalPin.P0)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
        }
    }
    basic.pause(2000)
})
