/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyUnitCubeQuad objects
        this.frontQuad = new MyQuad(this.scene); //The Front Face of the cube is the one with positive Z value
        this.leftQuad = new MyQuad(this.scene); //In relation to us, this is, the one with negative X value
        this.rightQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.bottomQuad = new MyQuad(this.scene);
	}
    
    display() {

        //Displaying Top Quad
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.5, 0.0);

        this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);

        this.topMaterial.apply();
 
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.topQuad.display();

        this.scene.popMatrix();

        //Displaying Back Quad
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);

        this.scene.rotate(Math.PI, 1.0, 0.0, 0.0);

        this.sideMaterial.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.backQuad.display();

        this.scene.popMatrix();

        //Displaying Left Quad
        this.scene.pushMatrix();

        this.scene.translate(-0.5,0,0);

        this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0.0);

        this.leftQuad.display();
        
        this.scene.popMatrix();

        //Displaying Right Quad
        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);

        this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);

        this.rightQuad.display();

        this.scene.popMatrix();

        //Displaying Front Quad
        this.scene.pushMatrix();

        this.scene.translate(0.0, 0.0, 0.5);

        this.frontQuad.display();

        this.scene.popMatrix();

        //Displaying Bottom Quad
        this.scene.pushMatrix();

        this.scene.translate(0.0, -0.5, 0.0);

        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);

        this.bottomMaterial.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.bottomQuad.display();

        this.scene.popMatrix();

    }
}
