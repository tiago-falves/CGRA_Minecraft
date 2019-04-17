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
        
        this.gui.add(this.scene, 'displayCubeMap').name('CubeMap');

        this.gui.add(this.scene, 'enableTex').name(' Enable Textures');
        
        return true;
    }
}