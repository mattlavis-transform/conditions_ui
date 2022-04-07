var MarkdownIt = require('markdown-it');

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  filters.convert_markdown = function (str, hide_bullets) {
    if (typeof str !== 'undefined') {
        md = new MarkdownIt();
        str = str.replace(/\* ([0-9]{1,2})\\. /g, '$1. ');
        str = str.replace(/  \* \(([a-z]{1,2})\)/g, '\n\n    $1. ');

        var markdown_text = md.render(str);
        markdown_text = markdown_text.replace(/&lt;/g, "<");
        markdown_text = markdown_text.replace(/&gt;/g, ">");
        markdown_text = markdown_text.replace(/<h1>/g, "<h1 class='govuk-heading-l'>");
        markdown_text = markdown_text.replace(/<h2>/g, "<h2 class='govuk-heading-m'>");
        markdown_text = markdown_text.replace(/<h3>/g, "<h3 class='govuk-heading-s'>");

        markdown_text = markdown_text.replace(/<ul>/g, "<ul class='govuk-list govuk-list--bullet'>")
        markdown_text = markdown_text.replace(/<ol>/g, "<ol class='govuk-list govuk-list--number'>")
        markdown_text = markdown_text.replace(/<a href/g, "<a target='_blank' href")
        return markdown_text;
    } else {
        return "";
    }
}
  
  return filters
}
