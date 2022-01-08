
const hiddenAgents = new Array;
hiddenAgents.push("ded3520f-4264-bfed-162d-b080e2abccf9");

export default class Agent{
    constructor(data){
        this.data = data;
        this.visible = hiddenAgents.includes(this.data.uuid) ? false : true;
    }
}
