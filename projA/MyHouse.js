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
        this.pyramid = new MyPyramid(scene, 4, 4,1,1.5);
        this.prism = new MyPrism(scene, 8, 1,2,0.2);
        
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
      

        // Cube Transformation
        this.scene.pushMatrix();
        this.scene.scale(2,2,2); 
        if (this.displayMyUnitCubeQuad)
            this.cube.display();
        this.scene.popMatrix();  

        //Pyramid Transformation
        this.scene.pushMatrix();
        this.scene.scale(2,2,2); 
        this.scene.rotate(45*Math.PI/180,0,1,0);
        this.scene.translate(0,0.5,0);
        if(this.displayMyPyramid)
            this.pyramid.display();
        this.scene.popMatrix();

        // Column 1

        this.scene.pushMatrix();
        this.scene.translate(1.5,-1,1.5);
        if (this.displayMyPrism)
            this.prism.display();
        
        // Column 2
        
        this.scene.pushMatrix();
        this.scene.translate(-3,0,0);
        if (this.displayMyPrism)
            this.prism.display();

        // Column 3
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,-3);
        if (this.displayMyPrism)
            this.prism.display();
        
        // Column 4
        
        this.scene.pushMatrix();
        this.scene.translate(3,0,0);
        if (this.displayMyPrism)
            this.prism.display();
        
    }
}

