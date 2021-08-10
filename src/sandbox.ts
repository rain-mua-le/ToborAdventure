import * as babylon from "babylonjs"
import "babylonjs-loaders"
import {Tobor} from "./tobor"

export class Sandbox {
    public static createScene(engine: babylon.Engine, canvas: HTMLCanvasElement): babylon.Scene {
        let scene: babylon.Scene = new babylon.Scene(engine);
        let camera: babylon.ArcRotateCamera = new babylon.ArcRotateCamera("cam", 0, 0, 20, new babylon.Vector3(0, 0, 0), scene);
        camera.rotation = new babylon.Vector3(-Math.PI / 2, 0, 0);
        camera.setPosition(new babylon.Vector3(0, -10, -10));
        let light: babylon.HemisphericLight = new babylon.HemisphericLight("light", new babylon.Vector3(0, 1, 0), scene);
        let ground: babylon.Mesh = babylon.MeshBuilder.CreateGround("ground", {
            width: 1000,
            height: 1000
        }, scene);
        ground.position.y = 2;
        ground.rotate(new babylon.Vector3(1, 0, 0), Math.PI / 2);
        let grayMaterial = new babylon.StandardMaterial("gray", scene);
        grayMaterial.diffuseColor = new babylon.Color3(0.2, 0.2, 0.2);
        ground.material = grayMaterial;
        scene.enablePhysics(new babylon.Vector3(0, -9.81, 0));
        let groundImposter = new babylon.PhysicsImpostor(ground, babylon.PhysicsImpostor.BoxImpostor, {
            mass: 0
        }, scene);
        let tobor: Tobor = new Tobor(engine, scene, canvas, camera, "Tobor");
        return scene;
    }
}