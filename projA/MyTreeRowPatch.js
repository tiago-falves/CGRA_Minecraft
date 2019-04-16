/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeRowPatch extends CGFobject {
	constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius/*, trunkTexture, treeTopTexture*/) {
        super(scene);

        //Initializing 6 Trees with randomish dimensions
        this.tree1 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
        this.tree2 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
        this.tree3 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
        this.tree4 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
        this.tree5 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
        this.tree6 = new MyTree(this.scene, trunkHeight + Math.random() * 0.2, trunkRadius + Math.random() * 0.2, treeTopHeight + Math.random() * 0.2, treeTopRadius + Math.random() * 0.2, 'images/treeCrown.PNG','images/trunk.jpg' );
    
        //Values to desilign the trees
        this.value1 = Math.random()*-0.5;
        this.value2 = Math.random()*0.5;
        this.value3 = Math.random()*-0.5;
        this.value4 = Math.random()*0.5;
        this.value5 = Math.random()*-0.5;
        this.value6 = Math.random()*0.5 ;
    }
    
    display() {

        var trees = [this.tree1, this.tree2, this.tree3, this.tree4, this.tree5, this.tree6];

        var desilignement_values = [this.value1, this.value2, this.value3, this.value4, this.value5, this.value6];


        var line = 0;


        for (var i = 0; i < 6; i++) {

            this.scene.pushMatrix();

            this.scene.translate(desilignement_values[i], 0, line*2.5 - 6.25);
            
            trees[i].display();

            this.scene.popMatrix();

            line ++;

        }

    }
}