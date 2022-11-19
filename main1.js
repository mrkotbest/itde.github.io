import {GLTFLoader} from "./GLTFLoader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {

		const AR = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: "targets.mind"
		});

		const {renderer, scene, camera} = AR;

		const anchor = AR.addAnchor(0);

		const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
		scene.add( light );

		const loader = new GLTFLoader();

		loader.load("3.glb", (gltf) => {
			gltf.scene.scale.set(0.025, 0.025, 0.025);
			gltf.scene.position.set(0, 0, -0.4);
			anchor.group.add(gltf.scene);
		});


		await AR.start();

		renderer.setAnimationLoop( () => {
			renderer.render(scene, camera);
		});
	}
	start();
});
