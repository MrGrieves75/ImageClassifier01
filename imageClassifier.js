class ImageClassifier extends NeuralNetwork
{
    constructor(xPos = 20, yPos = 20, networkWidth = 400, networkHeight = 250, imagesPath = [] )
    {
        super(xPos, yPos,networkWidth, networkHeight);
        this.imagesPath = imagesPath;
        this.loadImageTrigger = false;

        this.netWorkState = "RECEIVING";
        this.netWorkTimer = millis();
        this.networkReceivingDelay = 500;

    }

    //Methodes
    loadImage()
    {
        this.imagePath = random(this.imagesPath);
        this.currentImage = loadImage(this.imagePath);
    }

    chooseAnswer()
    {
        if(this.imagePath.includes("cat"))
        {
            for(let i = 0; i < this.outputLayer.length; i++)
            {
                if(this.outputLayer[i].neuronLabel.toLowerCase().includes("chat"))
                    this.outputLayer[i].activationThreshold = 0.1;     
                else
                    this.outputLayer[i].activationThreshold = max(this.hiddenLayerNumber, this.outputLayerNumber) * 1000;  
            }
        }
        else if(this.imagePath.includes("dog"))
        {
            for(let i = 0; i < this.outputLayer.length; i++)
            {
                if(this.outputLayer[i].neuronLabel.toLowerCase().includes("chien"))
                    this.outputLayer[i].activationThreshold = 0.1;     
                else
                    this.outputLayer[i].activationThreshold = max(this.hiddenLayerNumber, this.outputLayerNumber) * 1000;  
            }
        }
    }

    //System
    update()
    {
        if(this.netWorkState == "RECEIVING" && (millis() - this.netWorkTimer < this.networkReceivingDelay))
        {
            if(!this.loadImageTrigger)
            {
                this.loadImage();
                this.loadImageTrigger = true;
                this.chooseAnswer();
            }
            return;
        }

        for(let oneInputnNeuron of this.inputLayer)
            oneInputnNeuron.update(); 

        for(let oneHiddenNeuron of this.hiddenLayer)
            oneHiddenNeuron.update();
        
        let answeringTrigger = false;
        for(let oneOutputNeuron of this.outputLayer)
        {
            oneOutputNeuron.update();
            if(oneOutputNeuron.layerState == "ANSWERING" && !this.resetTrigger)
            {
                this.resetTrigger = true;
                this.resetTime = millis();
                answeringTrigger = true;
            }
        }

        if(!answeringTrigger)
        {
            this.netWorkState = "ANALYZING";
        }
        else
        {
            this.netWorkState = "ANSWERING";
        }

        if(this.resetTrigger)
        {
            if(millis() - this.resetTime > this.resetDelay)
            {
                for(let oneInputNeuron of this.inputLayer)
                    oneInputNeuron.resetNeuron();

                for(let oneHiddenNeuron of this.hiddenLayer)
                    oneHiddenNeuron.resetNeuron();

                for(let oneOutputNeuron of this.outputLayer)
                    oneOutputNeuron.resetNeuron();

                this.resetTrigger = false;

                this.netWorkState = "RECEIVING";
                this.netWorkTimer = millis();
                this.loadImageTrigger = false;
            }
        }
}

    render()
    {
        super.render();
        this.renderImage();
    }

    //Tools
    renderImage()
    {
        imageMode(CENTER);
        image(this.currentImage, 100, this.yPos + this.networkHeight / 2, 150, 150);
    }

}