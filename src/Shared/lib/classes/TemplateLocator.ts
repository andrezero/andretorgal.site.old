class TemplateLocator {
  public locate(name: string): string {
    const [module, container] = name.split('/');
    return `src/${module}/containers/${container}/${container}Container.component`;
  }
}

export default TemplateLocator;
