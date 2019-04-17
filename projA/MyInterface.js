/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        //Checkbox element in GUI
        
        this.gui.add(this.scene, 'lightSelected', this.scene.lightsType).name('Selected Light').onChange(this.scene.chooseLights.bind(this.scene));

        this.gui.add(this.scene, 'enableTex').name(' Enable Textures');
        
        return true;
    }
}