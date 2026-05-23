// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../contracts/CeloNameRegistry.sol";
import "../contracts/TaskComment.sol";
import "../contracts/TaskTag.sol";
import "../contracts/ReputationStaking.sol";
import "../contracts/TaskAssignment.sol";
import "../contracts/AchievementBadge.sol";
import "../contracts/ContributorLeaderboard.sol";
import "../contracts/SprintReview.sol";

contract FeatureTest {
    CeloNameRegistry    nameReg;
    TaskComment         comments;
    TaskTag             tags;
    ReputationStaking   staking;
    TaskAssignment      assignment;
    AchievementBadge    badges;
    ContributorLeaderboard board;
    SprintReview        reviews;

    address constant USER = address(0xBEEF);

    function setUp() public {
        nameReg    = new CeloNameRegistry();
        comments   = new TaskComment();
        tags       = new TaskTag();
        staking    = new ReputationStaking();
        assignment = new TaskAssignment();
        badges     = new AchievementBadge();
        board      = new ContributorLeaderboard();
        reviews    = new SprintReview();
    }

    function test_nameRegistry_register() public {
        nameReg.register("avery");
        assert(keccak256(bytes(nameReg.lookup(address(this)))) == keccak256(bytes("avery")));
        assert(nameReg.resolve("avery") == address(this));
    }

    function test_taskComment_add() public {
        comments.addComment(1, "Looks good!");
        assert(comments.getCommentCount(1) == 1);
    }

    function test_taskTag_add() public {
        tags.addTag(1, "clarity");
        tags.addTag(1, "web3");
        assert(tags.getTags(1).length == 2);
    }

    function test_staking_stakeAndUnstake() public {
        staking.stake(1, 100);
        (uint256 amount,) = staking.getStake(address(this));
        assert(amount == 100);
        staking.unstake(1);
        (uint256 after_,) = staking.getStake(address(this));
        assert(after_ == 0);
    }

    function test_assignment_assign() public {
        assignment.assign(1, USER);
        assert(assignment.assignee(1) == USER);
    }

    function test_badge_award() public {
        badges.awardBadge(USER, "First Task", "Completed first on-chain task");
        assert(badges.getBadgeCount(USER) == 1);
    }

    function test_leaderboard_updateScore() public {
        board.updateScore(USER, 9840);
        assert(board.getScore(USER) == 9840);
        assert(board.getContributorCount() == 1);
    }

    function test_sprintReview_submit() public {
        reviews.submitReview(1, "Great velocity", "Better estimation", 4);
        assert(reviews.getAverageRating(1) == 4);
    }
}
