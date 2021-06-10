const form = document.forms[0].elements;

form["submit"].onclick = (event) => {
    event.preventDefault();
    let teams = [];

    // grabbing and validating names into "names"
    const names_r = form["names"].value.split("\n");
    let names = [];

    for (n of names_r) {
        if (!(n == null || n.match(/^\s*$/) !== null)) {
            names.push(n);
        }
    }

    // grabbing and validating dists into "dist"
    const dist_r = form["dist"].value.split(" ");
    let dist = [];

    for (d of dist_r) {
        if (!(d == null || d.match(/^\s*$/) !== null)) {
            let pd = parseInt(d);

            if (!isNaN(pd)) {
                dist.push(pd);
            }
        }
    }

    // checking inputs
    if (names.length == 0 || dist.length == 0) {
        alert("Error: Empty field(s)");
        return;
    }

    // checking if names distributable
    if (dist.length == 0) {
        alert("Error: No distribution provided");
        return;
    }
    else if (dist.length == 1) {
        if (names.length % dist[0] == 0) {
            for (let i = 1; i < (names.length / dist[0]); i++) {
                dist.push(dist[0]);
            }
        }
        else {
            alert(`Error: Unable to divide ${names.length} members into teams of ${dist[0]} equally`);
            return;
        }
    }
    else {
        let sum = dist.reduce((a, b) => a + b);

        if (!(sum == names.length)) {
            alert(`Error: Unable to divide ${names.length} members into teams of ${dist.join(", ")}`);
            return;
        }
    }

    // randomising array of names
    for (let i = names.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = names[i];
        names[i] = names[j];
        names[j] = temp;
    }

    // distributing team members
    let count = dist.pop();
    let team = [];

    for (let i = 0; i <= names.length; i++) {
        team.push(names[i]);

        if (i + 1 >= count) {
            teams.push(team);
            team = [];
            count += dist.pop();
        }
    }

    // rendering teams on page
    const teamsCon = document.getElementsByClassName("teams-container")[0];
    teamsCon.innerHTML = "";
    teamsCon.classList.remove("hidden");
    let tc = 1;

    for (t of teams) {
        let p = document.createElement("p");
        let h3 = document.createElement("h3");
        let div = document.createElement("div");

        div.classList.add("team");

        for (let i = 0; i < t.length; i++) {
            p.innerHTML += `${i+1}.${t[i]}     `;
        }

        h3.innerText = `Team ${tc}`;
        p.innerText = p.innerText.trim();

        div.appendChild(h3);
        div.appendChild(p);
        tc++;

        teamsCon.appendChild(div);
    }

}
