# Prefix Tree Quick Search

## Для чего
Можно использовать для быстрого поиска в массиве строк.

## Методы
- `.indexGroup(strings: Array<string>): void` - индексация массива строк
- `.index(tokenId: number | string, token: string): void` - индексация строки
- `.search(substring: string): { [tokenId]: [[indexStart: number, indexEnd: number]] }` - поиск по индексу
