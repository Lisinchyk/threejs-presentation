'use strict';

import {ENV_THREEJS} from "@js/constants";

export const removeObjectsFromScene = (name) => {
    ENV_THREEJS.scene.traverse(item => {
        if(item.isGroup && item.name === name) {
            item.traverse(mesh => {
                if (mesh.isMesh) {
                    mesh.material.dispose();
                    mesh.geometry.dispose();
                }
            });

            item.clear();
            item.removeFromParent();
            ENV_THREEJS.model = null;

            console.log(`%cGroup "${name}" has been removed`, 'color: green');
        }
    });
}