pragma circom 2.0.0;

template VoteCheck() {
    signal input vote;
    signal output out;

    // Ensure vote is either 0 or 1
    vote * (1 - vote) === 0;

    out <== vote;
}

component main = VoteCheck();
