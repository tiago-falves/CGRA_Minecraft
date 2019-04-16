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
        
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        this.gui.add(this.scene, 'displayMyHouse').name('Display MyHouse');
        
        this.gui.add(this.scene, 'displayMyTree').name('Display MyTree');
        
        this.gui.add(this.scene, 'displayMyVoxelHill').name('Display MyVoxelHill');
        
        this.gui.add(this.scene, 'displayTreeRowPatch').name('Display MyTreeRowPatch');
       
        this.gui.add(this.scene, 'displayTreeGroupPatch').name('Display MyTreeGroupPatch');
        
        this.gui.add(this.scene, 'displayCubeMap').name('Display CubeMap');


        
        return true;
    }
}