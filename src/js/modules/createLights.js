'use strict';

import { AmbientLight, DirectionalLight } from "three";

export const createLights = () => {
    const lightAmbient = new AmbientLight(0xffffff, 0.5);
    const dirLight = new DirectionalLight(0xffffff, 0.5);
    lightAmbient.name = 'lightAmbient';
    dirLight.name = 'dirLight';

    dirLight.position.set(4, 4, 5);

    return [dirLight, lightAmbient];
}