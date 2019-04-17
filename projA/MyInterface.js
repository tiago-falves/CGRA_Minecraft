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
        
        this.gui.add(this.scene, 'displayAxis').name('Axis');
        
        this.gui.add(this.scene, 'displayMyHouse').name('MyHouse');
                
        this.gui.add(this.scene, 'displayMyVoxelHill').name('MyVoxelHill');
        
        this.gui.add(this.scene, 'displayTreeRowPatch').name('MyTreeRowPatch');
       
        this.gui.add(this.scene, 'displayTreeGroupPatch').name('MyTreeGroupPatch');
        
        this.gui.add(this.scene, 'displayCubeMap').name('Display CubeMap');

        this.gui.add(this.scene, 'lightSelected', this.scene.lightsID).name('Selected Light').onChange(this.scene.chooseLights.bind(this.scene));

        this.gui.add(this.scene, 'enableTex').name(' Enable Textures');
        
        return true;
    }
}