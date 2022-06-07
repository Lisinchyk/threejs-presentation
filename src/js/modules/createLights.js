'use strict';

import { AmbientLight, DirectionalLight } from "three";
import {MODULES_CONFIG} from "@js/constants";

export const createLights = () => {
    const { dirLight, ambientLight } = MODULES_CONFIG;

    const lightAmbient = new AmbientLight(ambientLight.color, ambientLight.intensity);
    lightAmbient.name = ambientLight.name;

    const directionLight = new DirectionalLight(dirLight.color, dirLight.intensity);
    directionLight.name = dirLight.name;
    directionLight.position.set(...Object.values(dirLight.position));

    return [directionLight, lightAmbient];
}