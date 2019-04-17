/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject {
	constructor(scene, levels) {
        super(scene);
        
        this.levels = levels;

        //Initialize MyUnitCubeQuad objects
        this.cube = new MyUnitCubeQuad(this.scene, 'images/hill.jpg', 'images/hill.jpg', 'images/hill.jpg', 'images/hill.jpg', 'images/hill.jpg', 'images/hill.jpg');
              
	}

    display(level = this.levels) {

        if (level == 1) {

            this.scene.pushMatrix();

            this.scene.translate(0, this.levels - 0.5, 0);

            this.cube.display();

            this.scene.popMatrix();

            return;
        }

        var z_translation = 0;

        var x_translation = 0;

        for (var i = 0; i < (2 * level - 2) * 4; i++ ) {

            this.scene.pushMatrix();

            this.scene.translate(-level + 1  + x_translation , 0.5 + this.levels - level, level - 1 + z_translation);

            this.cube.display();

            this.scene.popMatrix();

            if (i < (2 * level -2)) {
                x_translation++;
            }
            else if (i < (2 * level -2) * 2) {
                z_translation--;
            }
            else if (i < (2 * level -2) * 3) {
                x_translation--;
            }
            else if (i < (2 * level -2) * 4 - 1) {
                z_translation++;
            }
            else {
                x_translation = 0;
                z_translation = 0;
            }
        }

        return this.display(level - 1);
    }
}


