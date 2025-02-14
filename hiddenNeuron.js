class HiddenNeuron extends Neuron
{
    constructor(x, y, radius = 25)
    {
        super(x, y, radius);
        this.activeColor = color(108, 163, 98);
        this.inactiveColor = color(38, 93, 28);
        this.activeColorBorder = color(157, 193, 152);
        this.inactiveColorBorder = color(97, 133, 92);
        this.neuronRole = "HIDDEN";
    }

    resetNeuron()
    {
        super.resetNeuron();
        this.neuronRole = "HIDDEN";
        this.layerState = "WAITING";
        this.enabled = false; 
    }
}