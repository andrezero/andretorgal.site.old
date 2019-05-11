export class TemplateLocator {
  public locate(name: string): string {
    const [module, template] = name.split('/');
    return `src/${module}/templates/${template}/${template}Template.component`;
  }
}
