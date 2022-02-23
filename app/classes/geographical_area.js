class GeographicalArea {
    constructor(item) {
        this.item = item;
        this.get_data();
    }

    get_data() {
        this.id = this.item["id"];
        this.description = this.item["attributes"]["description"];
    }
}
module.exports = GeographicalArea