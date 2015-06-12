function TalkViewModel() {
    // Data
    var self = this;
    self.talk = ko.observable();

    $.ajax({
        method: 'GET',
        dataType: "json",
        url: jsonUrl,
        success: function(allData) {
            self.initializeData(allData);
        },
        error: function(error) {
            console.log("Nothing updated. Device offline?");
        }
    });

    self.initializeData = function(allData) {
        var talkId = self.getParameterByName("talkid");
        var filtered = _.filter(allData, function(t) {return t.id === talkId});
        self.talk(filtered[0]);
    };

    self.getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
}

//ko.applyBindings(new TalkViewModel());


