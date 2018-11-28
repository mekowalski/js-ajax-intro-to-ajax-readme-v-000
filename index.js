function showRepositories(event, data) {
  //THIS is set to XMLHttpRequest obj that fired the event
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest() //create new XMLHttpRequest instance
  req.addEventListener("load", showRepositories); //THIS will be req obj inside callback function
  req.open("GET", 'https://api.github.com/users/octocat/repos') //call pen with GET and URI for request
  req.send() //make request happen
}

function getCommits(el) {
  const name = el.dataset.repo //grab data-repo value through the dataset property
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits) //then set up XHR req with event listener can callback function
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.author.login +
      '</strong> - '+
      commit.commit.message +
      '</li>')
    .join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
