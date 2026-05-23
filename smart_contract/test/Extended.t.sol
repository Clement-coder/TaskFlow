// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../contracts/SprintBoard.sol";
import "../contracts/DAOProposal.sol";
import "../contracts/MilestoneTracker.sol";
import "../contracts/TeamRegistry.sol";

contract ExtendedTest {
    SprintBoard      sprint;
    DAOProposal      dao;
    MilestoneTracker tracker;
    TeamRegistry     team;

    address constant USER = address(0xBEEF);

    function setUp() public {
        sprint  = new SprintBoard();
        dao     = new DAOProposal();
        tracker = new MilestoneTracker();
        team    = new TeamRegistry();
    }

    // ── SprintBoard ───────────────────────────────────────────────

    function test_sprint_create() public {
        sprint.createSprint("Sprint 1", block.timestamp, block.timestamp + 7 days);
        assert(sprint.sprintCount() == 1);
    }

    function test_sprint_close() public {
        sprint.createSprint("Sprint 1", block.timestamp, block.timestamp + 7 days);
        sprint.closeSprint(1);
        (,,,,,bool active,) = sprint.sprints(1);
        assert(!active);
    }

    function test_sprint_incrementTaskCount() public {
        sprint.createSprint("Sprint 1", block.timestamp, block.timestamp + 7 days);
        sprint.incrementTaskCount(1);
        sprint.incrementTaskCount(1);
        (,,,,, bool active, uint256 taskCount) = sprint.sprints(1);
        assert(taskCount == 2);
        assert(active);
    }

    // ── DAOProposal ───────────────────────────────────────────────

    function test_dao_createProposal() public {
        dao.createProposal("Add MiniPay support", "Integrate MiniPay wallet for mobile users");
        assert(dao.proposalCount() == 1);
    }

    function test_dao_vote_upvote() public {
        dao.createProposal("Feature X", "Description");
        dao.vote(1, true);
        DAOProposal.Proposal memory p = dao.getProposal(1);
        assert(p.upvotes == 1);
        assert(p.downvotes == 0);
    }

    function test_dao_vote_downvote() public {
        dao.createProposal("Feature Y", "Description");
        dao.vote(1, false);
        DAOProposal.Proposal memory p = dao.getProposal(1);
        assert(p.downvotes == 1);
    }

    // ── MilestoneTracker ──────────────────────────────────────────

    function test_milestone_create() public {
        tracker.createMilestone("Launch on Celo mainnet", "Q2-2026");
        assert(tracker.milestoneCount() == 1);
    }

    function test_milestone_upvote() public {
        tracker.createMilestone("MiniPay integration", "Q3-2026");
        tracker.upvote(1);
        (,,,, uint256 upvotes,,) = tracker.milestones(1);
        assert(upvotes == 1);
    }

    function test_milestone_complete() public {
        tracker.createMilestone("Deploy contracts", "Q2-2026");
        tracker.complete(1);
        (,,,,,bool completed,) = tracker.milestones(1);
        assert(completed);
    }

    // ── TeamRegistry ──────────────────────────────────────────────

    function test_team_addMember() public {
        team.addMember(USER, "Avery Quinn", TeamRegistry.Role.Developer);
        assert(team.isMember(USER));
        assert(team.getMemberCount() == 1);
    }

    function test_team_removeMember() public {
        team.addMember(USER, "Avery Quinn", TeamRegistry.Role.Developer);
        team.removeMember(USER);
        assert(!team.isMember(USER));
    }

    function test_team_updateRole() public {
        team.addMember(USER, "Avery Quinn", TeamRegistry.Role.Contributor);
        team.updateRole(USER, TeamRegistry.Role.Owner);
        (,, TeamRegistry.Role role,,) = team.members(USER);
        assert(role == TeamRegistry.Role.Owner);
    }
}
