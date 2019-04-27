import slugify from 'slugify';

export const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(wordCase)
    .join(' ');
};

export const wordCase = (word: string): string => {
  if (!word.length) {
    return word;
  }
  return word.replace(word[0], word[0].toUpperCase());
};

export const humanise = (str: string): string => {
  return titleCase(str.replace(/-/g, ' '));
};

const remove = /[*+~.()'"!:,;@]/g;
export const slug = (str: string): string => {
  return slugify(str, { remove, lower: true });
};

export const cssClass = (str: string): string => {
  return slug(str).replace('/', '-');
};
