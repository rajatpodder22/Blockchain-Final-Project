// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Verifier.sol";

contract Voting is PlonkVerifier {
    mapping(address => bool) public hasVoted;
    uint256 public yesVotes;
    uint256 public noVotes;

    event VoteCast(address indexed voter, uint256 voteValue);

    function castVote(bytes calldata proof, uint256[1] calldata pubSignals) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(verifyProof(abi.decode(proof, (uint256[24])), pubSignals), "Invalid proof");

        uint256 vote = pubSignals[0];
        require(vote == 0 || vote == 1, "Vote must be 0 or 1");

        if (vote == 1) {
            yesVotes++;
        } else {
            noVotes++;
        }

        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, vote);
    }

    function getResults() public view returns (uint256 yes, uint256 no) {
        return (yesVotes, noVotes);
    }
}