import slugify from 'slugify';

export const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};

export const humanise = (str: string): string => {
  return titleCase(str.replace(/-/g, ' '));
};

const remove = /[*+~.()'"!:,;@]/g;
export const slug = (str: string): string => {
  return slugify(str, { remove, lower: true });
};
