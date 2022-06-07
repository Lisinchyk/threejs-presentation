'use strict';

export const ASSETS_FOLDER_NAME = "assets";
export const PROTEIN_MODEL_FILENAME = "model.obj";
export const DATA_FILE = "data.json";
export const GUI_CONFIG = {
    isCubeLoaded: false,
    isInstance: false,
    isBufferGeometry: false,
    isControlsEnabled: false,
    isModelLoaded: false,
    isAnimation: false,
    amount: 0,
};
export const ENV_THREEJS = {
    scene: null,
    lights: null,
    model: null,
};

export const MODULES_CONFIG = {
    dirLight: {
        name: "dirLight",
        intensity: 1.745,
        position: {x: 4, y: 4, z: 5},
        color: 0xffffff,
    },
    ambientLight: {
        name: "ambientLight",
        intensity: 1.745,
        position: {x: 0, y: 0, z: 0},
        color: 0xffffff,
    },
};