var MarkdownIt = require('markdown-it');
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
        this.get_overlays();
        this.assign_measure_types();
        this.assign_geographical_areas();
        this.attach_permutations();
        this.process_5a5b();
    }

    get_overlays() {
        const fs = require('fs');
        const path = require('path');

        var folder = path.join(__dirname, '..');
        var folder = path.join(folder, "data");
        var folder = path.join(folder, "stw");
        var folder_document_codes = path.join(folder, "document_codes");
        var folder_measure_types = path.join(folder, "measure_types");

        // Get measure type overlays
        this.measure_types.forEach(mt => {
            var filename = path.join(folder_measure_types, mt.id + ".json");
            var a = 1;
            if (fs.existsSync(filename)) {
                var file_content = fs.readFileSync(filename, 'utf8');
                var data = JSON.parse(file_content);
                mt.measure_type_overlay = data["overlay"];
                mt.measure_type_summary = data["summary"];
                mt.measure_type_summary = this.convert_markdown(mt.measure_type_summary);
            } else {
                mt.measure_type_overlay = mt.description;
                mt.measure_type_summary = "";
            }
        });

        // Get document code overlays
        this.measure_conditions.forEach(mc => {
            var a = 1; 
            var filename = path.join(folder_document_codes, mc.document_code + ".json");
            var a = 1;
            if (fs.existsSync(filename)) {
                var file_content = fs.readFileSync(filename, 'utf8');
                var data = JSON.parse(file_content);
                mc.overlay = data["overlay"];
                mc.overlay = this.convert_markdown(mc.overlay);
            } else {
                mc.overlay = mc.certificate_description;
            }
        });
    }

    process_5a5b() {
        this.measures.forEach(m => {
            m.process_5a5b();
        });
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
        var a = 1;
    }

    attach_permutations() {
        this.measures.forEach(m => {
            m.attach_permutations();
        });
    }

    assign_conditions() {
        var a = 1;
        this.measures.forEach(m => {
            if (m.measure_condition_ids.length > 0) {
                this.measure_conditions.forEach(mc => {
                    if (m.measure_condition_ids.includes(mc.id)) {
                        m.measure_conditions.push(mc);
                        var a = 1;
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
                    m.measure_type_overlay = mt.measure_type_overlay;
                    m.measure_type_summary = mt.measure_type_summary;
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

    convert_markdown = function (str) {
        if (typeof str !== 'undefined') {
            var md = new MarkdownIt();
            str = str.replace(/\* ([0-9]{1,2})\\. /g, '$1. ');
            str = str.replace(/  \* \(([a-z]{1,2})\)/g, '\n\n    $1. ');
            var markdown_text = md.render(str);
            markdown_text = markdown_text.replace("&lt;", "<");
            markdown_text = markdown_text.replace("&gt;", ">");
            markdown_text = markdown_text.replace(/<h2>/g, "<h3 class='govuk-heading-s'>");
            markdown_text = markdown_text.replace(/<\/h2>/g, "</h3>");
            markdown_text = markdown_text.replace(/<h3>/g, "<h3 class='govuk-heading-s'>");

            markdown_text = markdown_text.replace(/<ul>/g, "<ul class='govuk-list govuk-list--bullet'>")
            markdown_text = markdown_text.replace(/<ol>/g, "<ul class='govuk-list govuk-list--numbered'>")
            markdown_text = markdown_text.replace(/<p>/g, "<p class='govuk-body'>")
            return markdown_text;
        } else {
            return "";
        }
    }
}
module.exports = Commodity