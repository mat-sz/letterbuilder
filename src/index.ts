import { fromByteArray } from 'base64-js';

if (typeof TextEncoder === 'undefined') {
  // @ts-ignore Isomorphism.
  global['TextEncoder'] = require('util').TextEncoder;
}

export interface LetterbuilderMail {
  subject?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  date?: Date;
  from?: string;
  html?: string;
  text?: string;
}

const textEncoder = new TextEncoder();

function base64(input: string): string {
  return fromByteArray(textEncoder.encode(input));
}

function encodeMimeWord(input: string): string {
  return '=?UTF-8?B?' + base64(input) + '?=';
}

function buildHeaderValue(input: string | string[]): string {
  if (Array.isArray(input)) {
    return input.map(arg => encodeMimeWord(arg)).join(', ');
  } else {
    return encodeMimeWord(input);
  }
}

function randomString(length: number) {
  return Math.random().toString(36).substring(length).toLowerCase();
}

function textContent(type: 'text/html' | 'text/plain', input: string) {
  let output = '';
  output += 'Content-Type: ' + type + '; charset=UTF-8\n';
  output += 'Content-Transfer-Encoding: Base64\n';
  output += '\n\n';
  output += base64(input);
  output += '\n\n';
  return output;
}

export function build(mail: LetterbuilderMail): string {
  let output = '';

  if (mail.from) {
    output += 'From: ' + buildHeaderValue(mail.from) + '\n';
  }

  if (mail.to) {
    output += 'To: ' + buildHeaderValue(mail.to) + '\n';
  }

  if (mail.cc) {
    output += 'Cc: ' + buildHeaderValue(mail.cc) + '\n';
  }

  if (mail.bcc) {
    output += 'Bcc: ' + buildHeaderValue(mail.bcc) + '\n';
  }

  if (mail.subject) {
    output += 'Subject: ' + buildHeaderValue(mail.subject) + '\n';
  }

  if (mail.date) {
    output += 'Date: ' + mail.date.toUTCString() + '\n';
  }

  if (mail.html && mail.text) {
    const boundary = randomString(16);
    output += 'Content-Type: multipart/alternative;\n';
    output += ' boundary="' + boundary + '"\n';
    output += '\n\nThis is a multi-part message in MIME format.\n';
    output += '--' + boundary + '\n';
    output += textContent('text/html', mail.html);
    output += '--' + boundary + '\n';
    output += textContent('text/plain', mail.text);
    output += '--' + boundary + '--\n';
  } else if (mail.html) {
    output += textContent('text/html', mail.html);
  } else if (mail.text) {
    output += textContent('text/plain', mail.text);
  } else {
    throw new Error('Content is required.');
  }

  return output;
}
