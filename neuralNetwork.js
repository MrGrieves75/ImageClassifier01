class NeuralNetwork
{
    //Constructors
    constructor(xPos = 20, yPos = 20, networkWidth = 400, networkHeight = 250 )
    {   
        this.xPos = xPos;
        this.yPos = yPos;
        this.networkWidth = networkWidth;
        this.networkHeight = networkHeight;

        this.inputLayerNumber = 1;
        this.hiddenLayerNumber = 1;
        this.outputLayerNumber = 1;
    
        this.inputLayer = [];
        this.hiddenLayer = [];
        this.outputLayer = [];

        this.resetTime = 0;
        this.resetDelay = 3000;
        this.resetTrigger = false;

        this.randomizeMode = true;

        this.netWorkState = "RECEIVING";
        this.netWorkTimer = 0;
        this.networkReceivingDelay = 3;
    }

    //Methods
    createNeuralNetwork(input, hidden, output)
    {
        this.inputLayerNumber = input;
        this.hiddenLayerNumber = hidden;
        this.outputLayerNumber = output;
        this.setNeuronRadius();
        this.createInputLayer();
        this.createHiddenLayer();
        this.createOutputLayer();

        this.connectLayers();
    }

    connectLayers()
    {
        this.connectInputToHidden();
        this.connecthiddenToOutput();
    }

    randomOutput()
    {
        let index = floor(random(0, this.outputLayer.length));
        for(let i = 0; i < this.outputLayer.length; i++)
        {
            if(i == index)
                this.outputLayer[i].activationThreshold = 0.1;     
            else
                this.outputLayer[i].activationThreshold = max(this.hiddenLayerNumber, this.outputLayerNumber) * 1000;  
        }
    }

    classifierOutput()
    {
        
    }

    //Logic
    update()
    {
        for(let oneInputnNeuron of this.inputLayer)
            oneInputnNeuron.update(); 

        for(let oneHiddenNeuron of this.hiddenLayer)
            oneHiddenNeuron.update();
        
        for(let oneOutputNeuron of this.outputLayer)
        {
            oneOutputNeuron.update();
            if(oneOutputNeuron.layerState == "ANSWERING" && !this.resetTrigger)
            {
                this.resetTrigger = true;
                this.resetTime = millis();
            }
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
                if(this.randomizeMode)
                    this.randomOutput();
            }
        }
    }

    render()
    {
        //this.renderNetworkBBox();
        this.renderInputLayer();
        this.renderHiddenLayer();
        this.renderOutputLayer();
    }

    //Tools
    setNeuronRadius()
    {
        let radius1 = floor(this.networkWidth / 14); 
        let neuronMax = max(this.inputLayerNumber, this.hiddenLayerNumber, this.outputLayerNumber);
        let radius2 = floor(this.networkHeight / (3 * neuronMax - 1));
        this.neuronRadius = Math.min(radius1, radius2); 
    }

    setRandomizeMode(randomizeBoolean)
    {
        this.randomizeMode = randomizeBoolean;
    }

    createInputLayer()
    {
        this.inputLayerXpos = this.xPos + this.neuronRadius;
        
        let offset;
        if(this.inputLayerNumber != 1)
            offset = 3 * (this.inputLayerNumber  - 1)  * this.neuronRadius / 2;
        else
            offset = 0;
        
        this.inputLayerYpos = this.yPos + this.networkHeight / 2 - offset;
        for(let i = 0; i < this.inputLayerNumber; i++)
        {
            let inputNeuron = new InputNeuron(this.inputLayerXpos, this.inputLayerYpos + i * 3 * this.neuronRadius,  this.neuronRadius);
            this.inputLayer.push(inputNeuron);
        }
    }

    createHiddenLayer()
    {
        this.hiddenLayerXpos = this.xPos + this.networkWidth / 2 ;
        let offset;
        if(this.hiddenLayerNumber != 1)
            offset = 3 *( this.hiddenLayerNumber - 1) * this.neuronRadius / 2;
        else
            offset = 0;
        this.hiddenLayerYpos = this.yPos + this.networkHeight / 2 - offset;
        for(let i = 0; i < this.hiddenLayerNumber; i++)
            {
                let hiddenNeuron = new HiddenNeuron(this.hiddenLayerXpos,  this.hiddenLayerYpos + i * 3 * this.neuronRadius,  this.neuronRadius);
                this.hiddenLayer.push(hiddenNeuron);
            }
    }

    createOutputLayer()
    {
        this.outputLayerXpos = this.xPos + this.networkWidth - this.neuronRadius;
        let offset;
        if(this.outputLayerNumber != 1)
            offset = 3 * ( this.outputLayerNumber   - 1) * this.neuronRadius / 2 ;
        else
            offset = 0;
        this.outputLayerYpos = this.yPos + this.networkHeight / 2 - offset;
        
        for(let i = 0; i < this.outputLayerNumber; i++)
            {
                let outputNeuron = new OutputNeuron(this.outputLayerXpos, this.outputLayerYpos + i * 3 * this.neuronRadius,  this.neuronRadius);
                this.outputLayer.push(outputNeuron);
            }
    }

    setOneOutputNeuronLabel(label, neuronIndex)
    {
        if(neuronIndex >= this.outputLayer.length)
            return;
        else
            this.outputLayer[neuronIndex].setNeuronLabel(label);

    }

    connectInputToHidden()
    {
        for(let oneInputNeuron of this.inputLayer)
        {
            for(let oneHiddenNeuron of this.hiddenLayer)
            {
                oneInputNeuron.connectTo(oneHiddenNeuron);
            }
        }
    }

    connecthiddenToOutput()
    {
        for(let oneHiddenNeuron of this.hiddenLayer)
        {
            for(let outputNeuron of this.outputLayer)
            {
                oneHiddenNeuron.connectTo(outputNeuron);
            }
        }
    }

    renderNetworkBBox()
    {
        stroke(200);
        fill(255, 255, 0);
        rect(this.xPos, this.yPos, this.networkWidth, this.networkHeight);
    }

    renderInputLayer()
    {
        for(let oneNeuron of this.inputLayer)
            oneNeuron.render();

    }

    renderHiddenLayer()
    {
        for(let oneNeuron of this.hiddenLayer)
            oneNeuron.render();
    }

    renderOutputLayer()
    {
        for(let oneNeuron of this.outputLayer)
            oneNeuron.render();
    }
}