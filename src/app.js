'use strict';

import { createEnvironment } from "@js/environment";
import { getData } from "@js/modules/getData";
import { createElement } from "@js/modules/createElement";
import { rotateModel } from "@js/modules/functions";
import { ASSETS_FOLDER_NAME, DATA_FILE } from "@js/constants";

import './scss/styles.scss';

const projectInit = async () => {
    const { scene, camera, renderer } = createEnvironment();

    const { data } = await getData(`./${ASSETS_FOLDER_NAME}/${DATA_FILE}`);
    const model = createElement(data);
    // const elementsGroup = await loadElement(`${ASSETS_FOLDER_NAME}/${PROTEIN_MODEL_FILENAME}`);

    const actionGroup = rotateModel(renderer, scene, camera, model);
    scene.add(actionGroup);
    // scene.add(elementsGroup);
}

projectInit();