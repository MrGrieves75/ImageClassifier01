
class Neuron
{
    //Constructors
    constructor(x, y, radius = 25)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.connectedNeurons = [];
        this.neuralConnectionIn = []
        this.neuralConnectionsOut = [];
        this.activeConnection = 0;
        this.enabled = false;
        this.dataSent = 0;
        this.activationThreshold = random(0, 1000);  
        this.activationLevel = 0;
        this.activeColor = color(100, 100, 100);
        this.inactiveColor = color(50, 50, 50);
        this.activeColorBorder = color(255);
        this.inactiveColorBorder = color(100);
        this.layerState = "WAITING"; 

    }

    //Methods
    connectTo(otherNeuron) 
    {
        if (!this.connectedNeurons.includes(otherNeuron)) 
        {
            this.connectedNeurons.push(otherNeuron);
            let newConnection = new NeuralConnection(this, otherNeuron);
            this.neuralConnectionsOut.push(newConnection);
        }
    }

    setNeuronActivation()
    {
        if(this.checkInputConnection() && this.checkActivationLevel() && this.checkNeuronStatus())
            this.enabled = true;
        else
            this.enabled = false;
    }

    resetNeuron()
    {
        this.activeConnection = 0;
        this.dataSent = 0;
        this.activationLevel = 0;
        this.activationThreshold = random(0, 1000); 
        for(let oneNeuralConnectionOut of this.neuralConnectionsOut)
        {
                oneNeuralConnectionOut.resetConnection();
        }  
    }


    //Logic
    update()
    {
        for(let oneNeuralConnectionOut of this.neuralConnectionsOut)
        {
            oneNeuralConnectionOut.update();
        }  
        this.checkActiveOutputConnection();
        this.checkDataSent();
        this.updateNeuronStatus(); 
  
    }

    render()
    {
        this.renderConnection();
        this.renderNeuron();    
    }

    //Tools
    checkInputConnection()
    {
        for(let oneNeuralConnectionIn of this.neuralConnectionIn)
            {
                if(oneNeuralConnectionIn.enabled)
                    return true;
            }
    }

    checkActiveOutputConnection()
    {
        this.activeConnection = 0;
        for(let oneNeuralConnectionOut of this.neuralConnectionsOut)
        {
            if(oneNeuralConnectionOut.enabled)
                this.activeConnection++;
        } 
    }

    checkDataSent()
    {
        if(this.dataSent == this.activeConnection)
            return true;
        else
            return false;
    }

    checkActivationLevel()
    {
        
        if(this.activationLevel < this.activationThreshold)
            return false;
        else
            return true;
    }

    updateNeuronStatus()
    {
        if(this.layerState == "WAITING" && this.checkActivationLevel())                             
        {
            this.layerState = "SENDING";
            this.enabled = true; 
        }
        else if(this.layerState == "SENDING") 
        {
            if(this.checkDataSent())
            {
                this.layerState = "HAS SENT";
                this.enabled = false;
            }
            else
                this.enabled = true;  
        }
    }

    renderNeuron()
    {
        strokeWeight(this.radius / 5);
        if(this.enabled)
        {
            stroke(this.activeColorBorder);
            fill(this.activeColor);
        }
        else
        {
            stroke(this.inactiveColorBorder);
            fill(this.inactiveColor); 
        }
        circle(this.x, this.y, this.radius * 2);
    }

    renderConnection()
    {
        for(let oneConnection of this.neuralConnectionsOut)
        {
            oneConnection.render();
        }
    }
}