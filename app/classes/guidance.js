var MarkdownIt = require('markdown-it');
const GuidanceInstance = require("./guidance_instance");

class Guidance {
    constructor(response) {
        this.response = response.data;

        // this.document_codes = this.response["document_codes"];
        // this.status_codes = this.response["status_codes"];

        this.document_codes = this.response;

        // this.get_core_data();
    }



    get_core_data() {
        // this
        this.document_codes.forEach(dc => {
            var a = 1;
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
module.exports = Guidance