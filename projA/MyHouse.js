/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
	constructor(scene) {
        super(scene);

		//Initialize scene objects
        this.cube = new MyUnitCubeQuad(scene, 'images/wood-house-door.jpg', 'images/wood-house.jpg', 'images/wood-house-window.jpg', 'images/wood-house-window.jpg', 'images/wood-house.jpg', 'images/wood-house.jpg');
        this.pyramid = new MyPyramid(scene, 4, 4, 1, 1.5);
        this.prism = new MyPrism(scene, 8, 1, 2, 0.2);

        this.initMaterials();
    }
    
    initMaterials() {

        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.loadTexture('images/rooftop.jpg');
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');

		
    }
    
    display()
    {

        // Cube Transformation
        this.scene.pushMatrix();
       
        this.scene.scale(2, 2, 2); 
       
        this.cube.display();
       
        this.scene.popMatrix();  

        //Pyramid Transformation
        this.scene.pushMatrix();

        this.scene.scale(2,2,2); 
 
        this.scene.rotate(45*Math.PI/180, 0, 1, 0);
 
        this.scene.translate(0, 0.5, 0);
 
        this.roofMaterial.apply();
 
        this.pyramid.display();
 
        this.scene.popMatrix();

       
        // Column 1
        this.scene.pushMatrix();

        this.scene.translate(1.5, -1, 1.5);
        
        this.prism.display();
        
        this.scene.popMatrix();
        
        // Column 2
        this.scene.pushMatrix();

        this.scene.translate(-1.5, -1, 1.5);

        this.prism.display();

        this.scene.popMatrix();

        // Column 3
        this.scene.pushMatrix();

        this.scene.translate(-1.5, -1, -1.5);

        this.prism.display();

        this.scene.popMatrix();
        
        // Column 4
        this.scene.pushMatrix();

        this.scene.translate(1.5, -1, -1.5);

        this.prism.display();
        
        this.scene.popMatrix();        
    }
}

