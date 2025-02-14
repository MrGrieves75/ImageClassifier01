class NeuralConnection
{
    //Constructors
    constructor(thisNeuron, otherNeuron)
    {
        this.connectedFromNeuron = thisNeuron;
        this.connectedToNeuron = otherNeuron;
        this.weight =  floor(random(1,thisNeuron.radius));
        this.enabled = ((this.weight != 0) && (this.connectedFromNeuron.enabled));
        this.t = 0;
        this.speed = random(0.01, 0.015);
        
        this.weightRadius = Math.log(this.weight + 1) * (20 / Math.log(20));
        this.connectedToNeuron.neuralConnectionIn.push(this);
        this.dataSentTrigger = true;
        this.activeColor = thisNeuron.activeColorBorder;
        this.inactiveColor = thisNeuron.inactiveColorBorder;
    }

    //Methods
    resetConnection()
    {
        this.t = 0;
        this.dataSentTrigger = true;
        this.speed = random(0.01, 0.015);
    }

    //Logic 
    update()
    {
        if((this.weight != 0) && (this.connectedFromNeuron.enabled))
            this.enabled = true;
        else
        {
            this.enabled = false;
            return;
        }

        if(this.t < 1)
            this.t += this.speed;
        else
        {
            this.t = 1;
            this.connectedToNeuron.activationLevel += this.weight;
            if(this.dataSentTrigger)
            {
                this.dataSentTrigger = false;
                this.connectedFromNeuron.dataSent++; 
            }
        }
    }

    render()
    {
        this.renderConnection();
        this.renderWeight();
    }

    //Tools
    renderConnection()
    {
        if(this.enabled)
            stroke(this.activeColor);
        else
            stroke(this.inactiveColor);
        strokeWeight(2);
        line(this.connectedFromNeuron.x, this.connectedFromNeuron.y, this.connectedToNeuron.x, this.connectedToNeuron.y);
    }

    renderWeight()
    {
       
        if(!this.enabled)
            return;

    
        let xWeightPos = this.connectedFromNeuron.x  + this.t * (this.connectedToNeuron.x -this.connectedFromNeuron.x) 
        let yWeightPos = this.connectedFromNeuron.y  + this.t * (this.connectedToNeuron.y -this.connectedFromNeuron.y) 
        noStroke();
        fill(255, 0, 0);
        circle(xWeightPos, yWeightPos, this.weightRadius);
       
    }
}