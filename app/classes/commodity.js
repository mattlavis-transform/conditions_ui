const Measure = require("./measure");
const MeasureCondition = require("./measure_condition");
const MeasureType = require("./measure_type");
const GeographicalArea = require("./geographical_area");

class Commodity {
    constructor(response) {
        this.response = response.data;
        this.data = this.response["data"];
        this.included = this.response["included"];
        this.get_core_data();
        this.get_included_data();
        this.assign_conditions();
        this.assign_measure_types();
        this.assign_geographical_areas();
        this.attach_permutations();
    }

    get_core_data() {
        this.goods_nomenclature_item_id = this.data["attributes"]["goods_nomenclature_item_id"]
    }

    get_included_data() {

        this.measure_types = [];
        this.geographical_areas = [];
        this.measures = [];
        this.measure_conditions = [];
        this.included.forEach(item => {
            if (item["type"] == "measure") {
                var m = new Measure(item);
                this.measures.push(m);
            }
            else if (item["type"] == "measure_condition") {
                var mc = new MeasureCondition(item);
                this.measure_conditions.push(mc);
            }
            else if (item["type"] == "measure_type") {
                var mc = new MeasureType(item);
                this.measure_types.push(mc);
            }
            else if (item["type"] == "geographical_area") {
                var mc = new GeographicalArea(item);
                this.geographical_areas.push(mc);
            }
        });
    }

    attach_permutations() {
        this.measures.forEach(m => {
            m.attach_permutations();
        });
    }

    assign_conditions() {
        this.measures.forEach(m => {
            if (m.measure_condition_ids.length > 0) {
                this.measure_conditions.forEach(mc => {
                    if (m.measure_condition_ids.includes(mc.id)) {
                        var a = 1;
                        m.measure_conditions.push(mc);
                    }
                });
            }
        });
        var a = 1;
    }

    assign_measure_types() {
        this.measures.forEach(m => {
            this.measure_types.forEach(mt => {
                if (m.measure_type_id == mt.id) {
                    m.measure_type_description = mt.description;
                    var a = 1;
                }
            });
        });
    }

    assign_geographical_areas() {
        this.measures.forEach(m => {
            this.geographical_areas.forEach(ga => {
                if (m.geographical_area_id == ga.id) {
                    m.geographical_area_description = ga.description;
                    var a = 1;
                }
            });
        });
    }
}
module.exports = Commodity