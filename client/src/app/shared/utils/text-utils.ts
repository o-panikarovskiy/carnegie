import { StringStringMap } from 'src/app/core/typings/common';

export function getFullName(user: any): string {
  if (!user) return '';
  if (typeof user.fullName === 'string') {
    return user.fullName;
  }

  let { firstName, lastName } = user;
  firstName = typeof firstName === 'string' ? firstName : '';
  lastName = typeof lastName === 'string' ? lastName : '';
  return `${firstName} ${lastName}`.trim();
}

export function getMediumName(user: any): string {
  if (!user) return '';
  let { firstName, lastName } = user;
  firstName = typeof firstName === 'string' ? firstName : '';
  lastName = typeof lastName === 'string' && lastName.length > 0 ? lastName[0].toUpperCase() + '.' : '';
  return `${firstName} ${lastName}`.trim();
}

export function getShortName(user: any): string {
  if (!user) return '';
  let { firstName, lastName } = user;
  firstName = typeof firstName === 'string' && firstName.length > 0 ? firstName[0].toUpperCase() : '';
  lastName = typeof lastName === 'string' && lastName.length > 0 ? lastName[0].toUpperCase() : '';
  return `${firstName}${lastName}`;
}

export function compareStrings(a?: string, b?: string, options?: Intl.CollatorOptions) {
  if (!a) return -1;
  if (!b) return 1;
  return a.localeCompare(b, void 0, options);
}

export function safeJSONParse(data: any): any {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

export function linkify(inputText?: string) {
  if (!inputText) return '';

  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  // URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="//$2" target="_blank">$2</a>');

  // Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}

export function stripTags(inputText?: string) {
  if (!inputText) return '';

  const tags: StringStringMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };

  return inputText.replace(/[&<>]/g, (tag) => tags[tag] || tag);
}
