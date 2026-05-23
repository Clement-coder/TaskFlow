// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../contracts/ActivityLogger.sol";
import "../contracts/ProjectRegistry.sol";
import "../contracts/WorkspaceRegistry.sol";
import "../contracts/TeamRegistry.sol";

contract RegistryTest {
    ActivityLogger   logger;
    ProjectRegistry  projects;
    WorkspaceRegistry workspaces;
    TeamRegistry     team;

    address constant USER = address(0xCAFE);

    function setUp() public {
        logger     = new ActivityLogger();
        projects   = new ProjectRegistry();
        workspaces = new WorkspaceRegistry();
        team       = new TeamRegistry();
    }

    // ── ActivityLogger ────────────────────────────────────────────

    function test_logger_log() public {
        logger.log("Workspace initialized", ActivityLogger.LogType.System);
        assert(logger.logCount() == 1);
    }

    function test_logger_actorLogs() public {
        logger.log("Task created", ActivityLogger.LogType.Task);
        logger.log("Contract deployed", ActivityLogger.LogType.Contract);
        uint256[] memory ids = logger.getActorLogs(address(this));
        assert(ids.length == 2);
    }

    // ── ProjectRegistry ───────────────────────────────────────────

    function test_project_create() public {
        projects.createProject("Stacks DAO", "Launch the DAO");
        assert(projects.projectCount() == 1);
    }

    function test_project_update() public {
        projects.createProject("Reputation Engine", "On-chain rep");
        projects.updateProject(1, ProjectRegistry.Status.Launched, 100);
        (,,,, ProjectRegistry.Status status, uint256 progress,,) = projects.projects(1);
        assert(status == ProjectRegistry.Status.Launched);
        assert(progress == 100);
    }

    // ── WorkspaceRegistry ─────────────────────────────────────────

    function test_workspace_create() public {
        workspaces.createWorkspace("TaskFlow Core", "Main workspace", true);
        assert(workspaces.workspaceCount() == 1);
        assert(workspaces.isMember(1, address(this)));
    }

    function test_workspace_join() public {
        workspaces.createWorkspace("Growth Ops", "Cross-team", false);
        (,,,,,uint256 memberCount,) = workspaces.workspaces(1);
        assert(memberCount == 1); // creator is already member
        assert(workspaces.isMember(1, address(this)));
    }

    // ── TeamRegistry ──────────────────────────────────────────────

    function test_team_memberCount() public {
        team.addMember(USER, "Avery", TeamRegistry.Role.Developer);
        team.addMember(address(0xDEAD), "Mira", TeamRegistry.Role.Contributor);
        assert(team.getMemberCount() == 2);
    }
}
