class Measure {
    constructor(item) {
        this.item = item;
        this.measure_conditions = [];
        this.measure_condition_ids = [];
        this.permuted_measure_conditions = [];
        this.measure_type_description = "";
        this.get_data();
        delete this.item;
    }

    get_data() {
        this.id = this.item["id"];
        this.features_universal_waiver = this.item["attributes"]["features_universal_waiver"];
        this.import = this.item["attributes"]["import"];
        this.vat = this.item["attributes"]["vat"];
        this.excise = this.item["attributes"]["excise"];
        this.measure_type_id = this.item["relationships"]["measure_type"]["data"]["id"];
        this.geographical_area_id = this.item["relationships"]["geographical_area"]["data"]["id"];
        var measure_condition_ids = this.item["relationships"]["measure_conditions"]["data"];
        if (measure_condition_ids.length > 0) {
            measure_condition_ids.forEach(mc => {
                this.measure_condition_ids.push(mc.id);
            });
        }
        this.measure_condition_permutations = this.item["relationships"]["measure_condition_permutations"]["data"];
    }

    attach_permutations() {
        if (this.id == 20098001) {
            var a = 1;
        }

        if (this.measure_condition_permutations.length > 0) {
            this.permuted_measure_conditions = [];
            this.measure_condition_permutations.forEach(permutation_group => {

                var permutation_group_object = {
                    "condition_code": permutation_group["condition_code"],
                    "measure_conditions": []
                }

                permutation_group.permutations.forEach(measure_conditions => {
                    var measure_condition_list = [];
                    measure_conditions.forEach(permed_condition_id => {
                        this.measure_conditions.forEach(mc => {
                            if (mc.id == permed_condition_id) {
                                measure_condition_list.push(mc);
                            }
                        });
                    });
                    permutation_group_object["measure_conditions"].push(measure_condition_list);
                    var a = 1;
                });
                
                this.permuted_measure_conditions.push(permutation_group_object);
                var a = 1;
            });
        }
    }
}
module.exports = Measure