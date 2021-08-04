import * as babylon from "babylonjs"
import * as gui from "babylonjs-gui"
import {Menu} from "./menu"
import {Instructions} from "./instructions"
import {Credits} from "./credits"

enum State {MAIN_MENU = 0, INSTRUCTIONS = 1, CREDITS = 2, CUTSCENE = 3, CHOOSE_LEVEL = 4}

class App {
    private _scene: babylon.Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: babylon.Engine;
    private _state: number = 0;

    constructor() {
        this._canvas = document.getElementById("render-canvas") as HTMLCanvasElement;
        this._engine = new babylon.Engine(this._canvas, true);
        this._scene = new babylon.Scene(this._engine);
        this._main();
    }

    private async _goToMainMenu(): Promise<void> {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        let scene = Menu.createScene(this._engine, this._canvas);
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
            ;
        });
        advancedTexture.addControl(startButton);
        let instructionsButton: gui.Button = gui.Button.CreateSimpleButton("instructionsButton", "Instructions");
        instructionsButton.textBlock.color = "white";
        instructionsButton.top = "40%";
        instructionsButton.width = "200px";
        instructionsButton.height = "50px";
        instructionsButton.onPointerClickObservable.add(() => {
            this._goToInstructions();
        });
        advancedTexture.addControl(instructionsButton);
        let creditsButton: gui.Button = gui.Button.CreateSimpleButton("creditsButton", "Credits");
        creditsButton.textBlock.color = "white";
        creditsButton.left = "35%";
        creditsButton.top = "40%";
        creditsButton.width = "150px";
        creditsButton.height = "50px";
        creditsButton.onPointerClickObservable.add(() => {
            this._goToCredits();
        })
        advancedTexture.addControl(creditsButton);
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.MAIN_MENU;
    }

    private async _goToInstructions(): Promise<void> {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        let scene = Instructions.createScene(this._engine, this._canvas);
        let advancedTexture: gui.AdvancedDynamicTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);
        let title: gui.TextBlock = new gui.TextBlock();
        title.text = "Instructions";
        title.color = "white";
        title.fontSize = 60;
        title.left = "-20%";
        title.top = "-40%";
        advancedTexture.addControl(title);
        let instructions: gui.TextBlock = new gui.TextBlock();
        instructions.text = "Press W to move forward.\n";
        instructions.text += "Press W and A to move left forward.\n";
        instructions.text += "Press W and D to move right forward.\n";
        instructions.text += "Press S to go backwards.\n";
        instructions.text += "Press S and A to move left backwards.\n";
        instructions.text += "Press S and D to move right backwards.\n";
        instructions.text += "Press J to jump."
        instructions.color = "white";
        title.fontSize = 30;
        title.left = "-20%";
        title.top = "-30%";
        advancedTexture.addControl(instructions);
        let backButton: gui.Button = gui.Button.CreateSimpleButton("backButton", "Go Back");
        backButton.textBlock.color = "white";
        backButton.left = "35%";
        backButton.top = "40%";
        backButton.width = "150px";
        backButton.height = "50px";
        backButton.onPointerClickObservable.add(() => {
            this._goToMainMenu();
        });
        advancedTexture.addControl(backButton);
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.INSTRUCTIONS;
    }

    private async _goToCredits(): Promise<void> {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        let scene = Credits.createScene(this._engine, this._canvas);
        let advancedTexture: gui.AdvancedDynamicTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);
        let title: gui.TextBlock = new gui.TextBlock();
        title.text = "Credits";
        title.color = "white";
        title.fontSize = 60;
        title.left = "-20%";
        title.top = "-40%";
        advancedTexture.addControl(title);
        let credits: gui.TextBlock = new gui.TextBlock();
        credits.text = "Creator: Rain Le";
        credits.color = "white";
        credits.fontSize = 30;
        advancedTexture.addControl(credits);
        let backButton: gui.Button = gui.Button.CreateSimpleButton("backButton", "Go Back");
        backButton.textBlock.color = "white";
        backButton.left = "35%";
        backButton.top = "40%";
        backButton.width = "150px";
        backButton.height = "50px";
        backButton.onPointerClickObservable.add(() => {
            this._goToMainMenu();
        });
        advancedTexture.addControl(backButton);
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.CREDITS;
    }

    private async _main(): Promise<void> {
        await this._goToMainMenu();
        this._engine.runRenderLoop(() => {
            switch (this._state) {
                case State.MAIN_MENU:
                    this._scene.render();
                    break;
                case State.INSTRUCTIONS:
                    this._scene.render();
                    break;
                case State.CREDITS:
                    this._scene.render();
                    break;
                default: break;
            }
        });
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

new App();