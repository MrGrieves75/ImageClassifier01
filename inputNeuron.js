class InputNeuron extends Neuron
{
    constructor(x, y, radius = 25)
    {
        super(x, y, radius);
        this.activeColor = color(100, 100, 175);
        this.inactiveColor = color(50, 50, 100);
        this.activeColorBorder = color(141, 141, 181);
        this.inactiveColorBorder = color(91, 91, 141);
        this.neuronRole = "INPUT";
        this.layerState = "SENDING";
        this.enabled = true;
    }

    //Logic
    update()
    {
        super.update();
    }

    setNeuronActivation()
    {
        this.enabled = this.checkNeuronStatus();
    }

    resetNeuron()
    {
        super.resetNeuron();
        this.neuronRole = "INPUT";
        this.layerState = "SENDING";
        this.enabled = true; 
    }
}