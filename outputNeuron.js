class OutputNeuron extends Neuron
{
    constructor(x, y, radius = 25)
    {
        super(x, y, radius);
        this.activeColor = color(205, 110, 110);
        this.inactiveColor = color(100, 50, 50);
        this.activeColorBorder = color(211, 141, 141);
        this.inactiveColorBorder = color(141, 91, 91);
        this.neuronRole = "OUTPUT";
    }

    //SYSTEM
    render()
    {
        super.render();
        this.renderLabel();
    }

    //TOOLS
    setNeuronLabel(label)
    {
        this.neuronLabel = label;
    }

    updateNeuronStatus()
    {
        if(this.layerState == "WAITING" && this.checkActivationLevel())                             
        {
            this.layerState = "ANSWERING";
            this.enabled = true; 
        } 
    }

    resetNeuron()
    {
        super.resetNeuron();
        this.neuronRole = "OUTPUT";
        this.layerState = "WAITING";
        this.enabled = false; 
    }

    renderLabel()
    {
        
        if(this.neuronLabel != null)
        {
            //print(this.neuronLabel);
            noStroke();
            textSize(20);
            textFont('Impact');
            text(this.neuronLabel, this.x + 1.5 * this.radius, this.y + this.radius / 4);
        }
    }
}