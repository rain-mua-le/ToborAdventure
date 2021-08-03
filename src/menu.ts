import * as babylon from "babylonjs"
import "babylonjs-loaders"
import * as gui from "babylonjs-gui"

enum ButtonState {NO_CLICK = -1, START = 0, INSTRUCTIONS = 1, CREDITS = 2}

export class Menu {
    public static state: number = ButtonState.NO_CLICK;

    public static createScene(engine: babylon.Engine, canvas: HTMLCanvasElement): babylon.Scene {
        let scene: babylon.Scene = new babylon.Scene(engine);
        let camera: babylon.FollowCamera = new babylon.FollowCamera("FollowCam", new babylon.Vector3(0, 0, 0), scene);
        camera.radius = 7.5;
        camera.heightOffset = 7.5;
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
        let advancedTexture: gui.AdvancedDynamicTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);
        let title: gui.TextBlock = new gui.TextBlock();
        title.text = "Tobor Adventure";
        title.color = "white";
        title.fontSize = 60;
        title.left = "-20%";
        title.top = "-40%";
        advancedTexture.addControl(title);
        let startButton: gui.Button = gui.Button.CreateSimpleButton("startButton", "Start");
        startButton.textBlock.color = "white";
        startButton.left = "-35%";
        startButton.top = "40%";
        startButton.width = "150px";
        startButton.height = "50px";
        startButton.onPointerClickObservable.add(() => {
            this.state = ButtonState.START;
        });
        advancedTexture.addControl(startButton);
        let instructionsButton: gui.Button = gui.Button.CreateSimpleButton("instructionsButton", "Instructions");
        instructionsButton.textBlock.color = "white";
        instructionsButton.top = "40%";
        instructionsButton.width = "200px";
        instructionsButton.height = "50px";
        instructionsButton.onPointerClickObservable.add(() => {
            this.state = ButtonState.INSTRUCTIONS;
        });
        advancedTexture.addControl(instructionsButton);
        let creditsButton: gui.Button = gui.Button.CreateSimpleButton("creditsButton", "Credits");
        creditsButton.textBlock.color = "white";
        creditsButton.left = "35%";
        creditsButton.top = "40%";
        creditsButton.width = "150px";
        creditsButton.height = "50px";
        creditsButton.onPointerClickObservable.add(() => {
            this.state = ButtonState.CREDITS;
        })
        advancedTexture.addControl(creditsButton);
        return scene;
    }
}