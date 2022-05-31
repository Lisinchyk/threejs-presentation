'use strict';

import { createLights } from "./modules/createLights";
import { Renderer } from "./modules/createRender";
import { Camera } from "./modules/createCamera";
import { createScene } from "@js/modules/createScene";
import {statsHelper} from "@js/helpers/stats-helper";
import {Controls} from "@js/modules/addOrbitControls";
import {guiHelper} from "@js/helpers/gui-helper";

export const createEnvironment = () => {
    const canvas = document.getElementById('canvas');
    const scene = createScene();
    const camera = Camera.perspective();
    const stats = statsHelper();
    const lights = createLights();

    const controls = Controls.create(camera, canvas);
    Controls.setup();

    const renderer = Renderer.create(canvas);
    Renderer.setResizeListener(camera);
    Renderer.animation(scene, camera, stats, controls);

    lights.forEach(light => scene.add(light));

    return {
        canvas,
        scene,
        camera,
        renderer,
        lights,
        controls,
        stats,
    };
}