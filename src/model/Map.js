
const hiddenMaps = new Array;

export default class Map{
    constructor(data){
        this.data = data;
        this.visible = hiddenMaps.includes(this.data.uuid) ? false : true;
        this.hasRadar = data.displayIcon == null ? false : true;
    }
}
