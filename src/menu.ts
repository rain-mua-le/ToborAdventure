import * as babylon from "babylonjs"
import "babylonjs-loaders"
import {AdvancedDynamicTexture} from "@babylonjs/gui/2D"

export class Menu {
    public static createScene(engine: babylon.Engine, canvas: HTMLCanvasElement): babylon.Scene {
        let scene: babylon.Scene = new babylon.Scene(engine);
        let camera: babylon.FollowCamera = new babylon.FollowCamera("FollowCam", new babylon.Vector3(0, 0, 0), scene);
        camera.radius = 7.5;
        camera.heightOffset = 7.5;
        camera.attachControl(canvas, true);
        babylon.SceneLoader.ImportMesh("", "./assets/models/", "tobor.glb", scene, (newMeshes: babylon.AbstractMesh[]) => {
            console.log(newMeshes);
            let tobor: babylon.AbstractMesh = newMeshes[1];
            tobor.rotate(new babylon.Vector3(0, 0, 1), Math.PI / 8, babylon.Space.LOCAL);
            camera.lockedTarget = tobor;
        }, (progress: babylon.SceneLoaderProgressEvent) => {

        }, (scene: babylon.Scene, msg: string, exception: any) => {
            console.log(msg);
        });
        let light: babylon.HemisphericLight = new babylon.HemisphericLight("hemLight", new babylon.Vector3(0, 1, 0), scene);
        return scene;
    }
}