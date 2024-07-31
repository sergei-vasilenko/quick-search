class Trie {
    constructor() {
      this._state = {};
    }
  
    _generateResult(startData, endData, tokenLength) {
      return Object.keys(endData).reduce((acc, tokenId) => {
        const startIndices = startData[tokenId];
        const endIndices = endData[tokenId];
  
        endIndices.forEach((charEndIdx) => {
          const endIdx = charEndIdx + 1
          const expectedStartIdx = endIdx - tokenLength;
          const position = startIndices.has(expectedStartIdx) ? [expectedStartIdx, endIdx] : null;
          if (position) {
            if (!acc[tokenId]) acc[tokenId] = [];
            acc[tokenId].push(position);
          }
        });
  
        return acc;
      }, {});
    }
  
    _addDataToNode(node, tokenId, index) {
      if (!node._data[tokenId]) {
        node._data[tokenId] = new Set([]);
      }
      node._data[tokenId].add(index);
    }
  
    indexGroup(tokens) {
      for (const token of tokens.entries()) {
        this.index(token.id, token.value);
      }
    }
  
    index(tokenId, token) {
      const lowercaseToken = token.toLowerCase();
      const writableScopes = [];
  
      for (let charIdx = 0; charIdx < lowercaseToken.length; charIdx++) {
        const char = lowercaseToken[charIdx];
  
        if (!this._state[char]) {
          this._state[char] = { _data: { [tokenId]: new Set([charIdx]) }};
        } else {
          this._addDataToNode(this._state[char], tokenId, charIdx);
        }
        const newScope = this._state[char];
  
        for (let scopeIdx = 0; scopeIdx < writableScopes.length; scopeIdx++) {
          const scope = writableScopes[scopeIdx];
  
          if (!scope[char]) {
            scope[char] = { _data: { [tokenId]: new Set([charIdx]) }};
          } else {
            this._addDataToNode(scope[char], tokenId, charIdx);
          }
          writableScopes[scopeIdx] = scope[char];
        }
        writableScopes.push(newScope);
      }
    }
  
    search(string) {
      if (!string) return {};
  
      const lowercaseString = string.toLowerCase();
      const stringLength = string.length;
  
      let startData;
      let scope = this._state;
  
      for (let charIdx = 0; charIdx < lowercaseString.length; charIdx++) {
        const char = lowercaseString[charIdx];
  
        if (!scope) return {};
  
        if (charIdx === 0) {
          startData = scope[char]._data;
        }
  
        scope = scope[char];
      }
  
      const endData = scope._data;
  
      return this._generateResult(startData, endData, stringLength);
    }
  }
  