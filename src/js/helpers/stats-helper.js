'strict use';

import Stats from "three/examples/jsm/libs/stats.module";

export const statsHelper = () => {
    const stats = new Stats();
    document.body.appendChild( stats.dom );

    return stats;
}