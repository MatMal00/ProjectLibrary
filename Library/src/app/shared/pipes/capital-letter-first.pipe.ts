import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetterFirst',
})
export class CapitalLetterFirstPipe implements PipeTransform {
  transform(word: string, ...args: string[]): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
