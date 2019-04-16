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
        
        var obj = this;
         //Checkbox element in GUI
         this.gui.add(this.scene, 'displayAxis').name('Display Axis');
         this.gui.add(this.scene, 'displayMyHouse').name('Display MyHouse');
         this.gui.add(this.scene, 'displayMyTree').name('Display MyTree');
         this.gui.add(this.scene, 'displayMyVoxelHill').name('Display MyVoxelHill');
        
        return true;
    }
}