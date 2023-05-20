function generatePrompt() {
    var prompts = {
        "Books": [
            "Enders game - orson scott card",
            "Speaker for the dead - orson scott card",
            "Xenocide - orson scott card",
            "Project Hail mary - Andy Weir"
        ],
        "Movies": [
            "akira - 1988",
            "ghost in the shell - 1995",
            "Blade Runner",
            "Blade Runner 2049",
            "Madox - 01",
            "Jurrasic Park",
            "Dune - 2021",
            "2001 a space odyssey",
            "The Thing - 1982"
        ],
        "anime": [

            "Neon Genesis Evangelion - 1995",
            "cowboy bebop - 1998",
            "FLCL - 2000",
            "Assasination Classroom",
            "ERASED",
            "Grand Blue Dreaming",
            "Hinamatsuri",
            "Mob Psycho 100",
            "Soul Eater",
            "Dr. Stone",
            "One Punch Man"
        ],
        "manga": [
            "Berserk",
            "Fire Punch",
            "Dandadan",
            "Jujutsu Kaisen",
            "chainsaw man",
            "one punch man",
            "Uzumaki",
            "Gyo"
        ],
        "video games": [
            "Darksouls",
            "Darksouls 2",
            "Darksouls 3",
            "Bloodborne",
            "Elden Ring",
            "Amored Core 5",
            "Breath of the wild",
            "For Honor",
            "Portal",
            "Portal 2",
            "Terraria",
            "Minecraft",
            "Titanfall 2",
            "Enter the Gungeon",
            "UltraKill",
            "The Binding of Isaac Afterbirth",
            "Deaths door",
            "Borderlands 2",
            "Doom Eternal",
            "the Escapists",
            "Hades",
            "Hollow Knight",
            "Kingdome Come; Deliverance",
            "Besiege",
            "Mortal Kombat 11",
            "Oxygen not included"
        ]

    };

    var selectedCategories = [];
    var checkboxes = document.getElementsByName("category");

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedCategories.push(checkboxes[i].value);
        }
    }

    var availablePrompts = [];

    for (var i = 0; i < selectedCategories.length; i++) {
        availablePrompts = availablePrompts.concat(prompts[selectedCategories[i]]);
    }

    if (availablePrompts.length === 0) {
        document.getElementById("prompt").innerHTML = "Please select at least one category.";
    } else {
        var randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
        document.getElementById("prompt").innerHTML = randomPrompt;
    }
}