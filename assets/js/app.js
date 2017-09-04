$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyAuzWjuVZ3lKBxppiX7i4JLQi42e2u4FY0",
        authDomain: "test-ed5a0.firebaseapp.com",
        databaseURL: "https://test-ed5a0.firebaseio.com",
        projectId: "test-ed5a0",
        storageBucket: "test-ed5a0.appspot.com",
        messagingSenderId: "159840206961"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    database.ref().remove();

    $("#add-train-btn").on("click", function() {
        	event.preventDefault();

        // Get the input values from the form
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var trainTime = $("#time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        // Convert the value we take into a moment() value

        var trainTimeM = moment(trainTime, "HH:mm").format("HH:mm");

        var train = {
            train: trainName,
            dest: destination,
            time: trainTimeM,
            freq: frequency
        }

        // Push the data to Firebase
        database.ref().push(train);

        // Retrieve the data from Firebase
        database.ref().on("child_added", function(childSnapshot, prevChildName) {

            trainName = childSnapshot.val().train;
            destination = childSnapshot.val().dest;
            trainTimeM = childSnapshot.val().time;
            frequency = childSnapshot.val().freq;

        })

        // if (moment(trainTimeM).isValid()) {
        //     console.log(trainTimeM);
        // } else console.log("Not valid") ;

        // Calculate the Next Arrival Time
        var currentTime = moment().format("HH:mm");


        if (trainTimeM < currentTime) {
            var nextTime = moment(trainTimeM, "HH:mm").add(frequency, 'minutes').format('HH:mm');
            // var nextTime = moment(trainTimeM, "HH:mm").format("HH:mm");
            trainTimeM++;
        }

        console.log(nextTime);

        // Get the different between the start time and now

        // var diffTime = moment().diff(trainTime, now);

        // console.log(diffTime);


        // console.log(now);
        // var minutesAway = moment(nextTime).subtract(currentTime, "minutes");
        var minutesAway = moment(nextTime, "HH:mm").from(currentTime);


        // Display the data in a table
        $("#train-table").append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${nextTime}</td><td>${minutesAway}</td></tr>`);
    })


});
