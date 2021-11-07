


class N {
    constructor(n) {
        console.log("constructor");

        this.n = n + 1;
    }
}


// export default N;
exports.N = new N(3);