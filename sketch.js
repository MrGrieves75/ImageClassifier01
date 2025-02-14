let imageClassifier;
let imagesPath = ["./Assets/cat00001.jpg", "./Assets/cat00002.jpg", "./Assets/cat00003.jpg",
                  "./Assets/cat00004.jpg","./Assets/cat00005.jpg","./Assets/cat00006.jpg",
                "./Assets/cat00007.jpg", "./Assets/cat00008.jpg", "./Assets/cat00009.jpg",
                  "./Assets/cat00010.jpg","./Assets/cat00011.jpg","./Assets/cat00012.jpg",
                "./Assets/dog00001.jpg", "./Assets/dog00002.jpg", "./Assets/dog00003.jpg",
                  "./Assets/dog00004.jpg","./Assets/dog00005.jpg","./Assets/dog00006.jpg",
                "./Assets/dog00007.jpg"]

function setup() {
  createCanvas(800, 600);
  imageClassifier = new ImageClassifier(200, undefined, 400, 500, imagesPath);
  imageClassifier.createNeuralNetwork(3, 5 , 2);
  imageClassifier.randomOutput();
  imageClassifier.setOneOutputNeuronLabel("CHAT", 0);
  imageClassifier.setOneOutputNeuronLabel("CHIEN", 1);
  
}

function draw() {
  background(255);
  imageClassifier.update();
  imageClassifier.render();

}
