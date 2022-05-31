'use strict';

import { WebGLRenderer } from "three";
import { onWindowResize } from "@js/modules/functions";

export class Renderer {
    constructor() {
        let renderer = null;
    }

    static create = (canvas, container = window) => {
        const { innerWidth, innerHeight, devicePixelRatio } = container;

        this.renderer = new WebGLRenderer({canvas, antialias: true, alpha: true});
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor( 0x000000, 0 );

        return this.renderer;
    }

    static setResizeListener = (camera) => {
        window.addEventListener( 'resize', () => {
            onWindowResize(camera, this.renderer);
        });
    }

    static animation = (scene, camera, stats, controls = null) => {

        const render = () => {
            this.renderer.render(scene, camera);
            requestAnimationFrame(render);

            if (controls) controls.update()
            if (stats) stats.update();
        }

        requestAnimationFrame(render);
    }
}