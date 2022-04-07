var MarkdownIt = require('markdown-it');


class GuidanceInstance {
    constructor(item) {
        this.item = item;
        this.get_data();
        delete this.item;
    }

    format_html(s) {
        s = s.replace(/<ul>/g, "<ul class='govuk-list govuk-list--bullet'>");
        return (s);
    }
}
module.exports = GuidanceInstance