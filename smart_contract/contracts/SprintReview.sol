// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title SprintReview — on-chain sprint review and retrospective notes
contract SprintReview {
    struct Review {
        uint256 sprintId;
        address reviewer;
        string  wentWell;
        string  improvements;
        uint8   rating; // 1-5
        uint256 createdAt;
    }

    mapping(uint256 => Review[]) public sprintReviews;

    event ReviewSubmitted(uint256 indexed sprintId, address indexed reviewer, uint8 rating);

    function submitReview(
        uint256 sprintId,
        string calldata wentWell,
        string calldata improvements,
        uint8 rating
    ) external {
        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        sprintReviews[sprintId].push(Review(sprintId, msg.sender, wentWell, improvements, rating, block.timestamp));
        emit ReviewSubmitted(sprintId, msg.sender, rating);
    }

    function getReviews(uint256 sprintId) external view returns (Review[] memory) {
        return sprintReviews[sprintId];
    }

    function getAverageRating(uint256 sprintId) external view returns (uint256) {
        Review[] memory reviews = sprintReviews[sprintId];
        if (reviews.length == 0) return 0;
        uint256 total;
        for (uint256 i = 0; i < reviews.length; i++) total += reviews[i].rating;
        return total / reviews.length;
    }
}
