if (term.indexOf("steamcommunity.com") !== -1) {
      console.log("3");
      if (term.indexOf("profiles") !== -1) {
        //WILL CONTAIN STEAMID IN URL
        term.replace(/[^0-9]/, "");
        existingUser = await User.find({
          "steamInfo.id": term
        });
      } else {
        //WILL CONTAIN CUSTOMID IN URL
        term.replace("https://steamcommunity.com/profiles/", "");
        steam.convertVanity(term, async (err, res) => {
          if (err) {
            console.log(err);
          } else {
            //IF SUCCESS WE HAVE THE STEAM ID NOW
            existingUser = await User.find({
              "steamInfo.id": res
            });
          }
        });
      }

      //TESTS FOR STEAMID OR CUSTOM ID
    }else if (term.match(/^[0-9]+$/)) {
      console.log("2");
      existingUser = await User.find({
        "steamInfo.id": term
      });

      //TESTS FOR PERSONA NAME
    } else {
      steam.convertVanity(term, async (err, res) => {
        if (err) {
          //IF ERROR THEN WE KNOW ITS NOT CUSTOM ID
          console.log("got here");
          existingUser = await User.find({
            "steamInfo.persona": term
          }).limit(5);
        } else {
          console.log("1");
          //IF SUCCESS WE HAVE THE STEAM ID NOW
          existingUser = await User.find({
            "steamInfo.id": res
          });
        }
      });
    }