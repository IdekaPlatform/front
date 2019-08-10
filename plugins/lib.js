String.prototype.subword = function(length) {
    //trim the string to the maximum length
    const trimmedString = this.substr(0, length);

    //re-trim if we are in the middle of a word
    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
}
