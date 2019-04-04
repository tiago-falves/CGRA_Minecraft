/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
	constructor(scene) {
		super(scene);
		//Initialize scene objects
        this.cube = new MyUnitCubeQuad(scene);
        this.pyramid = new MyPyramid(scene, 4, 4);
        this.prism = new MyPrism(scene,4,4);
        
        //Objects connected to MyInterface
        this.displayMyUnitCubeQuad= true;
        this.displayMyPyramid= true;
        this.displayMyPrism = true;
        //this.initMaterials();

    }
    
    initMaterials() {
		this.materialGreen = new CGFappearance(this.scene);
		this.materialGreen.setAmbient(0.0, 0.0, 0.0, 1.0);
		this.materialGreen.setDiffuse(0.215, 0.988, 0.113, 1.0);
		this.materialGreen.setSpecular(0.215, 0.988, 0.113, 1.0);
        this.materialGreen.setShininess(10.0);

		
    }
    
    display()
    {
        console.log

        // Quad Transformation
        this.scene.pushMatrix();
        this.scene.scale(1,1,1); 
        this.cube.display();
        this.scene.popMatrix();                                              
        
        this.prism.display();
        this.pyramid.display();
      
    }
}

