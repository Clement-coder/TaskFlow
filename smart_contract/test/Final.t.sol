// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../contracts/TaskVote.sol";
import "../contracts/ProjectLabel.sol";
import "../contracts/OnChainProfile.sol";
import "../contracts/TaskFlowConfig.sol";
import "../contracts/MiniPayIntegration.sol";
import "../contracts/TaskDueDate.sol";
import "../contracts/TaskPriority.sol";

contract FinalTest {
    TaskVote          votes;
    ProjectLabel      labels;
    OnChainProfile    profile;
    TaskFlowConfig    config;
    MiniPayIntegration minipay;
    TaskDueDate       dueDates;
    TaskPriority      priority;

    function setUp() public {
        votes    = new TaskVote();
        labels   = new ProjectLabel();
        profile  = new OnChainProfile();
        config   = new TaskFlowConfig();
        minipay  = new MiniPayIntegration();
        dueDates = new TaskDueDate();
        priority = new TaskPriority();
    }

    function test_taskVote_upvote() public {
        votes.vote(1, true);
        assert(votes.getScore(1) == 1);
    }

    function test_taskVote_downvote() public {
        votes.vote(1, false);
        assert(votes.getScore(1) == -1);
    }

    function test_projectLabel_add() public {
        labels.addLabel(1, "Blockchain");
        labels.addLabel(1, "Launch");
        assert(labels.getLabels(1).length == 2);
    }

    function test_onChainProfile_set() public {
        profile.setProfile("Avery Quinn", "@avery", "Web3 builder", "ipfs://avatar");
        OnChainProfile.Profile memory p = profile.getProfile(address(this));
        assert(keccak256(bytes(p.handle)) == keccak256(bytes("@avery")));
    }

    function test_config_setAndGet() public {
        config.set("theme", "dark");
        assert(keccak256(bytes(config.get("theme"))) == keccak256(bytes("dark")));
    }

    function test_minipay_register() public {
        minipay.registerMiniPayUser();
        assert(minipay.isMiniPayUser(address(this)));
        assert(minipay.miniPayUserCount() == 1);
    }

    function test_dueDate_setAndCheck() public {
        dueDates.setDueDate(1, block.timestamp + 1 days);
        assert(!dueDates.isOverdue(1));
        assert(dueDates.timeRemaining(1) > 0);
    }

    function test_priority_escalate() public {
        priority.setPriority(1, TaskPriority.Priority.Low);
        priority.voteEscalate(1);
        assert(escalationVotesBelow3());
    }

    function escalationVotesBelow3() internal view returns (bool) {
        return priority.escalationVotes(1) < 3;
    }
}
