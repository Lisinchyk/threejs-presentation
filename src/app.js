'use strict';

import { createEnvironment } from "@js/environment";
import { getData } from "@js/modules/getData";
import { createElement } from "@js/modules/createElement";
import { ASSETS_FOLDER_NAME, GUI_CONFIG, DATA_FILE, ENV_THREEJS } from "@js/constants";
import { gui } from "@js/helpers/gui-helper";
import { Controls } from "@js/modules/addOrbitControls";

import './scss/styles.scss';


const setObjects = async (props) => {
    const { data, scene } = props;

    const model = await createElement(data);

    console.log(model);

    if (model) {
        scene.add(model);
    }
}

const projectInit = async () => {
    const { scene, camera, renderer } = createEnvironment();

    const { data } = await getData(`./${ASSETS_FOLDER_NAME}/${DATA_FILE}`);

    //GUI UI panel

    const controllers = gui.addFolder("controllers");
    controllers.add(GUI_CONFIG, 'isControlsEnabled').name('Orbit controls').onChange(() => Controls.disable(GUI_CONFIG.isControlsEnabled));

    const modelFolder = gui.addFolder("model");
    modelFolder.add(GUI_CONFIG, 'isCubeLoaded').name('load cube').onChange(() => {
        GUI_CONFIG.isBufferGeometry = false;
        GUI_CONFIG.isModelLoaded = false;
        GUI_CONFIG.isInstance = false;
        setObjects({data: {data: null}, scene, camera, renderer});
    });
    modelFolder.add(GUI_CONFIG, 'isModelLoaded').name('load model').onChange(() => setObjects({data, scene, camera, renderer}));
    modelFolder.add(GUI_CONFIG, 'isInstance').name('load instance').onChange(() => {
        GUI_CONFIG.isModelLoaded = false;
        GUI_CONFIG.isCubeLoaded = false;
        GUI_CONFIG.isBufferGeometry = false;
        setObjects({data, scene, camera, renderer})
    });
    modelFolder.add(GUI_CONFIG, 'isBufferGeometry').name('bufferGeometry').onChange(() => {
        GUI_CONFIG.isInstance = false;
        GUI_CONFIG.isCubeLoaded = false;
        GUI_CONFIG.isModelLoaded = false;

        setObjects({data, scene, camera, renderer});
    });
    modelFolder.add(GUI_CONFIG, 'isAnimation').name('animation');

    const lightsFolder = gui.addFolder("Lights");
    lightsFolder.add(ENV_THREEJS.lights.ambientLight, 'intensity').name('ambient intensity').min(0).max(5);
    lightsFolder.add(ENV_THREEJS.lights.dirLight, 'intensity').name('direction intensity').min(0).max(5);


    // const elementsGroup = await loadElement(`${ASSETS_FOLDER_NAME}/${PROTEIN_MODEL_FILENAME}`);
    // scene.add(elementsGroup);
}

projectInit();