'use strict';

import {Clock, WebGLRenderer} from "three";
import { onWindowResize } from "@js/modules/functions";
import {ENV_THREEJS, GUI_CONFIG} from "@js/constants";

export class Renderer {
    constructor() {
        let renderer = null;
    }

    static create(canvas, container = window) {
        const { innerWidth, innerHeight, devicePixelRatio } = container;

        this.renderer = new WebGLRenderer({canvas, antialias: true, alpha: true});
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor( 0x000000, 0 );
        this.renderer.powerPreference = "high-performance";
        this.renderer.physicallyCorrectLights = true;

        return this.renderer;
    }

    static setResizeListener(camera) {
        window.addEventListener( 'resize', () => {
            onWindowResize(camera, this.renderer);
        });
    }

    static animation(scene, camera, stats, controls = null) {
        const clock = new Clock();

        const render = () => {
            const { model } = ENV_THREEJS;
            const { isAnimation } = GUI_CONFIG;

            this.renderer.render(scene, camera);
            requestAnimationFrame(render);

            if (controls) controls.update()
            if (stats) stats.update();

            if (model && isAnimation) {
                const deltaTime = clock.getDelta() * 0.1;
                model.rotateX(deltaTime);
                model.rotateY(deltaTime);
                model.rotateZ(deltaTime);
            }
        }

        requestAnimationFrame(render);
    }

    static clear() {
        this.renderer.dispose();
    }
}