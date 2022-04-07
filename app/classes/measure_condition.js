var MarkdownIt = require('markdown-it');


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
        
        // 5a and 5b related
        this.guidance_cds = this.item["attributes"]["guidance_cds"];
        this.guidance_chief = this.item["attributes"]["guidance_chief"];
        this.status_codes_cds = this.item["attributes"]["status_codes_cds"];
        if (this.guidance_cds == null) {
            this.guidance_cds = "No information currently available";
        }
        if (this.guidance_chief == null) {
            this.guidance_chief = "No information currently available";
        }

        var md = new MarkdownIt();
        this.guidance_cds = md.render(this.guidance_cds);
        this.guidance_chief = md.render(this.guidance_chief);

        this.guidance_cds = this.format_html(this.guidance_cds);
        this.guidance_chief = this.format_html(this.guidance_chief);

        this.get_threshold_text();
        this.get_stw_condition_class_overlay();

    }

    format_html(s) {
        s = s.replace(/<ul>/g, "<ul class='govuk-list govuk-list--bullet'>");
        return (s);
    }

    get_stw_condition_class_overlay() {
        var lookup = {
            "document": "Rules that apply to your goods",
            "threshold": "Rules that apply to your goods",
            "exemption": "When rules are different or do not apply"
        }
        this.stw_condition_class_overlay = lookup[this.condition_class];
        var a = 1;
    }

    get_threshold_text() {
        if ((typeof this.condition_measurement_unit_code !== 'undefined') && (this.condition_measurement_unit_code != null)) {
            var weights = ["KGM", "TNE"]
            var volumes = ["LTR", "HLT"]
            if (weights.includes(this.condition_measurement_unit_code)) {
                this.threshold_text = "The weight of your goods must not exceed ";
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