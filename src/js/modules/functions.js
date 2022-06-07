'use strict';

export const onWindowResize = (camera, renderer, mainContainer = window) => {
    const { innerWidth, innerHeight } = mainContainer;

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( innerWidth, innerHeight );
}

