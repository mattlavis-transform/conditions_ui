class MeasureCondition {
    constructor(item) {
        this.item = item;
        this.get_data();
        delete this.item;
    }

    get_data() {
        this.id = this.item["id"];
        this.action = this.item["attributes"]["action"];
        this.action_code = this.item["attributes"]["action_code"];
        this.certificate_description = this.item["attributes"]["certificate_description"];
        this.condition = this.item["attributes"]["condition"];
        this.condition_class = this.item["attributes"]["condition_class"];
        this.condition_duty_amount = this.item["attributes"]["condition_duty_amount"];
        this.condition_monetary_unit_code = this.item["attributes"]["condition_monetary_unit_code"];
        this.condition_measurement_unit_code = this.item["attributes"]["condition_measurement_unit_code"];
        this.condition_measurement_unit_qualifier_code = this.item["attributes"]["condition_measurement_unit_qualifier_code"];
        this.certificate_type_code = this.item["attributes"]["certificate_type_code"];
        this.document_code = this.item["attributes"]["document_code"];
        this.requirement = this.item["attributes"]["requirement"];
        this.monetary_unit_abbreviation = this.item["attributes"]["monetary_unit_abbreviation"];

        this.get_threshold_text();

    }

    get_threshold_text() {
        if ((typeof this.condition_measurement_unit_code !== 'undefined') && (this.condition_measurement_unit_code != null)) {
            var weights = ["KGM", "TNE"]
            var volumes = ["LTR", "HLT"]
            if (weights.includes(this.condition_measurement_unit_code)) {
                this.threshold_text = "Your goods must weight less than or equal to ";
            } else if (volumes.includes(this.condition_measurement_unit_code)) {
                this.threshold_text = "The volume of your goods must not exceed ";
            } else {
                this.threshold_text = "";
            }
        } else {
            this.threshold_text = "";
        }
    }
}
module.exports = MeasureCondition