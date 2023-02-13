import {DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, RingGeometry, Vector3} from "three";

export const generateVirtualLight = ({
                                         form = "rect",
                                         intensity = 1,
                                         color = "white",
                                         scale  = [1, 1, 1],
                                         toneMapped = false,
                                         position = [0, 0, 0],
                                         rotation = [0, 0, 0],
                                         target = [0,0,0],
                                     }) => {
    scale =
        Array.isArray(scale) && scale.length === 2
            ? [scale[0], scale[1], 1]
            : scale;

    let geometry;
    if (form === "circle") {
        geometry = new RingGeometry(0, 1, 64);
    }
    if (form === "ring") {
        geometry = new RingGeometry(0.5, 1, 64);
    }
    if (form === "rect") {
        geometry = new PlaneGeometry();
    }

    const material = new MeshBasicMaterial({
        toneMapped: toneMapped,
        side: DoubleSide,
        color: color,
    });

    material.color.multiplyScalar(intensity);

    const mesh = new Mesh(geometry, material);
    Array.isArray(scale) ? mesh.scale.set(scale[0],scale[1],scale[2]) : mesh.scale.set(scale, scale, scale);

    mesh.position.set(position[0],position[1],position[2]);
    mesh.rotation.set(rotation[0],rotation[1],rotation[2]);
    if (target) {
        mesh.lookAt(new Vector3(...target));
    }
    return mesh;
};