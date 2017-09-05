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

    // database.ref().remove();

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
            freq: frequency,
        }

        // Push the data to Firebase
        database.ref().push(train);


        // Create an array of all train times
                var trainTimes = [];
             
        // Calculate how many trains run in a day
        var numberOfTrips = Math.floor(1440/frequency);

        for (var i=0; i<numberOfTrips; i++) {
            // if (trainTimeM < currentTime) {

            var eachTrainTime = moment(trainTimeM, "HH:mm").add(frequency, 'minutes').format('HH:mm');
            var nextFrequency = frequency * i;
            eachTrainTime = moment(trainTimeM, "HH:mm").add(nextFrequency, 'minutes').format('HH:mm');
               console.log(nextFrequency);
             trainTimes.push(eachTrainTime);
            // } 
        }

            console.log(eachTrainTime);
      
        // Retrieve the data from Firebase
        database.ref().on("child_added", function(childSnapshot, prevChildName) {

            trainName = childSnapshot.val().train;
            destination = childSnapshot.val().dest;
            trainTimeM = childSnapshot.val().time;
            frequency = childSnapshot.val().freq;
        })


        // trainTimes.push(trainTimeM);
        // var nextTime = moment(trainTimeM, "HH:mm").add(frequency, 'minutes').format('HH:mm');

        // Calculate the Next Arrival Time
        var currentTime = moment().format("HH:mm");
        var nextArrTime;

        for (var i=0; i < trainTimes.length; i++) {
            if (moment(trainTimes[i], "HH:mm").isBefore(moment(currentTime, "HH:mm"))) {
                console.log(trainTimes[i]);
            } else {
                nextArrTime = trainTimes[i];
                break;
            }
        }

        console.log(nextArrTime);


        // console.log(now);
        // var minutesAway = moment(nextArrTime, "HH:mm").fromNow("minutes");
        var minutesAway = moment(nextArrTime, "HH:mm").diff(moment(), "minutes");


        // Display the data in a table
        $("#train-table").append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${nextArrTime}</td><td>${minutesAway}</td></tr>`);
    })


});
