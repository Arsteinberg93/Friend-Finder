var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });



    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: Infinity
        }

        var friendData = req.body
        var score = friendData.scores

        var difference;

        for (let i = 0; i < friends.length; i++) {
            var availFriend = friends[i];
            difference = 0;


            for (let j = 0; j < availFriend.scores.length; j++) {
                var currentFS = availFriend.scores[j];
                var userScore = score[j];
                difference += Math.abs(parseInt(currentFS) - parseInt(userScore));

            }

            if (difference <= bestMatch.friendDiff) {
                bestMatch.name = availFriend.name;
                bestMatch.photo = availFriend.photo;
                bestMatch.friendDiff = difference;
            }
        }
        friends.push(friendData);
        res.json(bestMatch);

    });

};