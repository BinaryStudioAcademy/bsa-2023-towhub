import fs from 'node:fs';

import handlebars from 'handlebars';

class View {
  protected static instance: View;

  protected templatePath: string;

  protected compiledTemplate: HandlebarsTemplateDelegate;

  protected constructor(path: string) {
    this.templatePath = path;
    this.compiledTemplate = this.compileTemplate();
  }

  protected compileTemplate(): HandlebarsTemplateDelegate {
    const templateSource = fs.readFileSync(this.templatePath, 'utf8');

    return handlebars.compile(templateSource);
  }
}

export { View };
