class TrieNode {
    constructor() {
        this.children = new Array(26);
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = this.getNode();
    }

    getNode() {
        return new TrieNode();
    }

    charToIndex(ch) {
        return  ch.charCodeAt(0) - 97;
    }

    insert(key) {
        let pCrawl = this.root;
        let length = key.length;

        for (let i=0; i < length; i++) {
            let index = this.charToIndex(key[i]);
            
            if (! pCrawl.children[index]) {
                pCrawl.children[index] = this.getNode();
            }
            pCrawl = pCrawl.children[index];
        }
        pCrawl.isEndOfWord = true;
    }
}